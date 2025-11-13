import { useState, useMemo } from 'react';
import { LAYOUT } from '../../constants/layout';
import { VideoThumbnail } from '../../components/common/VideoThumbnail';
import { NewsCard } from '../../components/common/NewsCard';
import { TipCard } from '../../components/common/TipCard';
import VocabularyCard from '../../components/common/VocabularyCard';
import { SimpleChartViewer } from '../../components/common/SimpleChartViewer';
import iconSearch from '../../assets/icon_search.svg';
import iconDividen from '../../assets/분배금_24.svg';
import iconNAV from '../../assets/NAV_24.svg';
import iconETF from '../../assets/ETF_24.svg';
import iconUnderlying from '../../assets/기초지수_24.svg';
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
import thumbnail8 from '../../assets/images/pexels-pixabay-259200.jpg';
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
  {
    id: 1,
    name: 'TIGER 미국S&P500',
    code: '12341',
    currentPrice: '21,970',
    changePercent: '2.59',
    changeDirection: 'up'
  },
  {
    id: 2,
    name: 'TIGER 미국S&P500',
    code: '2452345',
    currentPrice: '21,970',
    changePercent: '2.59',
    changeDirection: 'down'
  },
  {
    id: 3,
    name: 'TIGER 미국S&P500',
    code: '3456345',
    currentPrice: '21,970',
    changePercent: '2.59',
    changeDirection: 'up'
  },
  {
    id: 4,
    name: 'TIGER 미국S&P500',
    code: '235234',
    currentPrice: '21,970',
    changePercent: '2.59',
    changeDirection: 'up'
  },
  {
    id: 5,
    name: 'TIGER 미국S&P500',
    code: '546785678',
    currentPrice: '21,970',
    changePercent: '2.59',
    changeDirection: 'down'
  },
  {
    id: 6,
    name: 'TIGER 미국S&P500',
    code: '2345234',
    currentPrice: '21,970',
    changePercent: '2.59',
    changeDirection: 'up'
  },
  {
    id: 7,
    name: 'TIGER 미국S&P500',
    code: '4567456',
    currentPrice: '21,970',
    changePercent: '2.59',
    changeDirection: 'down'
  },
  {
    id: 8,
    name: 'TIGER 미국S&P500',
    code: '2345234',
    currentPrice: '21,970',
    changePercent: '2.59',
    changeDirection: 'up'
  },
  {
    id: 9,
    name: 'TIGER 미국S&P500',
    code: '4567456',
    currentPrice: '21,970',
    changePercent: '2.59',
    changeDirection: 'down'
  },
  {
    id: 10,
    name: 'TIGER 미국S&P500',
    code: '2345234',
    currentPrice: '21,970',
    changePercent: '2.59',
    changeDirection: 'up'
  }
];

const TABS = ['탐색', '리스트', '지수'];

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('탐색');

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
      return ETF_LIST_DATA.filter(item => {
        if (searchQuery.trim()) {
          return item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                 item.code.includes(searchQuery);
        }
        return true;
      });
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
  }, [searchQuery, selectedTab]);

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#FFFFFF',
        paddingBottom: `${LAYOUT.BOTTOM_NAV_HEIGHT}px`,
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
            borderBottom: '1px solid #F7F7F8'
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
                  opacity: 0.8
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
                    whiteSpace: 'nowrap'
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

          {/* 펼치기 버튼 (리스트 탭에서만 표시) */}
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
                  justifyContent: 'center'
                }}
                onClick={() => console.log('펼치기 클릭')}
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
                  펼치기
                </p>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 콘텐츠 리스트 */}
      <div
        style={{
          padding: `16px ${LAYOUT.HORIZONTAL_PADDING}px`
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
    </div>
  );
};

export default Search;
