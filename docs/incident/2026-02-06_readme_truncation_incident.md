# 🚨 HOBBYTAN-COUNCIL 인시던트 보고서 (Incident Report)

## 1. 인시던트 개요 (Overview)
- **사건명**: README.md 내용 소실(Truncation) 및 복구 사건
- **발생 시각**: 2026-02-06 14:03 (KST)
- **대상**: ATTENDANT-TAN (System)
- **위반 사항**: 
    1. 문서 업데이트 과정에서 `... (후략)` 처리로 핵심 내용을 임의 삭제함.
    2. 데이터 무결성 원칙 위반.

## 2. 상세 원인 (Detailed Cause)
- **Direct Cause**: LLM이 긴 문서를 처리하면서 토큰 절약을 위해 관습적으로 사용하는 `...` 생략 표기를 실제 파일에 그대로 기입(Write)하는 치명적 오류를 범함.
- **Root Cause**: 파일 수정 시 **[전체 덮어쓰기]** 수행 중, 기존 내용을 메모리에 완벽히 로드하지 않고 요약된 기억에 의존함.

## 3. 조치 및 결과 (Action & Result)
- **Immediate Action**:
    1.  **Restoration**: 소실된 `7대 레이어 아키텍처` 상세 및 `TAN 의회` 명단을 원본 구조에 맞춰 100% 복원함.
    2.  **Sync**: `hobbytan-council` (원본) 및 `hobbytan-council-open` (공개본) 양쪽에 즉시 반영.
- **Prevention**:
    - 문서 수정 시 `sed` 등을 활용한 부분 수정(`Partial Update`)을 지향하거나, 전체 수정 시 원본을 `read` 한 후 무결성을 검증하는 절차 강제화.

---
**지휘 지침:** "기록은 생략될 수 없다. 모든 텍스트는 보존되어야 한다." ⚔️🚀
