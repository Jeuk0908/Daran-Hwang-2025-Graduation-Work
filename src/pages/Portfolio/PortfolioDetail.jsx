import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LAYOUT } from '../../constants/layout';
import { useScrollShadow } from '../../hooks/useScrollShadow';
import { TopNav } from '../../components/common/TopNav';
import { SimpleChartViewer } from '../../components/common/SimpleChartViewer';
import { SmallToggle } from '../../components/common/ToggleButton';
import { Chip } from '../../components/common/Chip';
import { Button } from '../../components/common/Button';
import { getPortfolios, toggleBookmark, getDefaultPortfolioBookmark, getDefaultPortfolioData } from '../../utils/portfolioStorage';
import { getPortfolioETFs } from '../../utils/portfolioStorage';
import { getAllETFs } from '../ETFDetail/data/mockData';
import iconHeartFill from '../../assets/icon_heart_fill.svg';
import iconHeartOutline from '../../assets/icon_heart_outline.svg';
import iconBackSR from '../../assets/icon_back(S)_R.svg';
import iconBackSUT50 from '../../assets/icon_back(S)_U_t50.svg';

const PortfolioDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const hasScrolled = useScrollShadow(0);
  const [portfolio, setPortfolio] = useState(null);
  const [etfs, setEtfs] = useState([]);
  const [isProfitMode, setIsProfitMode] = useState(true); // true: 순 수익, false: 목표까지
  const [sortMode, setSortMode] = useState('weight'); // 'weight' or 'return'
  const [sortOrder, setSortOrder] = useState('desc'); // 'desc' (큰→작은) or 'asc' (작은→큰)

  useEffect(() => {
    loadPortfolioData();
  }, [id]);

  const loadPortfolioData = () => {
    // 기본 포트폴리오인 경우
    if (id === 'default-1') {
      const defaultData = getDefaultPortfolioData();
      setPortfolio({
        id: 'default-1',
        portfolioName: '미국 빅테크 배당금',
        isMainPortfolio: true,
        isBookmarked: getDefaultPortfolioBookmark(),
        amount: defaultData.amount,
        returnRate: defaultData.returnRate,
        totalInvestment: 3123456, // 총 투자금
        totalReturnRate: 1.45, // 총 수익률
        targetProfit: 53653, // 목표 순 수익까지
        totalDividend: 46343, // 총 배당 수익
        createdDate: '00.00.00', // 최초 설립
        needsRebalance: true, // 리밸런싱 필요 여부
        rebalanceReason: '하락에 방어하기 위해 리밸런싱이 필요해요.',
        riskType: '투자 성향',
        investmentStyle: '투자 키워드'
      });

      // ETF 목록 불러오기
      const savedETFs = getPortfolioETFs(id);
      if (savedETFs) {
        setEtfs(savedETFs);
      } else {
        // Mock ETF 데이터 (mockData에서 가져오기)
        const allMockETFs = getAllETFs();
        const targetWeights = [35, 25, 20, 15, 5];
        const sharesCounts = [5, 3, 7, 2, 4];

        setEtfs(
          allMockETFs.slice(0, 5).map((etf, index) => ({
            id: index + 1,
            etfId: etf.id, // mockData의 실제 ETF ID
            title: etf.name,
            shares: sharesCounts[index].toString(),
            targetWeight: targetWeights[index].toString(),
            pricePerShare: etf.currentPrice.toLocaleString('ko-KR'),
            changePercent: Math.abs(etf.changePercent).toFixed(2),
            changeDirection: etf.changeDirection
          }))
        );
      }
    } else {
      // 사용자 생성 포트폴리오
      const portfolios = getPortfolios();
      const foundPortfolio = portfolios.find(p => p.id === id);

      if (foundPortfolio) {
        setPortfolio({
          ...foundPortfolio,
          totalInvestment: foundPortfolio.amount * 0.95, // 임시 계산
          totalReturnRate: foundPortfolio.returnRate,
          targetProfit: 50000,
          totalDividend: 40000,
          createdDate: new Date(foundPortfolio.createdAt).toLocaleDateString('ko-KR').slice(2).replace(/\. /g, '.'),
          needsRebalance: foundPortfolio.returnRate < 0,
          rebalanceReason: '하락에 방어하기 위해 리밸런싱이 필요해요.'
        });

        // ETF 목록 불러오기
        const savedETFs = getPortfolioETFs(id);
        if (savedETFs) {
          setEtfs(savedETFs);
        }
      }
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleHeartClick = () => {
    // 즐겨찾기 토글
    const portfolios = getPortfolios();
    const currentOrder = [id, ...portfolios.filter(p => p.id !== id).map(p => p.id)];
    toggleBookmark(id, currentOrder);
    loadPortfolioData();
  };

  const handleRebalanceClick = () => {
    navigate(`/portfolio/${id}/rebalance`);
  };

  const handleCheckpointClick = () => {
    console.log('체크포인트 clicked');
  };

  const handleWeightSortClick = () => {
    if (sortMode === 'weight') {
      // 이미 비중 순 모드면 정렬 순서만 토글
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    } else {
      // 다른 모드에서 비중 순으로 전환
      setSortMode('weight');
      setSortOrder('desc'); // 기본값: 내림차순
    }
  };

  const handleReturnSortClick = () => {
    if (sortMode === 'return') {
      // 이미 수익률 순 모드면 정렬 순서만 토글
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    } else {
      // 다른 모드에서 수익률 순으로 전환
      setSortMode('return');
      setSortOrder('desc'); // 기본값: 내림차순
    }
  };

  // ETF 목록 정렬
  const getSortedETFs = () => {
    if (!etfs || etfs.length === 0) return [];

    const sortedETFs = [...etfs];

    if (sortMode === 'weight') {
      sortedETFs.sort((a, b) => {
        const weightA = parseInt(a.targetWeight) || 0;
        const weightB = parseInt(b.targetWeight) || 0;
        return sortOrder === 'desc' ? weightB - weightA : weightA - weightB;
      });
    } else if (sortMode === 'return') {
      sortedETFs.sort((a, b) => {
        const returnA = parseFloat(a.changePercent) || 0;
        const returnB = parseFloat(b.changePercent) || 0;
        const multiplierA = a.changeDirection === 'up' ? 1 : -1;
        const multiplierB = b.changeDirection === 'up' ? 1 : -1;
        return sortOrder === 'desc'
          ? (returnB * multiplierB) - (returnA * multiplierA)
          : (returnA * multiplierA) - (returnB * multiplierB);
      });
    }

    return sortedETFs;
  };

  // ETF 최대 개수 체크
  const isMaxETFs = etfs.length >= 5;

  // 상품 추가 핸들러
  const handleAddProduct = () => {
    if (isMaxETFs) return; // 최대 5개까지만 허용

    // mockData에서 전체 ETF 정보 가져오기
    const allMockETFs = getAllETFs();

    navigate(`/portfolio/${id}/rebalance/add-etf`, {
      state: {
        currentETFCount: etfs.length,
        portfolioId: id,
        existingETFs: etfs.map(etf => {
          // etfId가 있으면 mockData에서 해당 ETF 찾기
          const mockETF = etf.etfId ? allMockETFs.find(e => e.id === etf.etfId) : null;
          return mockETF || {
            id: etf.etfId || `etf-${etf.id}`,
            name: etf.title,
            code: etf.code || etf.id.toString(),
            currentPrice: parseInt(etf.pricePerShare.replace(/,/g, '')),
            changePercent: parseFloat(etf.changePercent),
            changeDirection: etf.changeDirection,
            targetWeight: parseInt(etf.targetWeight)
          };
        })
      }
    });
  };

  if (!portfolio) {
    return null;
  }

  const isUp = portfolio.returnRate >= 0;
  const changeColor = isUp ? '#43A329' : '#EB843A';
  const sortedETFs = getSortedETFs();

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#FFFFFF',
        paddingBottom: '34px', // Home Indicator
        position: 'relative'
      }}
    >
      {/* Top Navigation */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          backgroundColor: '#FFFFFF',
          boxShadow: hasScrolled ? '0 2px 8px 0 rgba(0, 0, 0, 0.04)' : 'none',
          transition: 'box-shadow 0.2s ease'
        }}
      >
        <TopNav
          title=""
          depth="2"
          state="icon"
          showBackButton={true}
          showIconL={false}
          showIconR={true}
          iconR={portfolio.isBookmarked ? iconHeartFill : iconHeartOutline}
          onBackClick={handleBackClick}
          onIconRClick={handleHeartClick}
        />
      </div>

      {/* 포트폴리오 정보 섹션 */}
      <div
        style={{
          padding: `0 ${LAYOUT.HORIZONTAL_PADDING}px`,
          paddingTop: '4px'
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            width: '100%'
          }}
        >
          {/* 태그 및 제목 */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 0
            }}
          >
            {/* 태그 */}
            <div
              style={{
                display: 'flex',
                gap: '8px',
                alignItems: 'center'
              }}
            >
              {portfolio.isMainPortfolio && (
                <p
                  style={{
                    fontFamily: 'Pretendard, sans-serif',
                    fontSize: '12px',
                    fontWeight: 500,
                    lineHeight: 1.5,
                    color: '#3490FF',
                    margin: 0,
                    whiteSpace: 'nowrap'
                  }}
                >
                  대표 포트폴리오
                </p>
              )}
              {!portfolio.isManualCreated && (
                <>
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
                    #{portfolio.riskType}
                  </p>
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
                    #{portfolio.investmentStyle}
                  </p>
                </>
              )}
            </div>

            {/* 포트폴리오 이름 */}
            <p
              style={{
                fontFamily: 'Pretendard, sans-serif',
                fontSize: '20px',
                fontWeight: 600,
                lineHeight: 1.35,
                color: '#30343B',
                margin: 0
              }}
            >
              {portfolio.portfolioName}
            </p>
          </div>

          {/* 금액 정보 */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 0
            }}
          >
            {/* 현재 금액 */}
            <div
              style={{
                display: 'flex',
                gap: 0,
                height: '38px',
                alignItems: 'center',
                lineHeight: 1.35
              }}
            >
              <p
                style={{
                  fontFamily: 'Pretendard, sans-serif',
                  fontSize: '28px',
                  fontWeight: 600,
                  color: '#1A1C20',
                  margin: 0,
                  whiteSpace: 'nowrap'
                }}
              >
                {portfolio.amount?.toLocaleString('ko-KR') || '0'}
              </p>
              <p
                style={{
                  fontFamily: 'Pretendard, sans-serif',
                  fontSize: '28px',
                  fontWeight: 400,
                  color: '#757E8F',
                  margin: 0,
                  whiteSpace: 'nowrap'
                }}
              >
                원
              </p>
            </div>

            {/* 총 투자금 */}
            <p
              style={{
                fontFamily: 'Pretendard, sans-serif',
                fontSize: '16px',
                fontWeight: 500,
                lineHeight: 1.5,
                color: '#757E8F',
                margin: 0
              }}
            >
              총 투자금 {portfolio.totalInvestment?.toLocaleString('ko-KR')}원
            </p>
          </div>
        </div>
      </div>

      {/* 통계 카드 섹션 */}
      <div
        style={{
          borderBottom: '1px solid #F7F7F8',
          padding: `40px ${LAYOUT.HORIZONTAL_PADDING}px`,
          display: 'flex',
          flexDirection: 'column',
          gap: '9px',
          position: 'relative'
        }}
      >
        {/* 첫 번째 행 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '9px',
            width: '100%'
          }}
        >
          {/* 총 수익률 */}
          <div
            style={{
              backgroundColor: '#FAFCFF',
              borderRadius: '12px',
              padding: '12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              height: '86px',
              justifyContent: 'center',
              flex: 1
            }}
          >
            <p
              style={{
                fontFamily: 'Pretendard, sans-serif',
                fontSize: '14px',
                fontWeight: 500,
                lineHeight: 1.5,
                color: '#474C57',
                margin: 0,
                whiteSpace: 'nowrap'
              }}
            >
              총 수익률
            </p>
            <div
              style={{
                display: 'flex',
                gap: '4px',
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
                fontFamily: 'Pretendard, sans-serif',
                fontSize: '20px',
                fontWeight: 700,
                lineHeight: 1.5,
                color: changeColor
              }}
            >
              <p style={{ margin: 0, whiteSpace: 'nowrap' }}>
                {isUp ? '+' : '-'}
              </p>
              <p style={{ margin: 0, whiteSpace: 'nowrap' }}>
                {Math.abs(portfolio.totalReturnRate).toFixed(2)}
              </p>
              <p style={{ margin: 0, whiteSpace: 'nowrap' }}>
                %
              </p>
            </div>
          </div>

          {/* 목표 순 수익까지 / 순 수익 */}
          <div
            style={{
              backgroundColor: '#FAFCFF',
              borderRadius: '12px',
              padding: '12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              height: '86px',
              justifyContent: 'center',
              flex: 1
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%'
              }}
            >
              <p
                style={{
                  fontFamily: 'Pretendard, sans-serif',
                  fontSize: '14px',
                  fontWeight: 500,
                  lineHeight: 1.5,
                  color: '#474C57',
                  margin: 0,
                  whiteSpace: 'nowrap'
                }}
              >
                {isProfitMode ? '순 수익' : '목표 순 수익까지'}
              </p>
              <div
                style={{
                  transform: 'scaleY(-1)'
                }}
              >
                <SmallToggle
                  checked={!isProfitMode}
                  onChange={() => setIsProfitMode(!isProfitMode)}
                />
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                gap: '4px',
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
                fontFamily: 'Pretendard, sans-serif',
                fontSize: '20px',
                fontWeight: 700,
                lineHeight: 1.5,
                color: changeColor
              }}
            >
              <p style={{ margin: 0, whiteSpace: 'nowrap' }}>
                {portfolio.targetProfit?.toLocaleString('ko-KR')}
              </p>
              <p style={{ margin: 0, whiteSpace: 'nowrap' }}>
                원
              </p>
            </div>
          </div>
        </div>

        {/* 두 번째 행 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '9px',
            width: '100%'
          }}
        >
          {/* 총 배당 수익 */}
          <div
            style={{
              backgroundColor: '#F7F7F8',
              borderRadius: '12px',
              padding: '12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              height: '86px',
              justifyContent: 'center',
              flex: 1
            }}
          >
            <p
              style={{
                fontFamily: 'Pretendard, sans-serif',
                fontSize: '14px',
                fontWeight: 500,
                lineHeight: 1.5,
                color: '#474C57',
                margin: 0,
                whiteSpace: 'nowrap'
              }}
            >
              총 배당 수익
            </p>
            <div
              style={{
                display: 'flex',
                gap: '4px',
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
                fontFamily: 'Pretendard, sans-serif',
                fontSize: '20px',
                fontWeight: 600,
                lineHeight: 1.35,
                color: '#474C57'
              }}
            >
              <p style={{ margin: 0, whiteSpace: 'nowrap' }}>
                {portfolio.totalDividend?.toLocaleString('ko-KR')}
              </p>
              <p style={{ margin: 0, whiteSpace: 'nowrap' }}>
                원
              </p>
            </div>
          </div>

          {/* 최초 설립 */}
          <div
            style={{
              backgroundColor: '#F7F7F8',
              borderRadius: '12px',
              padding: '12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              height: '86px',
              justifyContent: 'center',
              flex: 1
            }}
          >
            <p
              style={{
                fontFamily: 'Pretendard, sans-serif',
                fontSize: '14px',
                fontWeight: 500,
                lineHeight: 1.5,
                color: '#474C57',
                margin: 0,
                whiteSpace: 'nowrap'
              }}
            >
              최초 설립
            </p>
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
                fontFamily: 'Pretendard, sans-serif',
                fontSize: '20px',
                fontWeight: 600,
                lineHeight: 1.35,
                color: '#474C57'
              }}
            >
              <p style={{ margin: 0, whiteSpace: 'nowrap' }}>
                {portfolio.createdDate}
              </p>
            </div>
          </div>
        </div>

        {/* 세 번째 행 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '9px',
            width: '100%'
          }}
        >
          {/* 리밸런싱 */}
          <div
            style={{
              backgroundColor: '#F7F7F8',
              borderRadius: '12px',
              padding: '12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              height: '86px',
              justifyContent: 'center',
              flex: 1
            }}
          >
            <p
              style={{
                fontFamily: 'Pretendard, sans-serif',
                fontSize: '14px',
                fontWeight: 700,
                lineHeight: 1.35,
                color: portfolio.needsRebalance ? '#EB843A' : '#43A329',
                margin: 0,
                whiteSpace: 'nowrap'
              }}
            >
              리밸런싱 - {portfolio.needsRebalance ? '필요' : '확인'}
            </p>
            <div
              style={{
                display: 'flex',
                gap: '4px',
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
                width: '100%'
              }}
            >
              <div
                onClick={handleRebalanceClick}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  cursor: 'pointer'
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
                  확인하기
                </p>
                <img
                  src={iconBackSR}
                  alt=""
                  style={{
                    width: '24px',
                    height: '24px',
                    display: 'block'
                  }}
                />
              </div>
            </div>
          </div>

          {/* 체크포인트 */}
          <div
            style={{
              backgroundColor: '#F7F7F8',
              borderRadius: '12px',
              padding: '12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              height: '86px',
              justifyContent: 'center',
              flex: 1
            }}
          >
            <p
              style={{
                fontFamily: 'Pretendard, sans-serif',
                fontSize: '14px',
                fontWeight: 500,
                lineHeight: 1.5,
                color: '#474C57',
                margin: 0,
                whiteSpace: 'nowrap'
              }}
            >
              체크포인트
            </p>
            <div
              onClick={handleCheckpointClick}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                width: '100%',
                cursor: 'pointer'
              }}
            >
              <p
                style={{
                  fontFamily: 'Pretendard, sans-serif',
                  fontSize: '14px',
                  fontWeight: 500,
                  lineHeight: 1.5,
                  color: '#5E6573',
                  margin: 0,
                  whiteSpace: 'nowrap'
                }}
              >
                확인하기
              </p>
              <img
                src={iconBackSR}
                alt=""
                style={{
                  width: '24px',
                  height: '24px',
                  display: 'block',
                  opacity: 0.6
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 상품 리스트 섹션 */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          width: '100%'
        }}
      >
        {/* 헤더 및 필터 */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            width: '100%'
          }}
        >
          <div
            style={{
              padding: `12px ${LAYOUT.HORIZONTAL_PADDING}px`,
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}
          >
            {/* 타이틀 */}
            <div
              style={{
                display: 'flex',
                gap: '7px',
                alignItems: 'flex-end'
              }}
            >
              <p
                style={{
                  fontFamily: 'Pretendard, sans-serif',
                  fontSize: '20px',
                  fontWeight: 600,
                  lineHeight: 1.35,
                  color: '#1A1C20',
                  margin: 0,
                  whiteSpace: 'nowrap'
                }}
              >
                상품 리스트
              </p>
              <p
                style={{
                  fontFamily: 'Pretendard, sans-serif',
                  fontSize: '14px',
                  fontWeight: 500,
                  lineHeight: 1.5,
                  color: '#757E8F',
                  margin: 0,
                  whiteSpace: 'nowrap'
                }}
              >
                총 {etfs.length}개
              </p>
            </div>

            {/* 필터 칩 */}
            <div
              style={{
                display: 'flex',
                gap: '10px',
                alignItems: 'center'
              }}
            >
              <div
                onClick={handleWeightSortClick}
                style={{
                  backgroundColor: sortMode === 'weight' ? '#3490FF' : '#E6E7EA',
                  borderRadius: '12px',
                  padding: sortMode === 'weight' ? '4px 4px 4px 10px' : '4px 10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  width: sortMode === 'weight' ? 'auto' : '61px',
                  height: '32px'
                }}
              >
                <p
                  style={{
                    fontFamily: 'Pretendard, sans-serif',
                    fontSize: '14px',
                    fontWeight: 500,
                    lineHeight: 1.5,
                    color: sortMode === 'weight' ? '#FFFFFF' : '#1A1C20',
                    margin: 0,
                    whiteSpace: 'nowrap'
                  }}
                >
                  비중 순
                </p>
                {sortMode === 'weight' && (
                  <img
                    src={iconBackSUT50}
                    alt=""
                    style={{
                      width: '24px',
                      height: '24px',
                      display: 'block',
                      transform: sortOrder === 'desc' ? 'scaleY(-1)' : 'none',
                      filter: 'brightness(0) invert(1)'
                    }}
                  />
                )}
              </div>
              <div
                onClick={handleReturnSortClick}
                style={{
                  backgroundColor: sortMode === 'return' ? '#3490FF' : '#E6E7EA',
                  borderRadius: '12px',
                  padding: sortMode === 'return' ? '4px 4px 4px 12px' : '4px 10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  width: sortMode === 'return' ? 'auto' : '61px',
                  height: '32px'
                }}
              >
                <p
                  style={{
                    fontFamily: 'Pretendard, sans-serif',
                    fontSize: '14px',
                    fontWeight: 500,
                    lineHeight: 1.5,
                    color: sortMode === 'return' ? '#FFFFFF' : '#1A1C20',
                    margin: 0,
                    whiteSpace: 'nowrap'
                  }}
                >
                  수익률
                </p>
                {sortMode === 'return' && (
                  <img
                    src={iconBackSUT50}
                    alt=""
                    style={{
                      width: '24px',
                      height: '24px',
                      display: 'block',
                      transform: sortOrder === 'desc' ? 'scaleY(-1)' : 'none',
                      filter: 'brightness(0) invert(1)'
                    }}
                  />
                )}
              </div>
            </div>
          </div>

          {/* ETF 카드 리스트 */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '11px',
              padding: '0 15.5px'
            }}
          >
            {sortedETFs.map((etf) => (
              <SimpleChartViewer
                key={etf.id}
                name={etf.title}
                code={`${etf.shares}주 · 비중 ${etf.targetWeight}%`}
                currentPrice={etf.pricePerShare}
                changePercent={etf.changePercent}
                changeDirection={etf.changeDirection || 'up'}
                showTopLabel={false}
                showPriceComparison={false}
                showChart={false}
                onClick={() => navigate(`/etf/${etf.etfId || `etf-${etf.id}`}/detail`)}
              />
            ))}
          </div>
        </div>

        {/* 하단 버튼 영역 */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%'
          }}
        >
          {/* 캡션 */}
          <div
            style={{
              padding: `4px ${LAYOUT.HORIZONTAL_PADDING}px 0`,
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
                color: '#757E8F',
                textAlign: 'center',
                margin: 0,
                whiteSpace: 'nowrap'
              }}
            >
              {isMaxETFs
                ? '포트폴리오에 최대 5개의 상품까지 담을 수 있어요.'
                : '목표 비중의 합계는 100%가 되어야 해요.'}
            </p>
          </div>

          {/* 버튼 */}
          <div
            style={{
              padding: `12px ${LAYOUT.HORIZONTAL_PADDING}px`,
              display: 'flex',
              gap: '12px',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '8px'
            }}
          >
            <Button
              variant={isMaxETFs ? 'grey' : 'primary'}
              fullWidth={true}
              onClick={handleAddProduct}
              disabled={isMaxETFs}
            >
              상품 추가하기
            </Button>
          </div>
        </div>
      </div>

      {/* Home Indicator */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          maxWidth: '430px',
          margin: '0 auto',
          height: '34px',
          background: 'rgba(255, 255, 255, 0.8)',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          paddingBottom: '8px'
        }}
      >
        <div
          style={{
            width: '134px',
            height: '5px',
            backgroundColor: '#000000',
            borderRadius: '100px'
          }}
        />
      </div>
    </div>
  );
};

export default PortfolioDetail;
