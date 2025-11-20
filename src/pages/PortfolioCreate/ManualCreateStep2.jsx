import { useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { SimpleChartViewer } from '../../components/common/SimpleChartViewer';
import { TrendChip, Chip } from '../../components/common/Chip';
import { LAYOUT } from '../../constants/layout';
import { useScrollShadow } from '../../hooks/useScrollShadow';
import { getAllETFs } from '../ETFDetail/data/mockData';
import iconBackL from '../../assets/icon_back_L.svg';
import iconSearch from '../../assets/icon_search.svg';

const TABS = [
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

const ManualCreateStep2 = ({ mode = 'create' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const hasScrolled = useScrollShadow(0);

  const previousData = location.state || {};

  // 최대 선택 가능 ETF 개수 계산
  // 추가 모드: 5 - 현재 ETF 개수 (최소 0개)
  // 생성 모드: 5개
  const maxETFs = mode === 'add'
    ? Math.max(0, 5 - (previousData.currentETFCount || 0))
    : 5;

  const [selectedTab, setSelectedTab] = useState('전체보기');
  const [selectedFilter, setSelectedFilter] = useState('꾸준 인기'); // '꾸준 인기' or '거래량'
  const [popularityTrend, setPopularityTrend] = useState(true); // 꾸준 인기: true=상승, false=하락
  const [volumeTrend, setVolumeTrend] = useState(true); // 거래량: true=상승, false=하락
  const [selectedETFs, setSelectedETFs] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleETFClick = (etfId) => {
    if (selectedETFs.includes(etfId)) {
      setSelectedETFs(selectedETFs.filter(id => id !== etfId));
    } else {
      if (selectedETFs.length < maxETFs) {
        setSelectedETFs([...selectedETFs, etfId]);
      }
    }
  };

  const handleNextClick = () => {
    // 1개 이상 선택되었을 때 다음 페이지로 이동
    if (selectedETFs.length === 0) return;

    // 새로 선택한 ETF 목록 (mockData에서 가져오기)
    const allMockETFs = getAllETFs();
    const newlySelectedETFs = selectedETFs.map(id => {
      const etf = allMockETFs.find(e => e.id === id);
      if (!etf) {
        console.error('ETF not found:', id);
        return null;
      }
      return {
        ...etf,
        price: etf.currentPrice?.toLocaleString('ko-KR') || '0' // price 필드 추가
      };
    }).filter(Boolean); // null 제거

    // add 모드: 기존 ETF + 새로 선택한 ETF 합치기
    // create 모드: 새로 선택한 ETF만
    const allETFs = mode === 'add'
      ? [...(previousData.existingETFs || []), ...newlySelectedETFs]
      : newlySelectedETFs;

    console.log('ManualCreateStep2 - Navigating to step3 with:', {
      selectedETFs: allETFs,
      isAddMode: mode === 'add'
    });

    // 다음 단계로 이동 (3/4) - 모든 ETF 정보 전달
    navigate('/portfolio/create/step3', {
      state: {
        ...previousData,
        selectedETFs: allETFs,
        isAddMode: mode === 'add' // step3에서 add 모드임을 알 수 있도록
      }
    });
  };

  const handleSelectedETFClick = () => {
    // TODO: 선택된 ETF 목록 모달 표시
    console.log('선택된 ETF:', selectedETFs);
  };

  const handleSearchOpen = () => {
    setIsSearchOpen(true);
  };

  const handleSearchClose = () => {
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  // 탭 인덱스 가져오기
  const getTabIndex = (tabName) => {
    return TABS.indexOf(tabName);
  };

  // 탭별 컨텐츠 표시 스타일 (슬라이드 효과)
  const getTabContentStyle = (tabName) => {
    const isActive = selectedTab === tabName;
    const currentIndex = getTabIndex(selectedTab);
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

  // 필터 및 정렬된 ETF 목록 가져오기
  const getFilteredETFs = () => {
    // mockData에서 전체 ETF 가져오기
    const allETFs = getAllETFs();
    let filteredList = allETFs.map(etf => ({
      id: etf.id,
      name: etf.name,
      code: etf.code,
      price: etf.currentPrice.toLocaleString('ko-KR'),
      change: Math.abs(etf.changePercent).toFixed(2),
      direction: etf.changeDirection,
      views: etf.popularity * 1000,
      volume: etf.basicInfo.volume,
      category: etf.category,
      isFavorite: etf.isFavorite
    }));

    // 탭별 카테고리 필터링
    if (selectedTab !== '전체보기') {
      if (selectedTab === '관심ETF') {
        filteredList = filteredList.filter(etf => etf.isFavorite);
      } else {
        // 카테고리 매핑
        const categoryMap = {
          '국내주식': '국내주식',
          '해외 주식': '해외주식',
          '채권': '채권',
          '원자재/통화': '원자재',
          '레버리지/인버스': '레버리지',
          '금리': '금리',
          '부동산': '부동산'
        };
        const category = categoryMap[selectedTab];
        if (category) {
          filteredList = filteredList.filter(etf => etf.category === category);
        }
      }
    }

    // 검색어 필터링
    if (searchQuery.trim()) {
      filteredList = filteredList.filter(
        (etf) =>
          etf.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          etf.code.includes(searchQuery)
      );
    }

    // 정렬 기준에 따라 정렬
    if (selectedFilter === '꾸준 인기') {
      // 조회수 기준 정렬
      filteredList.sort((a, b) => {
        return popularityTrend
          ? b.views - a.views  // 상승: 높은 순 (내림차순)
          : a.views - b.views; // 하락: 낮은 순 (오름차순)
      });
    } else if (selectedFilter === '거래량') {
      // 거래량 기준 정렬
      filteredList.sort((a, b) => {
        return volumeTrend
          ? b.volume - a.volume  // 상승: 많은 순 (내림차순)
          : a.volume - b.volume; // 하락: 적은 순 (오름차순)
      });
    }

    return filteredList;
  };

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#FFFFFF',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* TopNav */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          backgroundColor: '#FFFFFF',
          padding: `0 ${LAYOUT.HORIZONTAL_PADDING}px 0`,
          boxShadow: hasScrolled ? '0 2px 8px 0 rgba(0, 0, 0, 0.04)' : 'none',
          transition: 'box-shadow 0.2s ease'
        }}
      >
        <div
          style={{
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <button
            onClick={handleBackClick}
            style={{
              width: '24px',
              height: '24px',
              padding: 0,
              border: 'none',
              backgroundColor: 'transparent',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            aria-label="뒤로가기"
          >
            <img
              src={iconBackL}
              alt="뒤로가기"
              style={{
                width: '100%',
                height: '100%',
                display: 'block'
              }}
            />
          </button>

          <div
            style={{
              display: 'flex',
              gap: '12px',
              alignItems: 'center'
            }}
          >
            {/* 선택/담은 ETF 확인 Chip */}
            <div
              onClick={handleSelectedETFClick}
              style={{
                backgroundColor: '#FAFCFF',
                borderRadius: '12px',
                padding: '4px 10px',
                cursor: 'pointer'
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
                {mode === 'add' ? '담은 ETF 확인' : '선택 ETF 확인'}
              </p>
            </div>

            {/* Progress Indicator - 생성 모드에서만 표시 */}
            {mode === 'create' && (
              <p
                style={{
                  fontFamily: 'Pretendard, sans-serif',
                  fontSize: '20px',
                  fontWeight: 400,
                  lineHeight: 1.5,
                  color: '#757E8F',
                  margin: 0
                }}
              >
                2/4
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          display: 'flex',
          flexDirection: 'column',
          gap: '11px',
          width: '100%'
        }}
      >
        <div
          style={{
            backgroundColor: '#FFFFFF',
            overflowX: 'auto',
            width: '100%',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          <style>
            {`
              .tab-container::-webkit-scrollbar {
                display: none;
              }
            `}
          </style>
          <div
            className="tab-container"
            style={{
              display: 'flex',
              padding: `0 ${LAYOUT.HORIZONTAL_PADDING}px`,
              minWidth: 'max-content'
            }}
          >
            {TABS.map((tab) => (
              <div
                key={tab}
                onClick={() => setSelectedTab(tab)}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderBottom: selectedTab === tab ? '1px solid #0073FF' : '1px solid #F7F7F8',
                  padding: '12px 16px 10px',
                  cursor: 'pointer',
                  flexShrink: 0
                }}
              >
                <p
                  style={{
                    fontFamily: 'Pretendard, sans-serif',
                    fontSize: '16px',
                    fontWeight: 600,
                    lineHeight: 1.35,
                    color: selectedTab === tab ? '#30343B' : '#ADB2BD',
                    margin: 0,
                    whiteSpace: 'nowrap'
                  }}
                >
                  {tab}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Filter/Search Row */}
        <div
          style={{
            position: 'relative',
            height: '44px',
            padding: `0 ${LAYOUT.HORIZONTAL_PADDING}px`,
            overflow: 'hidden'
          }}
        >
          {/* Filter Buttons - Slide Out */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              transform: isSearchOpen ? 'translateY(-50%) translateX(-100%)' : 'translateY(-50%) translateX(0)',
              left: LAYOUT.HORIZONTAL_PADDING,
              right: LAYOUT.HORIZONTAL_PADDING,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              opacity: isSearchOpen ? 0 : 1,
              transition: 'transform 0.3s ease, opacity 0.3s ease',
              pointerEvents: isSearchOpen ? 'none' : 'auto'
            }}
          >
            <div
              style={{
                display: 'flex',
                gap: '10px',
                alignItems: 'center'
              }}
            >
              {selectedFilter === '꾸준 인기' ? (
                <TrendChip
                  title="꾸준 인기"
                  isUpTrend={popularityTrend}
                  onToggle={(newState) => {
                    setPopularityTrend(newState);
                  }}
                />
              ) : (
                <Chip
                  title="꾸준 인기"
                  color="grey"
                  state="nonSelect"
                  onClick={() => {
                    setSelectedFilter('꾸준 인기');
                    setPopularityTrend(true);
                  }}
                />
              )}
              {selectedFilter === '거래량' ? (
                <TrendChip
                  title="거래량"
                  isUpTrend={volumeTrend}
                  onToggle={(newState) => {
                    setVolumeTrend(newState);
                  }}
                />
              ) : (
                <Chip
                  title="거래량"
                  color="grey"
                  state="nonSelect"
                  onClick={() => {
                    setSelectedFilter('거래량');
                    setVolumeTrend(true);
                  }}
                />
              )}
            </div>

            {/* Search Icon */}
            <button
              onClick={handleSearchOpen}
              style={{
                width: '24px',
                height: '24px',
                padding: 0,
                border: 'none',
                backgroundColor: 'transparent',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              aria-label="검색"
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
            </button>
          </div>

          {/* Search Bar - Slide In */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              transform: isSearchOpen ? 'translateY(-50%) translateX(0)' : 'translateY(-50%) translateX(100%)',
              left: LAYOUT.HORIZONTAL_PADDING,
              right: LAYOUT.HORIZONTAL_PADDING,
              display: 'flex',
              gap: '10px',
              alignItems: 'center',
              opacity: isSearchOpen ? 1 : 0,
              transition: 'transform 0.3s ease, opacity 0.3s ease',
              pointerEvents: isSearchOpen ? 'auto' : 'none'
            }}
          >
            <div
              style={{
                flex: 1,
                backgroundColor: '#E6E7EA',
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
            {/* Close Button */}
            <button
              onClick={handleSearchClose}
              style={{
                padding: 0,
                border: 'none',
                backgroundColor: 'transparent',
                cursor: 'pointer',
                fontFamily: 'Pretendard, sans-serif',
                fontSize: '14px',
                fontWeight: 500,
                lineHeight: 1.5,
                color: '#757E8F',
                whiteSpace: 'nowrap'
              }}
            >
              닫기
            </button>
          </div>
        </div>
      </div>

      {/* 탭 컨텐츠 컨테이너 - Sliding ETF List */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          flex: 1,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          paddingTop: '8px'
        }}
      >
        {TABS.map((tab) => (
          <div key={tab} style={getTabContentStyle(tab)}>
            {/* ETF List */}
            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: `8px ${LAYOUT.HORIZONTAL_PADDING}px 200px`,
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}
            >
              {getFilteredETFs().map((etf) => (
                <SimpleChartViewer
                  key={etf.id}
                  name={etf.name}
                  code={etf.code}
                  currentPrice={etf.price}
                  changePercent={etf.change}
                  changeDirection={etf.direction}
                  showTopLabel={false}
                  showPriceComparison={false}
                  isSelected={selectedETFs.includes(etf.id)}
                  onClick={() => handleETFClick(etf.id)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Fixed Section */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: '#FFFFFF',
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '430px',
          margin: '0 auto'
        }}
      >
        {/* Header Row */}
        <div
          style={{
            backgroundColor: '#F7F7F8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: `0 ${LAYOUT.HORIZONTAL_PADDING}px`
          }}
        >
          <div
            style={{
              padding: '10px',
              display: 'flex',
              gap: '10px',
              alignItems: 'center',
              width: '196px'
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
          <div
            style={{
              padding: '10px',
              display: 'flex',
              gap: '10px',
              alignItems: 'center',
              justifyContent: 'center'
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
          <div
            style={{
              padding: '10px',
              display: 'flex',
              gap: '10px',
              alignItems: 'center',
              justifyContent: 'flex-end',
              width: '102px'
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

        {/* Button Section */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            padding: `0 ${LAYOUT.HORIZONTAL_PADDING}px`,
            paddingBottom: '34px'
          }}
        >
          <div
            style={{
              padding: '4px 0 0',
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
                fontWeight: 400,
                lineHeight: 1.5,
                color: '#1A1C20',
                margin: 0,
                textAlign: 'center'
              }}
            >
              {mode === 'add'
                ? selectedETFs.length === maxETFs
                  ? `최대 ${maxETFs}개까지 선택할 수 있어요`
                  : selectedETFs.length > 0
                  ? `최대 ${maxETFs}개까지 담을 수 있어요`
                  : '담을 ETF를 선택해 주세요'
                : selectedETFs.length === 5
                ? '최대 5개까지 선택할 수 있어요'
                : selectedETFs.length > 0
                ? '최대 5개까지 담을 수 있어요'
                : '담을 ETF를 선택해주세요'}
            </p>
          </div>
          <div style={{ padding: '12px 0' }}>
            {selectedETFs.length > 0 ? (
              <button
                onClick={handleNextClick}
                style={{
                  width: '100%',
                  height: '54px',
                  backgroundColor: mode === 'add' ? '#DDEFFF' : '#3490FF',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '16px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '10px',
                  fontFamily: 'Pretendard, sans-serif',
                  fontSize: '16px',
                  fontWeight: 600,
                  lineHeight: 1.35,
                  color: mode === 'add' ? '#005CCC' : '#FFFFFF',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {mode === 'add'
                  ? `추가하기 ${selectedETFs.length}/${maxETFs}`
                  : `다음으로 (${selectedETFs.length}/5)`}
              </button>
            ) : (
              <Button
                variant="grey"
                onClick={handleNextClick}
                disabled={true}
              >
                {mode === 'add' ? `추가하기 0/${maxETFs}` : '선택하기 0/5'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManualCreateStep2;
