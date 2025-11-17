import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TopNav } from '../../components/common/TopNav';
import { PortfolioMainCard } from '../../components/common/PortfolioMainCard';
import { MarketIndexCard } from '../../components/common/MarketIndexCard';
import { ThemeCard } from '../../components/common/ThemeCard';
import { Chip } from '../../components/common/Chip';
import { StockFilterToggle } from '../../components/common/ToggleButton';
import { SimpleChartViewer } from '../../components/common/SimpleChartViewer';
import { Button } from '../../components/common/Button';
import { LAYOUT } from '../../constants/layout';
import { useScrollShadow } from '../../hooks/useScrollShadow';
import { getPortfolios, getDefaultPortfolioBookmark, getDefaultPortfolioData, getPortfolioOrder } from '../../utils/portfolioStorage';
import iconBellOutline from '../../assets/icon_bell_outline_1.svg';
import iconWhy from '../../assets/icon_why(12_12).svg';

const HomePage = () => {
  const navigate = useNavigate();
  const hasScrolled = useScrollShadow(0);
  const [trendFilter, setTrendFilter] = useState('up');
  const [activeChip, setActiveChip] = useState('오늘 인기');
  const [selectedPeriod, setSelectedPeriod] = useState('당일');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [popularTrend, setPopularTrend] = useState('up'); // 오늘 인기 트렌드 상태
  const [volumeTrend, setVolumeTrend] = useState('up'); // 거래량 트렌드 상태
  const [favoritePortfolio, setFavoritePortfolio] = useState(null); // 즐겨찾기된 포트폴리오

  const periodOptions = ['당일', '1주', 'YTD'];

  // 즐겨찾기된 포트폴리오 로드
  useEffect(() => {
    loadFavoritePortfolio();
  }, []);

  const loadFavoritePortfolio = () => {
    // 기본 포트폴리오 데이터 (금액, 수익률) 가져오기
    const defaultData = getDefaultPortfolioData();

    // 기본 포트폴리오 (대표 포트폴리오)
    const defaultPortfolio = {
      id: 'default-1',
      portfolioName: '미국 빅테크 배당금',
      isMainPortfolio: true,
      isBookmarked: getDefaultPortfolioBookmark(),
      amount: defaultData.amount,
      returnRate: defaultData.returnRate,
      riskType: '투자 성향',
      investmentStyle: '투자 키워드',
      createdAt: '2024-01-01T00:00:00.000Z'
    };

    const savedPortfolios = getPortfolios();

    // 모든 포트폴리오를 ID로 매핑
    const portfolioMap = {
      'default-1': defaultPortfolio,
      ...Object.fromEntries(savedPortfolios.map(p => [p.id, p]))
    };

    // 저장된 순서대로 포트폴리오 배열 생성
    const order = getPortfolioOrder();
    const sortedPortfolios = order
      .map(id => portfolioMap[id])
      .filter(Boolean); // undefined 제거 (삭제된 포트폴리오 등)

    // 첫 번째 포트폴리오가 즐겨찾기된 포트폴리오
    if (sortedPortfolios.length > 0) {
      setFavoritePortfolio(sortedPortfolios[0]);
    }
  };

  // 포트폴리오 이름에서 투자 스타일과 키워드 추출
  const getPortfolioTags = (portfolio) => {
    if (!portfolio) return ['#투자 성향', '#투자 키워드'];
    const riskType = portfolio.riskType || '안정형';
    const investmentStyle = portfolio.investmentStyle || '배당';
    return [`#${riskType}`, `#${investmentStyle}`];
  };

  // Mock data
  const marketIndices = [
    { name: 'S&P 500 선물', value: '6,410.75', changePercent: '2.59', changeDirection: 'up' },
    { name: '코스피', value: '6,410.75', changePercent: '2.59', changeDirection: 'down' },
    { name: 'S&P 500 선물', value: '6,410.75', changePercent: '2.59', changeDirection: 'up' },
    { name: '코스피', value: '6,410.75', changePercent: '2.59', changeDirection: 'down' },
    { name: 'S&P 500 선물', value: '6,410.75', changePercent: '2.59', changeDirection: 'up', showChart: true }
  ];

  // 상승 테마 더미 데이터
  const upThemes = [
    { rank: 1, theme: '양자 컴퓨터', changePercent: '24.5', changeDirection: 'up' },
    { rank: 2, theme: '소셜 미디어', changePercent: '20.65', changeDirection: 'up' },
    { rank: 3, theme: 'US', changePercent: '16.44', changeDirection: 'up' },
    { rank: 4, theme: 'AI 전력', changePercent: '13.2', changeDirection: 'up' },
    { rank: 5, theme: '구리', changePercent: '10.99', changeDirection: 'up' }
  ];

  // 하락 테마 더미 데이터
  const downThemes = [
    { rank: 1, theme: '반도체', changePercent: '18.3', changeDirection: 'down' },
    { rank: 2, theme: '금융', changePercent: '15.7', changeDirection: 'down' },
    { rank: 3, theme: '헬스케어', changePercent: '12.4', changeDirection: 'down' },
    { rank: 4, theme: '에너지', changePercent: '9.8', changeDirection: 'down' },
    { rank: 5, theme: '자동차', changePercent: '7.2', changeDirection: 'down' }
  ];

  // trendFilter에 따라 표시할 테마 선택
  const themes = trendFilter === 'up' ? upThemes : downThemes;

  // 꾸준 인기 상승 ETF 더미 데이터
  const popularUpEtfList = [
    {
      rank: 1,
      name: 'TIGER 미국S&P500',
      priceComparisonText: '실시간 가치보다',
      priceComparisonValue: '0.3',
      priceComparisonDirection: 'up',
      priceComparisonLabel: '저렴해요',
      currentPrice: '21,970',
      changePercent: '2.59',
      changeDirection: 'up'
    },
    {
      rank: 2,
      name: 'KODEX 미국나스닥100',
      priceComparisonText: '실시간 가치보다',
      priceComparisonValue: '0.5',
      priceComparisonDirection: 'up',
      priceComparisonLabel: '저렴해요',
      currentPrice: '18,450',
      changePercent: '3.21',
      changeDirection: 'up'
    },
    {
      rank: 3,
      name: 'TIGER 차이나전기차SOLACTIVE',
      priceComparisonText: '실시간 가치보다',
      priceComparisonValue: '0.2',
      priceComparisonDirection: 'up',
      priceComparisonLabel: '저렴해요',
      currentPrice: '15,320',
      changePercent: '1.85',
      changeDirection: 'up'
    }
  ];

  // 꾸준 인기 하락 ETF 더미 데이터
  const popularDownEtfList = [
    {
      rank: 1,
      name: 'KODEX 인버스',
      priceComparisonText: '실시간 가치보다',
      priceComparisonValue: '0.4',
      priceComparisonDirection: 'down',
      priceComparisonLabel: '비싸요',
      currentPrice: '14,650',
      changePercent: '2.93',
      changeDirection: 'down'
    },
    {
      rank: 2,
      name: 'TIGER 코스닥150 인버스',
      priceComparisonText: '실시간 가치보다',
      priceComparisonValue: '0.6',
      priceComparisonDirection: 'down',
      priceComparisonLabel: '비싸요',
      currentPrice: '12,340',
      changePercent: '3.15',
      changeDirection: 'down'
    },
    {
      rank: 3,
      name: 'KODEX 골드선물',
      priceComparisonText: '실시간 가치보다',
      priceComparisonValue: '0.3',
      priceComparisonDirection: 'down',
      priceComparisonLabel: '비싸요',
      currentPrice: '16,780',
      changePercent: '1.67',
      changeDirection: 'down'
    }
  ];

  // 거래량 상승 ETF 더미 데이터
  const volumeUpEtfList = [
    {
      rank: 1,
      name: 'KODEX 레버리지',
      priceComparisonText: '실시간 가치보다',
      priceComparisonValue: '0.8',
      priceComparisonDirection: 'up',
      priceComparisonLabel: '저렴해요',
      currentPrice: '24,180',
      changePercent: '4.12',
      changeDirection: 'up'
    },
    {
      rank: 2,
      name: 'TIGER 2차전지테마',
      priceComparisonText: '실시간 가치보다',
      priceComparisonValue: '0.6',
      priceComparisonDirection: 'up',
      priceComparisonLabel: '저렴해요',
      currentPrice: '19,880',
      changePercent: '3.47',
      changeDirection: 'up'
    },
    {
      rank: 3,
      name: 'KODEX 반도체',
      priceComparisonText: '실시간 가치보다',
      priceComparisonValue: '0.5',
      priceComparisonDirection: 'up',
      priceComparisonLabel: '저렴해요',
      currentPrice: '22,560',
      changePercent: '2.88',
      changeDirection: 'up'
    }
  ];

  // 거래량 하락 ETF 더미 데이터
  const volumeDownEtfList = [
    {
      rank: 1,
      name: 'TIGER 미국채10년선물',
      priceComparisonText: '실시간 가치보다',
      priceComparisonValue: '0.7',
      priceComparisonDirection: 'down',
      priceComparisonLabel: '비싸요',
      currentPrice: '13,920',
      changePercent: '3.56',
      changeDirection: 'down'
    },
    {
      rank: 2,
      name: 'KODEX 은행',
      priceComparisonText: '실시간 가치보다',
      priceComparisonValue: '0.4',
      priceComparisonDirection: 'down',
      priceComparisonLabel: '비싸요',
      currentPrice: '17,480',
      changePercent: '2.74',
      changeDirection: 'down'
    },
    {
      rank: 3,
      name: 'TIGER 중국항셍테크',
      priceComparisonText: '실시간 가치보다',
      priceComparisonValue: '0.5',
      priceComparisonDirection: 'down',
      priceComparisonLabel: '비싸요',
      currentPrice: '11,230',
      changePercent: '2.12',
      changeDirection: 'down'
    }
  ];

  // activeChip과 트렌드 상태에 따라 표시할 ETF 목록 선택
  const etfList = activeChip === '오늘 인기'
    ? (popularTrend === 'up' ? popularUpEtfList : popularDownEtfList)
    : (volumeTrend === 'up' ? volumeUpEtfList : volumeDownEtfList);

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
          title="내 투자"
          depth="1"
          state="icon"
          showBackButton={false}
          showTitle={true}
          showIconL={false}
          showIconR={true}
          iconR={iconBellOutline}
          onIconRClick={() => console.log('Bell icon clicked')}
        />
      </div>

      {/* Main Portfolio Card */}
      <div
        style={{
          padding: `${LAYOUT.TOP_NAV_MARGIN}px ${LAYOUT.HORIZONTAL_PADDING}px 12px`,
          width: '100%'
        }}
      >
        {favoritePortfolio ? (
          <div onClick={() => navigate(`/portfolio/${favoritePortfolio.id}/detail`)}>
            <PortfolioMainCard
              portfolioType="대표 포트폴리오"
              tags={getPortfolioTags(favoritePortfolio)}
              title={favoritePortfolio.portfolioName}
              isFavorite={true}
              amount={favoritePortfolio.amount?.toLocaleString('ko-KR') || '0'}
              changePercent={Math.abs(favoritePortfolio.returnRate || 0).toString()}
              changeDirection={favoritePortfolio.returnRate >= 0 ? 'up' : 'down'}
              primaryButtonText={favoritePortfolio.returnRate >= 0 ? '리밸런싱 확인' : '리밸런싱 필요'}
              secondaryButtonText="체크포인트"
              onFavoriteClick={(e) => {
                e.stopPropagation();
                navigate('/portfolio');
              }}
              onPrimaryButtonClick={(e) => {
                e.stopPropagation();
                navigate(`/portfolio/${favoritePortfolio.id}/rebalance`);
              }}
              onSecondaryButtonClick={(e) => {
                e.stopPropagation();
                console.log('체크포인트 clicked:', favoritePortfolio.id);
              }}
            />
          </div>
        ) : (
          <div
            style={{
              backgroundColor: '#FFFFFF',
              boxShadow: '1px 2px 13.6px 0px rgba(52, 144, 255, 0.25)',
              borderRadius: '12px',
              padding: '40px 16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
            onClick={() => navigate('/portfolio/create')}
          >
            <p
              style={{
                fontFamily: 'Pretendard, sans-serif',
                fontSize: '16px',
                fontWeight: 500,
                lineHeight: 1.5,
                color: '#757E8F',
                margin: 0,
                textAlign: 'center'
              }}
            >
              아직 생성된 포트폴리오가 없습니다.
            </p>
            <p
              style={{
                fontFamily: 'Pretendard, sans-serif',
                fontSize: '14px',
                fontWeight: 500,
                lineHeight: 1.5,
                color: '#3490FF',
                margin: 0,
                textAlign: 'center'
              }}
            >
              포트폴리오 제작하기
            </p>
          </div>
        )}
      </div>

      {/* Market Indices Section */}
      <div
        style={{
          backgroundColor: '#FAFCFF',
          width: '100%',
          paddingTop: '31px',
          paddingBottom: '16px'
        }}
      >
        {/* Horizontal scroll container */}
        <div
          style={{
            paddingLeft: `${LAYOUT.HORIZONTAL_PADDING}px`,
            paddingBottom: '20px',
            width: '100%',
            overflowX: 'auto',
            overflowY: 'hidden',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: '8px',
              alignItems: 'center',
              width: 'fit-content'
            }}
          >
            {marketIndices.map((index, idx) => (
              <MarketIndexCard
                key={idx}
                name={index.name}
                value={index.value}
                changePercent={index.changePercent}
                changeDirection={index.changeDirection}
                showChart={index.showChart}
                onClick={() => console.log(`Index ${idx} clicked`)}
              />
            ))}
          </div>
        </div>

        {/* Info section */}
        <div
          style={{
            padding: `0 ${LAYOUT.HORIZONTAL_PADDING}px`,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            width: '100%',
            height: '26px'
          }}
        >
          {/* Left: info icon + text */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <div
              style={{
                width: '12px',
                height: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <img
                src={iconWhy}
                alt=""
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'block'
                }}
              />
            </div>
            <p
              style={{
                fontFamily: 'Pretendard, sans-serif',
                fontSize: '12px',
                fontWeight: 500,
                lineHeight: 1.5,
                color: '#757E8F',
                margin: 0,
                whiteSpace: 'nowrap'
              }}
            >
              지수에 대해 더 알아보기
            </p>
          </div>

          {/* Right: description text */}
          <p
            style={{
              fontFamily: 'Pretendard, sans-serif',
              fontSize: '10px',
              fontWeight: 500,
              lineHeight: 1.25,
              color: '#757E8F',
              margin: 0,
              textAlign: 'right',
              whiteSpace: 'pre-line'
            }}
          >
            {'지수 선물의 등락을 보고 해당지수를 따라가는\n상품의 등락을 예측해봐요'}
          </p>
        </div>
      </div>

      {/* Popular Themes Section */}
      <div
        style={{
          width: '100%',
          paddingTop: '20px'
        }}
      >
        {/* Section header */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            width: '100%'
          }}
        >
          {/* Title */}
          <div
            style={{
              padding: `10px ${LAYOUT.HORIZONTAL_PADDING}px`,
              display: 'flex',
              gap: '10px',
              alignItems: 'flex-end'
            }}
          >
            <p
              style={{
                fontFamily: 'Pretendard, sans-serif',
                fontSize: '20px',
                fontWeight: 600,
                lineHeight: 1.35,
                color: '#000000',
                margin: 0,
                whiteSpace: 'nowrap'
              }}
            >
              인기 테마
            </p>
          </div>

          {/* Filter row: toggle + date chip */}
          <div
            style={{
              padding: `0 ${LAYOUT.HORIZONTAL_PADDING}px`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%'
            }}
          >
            {/* Toggle */}
            <StockFilterToggle
              value={trendFilter}
              onChange={setTrendFilter}
            />

            {/* Date dropdown */}
            <div
              style={{
                position: 'relative'
              }}
            >
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E6E7EA',
                  borderRadius: '16px',
                  padding: '8px 6px 8px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px',
                  cursor: 'pointer'
                }}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <p
                  style={{
                    fontFamily: 'Pretendard, sans-serif',
                    fontSize: '16px',
                    fontWeight: 600,
                    lineHeight: 1.35,
                    color: '#3490FF',
                    margin: 0,
                    whiteSpace: 'nowrap'
                  }}
                >
                  {selectedPeriod}
                </p>
                <div
                  style={{
                    width: '24px',
                    height: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease'
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 10L12 14L8 10" stroke="#3490FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>

              {/* Dropdown menu */}
              {isDropdownOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 4px)',
                    right: 0,
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E6E7EA',
                    borderRadius: '12px',
                    boxShadow: '0px 4px 12px 0px rgba(0, 0, 0, 0.1)',
                    overflow: 'hidden',
                    zIndex: 1000,
                    minWidth: '80px'
                  }}
                >
                  {periodOptions.map((option, index) => (
                    <div
                      key={option}
                      onClick={() => {
                        setSelectedPeriod(option);
                        setIsDropdownOpen(false);
                      }}
                      style={{
                        padding: '12px 16px',
                        cursor: 'pointer',
                        backgroundColor: selectedPeriod === option ? '#F7F7F8' : '#FFFFFF',
                        borderBottom: index < periodOptions.length - 1 ? '1px solid #E6E7EA' : 'none',
                        transition: 'background-color 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        if (selectedPeriod !== option) {
                          e.currentTarget.style.backgroundColor = '#FAFCFF';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (selectedPeriod !== option) {
                          e.currentTarget.style.backgroundColor = '#FFFFFF';
                        }
                      }}
                    >
                      <p
                        style={{
                          fontFamily: 'Pretendard, sans-serif',
                          fontSize: '14px',
                          fontWeight: selectedPeriod === option ? 600 : 500,
                          lineHeight: 1.5,
                          color: selectedPeriod === option ? '#3490FF' : '#1A1C20',
                          margin: 0,
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {option}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Themes horizontal scroll */}
        <div
          style={{
            paddingLeft: `${LAYOUT.HORIZONTAL_PADDING}px`,
            paddingTop: '20px',
            paddingBottom: '20px',
            width: '100%',
            overflowX: 'auto',
            overflowY: 'visible',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: '8px',
              alignItems: 'center',
              width: 'fit-content'
            }}
          >
            {themes.map((theme, idx) => (
              <ThemeCard
                key={idx}
                rank={theme.rank}
                theme={theme.theme}
                changePercent={theme.changePercent}
                changeDirection={theme.changeDirection}
                onClick={() => console.log(`Theme ${idx} clicked`)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Interest ETF Section */}
      <div
        style={{
          width: '100%',
          paddingTop: `${LAYOUT.SECTION_GAP}px`
        }}
      >
        {/* Section header */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            width: '100%'
          }}
        >
          {/* Title */}
          <div
            style={{
              padding: `10px ${LAYOUT.HORIZONTAL_PADDING}px`,
              display: 'flex',
              gap: '10px',
              alignItems: 'center'
            }}
          >
            <p
              style={{
                fontFamily: 'Pretendard, sans-serif',
                fontSize: '20px',
                fontWeight: 600,
                lineHeight: 1.35,
                color: '#000000',
                margin: 0,
                whiteSpace: 'nowrap'
              }}
            >
              관심 ETF
            </p>
          </div>

          {/* Filter chips */}
          <div
            style={{
              padding: `0 ${LAYOUT.HORIZONTAL_PADDING}px`,
              display: 'flex',
              gap: '10px',
              alignItems: 'center'
            }}
          >
            <Chip
              title="오늘 인기"
              color={activeChip === '오늘 인기' ? (popularTrend === 'up' ? 'upTrend' : 'downTrend') : 'default'}
              state={activeChip === '오늘 인기' ? 'select' : 'nonSelect'}
              showIcon={activeChip === '오늘 인기'}
              onClick={() => {
                if (activeChip === '오늘 인기') {
                  // 이미 선택된 상태면 트렌드 토글
                  setPopularTrend(popularTrend === 'up' ? 'down' : 'up');
                } else {
                  // 선택되지 않은 상태면 upTrend로 리셋하고 선택
                  setPopularTrend('up');
                  setActiveChip('오늘 인기');
                }
              }}
            />
            <Chip
              title="거래량"
              color={activeChip === '거래량' ? (volumeTrend === 'up' ? 'upTrend' : 'downTrend') : 'default'}
              state={activeChip === '거래량' ? 'select' : 'nonSelect'}
              showIcon={activeChip === '거래량'}
              onClick={() => {
                if (activeChip === '거래량') {
                  // 이미 선택된 상태면 트렌드 토글
                  setVolumeTrend(volumeTrend === 'up' ? 'down' : 'up');
                } else {
                  // 선택되지 않은 상태면 upTrend로 리셋하고 선택
                  setVolumeTrend('up');
                  setActiveChip('거래량');
                }
              }}
            />
          </div>

          {/* ETF List */}
          <div
            style={{
              padding: `0 ${LAYOUT.HORIZONTAL_PADDING}px 20px`,
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              width: '100%'
            }}
          >
            {etfList.map((etf, idx) => (
              <SimpleChartViewer
                key={idx}
                rank={etf.rank}
                name={etf.name}
                priceComparisonText={etf.priceComparisonText}
                priceComparisonValue={etf.priceComparisonValue}
                priceComparisonDirection={etf.priceComparisonDirection}
                priceComparisonLabel={etf.priceComparisonLabel}
                currentPrice={etf.currentPrice}
                changePercent={etf.changePercent}
                changeDirection={etf.changeDirection}
                onClick={() => console.log(`ETF ${idx} clicked`)}
              />
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div
          style={{
            padding: `12px ${LAYOUT.HORIZONTAL_PADDING}px 0`,
            width: '100%',
            marginBottom: '45px'
          }}
        >
          <Button
            variant="skeleton2"
            onClick={() => console.log('View all clicked')}
          >
            전체 보기
          </Button>
        </div>
      </div>

      {/* Hide scrollbar for horizontal scroll containers */}
      <style>
        {`
          /* Hide scrollbar for Chrome, Safari and Opera */
          *::-webkit-scrollbar {
            display: none;
          }
          /* Hide scrollbar for IE, Edge and Firefox */
          * {
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
          }
        `}
      </style>
    </div>
  );
};

export default HomePage;
