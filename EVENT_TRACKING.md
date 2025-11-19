# 이벤트 추적 가이드 (Event Tracking Guide)

## 개요

이 문서는 졸업 전시 웹앱의 사용자 행동 데이터를 수집하기 위한 웹소켓 이벤트 추적 가이드입니다.

### 목적
- 두 가지 미션의 사용자 완료 경로 분석
- 각 단계별 소요 시간 및 사용자 행동 패턴 파악
- 미션 난이도 및 사용자 경험 개선을 위한 데이터 수집

### 추적 대상 미션
1. **포트폴리오 제작 미션** (`portfolio`)
2. **ETF 용어카드 열람 미션** (`vocabulary`)

---

## 미션 플로우

### 공통 시작 플로우

모든 미션은 동일한 시작 플로우를 거칩니다.

| 단계 | 페이지명 | URL | 화면 설명 | 버튼/액션 | 다음 단계 |
|-----|---------|-----|----------|----------|----------|
| 0 | Splash | `/` | 스플래시 화면 | 화면 탭/자동 이동 (2초) | `/onboarding` |
| 1 | Onboarding | `/onboarding` | 온보딩 안내 (FAQ 3개) | "다음으로" 버튼 클릭 | `/mission-selection` |
| 2 | Mission Selection | `/mission-selection` | 미션 선택 화면<br/>- 포트폴리오 제작<br/>- ETF 용어카드 열람 | 1) 미션 카드 클릭<br/>2) "다음으로" 버튼 클릭 | `/mission-start` |
| 3 | Mission Start | `/mission-start` | 미션 시작 안내<br/>- 선택한 미션 표시<br/>- 미션 설명 | "바로 시작" 버튼 클릭 | `/home` |
| 4 | Home | `/home` | 홈 화면<br/>**QuitButton 표시 시작** | 하단 네비게이션으로 이동 | 미션별 경로 분기 |

**중요**: Step 4부터 화면 상단에 **QuitButton** (포기하기 버튼)이 표시되며, 하단에 "○○ 미션 중" 텍스트가 고정 표시됩니다.

---

### 미션 1: 포트폴리오 제작 미션 플로우

**예상 소요 시간**: 60-90초
**화면 전환 횟수**: 11회
**최소 클릭 횟수**: 10회
**필수 입력**: 1회 (포트폴리오 이름)

#### 전체 플로우 개요
```
홈 → 포트폴리오 탭 → 새 포트폴리오 만들기 → 제작 방식 선택 →
자동 제작 Step 1-5 → 미션 완료 모달 → 난이도 평가 → 완료
```

#### 상세 단계

| 단계 | 페이지명 | URL | 진행도 | 화면 설명 | 버튼/액션 | 선택/입력 데이터 | 다음 단계 |
|-----|---------|-----|-------|----------|----------|---------------|----------|
| 5 | Home | `/home` | - | 홈 화면 | 하단 네비게이션<br/>"포트폴리오" 탭 클릭 | - | `/portfolio` |
| 6 | Portfolio List | `/portfolio` | - | 포트폴리오 목록 화면 | "새 포트폴리오 만들기"<br/>버튼 클릭 | - | `/portfolio/create` |
| 7 | Portfolio Create Entry | `/portfolio/create` | - | 제작 안내 화면 | "시작하기" 버튼 클릭 | - | `/portfolio/create/method` |
| 8 | Method Selection | `/portfolio/create/method` | - | 제작 방식 선택<br/>- 자동 제작하기<br/>- 직접 제작하기 | 1) "자동 제작하기" 카드 클릭<br/>2) "시작하기" 버튼 클릭 | `method: 'auto'` | `/portfolio/create/auto` |
| 9 | Auto Create Step 1 | `/portfolio/create/auto` | 1/5 | **손실 유형 선택**<br/>- 공격형<br/>- 중립형<br/>- 안정형 | 1) 유형 카드 클릭<br/>2) "선택하기" 버튼 클릭 | `riskType: 'aggressive' | 'neutral' | 'stable'` | `/portfolio/create/auto/step2` |
| 10 | Auto Create Step 2 | `/portfolio/create/auto/step2` | 2/5 | **투자 스타일 선택**<br/>- 매달 안심 용돈<br/>- 글로벌 탐험가<br/>- 스마트 절세 | 1) 스타일 카드 클릭<br/>2) "선택하기" 버튼 클릭 | `style: 'monthly' | 'global' | 'tax'` | `/portfolio/create/auto/step3` |
| 11 | Auto Create Step 3 | `/portfolio/create/auto/step3` | 3/5 | **ETF 비중 조정**<br/>- ETF 5개 목록 (기본 20%씩)<br/>- 합계 100% 필수 | 1) 비중 박스 클릭/입력 (선택)<br/>2) "완료하기" 버튼 클릭 | `portfolioItems: Array<{id, targetWeight}>` | `/portfolio/create/auto/step4` |
| 12 | Auto Create Step 4 | `/portfolio/create/auto/step4` | 4/5 | **포트폴리오 이름 입력**<br/>- 최소 3자 이상 필수 | 1) 이름 입력 (TextField)<br/>2) "ETF 선택하기" 버튼 클릭 | `portfolioName: string (min 3자)` | `/portfolio/create/auto/step5` |
| 13 | Auto Create Step 5 | `/portfolio/create/auto/step5` | 5/5 | **목표 수익률 선택**<br/>- 휠/스와이프로 1-100% 선택<br/>- 기본값: 6% | 1) 휠 스크롤 (선택)<br/>2) "완료하기" 버튼 클릭 | `targetProfitPercentage: number (1-100)` | 미션 완료 모달 |
| 14 | Mission Complete Modal | (모달) | - | "미션을 달성했어요!" | "다음으로" 버튼 클릭 | - | `/mission-rating` |
| 15 | Mission Rating | `/mission-rating` | - | 난이도 평가<br/>- 별점 1-5점<br/>- 피드백 입력 (선택) | 1) 별점 클릭<br/>2) 피드백 입력 (선택)<br/>3) "완료하기" 버튼 클릭 | `rating: 1-5`<br/>`feedback: string (optional)` | `/mission-complete` |
| 16 | Mission Complete | `/mission-complete` | - | 완료 메시지 | "미션 완료" 버튼 클릭 | - | `/` (스플래시) |

**LocalStorage 저장 시점**: Step 13에서 "완료하기" 버튼 클릭 시
- `localStorage['portfolios']`: 포트폴리오 정보 추가
- `localStorage['portfolio_etfs_${portfolioId}']`: ETF 목록 저장
- `localStorage['portfolioOrder']`: 포트폴리오 순서 업데이트

---

### 미션 2: ETF 용어카드 열람 미션 플로우

이 미션은 **3가지 다른 경로**로 완료할 수 있습니다. 모든 경로는 동일한 완료 조건(3초 카운트다운)을 사용합니다.

---

#### 경로 1: Vocabulary 페이지 (공식 경로)

**예상 소요 시간**: 15-20초
**화면 전환 횟수**: 3회
**최소 클릭 횟수**: 3회
**필수 입력**: 0회
**필수 대기 시간**: 3초 (카운트다운)

##### 전체 플로우 개요
```
홈 → 마이페이지 탭 → 용어 백과 → 용어카드 클릭 → 3초 대기 →
미션 완료 모달 → 난이도 평가 → 완료
```

##### 상세 단계

| 단계 | 페이지명 | URL | 화면 설명 | 버튼/액션 | 선택/입력 데이터 | 특수 로직 | 다음 단계 |
|-----|---------|-----|----------|----------|---------------|----------|----------|
| 5 | Home | `/home` | 홈 화면 | 하단 네비게이션<br/>"마이" 탭 클릭 | - | - | `/mypage` |
| 6 | My Page | `/mypage` | 마이페이지<br/>메뉴 목록 | "용어 백과" 메뉴 클릭 | - | - | `/vocabulary` |
| 7 | Vocabulary | `/vocabulary` | 용어 백과<br/>- 활성화된 카드 10개<br/>- 비활성화된 카드 11개<br/>- 총 21개 카드 | 활성화된 용어카드 클릭<br/>(아무거나) | `card: {id, title, description}` | - | 용어 상세 모달 |
| 8 | Vocabulary Detail Modal | (모달) | 용어 상세 정보<br/>- 아이콘<br/>- 제목<br/>- 설명 | 모달 표시 후<br/>**자동 진행** | - | **3초 카운트다운 시작**<br/>3 → 2 → 1 → 0<br/>(하단에 "미션 완료까지 Ns..." 표시) | 미션 완료 모달 |
| 9 | Mission Complete Modal | (모달) | "미션을 달성했어요!" | "다음으로" 버튼 클릭 | - | 카운트다운 완료 시<br/>자동 표시 | `/mission-rating` |
| 10 | Mission Rating | `/mission-rating` | 난이도 평가<br/>- 별점 1-5점<br/>- 피드백 입력 (선택) | 1) 별점 클릭<br/>2) 피드백 입력 (선택)<br/>3) "완료하기" 버튼 클릭 | `rating: 1-5`<br/>`feedback: string (optional)` | - | `/mission-complete` |
| 11 | Mission Complete | `/mission-complete` | 완료 메시지 | "미션 완료" 버튼 클릭 | - | - | `/` (스플래시) |

**코드 위치**: `src/pages/Vocabulary/index.jsx` (Line 321-342)

---

#### 경로 2: Search 탐색 탭 ⚡ **가장 빠른 경로**

**예상 소요 시간**: 10-15초
**화면 전환 횟수**: 2회
**최소 클릭 횟수**: 2회
**필수 입력**: 0회
**필수 대기 시간**: 3초 (카운트다운)

##### 전체 플로우 개요
```
홈 → 탐색 탭 → 큰 용어카드 클릭 → 3초 대기 →
미션 완료 모달 → 난이도 평가 → 완료
```

##### 상세 단계

| 단계 | 페이지명 | URL | 화면 설명 | 버튼/액션 | 선택/입력 데이터 | 특수 로직 | 다음 단계 |
|-----|---------|-----|----------|----------|---------------|----------|----------|
| 5 | Home | `/home` | 홈 화면 | 하단 네비게이션<br/>"탐색" 탭 클릭 | - | - | `/search` |
| 6 | Search | `/search` | 탐색 페이지<br/>- 큰 용어카드 20개<br/>- 스크롤하여 선택 | 큰 용어카드 이미지 클릭<br/>(20개 중 아무거나) | `term: {id, title, description, icon}` | - | 용어 모달 |
| 7 | Term Modal | (모달) | 용어 이미지 모달<br/>- 큰 아이콘<br/>- 제목<br/>- 설명 | 모달 표시 후<br/>**자동 진행** | - | **3초 카운트다운 시작**<br/>3 → 2 → 1 → 0<br/>(하단에 "미션 완료까지 Ns..." 표시) | 미션 완료 모달 |
| 8 | Mission Complete Modal | (모달) | "미션을 달성했어요!" | "다음으로" 버튼 클릭 | - | 카운트다운 완료 시<br/>자동 표시 | `/mission-rating` |
| 9 | Mission Rating | `/mission-rating` | 난이도 평가<br/>- 별점 1-5점<br/>- 피드백 입력 (선택) | 1) 별점 클릭<br/>2) 피드백 입력 (선택)<br/>3) "완료하기" 버튼 클릭 | `rating: 1-5`<br/>`feedback: string (optional)` | - | `/mission-complete` |
| 10 | Mission Complete | `/mission-complete` | 완료 메시지 | "미션 완료" 버튼 클릭 | - | - | `/` (스플래시) |

**코드 위치**: `src/pages/Search/index.jsx` (Line 349-371)

**특이사항**:
- `largeVocabularyData` 배열에서 20개의 큰 용어카드 제공
- 검색창 활성화 후 "TIP/용어" 탭에서도 접근 가능

---

#### 경로 3: ETF Detail 페이지

**예상 소요 시간**: 15-20초
**화면 전환 횟수**: 3회
**최소 클릭 횟수**: 3회
**필수 입력**: 0회
**필수 대기 시간**: 3초 (카운트다운)

##### 전체 플로우 개요
```
홈 → 탐색 탭 → ETF 선택 → ETF 상세 → 정보(ⓘ) 아이콘 클릭 → 3초 대기 →
미션 완료 모달 → 난이도 평가 → 완료
```

##### 상세 단계

| 단계 | 페이지명 | URL | 화면 설명 | 버튼/액션 | 선택/입력 데이터 | 특수 로직 | 다음 단계 |
|-----|---------|-----|----------|----------|---------------|----------|----------|
| 5 | Home | `/home` | 홈 화면 | 하단 네비게이션<br/>"탐색" 또는 "리스트" 탭 클릭 | - | - | `/search` 또는 `/portfolio` |
| 6 | Search | `/search` | 탐색 페이지 | ETF 아이템 클릭 | `etfId: string` | - | `/etf/:id/detail` |
| 7 | ETF Detail | `/etf/:id/detail` | ETF 상세 정보<br/>- 현재가, 기준가, 순자산, 거래량 카드 | 정보 카드의 "ⓘ" 아이콘 클릭<br/>(4개 중 택 1) | `termId: string`<br/>- `termCurrentPrice`<br/>- `termNav`<br/>- `termAssets`<br/>- `termVolume` | - | 용어 모달 |
| 8 | Term Modal | (모달) | 용어 이미지 모달<br/>- 아이콘<br/>- 제목<br/>- 설명 | 모달 표시 후<br/>**자동 진행** | - | **3초 카운트다운 시작**<br/>3 → 2 → 1 → 0<br/>(하단에 "미션 완료까지 Ns..." 표시) | 미션 완료 모달 |
| 9 | Mission Complete Modal | (모달) | "미션을 달성했어요!" | "다음으로" 버튼 클릭 | - | 카운트다운 완료 시<br/>자동 표시 | `/mission-rating` |
| 10 | Mission Rating | `/mission-rating` | 난이도 평가<br/>- 별점 1-5점<br/>- 피드백 입력 (선택) | 1) 별점 클릭<br/>2) 피드백 입력 (선택)<br/>3) "완료하기" 버튼 클릭 | `rating: 1-5`<br/>`feedback: string (optional)` | - | `/mission-complete` |
| 11 | Mission Complete | `/mission-complete` | 완료 메시지 | "미션 완료" 버튼 클릭 | - | - | `/` (스플래시) |

**코드 위치**: `src/pages/ETFDetail/index.jsx` (Line 169-190, 383-420)

**클릭 가능한 정보 아이콘**:
1. 현재가 카드 (Line 383-395)
2. 기준가(iNAV) 카드 (Line 394)
3. 순자산 규모 카드 (Line 412)
4. 거래량 카드 (Line 420)

---

#### 경로별 비교 요약

| 구분 | 경로 1 (Vocabulary) | 경로 2 (Search) ⚡ | 경로 3 (ETFDetail) |
|------|-------------------|------------------|-------------------|
| 시작점 | MyPage | Search | Search/Portfolio |
| 화면 전환 | 3회 | 2회 | 3회 |
| 최소 클릭 | 3회 | 2회 | 3회 |
| 예상 시간 | 15-20초 | 10-15초 | 15-20초 |
| 클릭 대상 | 용어카드 (10개) | 큰 용어카드 (20개) | 정보 아이콘 (4개) |
| 모달 타입 | VocabularyDetailModal | TermModal | TermModal |
| 발견 난이도 | 쉬움 (공식) | 쉬움 | 중간 (탐색 필요) |
| 권장 | 공식 권장 경로 | **가장 빠름** | 숨은 경로 |

---

#### 공통 미션 완료 로직

모든 경로는 동일한 미션 완료 트리거를 사용합니다:

```javascript
// 1. 미션 활성화 체크
if (isActiveMission('vocabulary')) {
  // 2. 카운트다운 시작
  setCountdown(3);

  let count = 3;
  const intervalId = setInterval(() => {
    count -= 1;
    setCountdown(count);

    // 3. 카운트다운 0 도달 시 미션 완료 모달 표시
    if (count === 0) {
      clearInterval(intervalId);
      setShowMissionModal(true);
    }
  }, 1000);
}
```

**중요**: 어떤 경로를 선택하든, 용어 모달이 표시되고 `isActiveMission('vocabulary')`가 true이면 자동으로 3초 카운트다운이 시작됩니다. 카운트다운이 0이 되면 미션 완료 모달이 자동으로 표시됩니다.

---

### 미션 포기 플로우 (공통)

미션 진행 중 언제든지 상단의 QuitButton을 통해 포기할 수 있습니다.

| 단계 | 페이지명 | URL | 화면 설명 | 버튼/액션 | 다음 단계 |
|-----|---------|-----|----------|----------|----------|
| - | QuitButton (상단 고정) | (현재 페이지) | X 버튼 (원형) | 클릭 → "포기하기" 버튼으로 확장 | - |
| - | QuitButton (확장) | (현재 페이지) | "포기하기" 텍스트 버튼 | 클릭 | `/mission-quit` |
| 1 | Mission Quit | `/mission-quit` | 포기 확인 페이지<br/>- 피드백 입력 (선택) | 1) 피드백 입력 (선택)<br/>2) "완료하기" 버튼 클릭 | `/mission-complete` |
| 2 | Mission Complete | `/mission-complete` | 완료 메시지 | "미션 완료" 버튼 클릭 | `/` (스플래시) |

---

## 전체 사용자 인터랙션 추적

### 추적 범위

이 프로젝트는 **미션 관련 이벤트뿐만 아니라 모든 사용자 인터랙션을 추적**합니다. 이를 통해 미션과 관련 없는 사용자 행동 패턴도 분석할 수 있습니다.

**추적 이벤트 분류**:
1. **미션 관련 이벤트** (`isMissionRelevant: true`) - 미션 완료/포기와 직접 관련된 이벤트
2. **일반 사용자 인터랙션** (`isMissionRelevant: false`) - 미션과 무관한 모든 사용자 행동

### 일반 인터랙션 이벤트 타입

#### 1. 버튼 클릭 (`button_clicked`)

**발생 시점**: 모든 버튼 클릭 시 (Button 컴포넌트 사용)

```json
{
  "eventType": "button_clicked",
  "timestamp": "2025-01-19T10:30:00.000Z",
  "sessionId": "uuid-v4",
  "data": {
    "buttonText": "바로 시작",
    "variant": "primary",
    "page": "/mission-start",
    "isMissionRelevant": true
  }
}
```

**data 필드**:
- `buttonText` (string): 버튼 텍스트 내용
- `variant` (string): 버튼 스타일 (primary, grey, skeleton, skeleton2)
- `page` (string): 클릭이 발생한 페이지 URL
- `isMissionRelevant` (boolean): 미션 진행과 관련된 버튼인지 여부

#### 2. 네비게이션 클릭 (`navigation_clicked`)

**발생 시점**: 하단 네비게이션 탭 또는 상단 뒤로가기 버튼 클릭 시

```json
{
  "eventType": "navigation_clicked",
  "timestamp": "2025-01-19T10:30:00.000Z",
  "sessionId": "uuid-v4",
  "data": {
    "navType": "bottom_nav",
    "from": "/home",
    "to": "/portfolio",
    "tabName": "포트폴리오",
    "isMissionRelevant": false
  }
}
```

**data 필드**:
- `navType` (string): 네비게이션 타입 (bottom_nav, top_nav_back)
- `from` (string): 이전 페이지 URL
- `to` (string): 이동할 페이지 URL
- `tabName` (string): 탭 이름 (하단 네비게이션인 경우)
- `isMissionRelevant` (boolean): 미션 진행과 관련된 네비게이션인지 여부

#### 3. 입력 상호작용 (`input_interaction`)

**발생 시점**: 입력 필드에 포커스, 블러, 값 변경 시

```json
{
  "eventType": "input_interaction",
  "timestamp": "2025-01-19T10:30:00.000Z",
  "sessionId": "uuid-v4",
  "data": {
    "inputId": "portfolio-name",
    "action": "change",
    "inputLength": 10,
    "page": "/portfolio/create/auto/step4",
    "isMissionRelevant": true
  }
}
```

**data 필드**:
- `inputId` (string): 입력 필드 식별자
- `action` (string): 액션 타입 (focus, blur, change)
- `inputLength` (number): 입력된 텍스트 길이 (change 액션일 때만)
- `page` (string): 입력이 발생한 페이지 URL
- `isMissionRelevant` (boolean): 미션 진행과 관련된 입력인지 여부

#### 4. 카드 클릭 (`card_clicked`)

**발생 시점**: 포트폴리오, ETF, 용어, 테마 카드 클릭 시

```json
{
  "eventType": "card_clicked",
  "timestamp": "2025-01-19T10:30:00.000Z",
  "sessionId": "uuid-v4",
  "data": {
    "cardType": "portfolio",
    "cardId": "portfolio-123",
    "cardTitle": "나의 첫 포트폴리오",
    "page": "/portfolio",
    "isMissionRelevant": false
  }
}
```

**data 필드**:
- `cardType` (string): 카드 타입 (portfolio, etf, vocabulary, theme, news, selection)
- `cardId` (string): 카드 ID
- `cardTitle` (string): 카드 제목
- `page` (string): 클릭이 발생한 페이지 URL
- `isMissionRelevant` (boolean): 미션 진행과 관련된 카드인지 여부

#### 5. 모달 인터랙션 (`modal_interaction`)

**발생 시점**: 모달 열기/닫기 시

```json
{
  "eventType": "modal_interaction",
  "timestamp": "2025-01-19T10:30:00.000Z",
  "sessionId": "uuid-v4",
  "data": {
    "modalType": "vocabulary_detail",
    "action": "open",
    "modalId": "vocabulary-card-1",
    "page": "/vocabulary",
    "isMissionRelevant": true
  }
}
```

**data 필드**:
- `modalType` (string): 모달 타입 (vocabulary_detail, mission_complete, term, portfolio_delete, etc)
- `action` (string): 액션 타입 (open, close)
- `modalId` (string): 모달 식별자
- `page` (string): 모달이 열린 페이지 URL
- `isMissionRelevant` (boolean): 미션 진행과 관련된 모달인지 여부

#### 6. 검색 (`search_performed`)

**발생 시점**: 검색 수행 시

```json
{
  "eventType": "search_performed",
  "timestamp": "2025-01-19T10:30:00.000Z",
  "sessionId": "uuid-v4",
  "data": {
    "searchQuery": "TIGER",
    "queryLength": 5,
    "resultCount": 12,
    "page": "/search",
    "isMissionRelevant": false
  }
}
```

**data 필드**:
- `searchQuery` (string): 검색어
- `queryLength` (number): 검색어 길이
- `resultCount` (number): 검색 결과 개수
- `page` (string): 검색이 발생한 페이지 URL
- `isMissionRelevant` (boolean): 미션 진행과 관련된 검색인지 여부

#### 7. 북마크 토글 (`bookmark_toggled`)

**발생 시점**: 북마크 추가/제거 시

```json
{
  "eventType": "bookmark_toggled",
  "timestamp": "2025-01-19T10:30:00.000Z",
  "sessionId": "uuid-v4",
  "data": {
    "itemType": "portfolio",
    "itemId": "portfolio-123",
    "action": "add",
    "page": "/portfolio/123/detail",
    "isMissionRelevant": false
  }
}
```

**data 필드**:
- `itemType` (string): 북마크 대상 타입 (portfolio, etf, tip)
- `itemId` (string): 북마크 대상 ID
- `action` (string): 액션 타입 (add, remove)
- `page` (string): 북마크 토글이 발생한 페이지 URL
- `isMissionRelevant` (boolean): 미션 진행과 관련된 북마크인지 여부

### isMissionRelevant 필드

모든 이벤트 데이터에는 `isMissionRelevant` 필드가 포함됩니다:

- **`true`**: 미션 완료/포기와 직접 관련된 이벤트
  - 예: 포트폴리오 생성 단계 버튼 클릭, 용어카드 클릭 (vocabulary 미션 중), QuitButton 클릭

- **`false`**: 일반 사용자 행동 추적 이벤트
  - 예: 북마크 버튼 클릭, 일반 네비게이션, 미션 외 검색

이 필드를 통해 백엔드에서 미션 관련 이벤트만 필터링하거나, 전체 사용자 행동 패턴을 분석할 수 있습니다.

---

## 이벤트 타입 정의

웹소켓으로 전송할 이벤트는 다음과 같이 분류됩니다.

### 미션 관련 이벤트 (isMissionRelevant: true)

| 이벤트 타입 | 설명 | 발생 시점 |
|-----------|------|----------|
| `mission_started` | 미션 시작 | Mission Selection에서 미션 선택 후 "다음으로" 클릭 시 |
| `page_view` | 페이지 진입 | 모든 페이지 전환 시 |
| `portfolio_creation_step` | 포트폴리오 제작 단계 완료 | 각 Step에서 다음 버튼 클릭 시 |
| `portfolio_created` | 포트폴리오 저장 완료 | Step 5 완료 후 localStorage 저장 시 |
| `vocabulary_card_clicked` | 용어카드 클릭 | Vocabulary 페이지에서 카드 클릭 시 |
| `vocabulary_detail_viewed` | 용어 상세 모달 표시 | 용어 상세 모달이 열릴 때 |
| `vocabulary_countdown_tick` | 카운트다운 틱 | 3초 카운트다운 중 매 초마다 |
| `vocabulary_countdown_complete` | 카운트다운 완료 | 3초 카운트다운 완료 시 |
| `mission_complete_modal_shown` | 미션 완료 모달 표시 | 미션 완료 조건 충족 시 |
| `mission_rating_submitted` | 난이도 평가 제출 | Mission Rating 페이지에서 "완료하기" 클릭 시 |
| `mission_completed` | 미션 완료 | Mission Complete 페이지에서 "미션 완료" 클릭 시 |
| `mission_quitted` | 미션 포기 | Mission Quit 페이지에서 "완료하기" 클릭 시 |

### 일반 인터랙션 이벤트 (isMissionRelevant: false)

| 이벤트 타입 | 설명 | 발생 시점 |
|-----------|------|----------|
| `button_clicked` | 모든 버튼 클릭 | 모든 Button 컴포넌트 클릭 시 |
| `navigation_clicked` | 네비게이션 클릭 | 하단 네비게이션 탭 또는 상단 뒤로가기 버튼 클릭 시 |
| `input_interaction` | 입력 필드 상호작용 | 입력 필드 포커스, 블러, 값 변경 시 |
| `card_clicked` | 카드 클릭 | 포트폴리오/ETF/용어/테마 카드 클릭 시 |
| `modal_interaction` | 모달 인터랙션 | 모달 열기/닫기 시 |
| `search_performed` | 검색 수행 | 검색 실행 시 |
| `bookmark_toggled` | 북마크 토글 | 북마크 추가/제거 시 |

**참고**: `page_view` 이벤트는 미션 관련/일반 구분 없이 모든 페이지 전환에서 발생하며, `isMissionRelevant` 값은 현재 활성화된 미션 여부에 따라 동적으로 설정됩니다.

---

## 추적 데이터 상세

### 공통 데이터 (모든 이벤트에 포함)

```javascript
{
  "eventType": string,           // 이벤트 타입
  "timestamp": string,            // ISO 8601 형식 (예: "2025-01-19T10:30:00.000Z")
  "sessionId": string,            // UUID v4 세션 ID
  "data": object                  // 이벤트별 데이터
}
```

### 1. 미션 시작 (`mission_started`)

**발생 시점**: MissionSelection 페이지에서 미션 선택 후 "다음으로" 클릭 시

```json
{
  "eventType": "mission_started",
  "timestamp": "2025-01-19T10:30:00.000Z",
  "sessionId": "uuid-v4",
  "data": {
    "missionId": "portfolio",                    // 'portfolio' | 'vocabulary'
    "missionName": "포트폴리오 제작 미션"          // 미션 표시명
  }
}
```

### 2. 페이지 진입 (`page_view`)

**발생 시점**: 모든 페이지 전환 시 (React Router의 useEffect 활용)

```json
{
  "eventType": "page_view",
  "timestamp": "2025-01-19T10:30:05.123Z",
  "sessionId": "uuid-v4",
  "data": {
    "url": "/portfolio/create/auto",            // 현재 URL
    "pageName": "AutoCreate Step 1",            // 페이지 이름
    "referrer": "/portfolio/create/method",     // 이전 페이지 URL
    "timeOnPreviousPage": 5.123                 // 이전 페이지 체류 시간 (초)
  }
}
```

### 3. 포트폴리오 제작 단계 (`portfolio_creation_step`)

**발생 시점**: 각 Step에서 "선택하기" 또는 "완료하기" 버튼 클릭 시

#### Step 1: 손실 유형 선택
```json
{
  "eventType": "portfolio_creation_step",
  "timestamp": "2025-01-19T10:30:15.456Z",
  "sessionId": "uuid-v4",
  "data": {
    "step": 1,
    "stepName": "risk_type_selection",
    "selectedValue": "neutral",                 // 'aggressive' | 'neutral' | 'stable'
    "selectedLabel": "중립형",                   // '공격형' | '중립형' | '안정형'
    "timeOnStep": 10.333                        // Step 진입 후 선택까지 걸린 시간 (초)
  }
}
```

#### Step 2: 투자 스타일 선택
```json
{
  "eventType": "portfolio_creation_step",
  "timestamp": "2025-01-19T10:30:25.789Z",
  "sessionId": "uuid-v4",
  "data": {
    "step": 2,
    "stepName": "style_selection",
    "selectedValue": "global",                  // 'monthly' | 'global' | 'tax'
    "selectedLabel": "글로벌 탐험가",             // '매달 안심 용돈' | '글로벌 탐험가' | '스마트 절세'
    "timeOnStep": 8.567
  }
}
```

#### Step 3: ETF 비중 조정
```json
{
  "eventType": "portfolio_creation_step",
  "timestamp": "2025-01-19T10:31:45.123Z",
  "sessionId": "uuid-v4",
  "data": {
    "step": 3,
    "stepName": "weight_adjustment",
    "portfolioItems": [
      {
        "etfId": "ETF001",
        "etfName": "TIGER 미국S&P500",
        "initialWeight": 20,                    // 초기 비중 (%)
        "finalWeight": 25,                      // 최종 비중 (%)
        "wasAdjusted": true                     // 조정 여부
      },
      {
        "etfId": "ETF002",
        "etfName": "KODEX 200",
        "initialWeight": 20,
        "finalWeight": 20,
        "wasAdjusted": false
      }
      // ... 총 5개
    ],
    "totalWeight": 100,                         // 최종 합계 (항상 100)
    "adjustmentCount": 3,                       // 비중 변경 횟수
    "timeOnStep": 35.456
  }
}
```

#### Step 4: 포트폴리오 이름 입력
```json
{
  "eventType": "portfolio_creation_step",
  "timestamp": "2025-01-19T10:32:30.456Z",
  "sessionId": "uuid-v4",
  "data": {
    "step": 4,
    "stepName": "portfolio_naming",
    "portfolioName": "나의 첫 포트폴리오",       // 입력된 이름
    "nameLength": 10,                           // 이름 길이
    "inputTime": 12.789,                        // 입력 시작부터 완료까지 시간
    "timeOnStep": 15.234
  }
}
```

#### Step 5: 목표 수익률 선택
```json
{
  "eventType": "portfolio_creation_step",
  "timestamp": "2025-01-19T10:33:00.789Z",
  "sessionId": "uuid-v4",
  "data": {
    "step": 5,
    "stepName": "target_profit_selection",
    "initialPercentage": 6,                     // 초기값 (기본 6%)
    "finalPercentage": 12,                      // 최종 선택값
    "wasAdjusted": true,                        // 기본값에서 변경 여부
    "scrollCount": 6,                           // 휠/스와이프 횟수
    "timeOnStep": 8.123
  }
}
```

### 4. 포트폴리오 저장 완료 (`portfolio_created`)

**발생 시점**: Step 5 완료 후 localStorage에 저장 시

```json
{
  "eventType": "portfolio_created",
  "timestamp": "2025-01-19T10:33:05.123Z",
  "sessionId": "uuid-v4",
  "data": {
    "portfolioId": "1705745585123",             // 생성된 포트폴리오 ID
    "portfolioName": "나의 첫 포트폴리오",
    "riskType": "중립형",
    "investmentStyle": "글로벌 탐험가",
    "targetProfitPercentage": 12,
    "etfCount": 5,                              // 포함된 ETF 개수
    "totalCreationTime": 155.789,               // 전체 제작 소요 시간 (Step 1-5)
    "createdAt": "2025-01-19T10:33:05.123Z"
  }
}
```

### 5. 용어카드 클릭 (`vocabulary_card_clicked`)

**발생 시점**: Vocabulary 페이지에서 용어카드 클릭 시

```json
{
  "eventType": "vocabulary_card_clicked",
  "timestamp": "2025-01-19T10:35:00.000Z",
  "sessionId": "uuid-v4",
  "data": {
    "cardId": 1,
    "cardTitle": "ETF",
    "isLocked": false,                          // 카드 잠김 여부
    "currentTab": "전체",                        // '전체' | '최근 얻은 순' | '미획득만'
    "sortOrder": "recent",                      // 'recent' | 'oldest' (최근 얻은 순 탭에만 적용)
    "obtainedCount": 10,                        // 현재 획득한 카드 수
    "totalCount": 21,                           // 전체 카드 수
    "timeOnPage": 5.234                         // 페이지 진입 후 클릭까지 시간
  }
}
```

### 6. 용어 상세 모달 표시 (`vocabulary_detail_viewed`)

**발생 시점**: 용어 상세 모달이 열릴 때

```json
{
  "eventType": "vocabulary_detail_viewed",
  "timestamp": "2025-01-19T10:35:00.500Z",
  "sessionId": "uuid-v4",
  "data": {
    "cardId": 1,
    "cardTitle": "ETF",
    "cardDescription": "상장지수펀드...",
    "isActiveMission": true,                    // vocabulary 미션 활성 여부
    "willStartCountdown": true                  // 카운트다운 시작 여부
  }
}
```

### 7. 카운트다운 틱 (`vocabulary_countdown_tick`)

**발생 시점**: 3초 카운트다운 중 매 초마다 (3 → 2 → 1)

```json
{
  "eventType": "vocabulary_countdown_tick",
  "timestamp": "2025-01-19T10:35:01.500Z",
  "sessionId": "uuid-v4",
  "data": {
    "cardId": 1,
    "countdown": 2,                             // 남은 시간 (초)
    "elapsedTime": 1.0                          // 카운트다운 시작 후 경과 시간
  }
}
```

### 8. 카운트다운 완료 (`vocabulary_countdown_complete`)

**발생 시점**: 3초 카운트다운 완료 시 (0초)

```json
{
  "eventType": "vocabulary_countdown_complete",
  "timestamp": "2025-01-19T10:35:03.500Z",
  "sessionId": "uuid-v4",
  "data": {
    "cardId": 1,
    "cardTitle": "ETF",
    "totalViewDuration": 3.0,                   // 총 열람 시간 (3초)
    "completedAt": "2025-01-19T10:35:03.500Z"
  }
}
```

### 9. 미션 완료 모달 표시 (`mission_complete_modal_shown`)

**발생 시점**: 미션 완료 조건 충족 시 (포트폴리오 저장 완료 또는 카운트다운 완료)

```json
{
  "eventType": "mission_complete_modal_shown",
  "timestamp": "2025-01-19T10:35:03.600Z",
  "sessionId": "uuid-v4",
  "data": {
    "missionId": "vocabulary",
    "missionName": "단어카드 열람 미션",
    "timeFromMissionStart": 33.6                // 미션 시작부터 완료까지 시간 (초)
  }
}
```

### 10. 난이도 평가 제출 (`mission_rating_submitted`)

**발생 시점**: Mission Rating 페이지에서 "완료하기" 클릭 시

```json
{
  "eventType": "mission_rating_submitted",
  "timestamp": "2025-01-19T10:36:00.000Z",
  "sessionId": "uuid-v4",
  "data": {
    "missionId": "portfolio",
    "missionName": "포트폴리오 제작 미션",
    "rating": 4,                                // 1-5 별점
    "ratingText": "쉬움",                        // 별점 텍스트
    "feedback": "처음에는 어려웠지만...",         // 피드백 (optional)
    "hasFeedback": true,                        // 피드백 입력 여부
    "feedbackLength": 25,                       // 피드백 길이
    "timeOnRatingPage": 25.456                  // 평가 페이지 체류 시간
  }
}
```

**별점 텍스트 매핑**:
- 5점: "아주 쉬움"
- 4점: "쉬움"
- 3점: "보통"
- 2점: "어려움"
- 1점: "아주 어려움"

### 11. 미션 완료 (`mission_completed`)

**발생 시점**: Mission Complete 페이지에서 "미션 완료" 클릭 시

```json
{
  "eventType": "mission_completed",
  "timestamp": "2025-01-19T10:36:30.000Z",
  "sessionId": "uuid-v4",
  "data": {
    "missionId": "portfolio",
    "missionName": "포트폴리오 제작 미션",
    "totalDuration": 390.0,                     // 미션 시작부터 완료까지 총 시간 (초)
    "completedAt": "2025-01-19T10:36:30.000Z",
    "wasQuitted": false,                        // 포기 여부 (false = 정상 완료)
    "rating": 4,                                // 제출된 평가 점수
    "hasFeedback": true                         // 피드백 제출 여부
  }
}
```

### 12. 미션 포기 (`mission_quitted`)

**발생 시점**: Mission Quit 페이지에서 "완료하기" 클릭 시

```json
{
  "eventType": "mission_quitted",
  "timestamp": "2025-01-19T10:35:00.000Z",
  "sessionId": "uuid-v4",
  "data": {
    "missionId": "portfolio",
    "missionName": "포트폴리오 제작 미션",
    "quitAtStep": 3,                            // 어느 단계에서 포기했는지 (포트폴리오 미션만)
    "quitAtUrl": "/portfolio/create/auto/step3",// 포기 당시 URL
    "quitAtPageName": "Auto Create Step 3",     // 포기 당시 페이지명
    "timeBeforeQuit": 120.5,                    // 미션 시작부터 포기까지 시간 (초)
    "feedback": "비중 조정이 너무 어려웠어요",    // 포기 이유 피드백 (optional)
    "hasFeedback": true,                        // 피드백 입력 여부
    "feedbackLength": 16,                       // 피드백 길이
    "quitButtonExpandTime": 2.345               // QuitButton 확장부터 포기 확정까지 시간
  }
}
```

---

## LocalStorage 추적 항목

웹소켓 이벤트와 별도로, LocalStorage의 변경 사항도 추적하여 데이터 정합성을 확인할 수 있습니다.

### 1. `activeMission`
- **타입**: string | null
- **값**: `'portfolio'` | `'vocabulary'` | null
- **변경 시점**:
  - 저장: MissionSelection에서 미션 선택 후 "다음으로" 클릭 시
  - 삭제: MissionComplete에서 "미션 완료" 클릭 시

### 2. `portfolios`
- **타입**: Array
- **값**: 포트폴리오 객체 배열
- **변경 시점**: 포트폴리오 제작 미션 Step 5 완료 시
- **데이터 구조**:
```javascript
[
  {
    id: "1705745585123",                        // Date.now().toString()
    portfolioName: "나의 첫 포트폴리오",
    riskType: "중립형",
    investmentStyle: "글로벌 탐험가",
    targetProfitPercentage: 12,
    amount: 5000000,                            // 랜덤 생성 (100만~1000만)
    returnRate: 2.5,                            // 랜덤 생성 (-10%~+30%)
    targetProfit: 600000,                       // amount * targetProfitPercentage / 100
    isMainPortfolio: false,
    isBookmarked: false,
    createdAt: "2025-01-19T10:33:05.123Z"
  }
]
```

### 3. `portfolio_etfs_${portfolioId}`
- **타입**: Array
- **값**: 포트폴리오에 포함된 ETF 목록
- **변경 시점**: 포트폴리오 제작 미션 Step 5 완료 시
- **데이터 구조**:
```javascript
[
  {
    id: "1",
    etfId: "ETF001",
    title: "TIGER 미국S&P500",
    targetWeight: "25",                         // 목표 비중 (%)
    currentWeight: "25",                        // 현재 비중 (%)
    adjustedWeight: "25",                       // 조정 비중 (%)
    shares: "10",                               // 보유 주식 수
    actionType: "none",                         // 리밸런싱 액션
    actionShares: "0",
    actionText: "조정하지 않아도 괜찮아요!",
    pricePerShare: "50000",                     // 주당 가격
    totalAmount: "500000"                       // 총 금액
  }
  // ... 총 5개
]
```

### 4. `portfolioOrder`
- **타입**: Array
- **값**: 포트폴리오 ID 배열 (순서대로)
- **변경 시점**: 포트폴리오 추가 시
- **데이터 구조**: `["1705745585123", "1705745590456", ...]`

### 5. `missionFeedback` (포기 시)
- **타입**: Array
- **값**: 포기 피드백 객체 배열
- **변경 시점**: MissionQuit 페이지에서 "완료하기" 클릭 시
- **데이터 구조**:
```javascript
[
  {
    feedback: "비중 조정이 너무 어려웠어요",
    timestamp: "2025-01-19T10:35:00.000Z"
  }
]
```

---

## 구현 가이드라인

### 1. 세션 관리

#### 세션 ID 생성
- **생성 시점**: 앱 최초 진입 시 (Splash 페이지)
- **형식**: UUID v4
- **저장**: `sessionStorage['sessionId']` 또는 `useState`로 관리
- **유효 기간**: 브라우저 탭이 닫힐 때까지

```javascript
// 예시 코드
import { v4 as uuidv4 } from 'uuid';

// App.jsx 또는 최상위 컴포넌트
const [sessionId] = useState(() => {
  const existingSession = sessionStorage.getItem('sessionId');
  if (existingSession) return existingSession;

  const newSessionId = uuidv4();
  sessionStorage.setItem('sessionId', newSessionId);
  return newSessionId;
});
```

### 2. 타임스탬프 처리

#### ISO 8601 형식 사용
```javascript
const timestamp = new Date().toISOString();
// 예: "2025-01-19T10:30:00.123Z"
```

#### 시간 측정
```javascript
// 페이지 진입 시점 기록
const [pageEnterTime] = useState(() => Date.now());

// 다음 페이지 이동 시 체류 시간 계산
const timeOnPage = (Date.now() - pageEnterTime) / 1000; // 초 단위
```

### 3. 웹소켓 연결

#### 연결 관리
```javascript
// 커스텀 훅 예시: useWebSocket.js
export const useWebSocket = () => {
  const wsRef = useRef(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // WebSocket 연결
    wsRef.current = new WebSocket('wss://your-backend-url');

    wsRef.current.onopen = () => {
      console.log('WebSocket Connected');
      setIsConnected(true);
    };

    wsRef.current.onclose = () => {
      console.log('WebSocket Disconnected');
      setIsConnected(false);
    };

    wsRef.current.onerror = (error) => {
      console.error('WebSocket Error:', error);
    };

    return () => {
      wsRef.current?.close();
    };
  }, []);

  const sendEvent = useCallback((eventData) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(eventData));
    } else {
      // 오프라인 큐에 저장
      saveToOfflineQueue(eventData);
    }
  }, []);

  return { isConnected, sendEvent };
};
```

### 4. 이벤트 전송

#### 공통 이벤트 전송 함수
```javascript
// utils/tracking.js
export const sendTrackingEvent = (eventType, data, sessionId) => {
  const event = {
    eventType,
    timestamp: new Date().toISOString(),
    sessionId,
    data
  };

  // WebSocket으로 전송
  window.dispatchEvent(new CustomEvent('tracking-event', { detail: event }));

  return event;
};
```

#### 사용 예시
```javascript
// 포트폴리오 제작 Step 1에서
const handleRiskTypeSelect = (type) => {
  setSelectedRiskType(type);

  // 추적 이벤트 전송
  sendTrackingEvent('portfolio_creation_step', {
    step: 1,
    stepName: 'risk_type_selection',
    selectedValue: type,
    selectedLabel: RISK_TYPE_LABELS[type],
    timeOnStep: (Date.now() - stepEnterTime) / 1000
  }, sessionId);
};
```

### 5. 오프라인 큐 관리

```javascript
// utils/offlineQueue.js
const QUEUE_KEY = 'tracking_event_queue';

export const saveToOfflineQueue = (event) => {
  const queue = JSON.parse(localStorage.getItem(QUEUE_KEY) || '[]');
  queue.push(event);
  localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
};

export const flushOfflineQueue = (sendFunction) => {
  const queue = JSON.parse(localStorage.getItem(QUEUE_KEY) || '[]');

  queue.forEach(event => {
    sendFunction(event);
  });

  localStorage.removeItem(QUEUE_KEY);
};
```

### 6. 에러 핸들링

```javascript
// WebSocket 전송 실패 시 재시도
const sendEventWithRetry = async (event, maxRetries = 3) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      await sendEvent(event);
      return;
    } catch (error) {
      console.error(`Send failed (attempt ${i + 1}):`, error);
      if (i === maxRetries - 1) {
        // 최종 실패 시 오프라인 큐에 저장
        saveToOfflineQueue(event);
      }
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
};
```

### 7. 개인정보 보호

- **제외할 데이터**:
  - 실제 포트폴리오 이름 (해시 처리 또는 길이만 전송)
  - 피드백 내용 (선택적, 필요 시 암호화)

- **포함할 데이터**:
  - 메타데이터 (길이, 타입, 개수 등)
  - 선택 값 (ID, 라벨)
  - 타이밍 정보 (시간, 클릭 수 등)

```javascript
// 민감 데이터 처리 예시
const sanitizePortfolioName = (name) => {
  return {
    nameLength: name.length,
    // 실제 이름은 전송하지 않음
  };
};
```

---

## 주요 파일 및 컴포넌트

### 미션 관련 유틸리티
- **missionStorage.js**: `src/utils/missionStorage.js`
  - `setActiveMission(missionId)`
  - `getActiveMission()`
  - `clearActiveMission()`
  - `isActiveMission(missionId)`

### 포트폴리오 관련 유틸리티
- **portfolioStorage.js**: `src/utils/portfolioStorage.js`
  - `addPortfolio(portfolioData)`
  - `setPortfolioETFs(portfolioId, etfs)`
  - `getPortfolioById(id)`

### 주요 컴포넌트
- **QuitButton.jsx**: `src/components/common/QuitButton.jsx`
  - 미션 포기 버튼 (상단 고정)

- **VocabularyCard.jsx**: `src/components/common/VocabularyCard.jsx`
  - 용어 카드 컴포넌트

- **VocabularyDetailModal.jsx**: `src/components/common/VocabularyDetailModal.jsx`
  - 용어 상세 모달 (카운트다운 포함)

### 미션 페이지
- **MissionSelection**: `src/pages/MissionSelection.jsx`
- **MissionStart**: `src/pages/MissionStart.jsx`
- **MissionQuit**: `src/pages/MissionQuit.jsx`
- **MissionComplete**: `src/pages/MissionComplete.jsx`
- **MissionRating**: `src/pages/MissionRating.jsx`

### 포트폴리오 제작 페이지
- **AutoCreate**: `src/pages/PortfolioCreate/AutoCreate.jsx` (Step 1)
- **AutoCreateStep2-5**: `src/pages/PortfolioCreate/AutoCreateStep2.jsx` ~ `AutoCreateStep5.jsx`

### 용어카드 페이지
- **Vocabulary**: `src/pages/Vocabulary/index.jsx`

---

## 데이터 분석 활용 방안

수집한 데이터로 다음과 같은 분석이 가능합니다:

### 1. 미션 완료율 분석
- 미션별 완료율 (완료 / 시작)
- 포기율 및 포기 시점 분석
- 평균 완료 시간 비교

### 2. 사용자 행동 패턴
- 각 Step별 체류 시간
- 비중 조정 횟수 및 패턴
- 이름 입력 시간 및 길이

### 3. 난이도 평가
- 미션별 평균 별점
- 별점과 완료 시간의 상관관계
- 피드백 키워드 분석

### 4. UX 개선 포인트
- 가장 많이 포기하는 단계 파악
- 체류 시간이 긴 단계 (어려움 추정)
- 오류 발생 빈도 및 위치

---

## 버전 정보

- **문서 버전**: 1.0.0
- **최초 작성일**: 2025-01-19
- **프로젝트**: 졸업 전시 웹앱
- **기술 스택**: React 19.1.1, Vite 7.1.7, WebSocket

---

## 업데이트 이력

| 날짜 | 버전 | 내용 |
|-----|------|-----|
| 2025-01-19 | 1.1.0 | 전체 사용자 인터랙션 추적 섹션 추가 (7개 신규 이벤트 타입, isMissionRelevant 필드 추가) |
| 2025-01-19 | 1.0.0 | 최초 작성 |
