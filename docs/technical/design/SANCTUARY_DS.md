# 🏛️ Sanctuary UI 디자인 시스템 (Design System) v0.1

## 1. Foundation
### 🎨 Color Palette
- **Base (Background)**: `Deep Black (#000000)` - 무한한 공간감.
- **Primary (Intelligence)**: `Electric Neon Blue (#00F0FF)` - 지능의 번뜩임.
- **Secondary (Success)**: `Acid Green (#CCFF00)` - 연산 완료 및 성공.
- **Surface**: `Metal Grey (#1A1A1A)` - 컴포넌트 배경 및 카드 질감.

### 🔡 Typography
- **Font-Family**: `Inter` (UI), `JetBrains Mono` (Thinking Log)
- **Heading 1**: `32px / Bold / Line-height: 1.2`
- **Body**: `16px / Regular / Line-height: 1.6 / Flexible`
- **Thinking Log**: `14px / Mono / Line-height: 1.5` - 가독성 최우선.

## 2. Global Components
### 🪟 Dialog & Bottom Sheet
- **Overlay**: `Black / 80% Opacity`
- **Blur**: `20px (Glassmorphism Effect)`
- **Exception**: 텍스트가 컨테이너를 초과할 경우 `Auto-scroll` 활성화 및 하단 `Fade-out` 처리.

## 3. Layout Rules
- **Grid**: 12-Column Grid (Flexible Padding: 20px~40px)
- **Exception Handle**: 
    - 텍스트 초과 시: `Ellipsis` 처리 혹은 전사적 `Expandable` 위젯 사용.
    - 영역 확장: `Flex-grow`를 통한 동적 영역 확보 의무화.

---
**UX가재 : 1px의 오차는 지능의 수치이며, 미학은 지능의 품격이다.** ⚔️🚀
