# 🏗️ Technical Design: Service Flow v3.0 (Secure Input & UX Upgrade)

**작성자:** [DEV-TAN], [UX-TAN]
**상태:** 🟢 **Proposed**
**관련 회의:** [2026-02-06 UX & Security Council](../chronicle/daily/meeting/2026-02-06_ux_input_security_council.md)

---

## 1. User Journey (Flow)
1.  **Landing Page (`/`)**: 
    -   "당신의 사업을 위한 13인의 AI 이사회" (Cinematic Intro).
    -   **[의회 입장하기]** 버튼 클릭.
2.  **Authentication**: 
    -   Google Sign-in Popup.
    -   Success -> User Context 설정 (`Name`: "대표님", `Role`: "CEO").
3.  **The Boardroom (`/boardroom`)**: 
    -   "대표님, 오셨습니까. 자료를 올려주시면 분석을 시작하겠습니다." (Greeting).
    -   **Input Modal**: PDF/Image Upload Area (Dropzone).

## 2. Security Architecture (No-GitHub Policy)
- **Problem**: 고객의 기밀 문서(PDF, IR)가 공개된 GitHub 레포지토리에 올라가면 보안 사고임.
- **Solution**: **Firebase Storage**를 데이터 소(Silo)로 활용.

### 2.1. Upload Pipeline
1.  **Client (Web)**: `firebase.storage().ref('/uploads/{uid}/{docId}').put(file)`
2.  **Storage**: 파일 저장 (Encryption at Rest).
3.  **Trigger**: `functions.storage.object().onFinalize` -> Cloud Function 실행.
4.  **Analysis**: Cloud Function이 텍스트 추출(OCR) -> LLM 분석 -> **요약본만 Firestore에 기록**.
5.  **Council**: TAN들이 Firestore의 요약본을 보고 토론 시작. **(원본 파일은 절대 외부 노출 안 됨)**

### 2.2. Storage Security Rules (`storage.rules`)
```javascript
service firebase.storage {
  match /b/{bucket}/o {
    match /uploads/{userId}/{allPaths=**} {
      // 오직 본인만 읽고 쓸 수 있음
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## 3. Design System Update (Sanctuary Glass)
- **Theme**: Dark Mode + Glassmorphism + Neon Accents.
- **Color Palette**:
    -   Background: `#050505` (Deep Void)
    -   Glass Panel: `rgba(20, 20, 20, 0.6)` + Backdrop Blur.
    -   Primary: `#00F3FF` (Cyber Cyan).
    -   Warning: `#FF0055` (Neon Red).

---
**DEV-TAN : "보안은 타협하지 않습니다. 문서는 금고(Storage)에, 지능은 광장(Firestore)에."** ⚔️🚀
