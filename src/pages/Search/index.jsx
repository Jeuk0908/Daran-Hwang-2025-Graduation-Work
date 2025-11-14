import { useState, useMemo } from 'react';
import { LAYOUT } from '../../constants/layout';
import { VideoThumbnail } from '../../components/common/VideoThumbnail';
import { NewsCard } from '../../components/common/NewsCard';
import { TipCard } from '../../components/common/TipCard';
import VocabularyCard from '../../components/common/VocabularyCard';
import { SimpleChartViewer } from '../../components/common/SimpleChartViewer';
import { Chip } from '../../components/common/Chip';
import { StockFilterToggle } from '../../components/common/ToggleButton';
import iconSearch from '../../assets/icon_search.svg';
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

// ETF 리스트 데이터
const ETF_LIST_DATA = [
  // 국내주식
  {
    id: 1,
    name: 'KODEX 200',
    code: '069500',
    currentPrice: '38,450',
    changePercent: '1.25',
    changeDirection: 'up',
    category: '국내주식',
    popularity: 95,
    volume: 1500000,
    isFavorite: true
  },
  {
    id: 2,
    name: 'TIGER 코스피',
    code: '102110',
    currentPrice: '15,230',
    changePercent: '0.85',
    changeDirection: 'up',
    category: '국내주식',
    popularity: 88,
    volume: 980000,
    isFavorite: false
  },
  {
    id: 3,
    name: 'ARIRANG 고배당주',
    code: '161510',
    currentPrice: '12,340',
    changePercent: '0.52',
    changeDirection: 'down',
    category: '국내주식',
    popularity: 75,
    volume: 450000,
    isFavorite: true
  },

  // 해외주식
  {
    id: 4,
    name: 'TIGER 미국S&P500',
    code: '360750',
    currentPrice: '21,970',
    changePercent: '2.59',
    changeDirection: 'up',
    category: '해외 주식',
    popularity: 98,
    volume: 2100000,
    isFavorite: true
  },
  {
    id: 5,
    name: 'KODEX 미국나스닥100',
    code: '133690',
    currentPrice: '28,450',
    changePercent: '3.15',
    changeDirection: 'up',
    category: '해외 주식',
    popularity: 92,
    volume: 1850000,
    isFavorite: true
  },
  {
    id: 6,
    name: 'ARIRANG 선진국MSCI',
    code: '195980',
    currentPrice: '17,820',
    changePercent: '1.42',
    changeDirection: 'down',
    category: '해외 주식',
    popularity: 70,
    volume: 620000,
    isFavorite: false
  },
  {
    id: 7,
    name: 'TIGER 차이나전기차SOLACTIVE',
    code: '371460',
    currentPrice: '8,450',
    changePercent: '4.25',
    changeDirection: 'down',
    category: '해외 주식',
    popularity: 65,
    volume: 890000,
    isFavorite: false
  },

  // 채권
  {
    id: 8,
    name: 'KODEX 국고채3년',
    code: '114260',
    currentPrice: '104,520',
    changePercent: '0.15',
    changeDirection: 'up',
    category: '채권',
    popularity: 78,
    volume: 320000,
    isFavorite: false
  },
  {
    id: 9,
    name: 'TIGER 미국채10년선물',
    code: '305080',
    currentPrice: '9,850',
    changePercent: '0.32',
    changeDirection: 'down',
    category: '채권',
    popularity: 82,
    volume: 550000,
    isFavorite: true
  },
  {
    id: 10,
    name: 'ARIRANG 단기회사채',
    code: '182490',
    currentPrice: '101,250',
    changePercent: '0.08',
    changeDirection: 'up',
    category: '채권',
    popularity: 68,
    volume: 280000,
    isFavorite: false
  },

  // 원자재/통화
  {
    id: 11,
    name: 'KODEX 골드선물(H)',
    code: '132030',
    currentPrice: '13,240',
    changePercent: '1.85',
    changeDirection: 'up',
    category: '원자재/통화',
    popularity: 85,
    volume: 720000,
    isFavorite: true
  },
  {
    id: 12,
    name: 'TIGER 원유선물Enhanced(H)',
    code: '217770',
    currentPrice: '7,620',
    changePercent: '2.45',
    changeDirection: 'down',
    category: '원자재/통화',
    popularity: 72,
    volume: 480000,
    isFavorite: false
  },
  {
    id: 13,
    name: 'KODEX 미국달러선물',
    code: '261240',
    currentPrice: '12,850',
    changePercent: '0.65',
    changeDirection: 'up',
    category: '원자재/통화',
    popularity: 76,
    volume: 390000,
    isFavorite: false
  },

  // 레버리지/인버스
  {
    id: 14,
    name: 'TIGER 200레버리지',
    code: '122630',
    currentPrice: '15,420',
    changePercent: '5.82',
    changeDirection: 'up',
    category: '레버리지/인버스',
    popularity: 90,
    volume: 2500000,
    isFavorite: true
  },
  {
    id: 15,
    name: 'KODEX 인버스',
    code: '114800',
    currentPrice: '4,125',
    changePercent: '2.15',
    changeDirection: 'down',
    category: '레버리지/인버스',
    popularity: 84,
    volume: 1950000,
    isFavorite: false
  },
  {
    id: 16,
    name: 'TIGER 미국나스닥100레버리지(합성)',
    code: '315270',
    currentPrice: '18,650',
    changePercent: '6.45',
    changeDirection: 'up',
    category: '레버리지/인버스',
    popularity: 88,
    volume: 1780000,
    isFavorite: true
  },

  // 금리
  {
    id: 17,
    name: 'KODEX 단기채권',
    code: '153130',
    currentPrice: '102,340',
    changePercent: '0.12',
    changeDirection: 'up',
    category: '금리',
    popularity: 70,
    volume: 250000,
    isFavorite: false
  },
  {
    id: 18,
    name: 'TIGER 통안채',
    code: '276650',
    currentPrice: '100,850',
    changePercent: '0.05',
    changeDirection: 'down',
    category: '금리',
    popularity: 65,
    volume: 180000,
    isFavorite: false
  },

  // 부동산
  {
    id: 19,
    name: 'KODEX 리츠부동산',
    code: '114100',
    currentPrice: '9,240',
    changePercent: '0.95',
    changeDirection: 'up',
    category: '부동산',
    popularity: 73,
    volume: 420000,
    isFavorite: false
  },
  {
    id: 20,
    name: 'TIGER 미국MSCI리츠(합성)',
    code: '329200',
    currentPrice: '11,520',
    changePercent: '1.28',
    changeDirection: 'down',
    category: '부동산',
    popularity: 68,
    volume: 340000,
    isFavorite: true
  }
];

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
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('탐색');
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedSubTab, setSelectedSubTab] = useState('전체보기');
  const [selectedFilter, setSelectedFilter] = useState('꾸준 인기');
  const [popularityTrend, setPopularityTrend] = useState(true);
  const [volumeTrend, setVolumeTrend] = useState(true);
  const [chartTrend, setChartTrend] = useState('up');

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
      // 나중에 구현
      filtered = [];
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
                onClick={() => setSelectedTab(tab)}
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
          paddingBottom: selectedTab === '리스트' ? `${LAYOUT.BOTTOM_NAV_HEIGHT + 60}px` : `16px`
        }}
      >
        {/* 리스트 탭: ETF 리스트 */}
        {selectedTab === '리스트' ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}
          >
            {getFilteredContents().map((etf) => (
              <SimpleChartViewer
                key={etf.id}
                name={etf.name}
                code={etf.code}
                currentPrice={etf.currentPrice}
                changePercent={etf.changePercent}
                changeDirection={etf.changeDirection}
                showTopLabel={false}
                showPriceComparison={false}
                onClick={() => console.log(`ETF ${etf.id} 클릭`)}
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
    </div>
  );
};

export default Search;
