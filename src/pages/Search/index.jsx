import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LAYOUT } from '../../constants/layout';
import { VideoThumbnail } from '../../components/common/VideoThumbnail';
import { NewsCard } from '../../components/common/NewsCard';
import { TipCard } from '../../components/common/TipCard';
import VocabularyCard from '../../components/common/VocabularyCard';
import { getAllETFs, INDEX_DATA } from '../ETFDetail/data/mockData';
import { SimpleChartViewer } from '../../components/common/SimpleChartViewer';
import { Chip } from '../../components/common/Chip';
import { StockFilterToggle } from '../../components/common/ToggleButton';
import { IndexCard } from '../../components/common/IndexCard';
import { IndexCardSkeleton } from '../../components/common/IndexCardSkeleton';
import { ListItemSkeleton } from '../../components/common/ListItemSkeleton';
import { ContentCardSkeleton } from '../../components/common/ContentCardSkeleton';
import iconSearch from '../../assets/icon_search.svg';
import iconCancel from '../../assets/icon_cancel(S).svg';
import iconDividen from '../../assets/분배금_24.svg';
import iconNAV from '../../assets/NAV_24.svg';
import iconDividenReinvest from '../../assets/분배금 재투자_24.svg';
import iconFee from '../../assets/총보수_24.svg';
import iconETFLocked from '../../assets/비활성화 아이콘/ETF_비활성화.svg';
import iconNAVLocked from '../../assets/비활성화 아이콘/NAV_비활성화.svg';
import iconDividenLocked from '../../assets/비활성화 아이콘/분배금_비활성화.svg';
import largeVocab1 from '../../assets/LargeVocabularyCard/단어장 해금/탐색_용어-1.svg';
import largeVocab2 from '../../assets/LargeVocabularyCard/단어장 해금/탐색_용어-2.svg';
import largeVocab3 from '../../assets/LargeVocabularyCard/단어장 해금/탐색_용어-3.svg';
import largeVocab4 from '../../assets/LargeVocabularyCard/단어장 해금/탐색_용어-4.svg';
import largeVocab5 from '../../assets/LargeVocabularyCard/단어장 해금/탐색_용어-5.svg';
import largeVocab6 from '../../assets/LargeVocabularyCard/단어장 해금/탐색_용어-6.svg';
import largeVocab7 from '../../assets/LargeVocabularyCard/단어장 해금/탐색_용어-7.svg';
import largeVocab8 from '../../assets/LargeVocabularyCard/단어장 해금/탐색_용어-8.svg';
import largeVocab9 from '../../assets/LargeVocabularyCard/단어장 해금/탐색_용어-9.svg';
import largeVocab10 from '../../assets/LargeVocabularyCard/단어장 해금/탐색_용어-10.svg';
import largeVocab11 from '../../assets/LargeVocabularyCard/단어장 해금/탐색_용어-11.svg';
import largeVocab12 from '../../assets/LargeVocabularyCard/단어장 해금/탐색_용어-12.svg';
import largeVocab13 from '../../assets/LargeVocabularyCard/단어장 해금/탐색_용어-13.svg';
import largeVocab14 from '../../assets/LargeVocabularyCard/단어장 해금/탐색_용어-14.svg';
import largeVocab15 from '../../assets/LargeVocabularyCard/단어장 해금/탐색_용어-15.svg';
import largeVocab16 from '../../assets/LargeVocabularyCard/단어장 해금/탐색_용어-16.svg';
import largeVocab17 from '../../assets/LargeVocabularyCard/단어장 해금/탐색_용어-17.svg';
import largeVocab18 from '../../assets/LargeVocabularyCard/단어장 해금/탐색_용어-18.svg';
import largeVocab19 from '../../assets/LargeVocabularyCard/단어장 해금/탐색_용어-19.svg';
import largeVocab20 from '../../assets/LargeVocabularyCard/단어장 해금/탐색_용어-20.svg';
import thumbnail1 from '../../assets/images/pexels-anna-nekrashevich-6801650.jpg';
import thumbnail2 from '../../assets/images/pexels-artempodrez-5716034.jpg';
import thumbnail3 from '../../assets/images/pexels-energepic-com-27411-159888.jpg';
import thumbnail4 from '../../assets/images/pexels-inspiredimages-157520.jpg';
import thumbnail5 from '../../assets/images/pexels-jakubzerdzicki-34518920.jpg';
import thumbnail6 from '../../assets/images/pexels-mikhail-nilov-8296992.jpg';
import thumbnail7 from '../../assets/images/pexels-nicola-barts-7927389.jpg';
import thumbnail9 from '../../assets/images/pexels-pixabay-534216.jpg';
import thumbnail10 from '../../assets/images/pexels-vlasceanu-1400249.jpg';

// Q&A 데이터
const qaData = [
  {
    id: 1,
    icon: iconDividen,
    title: 'TR ETF의 장점이 무엇인가요?',
    tips: [
      {
        title: '복리 효과 극대화',
        content: '배당금을 받을 때마다 부과되는 세금을 즉시 내지 않고, 그 금액을 온전히 재투자해 장기적으로 자산이 더 빠르게 불어납니다.'
      },
      {
        title: '번거로움 해소',
        content: '배당금이 자동으로 재투자되기 때문에, 투자자가 일일이 재투자할 필요가 없어 관리가 편리합니다.'
      }
    ],
    linkText: 'TR ETF 상품 검색하기',
    linkIcon: iconDividenReinvest,
    defaultOpen: false,
    initialBookmarked: false
  },
  {
    id: 2,
    icon: iconNAV,
    title: '왜 이 ETF는 시장 가격과 NAV가 다른가요?',
    tips: [
      {
        title: 'NAV란?',
        content: 'NAV(순자산가치)는 ETF가 보유한 자산의 실제 가치를 나타내며, 시장 가격은 투자자들의 수요와 공급에 의해 결정됩니다.'
      }
    ],
    linkText: 'NAV에 대해 더 알아보기',
    defaultOpen: false,
    initialBookmarked: false
  },
  {
    id: 3,
    icon: iconFee,
    title: '총보수가 낮으면 무조건 좋은 ETF인가요?',
    tips: [
      {
        title: '종합적 평가 필요',
        content: '총보수도 중요하지만, 추적오차, 거래량, 운용사 신뢰도 등을 종합적으로 고려해야 합니다.'
      }
    ],
    linkText: 'ETF 평가 기준 알아보기',
    defaultOpen: false,
    initialBookmarked: false
  }
];

// 용어 데이터
const vocabularyData = [
  {
    id: 1,
    icon: iconETFLocked,
    isLocked: true,
    title: '',
    description: ''
  },
  {
    id: 2,
    icon: iconNAVLocked,
    isLocked: true,
    title: '',
    description: ''
  },
  {
    id: 3,
    icon: iconDividenLocked,
    isLocked: true,
    title: '',
    description: ''
  }
];

// 큰 용어 카드 데이터
const largeVocabularyData = [
  { id: 1, image: largeVocab1 },
  { id: 2, image: largeVocab2 },
  { id: 3, image: largeVocab3 },
  { id: 4, image: largeVocab4 },
  { id: 5, image: largeVocab5 },
  { id: 6, image: largeVocab6 },
  { id: 7, image: largeVocab7 },
  { id: 8, image: largeVocab8 },
  { id: 9, image: largeVocab9 },
  { id: 10, image: largeVocab10 },
  { id: 11, image: largeVocab11 },
  { id: 12, image: largeVocab12 },
  { id: 13, image: largeVocab13 },
  { id: 14, image: largeVocab14 },
  { id: 15, image: largeVocab15 },
  { id: 16, image: largeVocab16 },
  { id: 17, image: largeVocab17 },
  { id: 18, image: largeVocab18 },
  { id: 19, image: largeVocab19 },
  { id: 20, image: largeVocab20 }
];

// 영상/뉴스 데이터
const MOCK_CONTENTS = [
  {
    id: 1,
    type: 'video',
    thumbnail: thumbnail1,
    title: 'ETF 투자 초보자를 위한 완벽 가이드',
    variant: 'shorts',
    isBookmarked: false
  },
  {
    id: 2,
    type: 'news',
    thumbnail: thumbnail9,
    title: 'ETF 시장 200조 돌파, 이 종목 투자로 정기예금 33배 수익',
    isBookmarked: false
  },
  {
    id: 3,
    type: 'news',
    thumbnail: thumbnail4,
    title: '고금리 시대, 개인 투자자들 이 ETF에 뭉칫돈 몰리는 이유는?',
    isBookmarked: false
  },
  {
    id: 4,
    type: 'video',
    thumbnail: thumbnail2,
    title: 'S&P500 ETF 투자 전략',
    variant: 'landscape',
    isBookmarked: false
  },
  {
    id: 5,
    type: 'video',
    thumbnail: thumbnail3,
    title: '배당 ETF로 월세 만들기',
    variant: 'landscape',
    isBookmarked: false
  },
  {
    id: 6,
    type: 'news',
    thumbnail: thumbnail10,
    title: '금리 인하 기대감에 채권 ETF로 선제적 대응하는 투자자들',
    isBookmarked: false
  },
  {
    id: 7,
    type: 'video',
    thumbnail: thumbnail4,
    title: 'TR ETF vs 일반 ETF 차이점 완벽 비교',
    variant: 'shorts',
    isBookmarked: false
  },
  {
    id: 8,
    type: 'video',
    thumbnail: thumbnail5,
    title: '리밸런싱 타이밍 잡는 법',
    variant: 'landscape',
    isBookmarked: false
  },
  {
    id: 9,
    type: 'news',
    thumbnail: thumbnail5,
    title: '한국 ETF, 글로벌 시장서 수익률 톱3 비결은?',
    isBookmarked: false
  },
  {
    id: 10,
    type: 'video',
    thumbnail: thumbnail6,
    title: 'ETF 총보수 비교하는 방법',
    variant: 'landscape',
    isBookmarked: false
  },
  {
    id: 11,
    type: 'news',
    thumbnail: thumbnail7,
    title: '운용사들 보수 경쟁에 투자자들 웃음 짓는 이유',
    isBookmarked: false
  },
  {
    id: 12,
    type: 'video',
    thumbnail: thumbnail7,
    title: '2024년 추천 ETF 포트폴리오 구성하기',
    variant: 'shorts',
    isBookmarked: false
  }
];

// ETF 리스트 데이터 (mockData에서 가져오기)
const convertMockDataToListFormat = () => {
  return getAllETFs().map(etf => ({
    id: etf.id,
    name: etf.name,
    code: etf.code,
    currentPrice: etf.currentPrice.toLocaleString('ko-KR'),
    changePercent: Math.abs(etf.changePercent).toFixed(2),
    changeDirection: etf.changeDirection,
    category: etf.category,
    popularity: etf.popularity,
    volume: etf.basicInfo.volume,
    isFavorite: etf.isFavorite
  }));
};

const ETF_LIST_DATA = convertMockDataToListFormat();

const TABS = ['탐색', '리스트', '지수'];

const SUB_TABS = [
  '전체보기',
  '관심ETF',
  '국내주식',
  '해외 주식',
  '채권',
  '원자재/통화',
  '레버리지/인버스',
  '금리',
  '부동산'
];

const Search = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('탐색');
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedSubTab, setSelectedSubTab] = useState('전체보기');
  const [selectedFilter, setSelectedFilter] = useState('꾸준 인기');
  const [popularityTrend, setPopularityTrend] = useState(true);
  const [volumeTrend, setVolumeTrend] = useState(true);
  const [chartTrend, setChartTrend] = useState('up');
  const [showIndexGuide, setShowIndexGuide] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // 탐색 탭 초기 로딩
  const [loadedTabs, setLoadedTabs] = useState(new Set()); // 처음 로드되는 탭 추적 (탐색 탭 제외)

  // 지수 탭 처음 방문 시 가이드 모달 표시
  useEffect(() => {
    if (selectedTab === '지수') {
      const hasSeenGuide = localStorage.getItem('hasSeenIndexGuide');
      if (!hasSeenGuide) {
        setShowIndexGuide(true);
      }
    }
  }, [selectedTab]);

  const handleCloseGuide = () => {
    setShowIndexGuide(false);
    localStorage.setItem('hasSeenIndexGuide', 'true');
  };

  // 탭 변경 핸들러
  const handleTabChange = (newTab) => {
    // 탐색 탭이거나 처음 방문하는 탭이면 먼저 로딩 상태 설정
    if (newTab === '탐색' || !loadedTabs.has(newTab)) {
      setIsLoading(true);
    }
    setSelectedTab(newTab);
  };

  // 탭 전환 시 로딩 상태 관리
  useEffect(() => {
    // 탐색 탭: 이미지가 많아서 항상 로딩 표시
    if (selectedTab === '탐색') {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 300); // 300ms 로딩

      return () => clearTimeout(timer);
    }

    // 다른 탭: 이미 로드된 탭이면 스켈레톤 표시 안 함
    if (loadedTabs.has(selectedTab)) {
      setIsLoading(false);
      return;
    }

    // 처음 방문하는 탭만 로딩 표시
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
      setLoadedTabs(prev => new Set([...prev, selectedTab]));
    }, 300); // 300ms 로딩

    return () => clearTimeout(timer);
  }, [selectedTab, loadedTabs]);

  // 모든 컨텐츠를 골고루 섞어서 배치
  const allContent = useMemo(() => {
    const videos = MOCK_CONTENTS.filter(item => item.type === 'video');
    const news = MOCK_CONTENTS.filter(item => item.type === 'news');
    const qaItems = qaData.map((item) => ({ ...item, type: 'qa' }));
    const vocabItems = vocabularyData.map((item) => ({ ...item, type: 'vocabulary' }));
    const largeVocabItems = largeVocabularyData.map((item) => ({ ...item, type: 'largeVocabulary' }));

    // 앞부분은 고정된 패턴으로 배치
    const combined = [
      largeVocabItems[0],  // 큰 용어 카드
      news[0],             // 뉴스
      videos[0],           // 영상 (shorts)
      news[1],             // 뉴스
      qaItems[0],          // Q&A
      largeVocabItems[1],  // 큰 용어 카드
      news[2],             // 뉴스
      videos[1],           // 영상 (landscape)
      vocabItems[0],       // 용어 카드
      news[3],             // 뉴스
      videos[2],           // 영상 (landscape)
      largeVocabItems[2],  // 큰 용어 카드
      qaItems[1],          // Q&A
      videos[3],           // 영상 (landscape)
      news[4],             // 뉴스
      largeVocabItems[3],  // 큰 용어 카드
      videos[4],           // 영상 (landscape)
      vocabItems[1],       // 용어 카드
      news[5],             // 뉴스
      qaItems[2],          // Q&A
    ].filter(Boolean);

    // 나머지 아이템들을 골고루 섞어서 추가
    const remainingLargeVocab = largeVocabItems.slice(4);
    const remainingVideos = videos.slice(5);
    const remainingNews = news.slice(6);
    const remainingVocab = vocabItems.slice(2);

    // 나머지 아이템들을 타입별로 번갈아가며 추가
    let i = 0;
    while (remainingLargeVocab.length > 0 || remainingVideos.length > 0 ||
           remainingNews.length > 0 || remainingVocab.length > 0) {

      // 큰 용어 카드
      if (i % 4 === 0 && remainingLargeVocab.length > 0) {
        combined.push(remainingLargeVocab.shift());
      }
      // 뉴스
      else if (i % 4 === 1 && remainingNews.length > 0) {
        combined.push(remainingNews.shift());
      }
      // 영상
      else if (i % 4 === 2 && remainingVideos.length > 0) {
        combined.push(remainingVideos.shift());
      }
      // 용어 또는 뉴스
      else if (i % 4 === 3) {
        if (remainingVocab.length > 0) {
          combined.push(remainingVocab.shift());
        } else if (remainingNews.length > 0) {
          combined.push(remainingNews.shift());
        }
      }
      // 나머지 처리
      else {
        if (remainingNews.length > 0) combined.push(remainingNews.shift());
        else if (remainingVideos.length > 0) combined.push(remainingVideos.shift());
        else if (remainingLargeVocab.length > 0) combined.push(remainingLargeVocab.shift());
        else if (remainingVocab.length > 0) combined.push(remainingVocab.shift());
      }

      i++;
    }

    return combined.filter(Boolean);
  }, []);

  const getFilteredContents = () => {
    let filtered = allContent;

    // 탭별 필터링
    if (selectedTab === '탐색') {
      // 전체 콘텐츠 표시
      filtered = allContent;
    } else if (selectedTab === '리스트') {
      // ETF 리스트 표시
      let etfList = [...ETF_LIST_DATA];

      // 1. 서브탭에 따른 카테고리 필터링
      if (selectedSubTab === '전체보기') {
        // 모든 ETF 표시
      } else if (selectedSubTab === '관심ETF') {
        etfList = etfList.filter(item => item.isFavorite);
      } else {
        // 서브탭 이름과 카테고리가 일치하는 ETF만 필터링
        etfList = etfList.filter(item => item.category === selectedSubTab);
      }

      // 2. 차트 토글에 따른 상승/하락 필터링
      etfList = etfList.filter(item => item.changeDirection === chartTrend);

      // 3. 필터와 트렌드에 따른 정렬
      if (selectedFilter === '꾸준 인기') {
        // 인기도 기준 정렬
        if (popularityTrend) {
          // 상승: 인기도 높은 순
          etfList.sort((a, b) => b.popularity - a.popularity);
        } else {
          // 하락: 인기도 낮은 순
          etfList.sort((a, b) => a.popularity - b.popularity);
        }
      } else if (selectedFilter === '거래량') {
        // 거래량 기준 정렬
        if (volumeTrend) {
          // 상승: 거래량 많은 순
          etfList.sort((a, b) => b.volume - a.volume);
        } else {
          // 하락: 거래량 적은 순
          etfList.sort((a, b) => a.volume - b.volume);
        }
      }

      // 4. 검색어 필터링
      if (searchQuery.trim()) {
        etfList = etfList.filter(item =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.code.includes(searchQuery)
        );
      }

      return etfList;
    } else if (selectedTab === '지수') {
      // 지수 데이터 반환
      return INDEX_DATA;
    }

    // 검색어 필터링 (title이 있는 아이템만 검색)
    if (searchQuery.trim()) {
      filtered = filtered.filter(item => {
        // title이 없는 아이템(큰 용어 카드, 용어 카드)은 검색에서 제외하지만 표시는 함
        if (!item.title) return false;
        return item.title.toLowerCase().includes(searchQuery.toLowerCase());
      });
    }

    return filtered;
  };

  // 컨텐츠를 섹션으로 나누기 (Q&A는 전체 너비, 나머지는 2열)
  const contentSections = useMemo(() => {
    const contents = getFilteredContents();
    const sections = [];
    let currentTwoColumnItems = [];
    let columnIndex = 0;

    contents.forEach((content) => {
      if (content.type === 'qa') {
        // 현재까지 모인 2열 아이템들을 섹션에 추가
        if (currentTwoColumnItems.length > 0) {
          sections.push({ type: 'twoColumn', items: [...currentTwoColumnItems] });
          currentTwoColumnItems = [];
          columnIndex = 0;
        }
        // Q&A를 전체 너비 섹션으로 추가
        sections.push({ type: 'fullWidth', content });
      } else {
        // 2열 아이템에 추가 (왼쪽: 0, 오른쪽: 1)
        currentTwoColumnItems.push({ content, column: columnIndex % 2 });
        columnIndex++;
      }
    });

    // 남은 2열 아이템들 추가
    if (currentTwoColumnItems.length > 0) {
      sections.push({ type: 'twoColumn', items: currentTwoColumnItems });
    }

    return sections;
  }, [searchQuery, selectedTab, selectedSubTab, selectedFilter, popularityTrend, volumeTrend, chartTrend]);

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#FFFFFF',
        position: 'relative'
      }}
    >

      {/* 검색바 */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          backgroundColor: '#FFFFFF',
          padding: `12px ${LAYOUT.HORIZONTAL_PADDING}px 0`
        }}
      >
        <div
          style={{
            backgroundColor: '#F7F7F8',
            borderRadius: '12px',
            padding: '10px 12px',
            display: 'flex',
            gap: '10px',
            alignItems: 'center'
          }}
        >
          <div
            style={{
              width: '24px',
              height: '24px',
              flexShrink: 0
            }}
          >
            <img
              src={iconSearch}
              alt="검색"
              style={{
                width: '100%',
                height: '100%',
                display: 'block'
              }}
            />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="상품 / 투자TIP / 용어를 검색해 보세요"
            style={{
              flex: 1,
              border: 'none',
              backgroundColor: 'transparent',
              fontFamily: 'Pretendard, sans-serif',
              fontSize: '14px',
              fontWeight: 500,
              lineHeight: 1.5,
              color: '#1A1C20',
              outline: 'none'
            }}
          />
        </div>

        {/* 탭 네비게이션 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 0 0',
            borderBottom: '1px solid #F7F7F8',
            width: `calc(100% + ${LAYOUT.HORIZONTAL_PADDING * 2}px)`,
            marginLeft: `-${LAYOUT.HORIZONTAL_PADDING}px`,
            marginRight: `-${LAYOUT.HORIZONTAL_PADDING}px`
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: '10px'
            }}
          >
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                style={{
                  padding: '8px 16px 12px',
                  border: 'none',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  position: 'relative',
                  opacity: 0.8,
                  transition: 'opacity 0.2s ease'
                }}
              >
                <p
                  style={{
                    fontFamily: 'Pretendard, sans-serif',
                    fontSize: '20px',
                    fontWeight: 600,
                    lineHeight: 1.35,
                    color: selectedTab === tab ? '#005CCC' : '#757E8F',
                    margin: 0,
                    whiteSpace: 'nowrap',
                    transition: 'color 0.2s ease'
                  }}
                >
                  {tab}
                </p>
                {selectedTab === tab && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '0',
                      left: 0,
                      right: 0,
                      height: '2px',
                      backgroundColor: '#005CCC'
                    }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* 펼치기/접기 버튼 (리스트 탭에서만 표시) */}
          {selectedTab === '리스트' && (
            <div
              style={{
                padding: '9px 16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                alignItems: 'flex-start'
              }}
            >
              <button
                style={{
                  backgroundColor: '#FAFCFF',
                  padding: '4px 10px',
                  borderRadius: '12px',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'transform 0.15s ease',
                  transform: 'scale(1)'
                }}
                onClick={() => setIsExpanded(!isExpanded)}
                onMouseDown={(e) => {
                  e.currentTarget.style.transform = 'scale(0.95)';
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <p
                  style={{
                    fontFamily: 'Pretendard, sans-serif',
                    fontSize: '14px',
                    fontWeight: 500,
                    lineHeight: 1.5,
                    color: '#005CCC',
                    margin: 0,
                    whiteSpace: 'nowrap'
                  }}
                >
                  {isExpanded ? '접기' : '펼치기'}
                </p>
              </button>
            </div>
          )}
        </div>

        {/* 서브 탭 네비게이션 및 필터 (리스트 탭에서 표시) */}
        {selectedTab === '리스트' && (
          <div
            style={{
              width: `calc(100% + ${LAYOUT.HORIZONTAL_PADDING * 2}px)`,
              marginLeft: `-${LAYOUT.HORIZONTAL_PADDING}px`,
              marginRight: `-${LAYOUT.HORIZONTAL_PADDING}px`,
              maxHeight: isExpanded ? '400px' : '0',
              overflow: 'hidden',
              transition: isExpanded
                ? 'max-height 0.8s cubic-bezier(0.2, 0.8, 0.3, 1)'
                : 'max-height 0.3s cubic-bezier(0.4, 0, 0.6, 1)'
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                paddingTop: '16px'
              }}
            >
            {/* 서브 탭 네비게이션 */}
            <div
              style={{
                overflowX: 'auto',
                width: '100%',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
            >
              <style>
                {`
                  .sub-tab-container::-webkit-scrollbar {
                    display: none;
                  }
                `}
              </style>
              <div
                className="sub-tab-container"
                style={{
                  display: 'flex',
                  minWidth: 'max-content',
                }}
              >
                {SUB_TABS.map((tab, index) => (
                  <button
                    key={tab}
                    onClick={() => setSelectedSubTab(tab)}
                    style={{
                      backgroundColor: '#FFFFFF',
                      padding: '12px 16px 10px',
                      border: 'none',
                      borderBottom: selectedSubTab === tab ? '1px solid #005CCC' : '1px solid #F7F7F8',
                      borderRadius: 0,
                      cursor: 'pointer',
                      flexShrink: 0,
                      position: 'relative',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <p
                      style={{
                        fontFamily: 'Pretendard, sans-serif',
                        fontSize: '16px',
                        fontWeight: 600,
                        lineHeight: 1.35,
                        color: selectedSubTab === tab ? '#30343B' : '#ADB2BD',
                        margin: 0,
                        whiteSpace: 'nowrap',
                        transition: 'color 0.2s ease'
                      }}
                    >
                      {tab}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* 필터 영역 */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingLeft: `${LAYOUT.HORIZONTAL_PADDING}px`,
                paddingRight: `${LAYOUT.HORIZONTAL_PADDING}px`,
                paddingBottom: '12px'
              }}
            >
              {/* 좌측: 꾸준 인기/거래량 칩 */}
              <div
                style={{
                  display: 'flex',
                  gap: '10px',
                  alignItems: 'center'
                }}
              >
                {selectedFilter === '꾸준 인기' ? (
                  <Chip
                    title="꾸준 인기"
                    color="primary"
                    state="select"
                    showIcon={true}
                    iconRotation={popularityTrend ? 0 : 180}
                    onClick={() => {
                      setPopularityTrend(!popularityTrend);
                    }}
                  />
                ) : (
                  <Chip
                    title="꾸준 인기"
                    color="grey"
                    state="nonSelect"
                    showIcon={false}
                    onClick={() => {
                      setSelectedFilter('꾸준 인기');
                      setPopularityTrend(true);
                    }}
                  />
                )}
                {selectedFilter === '거래량' ? (
                  <Chip
                    title="거래량"
                    color="primary"
                    state="select"
                    showIcon={true}
                    iconRotation={volumeTrend ? 0 : 180}
                    onClick={() => {
                      setVolumeTrend(!volumeTrend);
                    }}
                  />
                ) : (
                  <Chip
                    title="거래량"
                    color="grey"
                    state="nonSelect"
                    showIcon={false}
                    onClick={() => {
                      setSelectedFilter('거래량');
                      setVolumeTrend(true);
                    }}
                  />
                )}
              </div>

              {/* 우측: 차트 토글 */}
              <div
                style={{
                  display: 'flex',
                  gap: '8px',
                  alignItems: 'center'
                }}
              >
                <p
                  style={{
                    fontFamily: 'Pretendard, sans-serif',
                    fontSize: '14px',
                    fontWeight: 500,
                    lineHeight: 1.5,
                    color: '#1A1C20',
                    margin: 0,
                    whiteSpace: 'nowrap'
                  }}
                >
                  차트
                </p>
                <StockFilterToggle
                  value={chartTrend}
                  onChange={(newValue) => setChartTrend(newValue)}
                />
              </div>
            </div>
            </div>
          </div>
        )}
      </div>

      {/* 콘텐츠 리스트 */}
      <div
        style={{
          padding: `16px ${LAYOUT.HORIZONTAL_PADDING}px`,
          paddingBottom: selectedTab === '리스트' ? `${LAYOUT.BOTTOM_NAV_HEIGHT + 60}px` : selectedTab === '지수' ? `${LAYOUT.BOTTOM_NAV_HEIGHT + 20}px` : `16px`
        }}
      >
        {/* 지수 탭: 지수 카드 그리드 */}
        {selectedTab === '지수' ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
              gap: '12px',
              width: '100%'
            }}
          >
            {isLoading ? (
              // 로딩 중일 때 스켈레톤 표시 (9개)
              Array.from({ length: 9 }).map((_, index) => (
                <IndexCardSkeleton key={`skeleton-${index}`} />
              ))
            ) : (
              // 실제 데이터 표시
              getFilteredContents().map((index) => (
                <IndexCard
                  key={index.id}
                  name={index.name}
                  value={index.value}
                  changePercent={index.changePercent}
                  changeDirection={index.changeDirection}
                  onClick={() => console.log(`지수 ${index.id} 클릭`)}
                />
              ))
            )}
          </div>
        ) : selectedTab === '리스트' ? (
          <>
            {/* 빈 상태: 관심ETF가 없을 때 */}
            {selectedSubTab === '관심ETF' && getFilteredContents().length === 0 ? (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  paddingTop: '200px',
                  paddingBottom: '36px'
                }}
              >
                <p
                  style={{
                    fontFamily: 'Pretendard, sans-serif',
                    fontSize: '16px',
                    fontWeight: 400,
                    lineHeight: 1.5,
                    color: '#474C57',
                    margin: 0,
                    whiteSpace: 'nowrap'
                  }}
                >
                  다양한 ETF들을 탐색하고, 첫 관심을 등록해 보세요!
                </p>
                <button
                  onClick={() => setSelectedSubTab('전체보기')}
                  style={{
                    backgroundColor: '#3490FF',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '8px 8px 8px 16px',
                    display: 'flex',
                    gap: '4px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'transform 0.15s ease',
                    transform: 'scale(1)'
                  }}
                  onMouseDown={(e) => {
                    e.currentTarget.style.transform = 'scale(0.95)';
                  }}
                  onMouseUp={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'Pretendard, sans-serif',
                      fontSize: '16px',
                      fontWeight: 500,
                      lineHeight: 1.5,
                      color: '#FFFFFF',
                      margin: 0,
                      whiteSpace: 'nowrap'
                    }}
                  >
                    전체 보기
                  </p>
                  <div
                    style={{
                      width: '24px',
                      height: '24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transform: 'rotate(90deg)',
                      opacity: 0.5
                    }}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10 18L16 12L10 6"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </button>
              </div>
            ) : (
              /* ETF 리스트 */
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}
              >
                {isLoading ? (
                  // 로딩 중일 때 스켈레톤 표시 (6개)
                  Array.from({ length: 6 }).map((_, index) => (
                    <ListItemSkeleton key={`list-skeleton-${index}`} />
                  ))
                ) : (
                  // 실제 데이터 표시
                  getFilteredContents().map((etf) => (
                    <SimpleChartViewer
                      key={etf.id}
                      name={etf.name}
                      code={etf.code}
                      currentPrice={etf.currentPrice}
                      changePercent={etf.changePercent}
                      changeDirection={etf.changeDirection}
                      showTopLabel={false}
                      showPriceComparison={false}
                      onClick={() => navigate(`/etf/${etf.id}/detail`)}
                    />
                  ))
                )}
              </div>
            )}
          </>
        ) : isLoading ? (
          /* 탐색 탭 로딩 중: 스켈레톤 그리드 */
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '12px',
              width: '100%'
            }}
          >
            {Array.from({ length: 8 }).map((_, index) => (
              <ContentCardSkeleton
                key={`content-skeleton-${index}`}
                size={index % 3 === 0 ? 'large' : index % 2 === 0 ? 'medium' : 'small'}
              />
            ))}
          </div>
        ) : (
          /* 탐색 탭: Masonry 레이아웃 */
          contentSections.map((section, sectionIndex) => {
          // Q&A 전체 너비 섹션
          if (section.type === 'fullWidth') {
            return (
              <div
                key={`qa-${section.content.id}`}
                style={{
                  marginBottom: sectionIndex < contentSections.length - 1 ? '16px' : '0'
                }}
              >
                <TipCard
                  icon={section.content.icon}
                  title={section.content.title}
                  tips={section.content.tips}
                  linkText={section.content.linkText}
                  linkIcon={section.content.linkIcon}
                  showLink={true}
                  defaultOpen={section.content.defaultOpen}
                  initialBookmarked={section.content.initialBookmarked}
                  onToggle={(isOpen) => {
                    console.log(`${section.content.title} ${isOpen ? '열림' : '닫힘'}`);
                  }}
                  onBookmarkChange={(isBookmarked) => {
                    console.log(`${section.content.title} 북마크 ${isBookmarked ? '추가' : '제거'}`);
                  }}
                  onLinkClick={() => {
                    console.log(`${section.content.linkText} 클릭`);
                  }}
                />
              </div>
            );
          }

          // 2열 Masonry 섹션
          if (section.type === 'twoColumn') {
            const leftItems = section.items.filter(item => item.column === 0);
            const rightItems = section.items.filter(item => item.column === 1);

            const renderItem = (content) => {
              const key = `${content.type}-${content.id}`;

              // 용어 타입
              if (content.type === 'vocabulary') {
                return (
                  <VocabularyCard
                    key={key}
                    icon={content.icon}
                    isLocked={content.isLocked}
                    title={content.title}
                    description={content.description}
                  />
                );
              }

              // 큰 용어 카드 타입
              if (content.type === 'largeVocabulary') {
                return (
                  <div
                    key={key}
                    style={{
                      position: 'relative',
                      width: '100%',
                      paddingBottom: '100%',
                      borderRadius: '12px',
                      overflow: 'hidden'
                    }}
                  >
                    <img
                      src={content.image}
                      alt="용어 카드"
                      style={{
                        width: '111%',
                        height: '111%',
                        objectFit: 'cover',
                        display: 'block',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)'
                      }}
                    />
                  </div>
                );
              }

              // 영상 타입
              if (content.type === 'video') {
                return (
                  <VideoThumbnail
                    key={key}
                    thumbnail={content.thumbnail}
                    title={content.title}
                    variant={content.variant}
                    isBookmarked={content.isBookmarked}
                    onPlayClick={() => console.log(`비디오 재생: ${content.id}`)}
                    onBookmarkClick={(newState) =>
                      console.log(`비디오 ${content.id} 북마크 ${newState ? '추가' : '제거'}`)
                    }
                  />
                );
              }

              // 뉴스 타입
              if (content.type === 'news') {
                return (
                  <NewsCard
                    key={key}
                    thumbnail={content.thumbnail}
                    title={content.title}
                    isBookmarked={content.isBookmarked}
                    onCardClick={() => console.log(`뉴스 ${content.id} 클릭`)}
                    onBookmarkClick={(newState) =>
                      console.log(`뉴스 ${content.id} 북마크 ${newState ? '추가' : '제거'}`)
                    }
                  />
                );
              }

              return null;
            };

            return (
              <div
                key={`section-${sectionIndex}`}
                style={{
                  marginBottom: sectionIndex < contentSections.length - 1 ? '16px' : '0'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    gap: '12px',
                    alignItems: 'flex-start'
                  }}
                >
                  {/* 왼쪽 열 */}
                  <div
                    style={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '16px'
                    }}
                  >
                    {leftItems.map(item => renderItem(item.content))}
                  </div>

                  {/* 오른쪽 열 */}
                  <div
                    style={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '16px'
                    }}
                  >
                    {rightItems.map(item => renderItem(item.content))}
                  </div>
                </div>
              </div>
            );
          }

          return null;
        })
        )}
      </div>

      {/* 하단 헤더 (리스트 탭에서만 표시) */}
      {selectedTab === '리스트' && (
        <div
          style={{
            position: 'sticky',
            bottom: `${LAYOUT.BOTTOM_NAV_HEIGHT}px`,
            left: 0,
            right: 0,
            backgroundColor: '#F7F7F8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingLeft: `${LAYOUT.HORIZONTAL_PADDING}px`,
            paddingRight: `${LAYOUT.HORIZONTAL_PADDING}px`,
            paddingTop: 0,
            paddingBottom: 0,
            zIndex: 10
          }}
        >
          {/* 종목 */}
          <div
            style={{
              display: 'flex',
              gap: '10px',
              alignItems: 'center',
              padding: '10px',
              width: '196px',
              flexShrink: 0
            }}
          >
            <p
              style={{
                fontFamily: 'Pretendard, sans-serif',
                fontSize: '14px',
                fontWeight: 400,
                lineHeight: 1.5,
                color: '#5E6573',
                margin: 0,
                whiteSpace: 'nowrap'
              }}
            >
              종목
            </p>
          </div>

          {/* 차트 */}
          <div
            style={{
              display: 'flex',
              gap: '10px',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '10px',
              flexShrink: 0
            }}
          >
            <p
              style={{
                fontFamily: 'Pretendard, sans-serif',
                fontSize: '14px',
                fontWeight: 400,
                lineHeight: 1.5,
                color: '#5E6573',
                margin: 0,
                whiteSpace: 'nowrap'
              }}
            >
              차트
            </p>
          </div>

          {/* 현재가 */}
          <div
            style={{
              display: 'flex',
              gap: '10px',
              alignItems: 'center',
              justifyContent: 'flex-end',
              padding: '10px',
              width: '102px',
              flexShrink: 0
            }}
          >
            <p
              style={{
                fontFamily: 'Pretendard, sans-serif',
                fontSize: '14px',
                fontWeight: 400,
                lineHeight: 1.5,
                color: '#5E6573',
                margin: 0,
                whiteSpace: 'nowrap'
              }}
            >
              현재가
            </p>
          </div>
        </div>
      )}

      {/* 지수 가이드 모달 (처음 방문 시에만 표시) */}
      {selectedTab === '지수' && showIndexGuide && (
        <div
          style={{
            position: 'fixed',
            bottom: `${LAYOUT.BOTTOM_NAV_HEIGHT + 27}px`,
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#FFFFFF',
            border: '1px solid #F7F7F8',
            borderRadius: '12px',
            padding: '8px 10px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            width: '361px',
            maxWidth: 'calc(100% - 32px)',
            boxSizing: 'border-box',
            zIndex: 1000,
            boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)'
          }}
        >
          {/* 헤더: 제목 + X 버튼 */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%'
            }}
          >
            <div
              style={{
                display: 'flex',
                gap: '10px',
                alignItems: 'flex-start'
              }}
            >
              <div
                style={{
                  backgroundColor: '#FAFCFF',
                  padding: '4px 6px',
                  borderRadius: '8px',
                  display: 'flex',
                  gap: '10px',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <p
                  style={{
                    fontFamily: 'Pretendard, sans-serif',
                    fontSize: '12px',
                    fontWeight: 500,
                    lineHeight: 1.5,
                    color: '#474C57',
                    margin: 0,
                    whiteSpace: 'nowrap'
                  }}
                >
                  지수를 왜 봐야하나요?
                </p>
              </div>
            </div>
            <button
              onClick={handleCloseGuide}
              style={{
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: 'none',
                backgroundColor: 'transparent',
                cursor: 'pointer',
                padding: 0,
                flexShrink: 0
              }}
            >
              <img
                src={iconCancel}
                alt="닫기"
                style={{
                  width: '24px',
                  height: '24px',
                  display: 'block'
                }}
              />
            </button>
          </div>

          {/* 설명 텍스트 */}
          <div
            style={{
              width: '100%'
            }}
          >
            <p
              style={{
                fontFamily: 'Pretendard, sans-serif',
                fontSize: '12px',
                fontWeight: 500,
                lineHeight: 1.5,
                color: '#474C57',
                margin: 0
              }}
            >
              인덱스 ETF는 지수의 움직임을 따라가도록 만들어졌기 때문에
              <br />
              지수를 보면 ETF의 상승과 하락을 예측할 수 있어요.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
