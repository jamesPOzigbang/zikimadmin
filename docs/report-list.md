# PRD: 리포트 발급 이력 관리 (Report History Management)

**문서 버전:** 1.0  
**최종 수정일:** 2025-12-08  
**담당자:** 지킴진단 프로덕트팀  
**관련 파일:** `index.html`, `script.js`, `style.css`

---

## 1. 제품 개요 (Product Overview)

### 1.1 목적 (Purpose)
관리자가 생성된 모든 부동산 진단 리포트의 이력을 효율적으로 조회, 검색, 관리할 수 있는 대시보드를 제공합니다.

### 1.2 비즈니스 가치 (Business Value)
- 리포트 발급 현황의 실시간 모니터링
- 데이터 기반 의사결정 지원 (발급 트렌드, 결제 패턴 분석)
- 고객 문의 대응 시간 단축 (빠른 리포트 검색)
- 엑셀 다운로드를 통한 외부 시스템 연동 및 보고서 작성 지원

### 1.3 타겟 사용자 (Target Users)
- **주 사용자:** 지킴진단 관리자 (CS팀, 운영팀)
- **보조 사용자:** 경영진 (데이터 분석 목적)

---

## 2. 사용자 스토리 (User Stories)

### US-001: 리포트 목록 조회
**As a** 관리자  
**I want to** 전체 리포트 발급 이력을 테이블 형태로 확인하고  
**So that** 현황을 한눈에 파악할 수 있다

**수용 기준 (Acceptance Criteria):**
- [ ] 페이지 로드 시 최신 15개 리포트가 자동으로 표시됨
- [ ] 각 리포트의 핵심 정보(ID, 일시, 주소, 용도, 목적, 결제, 상태)가 테이블 행에 표시됨
- [ ] 상태(완료/진행중/취소)는 색상이 다른 배지로 시각적으로 구분됨
- [ ] 리포트 총 개수가 하단에 "Total N items" 형태로 표시됨

### US-002: 리포트 번호로 검색
**As a** CS 담당자  
**I want to** 특정 리포트 번호를 입력하여 해당 리포트를 빠르게 찾고  
**So that** 고객 문의에 신속하게 대응할 수 있다

**수용 기준:**
- [ ] 검색창에 리포트 번호를 입력할 수 있음
- [ ] 검색 실행 시 일치하는 리포트만 필터링되어 표시됨
- [ ] 검색 결과가 없을 경우 "결과 없음" 메시지 표시
- [ ] 검색창 초기화 시 전체 목록으로 복원됨

### US-003: 날짜 범위 필터링
**As a** 운영팀 관리자  
**I want to** 특정 기간의 리포트만 조회하고  
**So that** 월간/주간 발급 통계를 분석할 수 있다

**수용 기준:**
- [ ] 시작일과 종료일을 각각 선택할 수 있는 date picker 제공
- [ ] 날짜 범위 설정 시 해당 기간의 리포트만 필터링됨
- [ ] 시작일이 종료일보다 늦을 경우 경고 메시지 표시
- [ ] 날짜 미선택 시 전체 기간 조회

### US-004: 리포트 상세 조회
**As a** 관리자  
**I want to** 테이블의 특정 행을 클릭하여 해당 리포트의 상세 내용을 확인하고  
**So that** 진단 결과와 매물 정보를 심층적으로 파악할 수 있다

**수용 기준:**
- [ ] 테이블 행 클릭 시 `report-detail.html?id={reportId}` 페이지로 이동
- [ ] 마우스 호버 시 행 배경색 변경으로 클릭 가능 영역임을 시각적으로 표현
- [ ] 리포트 ID가 URL 파라미터로 전달됨

### US-005: 엑셀 다운로드
**As a** 경영진  
**I want to** 현재 조회 중인 리포트 목록을 엑셀 파일로 다운로드하고  
**So that** 외부 시스템에서 추가 분석을 수행할 수 있다

**수용 기준:**
- [ ] "엑셀 다운로드" 버튼 클릭 시 현재 필터링된 데이터를 기준으로 `.xlsx` 파일 생성
- [ ] 파일명은 `리포트이력_YYYYMMDD_HHMMSS.xlsx` 형식
- [ ] 모든 테이블 컬럼이 엑셀에 포함됨
- [ ] 다운로드 실패 시 오류 알림 표시

---

## 3. 기능 요구사항 (Functional Requirements)

### FR-001: 데이터 렌더링
**우선순위:** P0 (Critical)  
**설명:** Mock 데이터를 기반으로 테이블을 동적으로 생성합니다.

**세부 사항:**
- `reportData` 배열을 순회하며 `<tbody>` 내부에 `<tr>` 요소 생성
- 각 행에 `onclick` 이벤트 바인딩 (`openReportDetail` 함수 호출)
- 상태 값에 따라 동적으로 CSS 클래스를 적용하여 배지 색상 결정
  - `완료`: `.badge-success` (녹색)
  - `진행중`: `.badge-warning` (주황색)
  - `취소`: `.badge-danger` (빨간색)

**기술 구현:**
```javascript
function renderTable(data) {
    tableBody.innerHTML = data.map(item => `
        <tr onclick="openReportDetail('${item.id}')">
            <td><span style="font-family: monospace;">${item.id}</span></td>
            <td>${item.date}</td>
            <td>${item.address}</td>
            <td>${item.type}</td>
            <td>${item.purpose}</td>
            <td>${item.payment}</td>
            <td>${getStatusBadge(item.status)}</td>
        </tr>
    `).join('');
}
```

### FR-002: 페이지 네비게이션
**우선순위:** P1 (High)  
**설명:** 대량의 데이터를 페이지 단위로 나누어 표시합니다.

**세부 사항:**
- 페이지당 15개 항목 표시
- 이전/다음 버튼 및 페이지 번호 버튼 제공
- 현재 페이지는 `.active` 클래스로 강조
- 첫 페이지에서는 이전 버튼 비활성화, 마지막 페이지에서는 다음 버튼 비활성화

### FR-003: 검색 및 필터링
**우선순위:** P0 (Critical)  
**설명:** 사용자 입력에 따라 테이블 데이터를 동적으로 필터링합니다.

**세부 사항:**
- 검색어는 리포트 ID와 부분 일치 비교
- 날짜 필터는 `date` 필드와 범위 비교
- 복합 필터 지원 (검색어 + 날짜 범위 동시 적용)
- 필터 적용 후 페이지네이션도 필터링된 결과 기준으로 재계산

---

## 4. 비기능 요구사항 (Non-functional Requirements)

### NFR-001: 성능
- 1,000개 이하의 리포트 데이터 로드 시 2초 이내 렌더링 완료
- 검색/필터링 응답 시간 500ms 이내

### NFR-002: 사용성
- 테이블 행 호버 시 0.2초 이내 시각적 피드백 제공
- 모바일 환경에서는 테이블이 가로 스크롤 가능하도록 `.table-responsive` 적용

### NFR-003: 접근성
- 날짜 입력 필드에 `aria-label` 속성 추가하여 스크린 리더 지원
- 키보드 탐색 가능 (Tab, Enter 키로 행 선택)

### NFR-004: 호환성
- Chrome 90+, Safari 14+, Firefox 88+ 지원
- 반응형 디자인 (최소 320px 너비)

---

## 5. 데이터 모델 (Data Model)

### Report 객체 구조
```typescript
interface Report {
    id: string;           // 고유 식별자, 형식: "RPT-YYYY-XXXX"
    date: string;         // 발급 일시, 형식: "YYYY-MM-DD HH:MM"
    address: string;      // 매물 주소
    type: string;         // 건물 유형: "아파트" | "빌라" | "오피스텔"
    purpose: string;      // 리포트 목적: "매매" | "전세"
    payment: string;      // 결제 방식: "카드결제" | "계좌이체" 등
    status: string;       // 진행 상태: "완료" | "진행중" | "취소"
    
    // 상세 페이지용 추가 필드
    period?: string;      // 계약 기간
    deposit?: string;     // 보증금
    marketValue?: string; // 시세 추정가
    debt?: string;        // 등기부등본 융자
    available?: string;   // 보증 가입 가능 여유금액
    priority?: string;    // 최우선 변제금
}
```

### Mock 데이터 생성 로직
```javascript
const reportData = Array.from({ length: 15 }, (_, i) => ({
    id: `RPT-2023-${(1000 + i).toString()}`,
    date: `2023-12-${String(Math.max(1, 30 - i)).padStart(2, '0')} 14:30`,
    address: `서울시 강남구 테헤란로 ${100 + i}길 ${i + 1}`,
    type: i % 3 === 0 ? '아파트' : i % 3 === 1 ? '빌라' : '오피스텔',
    purpose: i % 2 === 0 ? '매매' : '전세',
    payment: '카드결제',
    status: ['완료', '진행중', '취소'][i % 3],
    // ...
}));
```

---

## 6. UI/UX 명세 (UI/UX Specifications)

### 6.1 레이아웃 구조
```
┌─────────────────────────────────────────┐
│ Sidebar (250px)    │ Main Content       │
│ ┌─────────────┐    │ ┌────────────────┐ │
│ │ Logo        │    │ │ Header         │ │
│ │ Navigation  │    │ │ Breadcrumbs    │ │
│ └─────────────┘    │ │ User Profile   │ │
│                    │ └────────────────┘ │
│                    │ ┌────────────────┐ │
│                    │ │ Page Header    │ │
│                    │ │ - Title        │ │
│                    │ │ - Subtitle     │ │
│                    │ └────────────────┘ │
│                    │ ┌────────────────┐ │
│                    │ │ Filters        │ │
│                    │ │ - Search       │ │
│                    │ │ - Date Range   │ │
│                    │ │ - Excel Btn    │ │
│                    │ └────────────────┘ │
│                    │ ┌────────────────┐ │
│                    │ │ Data Table     │ │
│                    │ │ (Dynamic Rows) │ │
│                    │ └────────────────┘ │
│                    │ ┌────────────────┐ │
│                    │ │ Pagination     │ │
│                    │ └────────────────┘ │
└─────────────────────────────────────────┘
```

### 6.2 컴포넌트 명세

#### 검색창 (`.search-box`)
- **위치:** 테이블 상단 좌측
- **너비:** 240px
- **Placeholder:** "리포트 번호"
- **스타일:**
  - Border: 1px solid `--border-color`
  - Border-radius: 6px
  - Padding: 8px 12px
  - Focus 시 border-color 변경 (`--accent-color`)

#### 날짜 범위 선택 (`.date-range-box`)
- **구성:** Date Input (시작) + Separator ("~") + Date Input (종료)
- **간격:** `gap: 8px`
- **Input 스타일:**
  - Font-size: 14px
  - Transition: border-color 0.2s

#### 테이블 (`.data-table`)
- **컬럼 순서:**
  1. 리포트 번호 (monospace 폰트, 굵기 500)
  2. 리포트 일시
  3. 주소
  4. 주용도
  5. 리포트 목적
  6. 결제 방식
  7. 진행현황 (배지)
- **행 상호작용:**
  - Hover: 배경색 `#f9fafb`
  - Cursor: pointer
  - Transition: background 0.2s

---

## 7. 사용자 플로우 (User Flow)

### 플로우 1: 리포트 검색 및 상세 조회
```
[관리자 로그인] 
    ↓
[리포트 발급 이력 페이지 진입]
    ↓
[검색창에 리포트 번호 입력]
    ↓
[검색 결과 확인]
    ↓
[원하는 리포트 행 클릭]
    ↓
[리포트 상세 페이지로 이동]
    ↓
[매물 요약 및 진단 항목 확인]
```

### 플로우 2: 월간 통계 추출
```
[리포트 발급 이력 페이지 진입]
    ↓
[날짜 범위: 2023-12-01 ~ 2023-12-31 설정]
    ↓
[필터링된 결과 확인]
    ↓
["엑셀 다운로드" 버튼 클릭]
    ↓
[.xlsx 파일 로컬 저장]
    ↓
[외부 분석 도구에서 데이터 활용]
```

---

## 8. 예외 처리 및 엣지 케이스 (Edge Cases)

### EC-001: 데이터 없음
**시나리오:** 필터 조건에 맞는 리포트가 없을 때  
**처리:** 테이블 본문에 "검색 결과가 없습니다" 메시지 표시 (`.empty-state`)

### EC-002: 잘못된 날짜 범위
**시나리오:** 시작일이 종료일보다 늦을 때  
**처리:** 날짜 입력 필드 하단에 빨간색 경고 메시지 표시 + 필터 적용 차단

### EC-003: 엑셀 다운로드 실패
**시나리오:** 네트워크 오류 또는 권한 문제  
**처리:** Alert 창으로 "다운로드에 실패했습니다. 다시 시도해주세요." 표시

### EC-004: 로딩 상태
**시나리오:** 데이터 fetch 중일 때  
**처리:** 테이블 영역에 로딩 스피너 표시 + "데이터를 불러오는 중..." 텍스트

---

## 9. 기술 스택 및 의존성 (Tech Stack)

### 프론트엔드
- **HTML5:** 시맨틱 마크업
- **CSS3:** CSS Variables, Flexbox, Grid
- **JavaScript (ES6+):** Vanilla JS, DOM Manipulation
- **폰트:** Inter, Noto Sans KR (Google Fonts)

### 스타일 시스템
- **CSS 파일:** `style.css` (전역 스타일)
- **CSS Variables:**
  - `--primary-color: #009720` (그린 계열)
  - `--border-color: #e5e7eb`
  - `--text-color: #1f2937`
  - 기타 색상 변수들

### 스크립트
- **파일:** `script.js`
- **주요 함수:**
  - `renderTable(data)`
  - `openReportDetail(id)`
  - `getStatusBadge(status)`

---

## 10. 향후 개선 사항 (Future Enhancements)

### Phase 2 기능
- [ ] 고급 필터 (매물 유형, 결제 방식 등 다중 선택)
- [ ] 정렬 기능 (컬럼 헤더 클릭 시 오름차순/내림차순)
- [ ] 대량 작업 (복수 리포트 선택 후 일괄 삭제/상태 변경)
- [ ] 실시간 알림 (새 리포트 발급 시 toast 메시지)

### Phase 3 기능
- [ ] 차트 대시보드 (일별/월별 발급 추이 그래프)
- [ ] CSV/PDF 다운로드 지원
- [ ] 리포트 재발급 기능
- [ ] 사용자 권한별 접근 제어

---

## 11. 용어 사전 (Glossary)

| 용어 | 설명 |
|------|------|
| 리포트 | 특정 매물에 대한 진단 결과 문서 |
| 진단 항목 | 위반건축물, 대지권 등 21개 체크리스트 |
| 매물 요약 | 계약 기간, 보증금 등 재정 정보 모음 |
| Badge | 상태를 시각적으로 표현하는 UI 컴포넌트 |
| Mock Data | 개발/테스트용 샘플 데이터 |
