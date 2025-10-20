# 졸업전시 프로젝트 (Graduate Exhibition)

## 프로젝트 개요
- **목적**: 졸업 전시용 프론트엔드 프로젝트
- **용도**: 전시/시연용 (실제 백엔드 연결 없음)
- **플랫폼**: 웹앱 (모바일 최적화)

## 기술 스택
- **프레임워크**: React 19.1.1
- **빌드 도구**: Vite 7.1.7
- **라우팅**: react-router-dom
- **스타일링**: Inline Styles (추후 필요시 CSS Modules/Styled-components)
- **언어**: JavaScript (JSX)

## 프로젝트 구조
```
src/
├── pages/              # 페이지 컴포넌트
│   ├── Login/         # 로그인 관련
│   ├── Home/          # 메인 홈
│   ├── Exhibition/    # 전시 목록/상세
│   ├── Artist/        # 작가 목록/상세
│   └── MyPage/        # 마이페이지
│
├── components/         # 재사용 컴포넌트
│   ├── common/        # 공통 컴포넌트 (BottomNav 등)
│   ├── layout/        # 레이아웃 컴포넌트
│   └── features/      # 기능별 컴포넌트
│
├── hooks/             # 커스텀 훅
├── services/          # API 호출 (Mock 데이터)
├── store/             # 상태 관리
├── utils/             # 유틸리티 함수
├── styles/            # 글로벌 스타일
└── assets/            # 정적 파일
```

## 디자인 시스템

### 색상 팔레트
- **Primary 50**: `#005CCC` - 활성화된 파란색
- **Primary Main 30**: `#3490FF` - 메인 파란색
- **Blue Light**: `#99C7FF` - 밝은 파란색
- **Gray 20**: `#CACDD4` - 비활성화 회색
- **Gray 30**: `#ADB2BD` - 중간 회색
- **Gray 10**: `#E6E7EA` - 연한 회색
- **Label Primary**: `#000000` - 검은색

### 주요 페이지
1. **홈** (`/home`) - 메인 화면
2. **포트폴리오/전시** (`/exhibition`) - 전시 목록 및 상세
3. **탐색/작가** (`/artist`) - 작가 목록 및 상세
4. **마이페이지** (`/mypage`) - 사용자 정보

## 웹앱 최적화
- 모바일 우선 반응형 디자인
- Viewport 설정 (최대 확대 방지)
- iOS Safari 100vh 버그 수정
- 터치 하이라이트 제거
- Pull-to-refresh 방지

## 주요 특징
- **전시용 프로젝트**: 실제 서버 연결 없음
- **Mock 데이터**: 하드코딩된 샘플 데이터 사용
- **모바일 웹앱**: 모바일 최적화된 UI/UX
- **하단 네비게이션**: 고정된 하단 메뉴바

## 개발 가이드

### 개발 서버 실행
```bash
npm run dev
```

### 빌드
```bash
npm run build
```

### 프리뷰
```bash
npm run preview
```

## 주의사항
- 백엔드 API 연결 없음 (전시용)
- 모든 데이터는 Mock/하드코딩
- 상태바, 홈 인디케이터는 디자인 참고용 (구현 불필요)
- 모바일 웹앱 기준으로 개발
