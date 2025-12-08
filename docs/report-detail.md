# PRD: 리포트 상세 조회 (Report Detail View)

**문서 버전:** 1.0  
**최종 수정일:** 2025-12-08  
**담당자:** 지킴진단 프로덕트팀  
**관련 파일:** `report-detail.html`, `script.js`, `style.css`

---

## 1. 제품 개요 (Product Overview)

### 1.1 목적 (Purpose)
특정 리포트의 상세 진단 결과, 매물 정보, 주변 안전/편의 데이터를 종합적으로 제공하여 관리자 및 고객이 부동산 거래 리스크를 정확히 파악할 수 있도록 지원합니다.

### 1.2 비즈니스 가치 (Business Value)
- 고객에게 제공되는 최종 리포트의 품질 검증
- 진단 항목별 상세 가이드 제공으로 고객 만족도 향상
- 범죄/치안, 생활/편의 정보 제공으로 차별화된 부가가치 창출
- 등기부등본 PDF 다운로드로 업무 효율성 증대

### 1.3 타겟 사용자 (Target Users)
- **주 사용자:** 지킴진단 관리자 (품질 검수, 고객 상담)
- **최종 수요자:** 부동산 거래를 준비하는 고객 (전세/매매)

---

## 2. 사용자 스토리 (User Stories)

### US-006: 매물 요약 정보 확인
**As a** 관리자  
**I want to** 매물의 핵심 재정 정보(보증금, 시세, 융자, 여유금액 등)를 한눈에 파악하고  
**So that** 고객 상담 시 정확한 정보를 제공할 수 있다

**수용 기준:**
- [ ] 7개 항목(발급일시, 계약기간, 보증금, 시세, 융자, 여유금액, 변제금)이 4열 그리드로 표시됨
- [ ] "보증 가입 가능 여유금액"은 Primary Color(녹색)로 강조됨
- [ ] 각 항목의 레이블과 값이 명확히 구분됨
- [ ] 금액은 쉼표(,) 구분자가 포함된 한국어 표기법 사용

### US-007: 진단 항목별 위험도 평가
**As a** 고객  
**I want to** 21개 진단 항목의 상태("양호" 또는 "확인 필요")와 상세 설명을 확인하고  
**So that** 어떤 부분이 리스크인지 명확히 이해할 수 있다

**수용 기준:**
- [ ] 각 진단 항목이 독립적인 카드 형태로 표시됨
- [ ] 상태 배지가 색상으로 구분됨 (양호=녹색, 확인필요=주황색)
- [ ] "확인 필요" 상태의 항목은 "특약 사항" 영역이 추가로 표시됨
- [ ] 특약 사항은 주황색 배경으로 시각적 강조
- [ ] 관리자 가이드 텍스트가 별도 섹션으로 제공됨

### US-008: 등기부등본 다운로드
**As a** 관리자  
**I want to** 건물 및 토지 등기부등본 PDF를 다운로드하고  
**So that** 고객에게 원본 문서를 제공하거나 심층 분석에 활용할 수 있다

**수용 기준:**
- [ ] "건물 등기부등본 PDF", "토지 등기부등본 PDF" 버튼이 매물 요약 하단에 배치됨
- [ ] 버튼 클릭 시 PDF 파일이 새 탭에서 열리거나 다운로드됨
- [ ] 파일명은 `{리포트ID}_건물등기부.pdf` 형식
- [ ] PDF가 존재하지 않을 경우 "준비 중입니다" 안내 메시지 표시

### US-009: 주변 범죄/치안 정보 확인
**As a** 고객  
**I want to** 매물 주변 500m 반경의 방범 시설, 안전 귀갓길, 범죄 발생 통계를 확인하고  
**So that** 거주 안전성을 종합적으로 판단할 수 있다

**수용 기준:**
- [ ] 4개의 안전 지표 카드가 그리드 형태로 표시됨
- [ ] 방범 시설 분포: CCTV, 비상벨, 경찰서, 소방서, 편의점 개수
- [ ] 안전 귀갓길: 경로 내 CCTV 및 비상벨 개수
- [ ] 유흥업소 수: 인근 3개 동네와의 비교 바 차트
- [ ] 범죄 발생 수: 인근 3개 구청과의 비교 바 차트

### US-010: 생활/편의 인프라 비교
**As a** 고객  
**I want to** 편의점, 병원, 카페 등 생활 인프라를 "내 동네"와 비교하고  
**So that** 거주 편의성을 객관적으로 평가할 수 있다

**수용 기준:**
- [ ] 6개 시설(편의점, 병원, 카페, 학교, 마트, 대중교통) 통계 제공
- [ ] Radar Chart를 통해 "이 동네" vs "내 동네(목동)" 시각적 비교
- [ ] 범례가 차트 하단에 표시됨
- [ ] 각 축의 라벨이 명확히 표시됨

---

## 3. 기능 요구사항 (Functional Requirements)

### FR-004: URL 파라미터 기반 데이터 로드
**우선순위:** P0 (Critical)  
**설명:** URL의 `id` 쿼리 파라미터를 읽어 해당 리포트 데이터를 렌더링합니다.

**세부 사항:**
- `URLSearchParams`를 사용하여 `id` 값 추출
- `reportData` 배열에서 일치하는 객체를 `find()` 메서드로 검색
- 데이터가 없을 경우 "리포트를 찾을 수 없습니다" 메시지 표시
- 페이지 헤더(`#reportIdHeader`)에 리포트 ID와 주소 표시

**기술 구현:**
```javascript
const urlParams = new URLSearchParams(window.location.search);
const reportId = urlParams.get('id');
if (reportId) {
    renderReportDetail(reportId);
}

function renderReportDetail(id) {
    const report = reportData.find(item => item.id === id);
    if (!report) {
        document.getElementById('reportDetailContent').innerHTML = 
            '<p>리포트를 찾을 수 없습니다.</p>';
        return;
    }
    // 렌더링 로직...
}
```

### FR-005: 동적 진단 항목 생성
**우선순위:** P0 (Critical)  
**설명:** 21개 체크리스트 항목을 순회하며 각각의 카드 UI를 동적으로 생성합니다.

**세부 사항:**
- `checklistItems.map()` 사용하여 HTML 문자열 배열 생성
- 각 항목의 상태를 `getMockStatusCheck(index)` 함수로 결정 (70% 양호, 30% 확인 필요)
- 상태에 따라 조건부 렌더링:
  - `status === 'check'`: 특약 사항 영역 추가
  - `status === 'good'`: "특이사항 없습니다" 기본 메시지
- 생성된 HTML을 `.checklist-grid` 컨테이너에 주입

### FR-006: 범죄/치안 데이터 시각화
**우선순위:** P1 (High)  
**설명:** 공공 데이터 기반으로 주변 안전 정보를 4개 카드로 구조화합니다.

**세부 사항:**
- **Card 1 - 방범 시설 분포:**
  - 지도 플레이스홀더 + 시설별 통계 리스트
  - 이모지 아이콘으로 시설 유형 시각화
- **Card 2 - 안전 귀갓길:**
  - 경로 지도 + 경로 내 안전 시설 수
- **Card 3 - 유흥업소 비교:**
  - 3개 동네 수평 바 차트
  - 현재 지역(성산동)은 녹색으로 강조
- **Card 4 - 범죄 발생 수:**
  - 3개 자치구 수직 바 차트
  - 현재 지역(마포구)은 녹색으로 강조

### FR-007: 생활/편의 Radar Chart 렌더링
**우선순위:** P1 (High)  
**설명:** SVG를 사용하여 6축 Radar Chart를 구현합니다.

**기술 구현:**
```html
<svg width="240" height="240" viewBox="0 0 200 200">
    <!-- 그리드 선 -->
    <polygon points="..." fill="none" stroke="#e2e8f0"/>
    
    <!-- 데이터 폴리곤 -->
    <polygon points="100,50 160,80 155,135 100,150 45,120 40,75" 
             fill="rgba(249, 115, 22, 0.2)" 
             stroke="#f97316" 
             stroke-width="2"/>
    
    <!-- 축 라벨 -->
    <text x="100" y="15" text-anchor="middle">편의점</text>
    <!-- ... 나머지 라벨 -->
</svg>
```

---

## 4. 비기능 요구사항 (Non-functional Requirements)

### NFR-005: 렌더링 성능
- 리포트 상세 페이지 첫 렌더링 시간 1.5초 이내
- Radar Chart SVG 렌더링 지연 없이 매끄럽게 표시

### NFR-006: 데이터 정확성
- 모든 금액 표기는 한국 원화 형식 (억/만원 단위 + 쉼표)
- 날짜/시간은 `YYYY-MM-DD HH:MM` 형식 고수

### NFR-007: 시각적 일관성
- 상태 배지 색상은 전역 CSS 변수 사용
  - 양호: `--status-success-bg`
  - 확인 필요: `--status-error-bg`
- 모든 카드는 동일한 border-radius(12px) 및 box-shadow 적용

### NFR-008: 반응형 디자인
- 매물 요약 그리드: 모바일에서 2열로 자동 조정
- 범죄/치안 및 생활/편의 그리드: 최소 320px 너비에서도 가독성 유지

---

## 5. 데이터 모델 (Data Model)

### 확장된 Report 객체
```typescript
interface ReportDetail extends Report {
    // 매물 요약 필드
    period: string;          // 계약 기간 (예: "24개월")
    deposit: string;         // 보증금 (예: "1억 5,000만원")
    marketValue: string;     // 시세 추정가 (예: "2억 5,620만원")
    debt: string;            // 등기부등본 융자 (예: "0원")
    available: string;       // 보증 가입 가능 여유금액
    priority: string;        // 최우선 변제금
    
    // PDF 문서 경로
    buildingPDF?: string;    // 건물 등기부등본 PDF URL
    landPDF?: string;        // 토지 등기부등본 PDF URL
    
    // 진단 결과 (실제 구현 시 필요)
    checklistResults?: ChecklistResult[];
}

interface ChecklistResult {
    itemName: string;        // 진단 항목명
    status: 'good' | 'check'; // 상태
    content: string;         // 상세 내용
    guide?: string;          // 관리자 가이드
    specialTerms?: string;   // 특약 사항 (status='check'일 때만)
}
```

### 범죄/치안 데이터 구조 (향후 API 연동)
```typescript
interface SafetyData {
    facilities: {
        cctv: number;
        emergencyBell: number;
        policeStation: number;
        fireStation: number;
        convenienceStore: number;
    };
    safeRoute: {
        cctvOnRoute: number;
        bellsOnRoute: number;
    };
    nightlife: {
        [neighborhoodName: string]: number;
    };
    crimeStats: {
        [districtName: string]: number;
    };
}
```

### 생활/편의 데이터 구조
```typescript
interface ConvenienceData {
    facilities: {
        convenienceStore: number;
        hospital: number;
        cafe: number;
        school: number;
        mart: number;
        publicTransport: number;
    };
    comparisonData: {
        thisTown: number[];  // 6개 축 점수
        myTown: number[];    // 비교 대상 동네의 6개 축 점수
    };
}
```

---

## 6. UI/UX 명세 (UI/UX Specifications)

### 6.1 페이지 레이아웃
```
┌──────────────────────────────────────────┐
│ Header (Breadcrumbs + User Profile)     │
├──────────────────────────────────────────┤
│ Page Title: 리포트 세부내용              │
│ Subtitle: 리포트 ID (주소)               │
│ [목록으로 돌아가기 버튼]                 │
├──────────────────────────────────────────┤
│ ┌────────────────────────────────────┐   │
│ │ 매물 요약 (4열 그리드)             │   │
│ │ - 발급일시 | 계약기간 | 보증금 | .. │   │
│ │ - 융자     | 여유금액 | 변제금     │   │
│ │                                    │   │
│ │ [건물 PDF] [토지 PDF]               │   │
│ └────────────────────────────────────┘   │
├──────────────────────────────────────────┤
│ 진단 항목 상세 (Grid)                    │
│ ┌────┐ ┌────┐ ┌────┐                     │
│ │항목│ │항목│ │항목│ ...                  │
│ └────┘ └────┘ └────┘                     │
├──────────────────────────────────────────┤
│ 범죄/치안                                │
│ ┌────┐ ┌────┐ ┌────┐ ┌────┐              │
│ │Card│ │Card│ │Card│ │Card│              │
│ └────┘ └────┘ └────┘ └────┘              │
├──────────────────────────────────────────┤
│ 생활/편의                                │
│ ┌────────┐ ┌──────────────┐              │
│ │시설통계│ │ Radar Chart  │              │
│ └────────┘ └──────────────┘              │
└──────────────────────────────────────────┘
```

### 6.2 진단 항목 카드 상세
```html
<div class="checklist-item">
    <div class="checklist-header">
        <label class="checklist-label">위반건축물</label>
        <span class="status-indicator good">양호</span>
    </div>
    
    <div class="detail-content-group">
        <span class="detail-title">상세 내용</span>
        <div class="detail-text">특이사항 없습니다.</div>
    </div>
    
    <div class="detail-content-group">
        <span class="detail-title">관리자 가이드</span>
        <div class="detail-text">가이드 내용이 여기에 표시됩니다.</div>
    </div>
    
    <!-- status='check'일 때만 렌더링 -->
    <div class="detail-content-group" style="border-top: dashed;">
        <span class="detail-title" style="color: orange;">특약 사항</span>
        <div class="detail-text" style="background: orange-light;">
            본 항목과 관련하여 임대차 계약서에 특약 사항을 필수로 기재해야 합니다.
        </div>
    </div>
</div>
```

### 6.3 인터랙션 명세

#### 뒤로가기 버튼
- **트리거:** 클릭
- **동작:** `location.href = 'index.html'` 실행
- **스타일:** `.btn.btn-outline` (회색 테두리)

#### PDF 다운로드 버튼
- **트리거:** 클릭
- **동작:**
  1. PDF URL 존재 여부 확인
  2. 존재: 새 탭에서 열기 (`window.open(pdfUrl, '_blank')`)
  3. 미존재: Alert 창 "PDF 준비 중입니다"
- **스타일:** `.btn.btn-outline` + 📄 이모지 아이콘

---

## 7. 사용자 플로우 (User Flow)

### 플로우 3: 리포트 검수 프로세스
```
[리포트 발급 이력에서 리포트 선택]
    ↓
[리포트 상세 페이지 로드]
    ↓
[매물 요약 정보 확인]
    ├─ 여유금액이 충분한가? → Yes: 다음 단계
    └─ 여유금액이 부족한가? → No: 고객에게 추가 검토 요청
    ↓
[21개 진단 항목 순회]
    ├─ "확인 필요" 항목 개수 파악
    └─ 특약 사항 내용 복사
    ↓
[범죄/치안 데이터 검토]
    ├─ CCTV 개수가 평균 이상인가?
    └─ 범죄 발생률은 양호한가?
    ↓
[생활/편의 비교]
    ├─ 고객이 요구한 인프라가 충족되는가?
    └─ Radar Chart로 한눈에 파악
    ↓
[최종 검수 완료 → 고객에게 리포트 전달]
```

---

## 8. 예외 처리 및 엣지 케이스 (Edge Cases)

### EC-005: 잘못된 리포트 ID
**시나리오:** URL에 존재하지 않는 ID가 포함된 경우 (`?id=INVALID`)  
**처리:**
1. `reportData.find()` 결과가 `undefined`
2. `#reportDetailContent`에 에러 메시지 표시
3. "목록으로 돌아가기" 버튼만 활성화 상태 유지

### EC-006: PDF 파일 404 오류
**시나리오:** 등기부등본 PDF 링크가 깨진 경우  
**처리:**
1. `fetch()` 또는 `<a>` 태그 클릭 시 404 확인
2. Alert 창 "파일을 찾을 수 없습니다. 관리자에게 문의하세요."
3. 에러 로그를 서버에 전송 (향후 구현)

### EC-007: SVG 렌더링 실패
**시나리오:** 브라우저가 SVG를 지원하지 않거나 오류 발생  
**처리:**
1. Radar Chart 영역에 Fallback 이미지 표시
2. "귀하의 브라우저에서는 차트를 표시할 수 없습니다" 안내 문구

### EC-008: 데이터 필드 누락
**시나리오:** `report.deposit`이 `undefined`인 경우  
**처리:**
1. Optional Chaining (`report.deposit ?? 'N/A'`) 사용
2. 누락된 필드는 회색 텍스트로 "정보 없음" 표시

---

## 9. 성능 최적화 (Performance Optimization)

### PO-001: HTML 문자열 최적화
- `Array.map().join('')` 사용하여 DOM 조작 최소화
- 21개 항목을 한 번의 `innerHTML` 할당으로 렌더링

### PO-002: 이미지 Lazy Loading
- 범죄/치안, 생활/편의 섹션이 뷰포트에 들어올 때 데이터 로드
- Intersection Observer API 활용

### PO-003: SVG 최적화
- Viewbox 사용으로 반응형 크기 조정
- 불필요한 path 단순화

---

## 10. 접근성 (Accessibility)

### A11Y-001: 시맨틱 HTML
- 각 섹션에 `<section>` 또는 `<article>` 태그 사용
- 섹션 제목은 `<h3>` 태그로 마크업

### A11Y-002: ARIA 속성
- PDF 다운로드 버튼에 `aria-label="건물 등기부등본 다운로드"` 추가
- 상태 배지에 `aria-label="상태: 양호"` 추가

### A11Y-003: 색상 대비
- WCAG AA 기준 준수 (최소 4.5:1)
- 양호(녹색)와 확인필요(주황색) 색상 대비 충분히 확보

---

## 11. 보안 고려사항 (Security)

### SEC-001: XSS 방지
- 사용자 입력 데이터는 없으나, 서버에서 받은 텍스트는 Sanitize 처리 필요
- `innerHTML` 사용 시 신뢰할 수 있는 데이터만 주입

### SEC-002: PDF 다운로드 권한
- PDF URL은 서버에서 서명된 토큰과 함께 제공
- 직접 URL 접근 시 403 Forbidden 반환

---

## 12. 향후 개선사항 (Future Enhancements)

### Phase 2
- [ ] 지도 API 연동 (카카오맵/네이버맵)으로 실제 위치 시각화
- [ ] 진단 항목별 상세 분석 팝업 (클릭 시 추가 정보 모달)
- [ ] 리포트 PDF 전체 다운로드 기능
- [ ] 리포트 공유 링크 생성 (유효기간 설정)

### Phase 3
- [ ] AI 기반 리스크 점수 산출 (0-100점)
- [ ] 비슷한 매물 추천 기능
- [ ] 리포트 버전 히스토리 (수정 이력 추적)
- [ ] 댓글/메모 기능 (관리자 간 협업)
