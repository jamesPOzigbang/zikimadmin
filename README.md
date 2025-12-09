# 지킴진단 Admin

Next.js 14와 shadcn/ui를 사용한 지킴진단 관리자 시스템입니다.

## 기술 스택

- **Framework**: Next.js 14 (App Router)
- **UI Library**: shadcn/ui
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Icons**: Lucide React

## 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 3. 빌드

```bash
npm run build
```

### 4. 프로덕션 실행

```bash
npm start
```

## 프로젝트 구조

```
zikimadmin/
├── app/
│   ├── (dashboard)/
│   │   ├── layout.tsx          # 대시보드 레이아웃
│   │   ├── page.tsx            # 리포트 발급 이력 페이지
│   │   ├── content-management/
│   │   │   └── page.tsx        # 컨텐츠 관리 페이지
│   │   └── reports/
│   │       └── [id]/
│   │           └── page.tsx    # 리포트 상세 페이지
│   ├── globals.css             # 전역 스타일
│   └── layout.tsx              # 루트 레이아웃
├── components/
│   ├── layout/
│   │   ├── sidebar.tsx         # 사이드바 컴포넌트
│   │   └── header.tsx          # 헤더 컴포넌트
│   └── ui/                     # shadcn/ui 컴포넌트
├── lib/
│   ├── utils.ts                # 유틸리티 함수
│   └── data.ts                 # Mock 데이터
└── public/                     # 정적 파일
```

## 주요 기능

### 1. 리포트 발급 이력
- 리포트 목록 조회
- 리포트 번호 검색
- 날짜 범위 필터링
- 엑셀 다운로드
- 리포트 상세 페이지 이동

### 2. 리포트 상세
- 매물 요약 정보
- 진단 항목 상세 (21개 체크리스트)
- 범죄/치안 정보
- 생활/편의 정보
- 등기부등본 PDF 다운로드

### 3. 컨텐츠 관리
- 리포트 타입별 컨텐츠 관리 (6가지 타입)
- 체크리스트 항목별 컨텐츠 관리
- 상태별(양호/확인 필요) 컨텐츠 관리
- 컨텐츠 타입별(안내/설명/특약) 관리
- 동적 필드 추가/삭제

## 환경 설정

### 로고 이미지

`public/logo.png` 파일을 추가해주세요. 현재는 기본 이미지로 대체되어 있습니다.

## 개발 가이드

### 컴포넌트 추가

shadcn/ui 컴포넌트를 추가하려면:

```bash
npx shadcn-ui@latest add [component-name]
```

### 스타일 커스터마이징

`tailwind.config.ts`에서 테마를 수정할 수 있습니다.
`app/globals.css`에서 CSS 변수를 수정하여 색상을 변경할 수 있습니다.

## 참고 자료

- [Next.js 문서](https://nextjs.org/docs)
- [shadcn/ui 문서](https://ui.shadcn.com)
- [Tailwind CSS 문서](https://tailwindcss.com/docs)

