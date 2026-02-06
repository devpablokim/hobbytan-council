# 🏗️ Technical Design: Firebase Real-time Architecture

**작성자:** [DEV-TAN]
**상태:** 🟢 **Active** (Implementation Started)
**관련 회의:** [2026-02-06 Threads & Firebase Kickoff](../chronicle/daily/meeting/2026-02-06_threads_firebase_kickoff.md)

---

## 1. Architecture Overview
- **Source**: OpenClaw Local File System (`docs/chronicle/daily/`)
- **Sync Agent**: `scripts/sync_firestore.js` (Node.js script run by Cron)
- **Database**: Firebase Firestore (NoSQL)
- **Frontend**: React App on Vercel (Subscribes to Firestore)

## 2. Prerequisites (준비사항)
1.  **Firebase Project**:
    -   Project Name: `hobbytan-council-boardroom` (Tentative)
    -   Region: `asia-northeast3` (Seoul)
2.  **Credentials**:
    -   `serviceAccountKey.json`: Admin SDK 인증용 (로컬 전용, **Git 절대 제외**)
3.  **Security Rules**:
    ```javascript
    rules_version = '2';
    service cloud.firestore {
      match /databases/{database}/documents {
        match /chronicles/{docId} {
          allow read: if true;  // Public Read
          allow write: if false; // Only Admin SDK can write
        }
      }
    }
    ```

## 3. Data Schema (Firestore)
- **Collection**: `chronicles`
- **Document ID**: `YYYY-MM-DD` (e.g., `2026-02-06`)
- **Fields**:
    - `date`: String
    - `content`: String (Full Markdown)
    - `lastUpdated`: Timestamp
    - `logs`: Array of Objects (Parsed)
        - `timestamp`: String
        - `speaker`: String
        - `swanId`: String
        - `message`: String
        - `type`: "THOUGHT" | "SPEECH"

---
**DEV-TAN : "0.1초의 지연도 허용하지 않는 실시간성을 구축한다."** ⚔️🚀
