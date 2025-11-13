import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { TopNav } from '../../components/common/TopNav';
import { PortfolioMainCard } from '../../components/common/PortfolioMainCard';
import { PortfolioListCard } from '../../components/common/PortfolioListCard';
import { LAYOUT } from '../../constants/layout';
import { useScrollShadow } from '../../hooks/useScrollShadow';
import { getPortfolios, toggleBookmark, getDefaultPortfolioBookmark, getDefaultPortfolioData, getPortfolioOrder } from '../../utils/portfolioStorage';
import iconSetting from '../../assets/icon_setting2.svg';

const Portfolio = () => {
  const navigate = useNavigate();
  const hasScrolled = useScrollShadow(0);
  const [portfolios, setPortfolios] = useState([]);
  const [animatingId, setAnimatingId] = useState(null);
  const portfolioRefs = useRef({});

  const handleBackClick = () => {
    navigate(-1);
  };

  // 컴포넌트 마운트 시 포트폴리오 목록 불러오기
  useEffect(() => {
    loadPortfolios();
  }, []);

  const loadPortfolios = () => {
    // 기본 포트폴리오 데이터 (금액, 수익률) 가져오기
    const defaultData = getDefaultPortfolioData();

    // 기본 포트폴리오 (대표 포트폴리오)
    const defaultPortfolio = {
      id: 'default-1',
      portfolioName: '미국 빅테크 배당금',
      isMainPortfolio: true,
      isBookmarked: getDefaultPortfolioBookmark(), // localStorage에서 즐겨찾기 상태 읽기
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

    // 첫 번째 포트폴리오만 즐겨찾기 상태 업데이트
    const finalPortfolios = sortedPortfolios.map((p, index) => ({
      ...p,
      isBookmarked: index === 0
    }));

    setPortfolios(finalPortfolios);
  };

  const handleFavoriteClick = (id) => {
    // 이미 즐겨찾기된 (첫 번째) 포트폴리오를 클릭한 경우 아무것도 하지 않음
    if (portfolios[0]?.id === id) {
      return;
    }

    // FLIP 애니메이션: First - 변경 전 위치 저장
    const firstPositions = {};
    Object.keys(portfolioRefs.current).forEach(key => {
      const element = portfolioRefs.current[key];
      if (element) {
        const rect = element.getBoundingClientRect();
        firstPositions[key] = { top: rect.top, left: rect.left };
      }
    });

    // 애니메이션 시작
    setAnimatingId(id);

    // 현재 포트폴리오 순서
    const currentOrder = portfolios.map(p => p.id);

    // 즐겨찾기 토글 및 포트폴리오 재정렬
    toggleBookmark(id, currentOrder);
    loadPortfolios();

    // FLIP 애니메이션: Last, Invert, Play
    requestAnimationFrame(() => {
      Object.keys(portfolioRefs.current).forEach(key => {
        const element = portfolioRefs.current[key];
        if (element && firstPositions[key]) {
          const lastRect = element.getBoundingClientRect();
          const deltaY = firstPositions[key].top - lastRect.top;

          // Invert: 이전 위치로 즉시 이동
          if (deltaY !== 0) {
            element.style.transform = `translateY(${deltaY}px)`;
            element.style.transition = 'none';

            // Play: 새 위치로 애니메이션
            requestAnimationFrame(() => {
              const isClickedItem = element.dataset.portfolioId === id;
              const duration = isClickedItem ? '0.3s' : '0.5s';
              const delay = isClickedItem ? '0s' : '0.1s';

              element.style.transition = `transform ${duration} cubic-bezier(0.4, 0, 0.2, 1) ${delay}`;
              element.style.transform = 'translateY(0)';
            });
          }
        }
      });
    });

    // 애니메이션 종료 후 초기화
    setTimeout(() => {
      setAnimatingId(null);
    }, 600);
  };

  // 포트폴리오 이름에서 투자 스타일과 키워드 추출 (임시 로직)
  const getPortfolioTags = (portfolio) => {
    const riskType = portfolio.riskType || '안정형';
    const investmentStyle = portfolio.investmentStyle || '배당';
    return [`#${riskType}`, `#${investmentStyle}`];
  };

  return (
    <>
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
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
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '50px',
            width: '100%'
          }}
        >
          {/* 좌측: 제목 */}
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
                fontSize: '24px',
                fontWeight: 600,
                lineHeight: 1.25,
                color: '#1A1C20',
                margin: 0,
                whiteSpace: 'nowrap'
              }}
            >
              포트폴리오
            </p>
          </div>

          {/* 우측: 포트폴리오 제작 버튼 + 설정 아이콘 */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end'
            }}
          >
            {/* 포트폴리오 제작 버튼 */}
            <div
              style={{
                padding: '12px 8px',
                display: 'flex',
                gap: '10px',
                alignItems: 'center'
              }}
            >
              <div
                style={{
                  backgroundColor: '#FAFCFF',
                  borderRadius: '12px',
                  padding: '4px 10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
                onClick={() => navigate('/portfolio/create')}
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
                  포트폴리오 제작
                </p>
              </div>
            </div>

            {/* 설정 아이콘 */}
            <div
              style={{
                padding: '12px 0 12px 8px',
                display: 'flex',
                gap: '10px',
                alignItems: 'center',
                cursor: 'pointer'
              }}
              onClick={() => console.log('설정 클릭')}
            >
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: 'rotate(90deg) scaleY(-1)'
                }}
              >
                <img
                  src={iconSetting}
                  alt="설정"
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'block'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div
        style={{
          padding: `15px ${LAYOUT.HORIZONTAL_PADDING}px 0`,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}
      >
        {/* 포트폴리오 목록 */}
        {portfolios.length > 0 ? (
          portfolios.map((portfolio) => {
            // 애니메이션 중인 아이템은 다른 요소 위에 표시
            const isAnimating = animatingId === portfolio.id;

            // 즐겨찾기된 포트폴리오는 PortfolioMainCard 사용
            if (portfolio.isBookmarked) {
              return (
                <div
                  key={portfolio.id}
                  ref={el => portfolioRefs.current[portfolio.id] = el}
                  data-portfolio-id={portfolio.id}
                  style={{
                    willChange: 'transform',
                    position: 'relative',
                    zIndex: isAnimating ? 10 : 1
                  }}
                >
                  <PortfolioMainCard
                    portfolioType="대표 포트폴리오"
                    tags={getPortfolioTags(portfolio)}
                    title={portfolio.portfolioName}
                    isFavorite={portfolio.isBookmarked}
                    amount={portfolio.amount?.toLocaleString('ko-KR') || '0'}
                    changePercent={Math.abs(portfolio.returnRate || 0).toString()}
                    changeDirection={portfolio.returnRate >= 0 ? 'up' : 'down'}
                    primaryButtonText={portfolio.returnRate >= 0 ? '리밸런싱 확인' : '리밸런싱 필요'}
                    secondaryButtonText="체크포인트"
                    onFavoriteClick={() => handleFavoriteClick(portfolio.id)}
                    onPrimaryButtonClick={() => {
                      console.log('리밸런싱 확인 clicked:', portfolio.id);
                    }}
                    onSecondaryButtonClick={() => {
                      console.log('체크포인트 clicked:', portfolio.id);
                    }}
                  />
                </div>
              );
            }

            // 즐겨찾기되지 않은 포트폴리오는 PortfolioListCard 사용
            return (
              <div
                key={portfolio.id}
                ref={el => portfolioRefs.current[portfolio.id] = el}
                data-portfolio-id={portfolio.id}
                style={{
                  willChange: 'transform',
                  position: 'relative',
                  zIndex: isAnimating ? 10 : 1
                }}
              >
                <PortfolioListCard
                  title={portfolio.portfolioName || '포트폴리오'}
                  investmentStyle={portfolio.isManualCreated ? '직접제작' : (portfolio.riskType || '투자 성향')}
                  investmentKeyword={portfolio.isManualCreated ? '' : (portfolio.investmentStyle || '투자 키워드')}
                  price={portfolio.amount?.toLocaleString('ko-KR') || '0'}
                  changePercent={Math.abs(portfolio.returnRate || 0).toString()}
                  changeDirection={portfolio.returnRate >= 0 ? 'up' : 'down'}
                  primaryButtonText={portfolio.returnRate >= 0 ? '리밸런싱 확인' : '리밸런싱 필요'}
                  secondaryButtonText="체크포인트"
                  isFavorite={portfolio.isBookmarked || false}
                  onFavoriteClick={() => handleFavoriteClick(portfolio.id)}
                  onPrimaryButtonClick={() => {
                    console.log('리밸런싱 확인 clicked:', portfolio.id);
                  }}
                  onSecondaryButtonClick={() => {
                    console.log('체크포인트 clicked:', portfolio.id);
                  }}
                />
              </div>
            );
          })
        ) : (
          // 포트폴리오가 없을 때 표시할 메시지
          <div
            style={{
              padding: '40px 20px',
              textAlign: 'center'
            }}
          >
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
              아직 생성된 포트폴리오가 없습니다.
            </p>
          </div>
        )}
      </div>

      {/* 포트폴리오 추가하기 버튼 */}
      <div
        style={{
          padding: `${LAYOUT.SECTION_GAP}px ${LAYOUT.HORIZONTAL_PADDING}px 45px`,
          width: '100%'
        }}
      >
        <div
          style={{
            backgroundColor: '#E0EEFF',
            borderRadius: '12px',
            padding: '16px',
            display: 'flex',
            gap: '10px',
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
              fontWeight: 600,
              lineHeight: 1.35,
              color: '#005CCC',
              margin: 0,
              whiteSpace: 'nowrap'
            }}
          >
            포트폴리오 제작
          </p>
        </div>
      </div>
      </div>
    </>
  );
};

export default Portfolio;
