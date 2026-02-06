const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// 1. Initialize Firebase
try {
    const serviceAccount = require('../serviceAccountKey.json');
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
    console.log("✅ Firebase Admin Initialized");
} catch (e) {
    console.error("❌ Failed to init Firebase:", e.message);
    process.exit(1);
}

const db = admin.firestore();
const CLIENT_ID = process.env.CURRENT_CLIENT_ID || 'internal_aijossi';

// 2. Read Chronicle
const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
const chroniclePath = path.join(__dirname, `../docs/chronicle/daily/${today}.md`);

async function syncChronicle() {
    if (!fs.existsSync(chroniclePath)) {
        console.log(`⚠️ No chronicle found for ${today}`);
        return;
    }

    const content = fs.readFileSync(chroniclePath, 'utf8');
    const docRef = db.collection('clients').doc(CLIENT_ID).collection('chronicles').doc(today);

    // 3. Parse Markdown to Logs (Simple Regex Parser)
    // Format: YYYY-MM-DD HH:mm:ss [Speaker] (ID) -> [Target]
    // - [Type] : Content
    const logRegex = /(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}) \[(.*?)\] \((.*?)\) -> \[(.*?)\]\n- \[(.*?)\] : ([\s\S]*?)(?=\n\d{4}-\d{2}-\d{2}|\n$)/g;
    
    let match;
    const logs = [];
    
    while ((match = logRegex.exec(content)) !== null) {
        logs.push({
            timestamp: match[1],
            speaker: match[2],
            swanId: match[3],
            target: match[4],
            type: match[5], // 생각 vs 답변
            message: match[6].trim()
        });
    }

    // 4. Update Firestore
    try {
        await docRef.set({
            date: today,
            content: content, // Full Markdown for backup/viewer
            logs: logs,       // Structured logs for real-time chat UI
            lastUpdated: admin.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
        console.log(`🚀 Synced ${logs.length} logs to Firestore (${CLIENT_ID}/${today})`);
    } catch (e) {
        console.error("❌ Firestore Sync Error:", e);
    }
}

syncChronicle();
