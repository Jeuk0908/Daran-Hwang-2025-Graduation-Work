import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { TopNav } from '../../components/common/TopNav';
import { CenterTabNav } from '../../components/common/CenterTabNav';
import { TipCard } from '../../components/common/TipCard';
import { VideoThumbnail } from '../../components/common/VideoThumbnail';
import { NewsCard } from '../../components/common/NewsCard';
import { shuffleArray } from '../../utils/shuffle';
import { LAYOUT } from '../../constants/layout';
import { useScrollShadow } from '../../hooks/useScrollShadow';
import iconDividen from '../../assets/분배금_24.svg';
import iconNAV from '../../assets/NAV_24.svg';
import iconETF from '../../assets/ETF_24.svg';
import iconUnderlying from '../../assets/기초지수_24.svg';
import iconDividenReinvest from '../../assets/분배금 재투자_24.svg';
import iconFee from '../../assets/총보수_24.svg';
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

const Bookmark = () => {
  const navigate = useNavigate();
  const hasScrolled = useScrollShadow(0);
  const [activeTab, setActiveTab] = useState('전체');

  // Q&A 데이터
  const qaData = [
    {
      id: 1,
      icon: iconDividen,
      title: 'TR ETF의 장점이 무엇인가요?',
      tips: [
        {
          title: '복리 효과 극대화',
          content:
            '배당금을 받을 때마다 부과되는 세금을 즉시 내지 않고, 그 금액을 온전히 재투자해 장기적으로 자산이 더 빠르게 불어납니다.'
        },
        {
          title: '번거로움 해소',
          content:
            '배당금이 자동으로 재투자되기 때문에, 투자자가 일일이 재투자할 필요가 없어 관리가 편리합니다.'
        },
        {
          title: '장기 투자에 유리',
          content:
            '꾸준한 현금 흐름보다는 장기적인 자산 성장을 목표로 할 때 가장 효과적인 전략입니다.'
        }
      ],
      linkText: 'TR ETF 상품 검색하기',
      linkIcon: iconDividenReinvest,
      defaultOpen: true,
      initialBookmarked: true
    },
    {
      id: 2,
      icon: iconNAV,
      title: '왜 이 ETF는 시장 가격과 NAV가 다른가요?',
      tips: [
        {
          title: 'NAV란?',
          content:
            'NAV(순자산가치)는 ETF가 보유한 자산의 실제 가치를 나타내며, 시장 가격은 투자자들의 수요와 공급에 의해 결정됩니다.'
        }
      ],
      linkText: 'NAV에 대해 더 알아보기',
      defaultOpen: false,
      initialBookmarked: true
    },
    {
      id: 3,
      icon: iconETF,
      title: '어떤 ETF를 사야 할지 모르겠어요.',
      tips: [
        {
          title: '투자 목표 설정',
          content:
            '자신의 투자 목표와 위험 감수 수준을 먼저 파악하고, 그에 맞는 ETF를 선택하는 것이 중요합니다.'
        }
      ],
      linkText: 'ETF 선택 가이드 보기',
      defaultOpen: false,
      initialBookmarked: true
    },
    {
      id: 4,
      icon: iconUnderlying,
      title: 'ETF의 수익률은 기초지수와 왜 조금씩 다른가요?',
      tips: [
        {
          title: '추적오차',
          content:
            'ETF는 기초지수를 추종하지만, 운용 비용, 배당금 재투자 시기 등의 이유로 약간의 차이가 발생할 수 있습니다.'
        }
      ],
      linkText: '추적오차에 대해 알아보기',
      defaultOpen: false,
      initialBookmarked: true
    },
    {
      id: 5,
      icon: iconDividen,
      title: 'ETF 분배금은 어떻게 받나요?',
      tips: [
        {
          title: '분배금 지급',
          content:
            'ETF 분배금은 정해진 날짜에 투자자의 계좌로 자동 입금되며, 재투자 옵션을 선택할 수도 있습니다.'
        }
      ],
      linkText: '분배금 일정 확인하기',
      defaultOpen: false,
      initialBookmarked: true
    },
    {
      id: 6,
      icon: iconFee,
      title: '총보수가 낮으면 무조건 좋은 ETF인가요?',
      tips: [
        {
          title: '종합적 평가 필요',
          content:
            '총보수도 중요하지만, 추적오차, 거래량, 운용사 신뢰도 등을 종합적으로 고려해야 합니다.'
        }
      ],
      linkText: 'ETF 평가 기준 알아보기',
      defaultOpen: false,
      initialBookmarked: true
    }
  ];

  // 영상 TIP 데이터
  const videos = [
    {
      id: 1,
      thumbnail: thumbnail1,
      title: 'ETF 투자 초보자를 위한 완벽 가이드',
      variant: 'shorts',
      isBookmarked: true
    },
    {
      id: 2,
      thumbnail: thumbnail2,
      title: 'S&P500 ETF 투자 전략',
      variant: 'landscape',
      isBookmarked: true
    },
    {
      id: 3,
      thumbnail: thumbnail3,
      title: '배당 ETF로 월세 만들기',
      variant: 'landscape',
      isBookmarked: true
    },
    {
      id: 4,
      thumbnail: thumbnail4,
      title: 'TR ETF vs 일반 ETF 차이점 완벽 비교',
      variant: 'shorts',
      isBookmarked: true
    },
    {
      id: 5,
      thumbnail: thumbnail5,
      title: '리밸런싱 타이밍 잡는 법',
      variant: 'landscape',
      isBookmarked: true
    },
    {
      id: 6,
      thumbnail: thumbnail6,
      title: 'ETF 총보수 비교하는 방법',
      variant: 'landscape',
      isBookmarked: true
    },
    {
      id: 7,
      thumbnail: thumbnail7,
      title: '2024년 추천 ETF 포트폴리오 구성하기',
      variant: 'shorts',
      isBookmarked: true
    },
    {
      id: 8,
      thumbnail: thumbnail8,
      title: 'NAV와 시장가격 차이 이해하기',
      variant: 'landscape',
      isBookmarked: true
    }
  ];

  // 뉴스 데이터
  const newsData = [
    {
      id: 1,
      thumbnail: thumbnail9,
      title: 'ETF 시장 200조 돌파, 이 종목 투자로 정기예금 33배 수익',
      isBookmarked: true
    },
    {
      id: 2,
      thumbnail: thumbnail4,
      title: '고금리 시대, 개인 투자자들 이 ETF에 뭉칫돈 몰리는 이유는?',
      isBookmarked: true
    },
    {
      id: 3,
      thumbnail: thumbnail10,
      title: '금리 인하 기대감에 채권 ETF로 선제적 대응하는 투자자들',
      isBookmarked: true
    },
    {
      id: 4,
      thumbnail: thumbnail5,
      title: '한국 ETF, 글로벌 시장서 수익률 톱3 비결은?',
      isBookmarked: true
    },
    {
      id: 5,
      thumbnail: thumbnail7,
      title: '운용사들 보수 경쟁에 투자자들 웃음 짓는 이유',
      isBookmarked: true
    },
    {
      id: 6,
      thumbnail: thumbnail6,
      title: '인기 테마 ETF 복제 논란, 차별화 없는 상품에 건전성 우려',
      isBookmarked: true
    },
    {
      id: 7,
      thumbnail: thumbnail1,
      title: '가상자산 현물 ETF 국내 도입, 투자 시장 지각변동 오나',
      isBookmarked: true
    },
    {
      id: 8,
      thumbnail: thumbnail2,
      title: '거래량 없는 좀비 ETF, 상장폐지 위험에 투자자들 비상',
      isBookmarked: true
    },
    {
      id: 9,
      thumbnail: thumbnail8,
      title: '해외 ETF 투자 시 환율과 세금 모르면 수익 반토막',
      isBookmarked: true
    },
    {
      id: 10,
      thumbnail: thumbnail3,
      title: '액티브 ETF 전성시대, 펀드매니저 역량이 곧 수익률',
      isBookmarked: true
    }
  ];

  // 모든 컨텐츠를 하나의 배열로 통합 (타입 정보 추가)
  const allContent = useMemo(() => {
    const combined = [
      ...qaData.map((item) => ({ ...item, type: 'qa' })),
      ...videos.map((item) => ({ ...item, type: 'video' })),
      ...newsData.map((item) => ({ ...item, type: 'news' }))
    ];

    // Fisher-Yates 알고리즘으로 랜덤 섞기
    return shuffleArray(combined);
  }, []);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // 탭 인덱스 가져오기
  const getTabIndex = (tabName) => {
    const tabs = ['전체', 'Q&A', '영상 TIP', '뉴스'];
    return tabs.indexOf(tabName);
  };

  const handleVideoPlay = (videoId) => {
    console.log(`비디오 재생: ${videoId}`);
  };

  const handleBookmarkToggle = (videoId, newBookmarkState) => {
    console.log(`비디오 ${videoId} 북마크 ${newBookmarkState ? '추가' : '제거'}`);
  };

  const handleNewsClick = (newsId) => {
    console.log(`뉴스 ${newsId} 클릭`);
  };

  const handleNewsBookmarkToggle = (newsId, newBookmarkState) => {
    console.log(`뉴스 ${newsId} 북마크 ${newBookmarkState ? '추가' : '제거'}`);
  };

  // 탭별 컨텐츠 표시 여부 및 스타일
  const getTabContentStyle = (tabName) => {
    const isActive = activeTab === tabName;
    const currentIndex = getTabIndex(activeTab);
    const tabIndex = getTabIndex(tabName);

    // 현재 활성 탭보다 왼쪽에 있으면 -100%, 오른쪽에 있으면 +100%
    let translateX = '0%';
    if (!isActive) {
      translateX = tabIndex < currentIndex ? '-100%' : '100%';
    }

    return {
      position: isActive ? 'relative' : 'absolute',
      top: isActive ? 'auto' : 0,
      left: 0,
      right: 0,
      opacity: isActive ? 1 : 0,
      transform: `translateX(${translateX})`,
      transition: 'opacity 0.3s ease, transform 0.3s ease',
      pointerEvents: isActive ? 'auto' : 'none'
    };
  };

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#FFFFFF',
        paddingBottom: '88px'
      }}
    >
      {/* TopNav with Safe Area */}
      <div style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: '#FFFFFF',
        padding: `0 ${LAYOUT.HORIZONTAL_PADDING}px 0`,
        boxShadow: hasScrolled ? '0 2px 8px 0 rgba(0, 0, 0, 0.04)' : 'none',
        transition: 'box-shadow 0.2s ease'
      }}>
        <TopNav
          title="북마크"
          depth="2"
          state="icon"
          showBackButton={true}
          showTitle={true}
          showIconL={false}
          showIconR={false}
          onBackClick={handleBackClick}
        />
      </div>

      {/* 탭 네비게이션 */}
      <div>
        <CenterTabNav
          tabs={['전체', 'Q&A', '영상 TIP', '뉴스']}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      </div>

      {/* 탭 컨텐츠 컨테이너 */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          overflow: 'hidden'
        }}
      >
        {/* 전체 탭 컨텐츠 - Masonry Grid Layout */}
        <div style={getTabContentStyle('전체')}>
          <div
            style={{
              padding: `0 ${LAYOUT.HORIZONTAL_PADDING}px 20px`,
              marginTop: `${LAYOUT.SECTION_GAP}px`,
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: `${LAYOUT.GRID_GAP.ROW}px`,
              columnGap: `${LAYOUT.GRID_GAP.COLUMN}px`,
              gridAutoFlow: 'dense',
              alignItems: 'start'
            }}
          >
            {allContent.map((item) => {
              // Q&A 타입 - 전체 너비
              if (item.type === 'qa') {
                return (
                  <div
                    key={`qa-${item.id}`}
                    style={{
                      gridColumn: 'span 2',
                      marginBottom: '4px'
                    }}
                  >
                    <TipCard
                      icon={item.icon}
                      title={item.title}
                      tips={item.tips}
                      linkText={item.linkText}
                      linkIcon={item.linkIcon}
                      showLink={true}
                      defaultOpen={item.defaultOpen}
                      initialBookmarked={item.initialBookmarked}
                      onToggle={(isOpen) => {
                        console.log(`${item.title} ${isOpen ? '열림' : '닫힘'}`);
                      }}
                      onBookmarkChange={(isBookmarked) => {
                        console.log(
                          `${item.title} 북마크 ${isBookmarked ? '추가' : '제거'}`
                        );
                      }}
                      onLinkClick={() => {
                        console.log(`${item.linkText} 클릭`);
                      }}
                    />
                  </div>
                );
              }

              // 영상 타입
              if (item.type === 'video') {
                return (
                  <div
                    key={`video-${item.id}`}
                    style={{
                      gridRowEnd: item.variant === 'shorts' ? 'span 3' : 'span 1'
                    }}
                  >
                    <VideoThumbnail
                      thumbnail={item.thumbnail}
                      title={item.title}
                      variant={item.variant}
                      isBookmarked={item.isBookmarked}
                      onPlayClick={() => handleVideoPlay(item.id)}
                      onBookmarkClick={(newState) =>
                        handleBookmarkToggle(item.id, newState)
                      }
                    />
                  </div>
                );
              }

              // 뉴스 타입
              if (item.type === 'news') {
                return (
                  <div key={`news-${item.id}`}>
                    <NewsCard
                      thumbnail={item.thumbnail}
                      title={item.title}
                      isBookmarked={item.isBookmarked}
                      onCardClick={() => handleNewsClick(item.id)}
                      onBookmarkClick={(newState) =>
                        handleNewsBookmarkToggle(item.id, newState)
                      }
                    />
                  </div>
                );
              }

              return null;
            })}
          </div>
        </div>

        {/* Q&A 탭 컨텐츠 */}
        <div style={getTabContentStyle('Q&A')}>
          <div
            style={{
              padding: `0 ${LAYOUT.HORIZONTAL_PADDING}px 20px`,
              display: 'flex',
              flexDirection: 'column',
              gap: `${LAYOUT.CARD_GAP}px`,
              marginTop: `${LAYOUT.SECTION_GAP}px`
            }}
          >
            {qaData.map((qa) => (
              <TipCard
                key={qa.id}
                icon={qa.icon}
                title={qa.title}
                tips={qa.tips}
                linkText={qa.linkText}
                linkIcon={qa.linkIcon}
                showLink={true}
                defaultOpen={qa.defaultOpen}
                initialBookmarked={qa.initialBookmarked}
                onToggle={(isOpen) => {
                  console.log(`${qa.title} ${isOpen ? '열림' : '닫힘'}`);
                }}
                onBookmarkChange={(isBookmarked) => {
                  console.log(
                    `${qa.title} 북마크 ${isBookmarked ? '추가' : '제거'}`
                  );
                }}
                onLinkClick={() => {
                  console.log(`${qa.linkText} 클릭`);
                }}
              />
            ))}
          </div>
        </div>

        {/* 영상 TIP 탭 컨텐츠 */}
        <div style={getTabContentStyle('영상 TIP')}>
          <div
            style={{
              padding: `0 ${LAYOUT.HORIZONTAL_PADDING}px 20px`,
              marginTop: `${LAYOUT.SECTION_GAP}px`,
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: `${LAYOUT.GRID_GAP.ROW}px`,
              columnGap: `${LAYOUT.GRID_GAP.COLUMN}px`,
              justifyItems: 'center',
              alignItems: 'center'
            }}
          >
            {videos.map((video) => (
              <div
                key={video.id}
                style={{
                  gridRowEnd: video.variant === 'shorts' ? 'span 3' : 'span 1'
                }}
              >
                <VideoThumbnail
                  thumbnail={video.thumbnail}
                  title={video.title}
                  variant={video.variant}
                  isBookmarked={video.isBookmarked}
                  onPlayClick={() => handleVideoPlay(video.id)}
                  onBookmarkClick={(newState) =>
                    handleBookmarkToggle(video.id, newState)
                  }
                />
              </div>
            ))}
          </div>
        </div>

        {/* 뉴스 탭 컨텐츠 */}
        <div style={getTabContentStyle('뉴스')}>
          <div
            style={{
              padding: `0 ${LAYOUT.HORIZONTAL_PADDING}px 20px`,
              marginTop: `${LAYOUT.SECTION_GAP}px`,
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: `${LAYOUT.GRID_GAP.ROW}px`,
              columnGap: `${LAYOUT.GRID_GAP.COLUMN}px`,
              justifyItems: 'center',
              alignItems: 'start'
            }}
          >
            {newsData.map((news) => (
              <NewsCard
                key={news.id}
                thumbnail={news.thumbnail}
                title={news.title}
                isBookmarked={news.isBookmarked}
                onCardClick={() => handleNewsClick(news.id)}
                onBookmarkClick={(newState) =>
                  handleNewsBookmarkToggle(news.id, newState)
                }
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookmark;
