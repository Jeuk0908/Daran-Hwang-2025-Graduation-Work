import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { LAYOUT } from '../../constants/layout';
import { useScrollShadow } from '../../hooks/useScrollShadow';
import { addPortfolio } from '../../utils/portfolioStorage';
import iconBackL from '../../assets/icon_back_L.svg';

const AutoCreateStep5 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const hasScrolled = useScrollShadow(0);
  const wheelContainerRef = useRef(null);
  const touchStartY = useRef(0);
  const touchMoveY = useRef(0);

  // 이전 페이지에서 전달받은 데이터
  const previousData = location.state || {};

  const [selectedPercentage, setSelectedPercentage] = useState(6);

  const handleBackClick = () => {
    navigate(-1);
  };

  // 휠 이벤트 핸들러 - 네이티브 이벤트 리스너만 사용
  useEffect(() => {
    const container = wheelContainerRef.current;
    if (!container) return;

    const wheelHandler = (e) => {
      // 즉시 기본 동작 방지 (페이지 스크롤 차단)
      e.preventDefault();
      e.stopPropagation();

      const delta = e.deltaY;

      if (delta > 0) {
        // 아래로 스크롤: 퍼센트 증가
        setSelectedPercentage(prev => Math.min(100, prev + 1));
      } else if (delta < 0) {
        // 위로 스크롤: 퍼센트 감소
        setSelectedPercentage(prev => Math.max(1, prev - 1));
      }
    };

    // 터치 이벤트 핸들러 (모바일)
    const touchStartHandler = (e) => {
      touchStartY.current = e.touches[0].clientY;
      touchMoveY.current = e.touches[0].clientY;
    };

    const touchMoveHandler = (e) => {
      e.preventDefault(); // 페이지 스크롤 방지

      const currentY = e.touches[0].clientY;
      const deltaY = touchMoveY.current - currentY;

      // 20px 이상 움직였을 때만 반응 (감도 조절)
      if (Math.abs(deltaY) > 20) {
        if (deltaY > 0) {
          // 위로 스와이프: 퍼센트 증가
          setSelectedPercentage(prev => Math.min(100, prev + 1));
        } else {
          // 아래로 스와이프: 퍼센트 감소
          setSelectedPercentage(prev => Math.max(1, prev - 1));
        }
        touchMoveY.current = currentY;
      }
    };

    const touchEndHandler = (e) => {
      touchStartY.current = 0;
      touchMoveY.current = 0;
    };

    // passive: false로 명시적으로 설정하여 preventDefault 가능하도록 함
    container.addEventListener('wheel', wheelHandler, { passive: false });
    container.addEventListener('touchstart', touchStartHandler, { passive: true });
    container.addEventListener('touchmove', touchMoveHandler, { passive: false });
    container.addEventListener('touchend', touchEndHandler, { passive: true });

    return () => {
      container.removeEventListener('wheel', wheelHandler);
      container.removeEventListener('touchstart', touchStartHandler);
      container.removeEventListener('touchmove', touchMoveHandler);
      container.removeEventListener('touchend', touchEndHandler);
    };
  }, []);

  const handleCompleteClick = () => {
    try {
      // ID를 라벨로 변환
      const riskTypeLabels = {
        'aggressive': '공격형',
        'neutral': '중립형',
        'stable': '안정형'
      };

      const styleLabels = {
        'monthly': '매달 안심 용돈',
        'global': '글로벌 탐험가',
        'tax': '스마트 절세'
      };

      // 포트폴리오 데이터 구성
      const portfolioData = {
        ...previousData,
        riskType: riskTypeLabels[previousData.selectedRiskType] || '투자 성향',
        investmentStyle: styleLabels[previousData.selectedStyle] || '투자 키워드',
        targetProfitPercentage: selectedPercentage,
        isMainPortfolio: false, // 새로 생성된 포트폴리오는 기본적으로 대표 포트폴리오가 아님
        isBookmarked: false
      };

      // localStorage에 저장
      const savedPortfolio = addPortfolio(portfolioData);
      console.log('포트폴리오 생성 완료:', savedPortfolio);

      // 포트폴리오 페이지로 이동
      navigate('/portfolio');
    } catch (error) {
      console.error('포트폴리오 저장 실패:', error);
      alert('포트폴리오 저장에 실패했습니다. 다시 시도해주세요.');
    }
  };

  // 초기 투자금 가정 (임시)
  const initialInvestment = 2000000; // 200만원
  const targetProfit = Math.round(initialInvestment * (selectedPercentage / 100));

  // 중앙에 표시할 숫자들 계산 (선택된 값 기준 위아래 2개씩, 항상 5개 유지)
  const getVisibleNumbers = () => {
    const visible = [];
    for (let i = -2; i <= 2; i++) {
      const value = selectedPercentage + i;
      visible.push(value >= 1 && value <= 100 ? value : null);
    }
    return visible;
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
      {/* Back Button with Safe Area and Progress */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          backgroundColor: '#FFFFFF',
          padding: `${LAYOUT.SAFE_AREA_TOP} ${LAYOUT.HORIZONTAL_PADDING}px 0`,
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

          {/* Progress Indicator */}
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
            5/5
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          padding: `0 ${LAYOUT.HORIZONTAL_PADDING}px`
        }}
      >
        {/* Header Section */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            padding: '32px 0'
          }}
        >
          <h1
            style={{
              fontFamily: 'Pretendard, sans-serif',
              fontSize: '24px',
              fontWeight: 700,
              lineHeight: 1.5,
              color: '#000000',
              margin: 0
            }}
          >
            순수익 목표는 얼마인가요?
          </h1>
          <p
            style={{
              fontFamily: 'Pretendard, sans-serif',
              fontSize: '16px',
              fontWeight: 400,
              lineHeight: 1.5,
              color: '#474C57',
              margin: 0
            }}
          >
            목표 순수익 달성 시 새로운 포트폴리오를 제작하거나 상품 추가 개수를 늘릴 수 있어요
          </p>
        </div>

        {/* Percentage Selector */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '31px',
            position: 'relative',
            alignItems: 'flex-start'
          }}
        >
          {/* Wrapper for alignment */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              position: 'relative'
            }}
          >
            {/* Left Label */}
            <p
              style={{
                fontFamily: 'Pretendard, sans-serif',
                fontSize: '18px',
                fontWeight: 500,
                lineHeight: 1.5,
                color: '#000000',
                margin: 0
              }}
            >
              초기 투자금의
            </p>

            {/* Percentage Picker Container */}
            <div
              style={{
                position: 'relative',
                width: '108px',
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              {/* Picker with overflow hidden */}
              <div
                ref={wheelContainerRef}
                style={{
                  position: 'relative',
                  width: '108px',
                  height: '276px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  cursor: 'ns-resize',
                  touchAction: 'none', // 터치 및 휠 이벤트 제어 강화
                  userSelect: 'none' // 텍스트 선택 방지
                }}
              >
                {/* 숫자 리스트 */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px',
                    position: 'relative',
                    zIndex: 1,
                    flexShrink: 0
                  }}
                >
              {getVisibleNumbers().map((percentage, index) => {
                if (percentage === null) {
                  // 빈 공간 렌더링 (실제 박스와 동일한 높이 유지)
                  return (
                    <div
                      key={`empty-${index}`}
                      style={{
                        backgroundColor: 'transparent',
                        minWidth: '108px',
                        padding: '8px 16px',
                        boxSizing: 'border-box'
                      }}
                    >
                      <div style={{ height: '36px' }} />
                    </div>
                  );
                }

                const distance = Math.abs(percentage - selectedPercentage);
                const isCenter = percentage === selectedPercentage;
                const opacity = isCenter ? 1 : distance === 1 ? 0.6 : 0.3;

                return (
                  <div
                    key={percentage}
                    style={{
                      backgroundColor: isCenter ? '#E0EEFF' : '#F7F7F8',
                      borderRadius: '4px',
                      padding: '8px 16px',
                      minWidth: '108px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      opacity: opacity,
                      boxSizing: 'border-box'
                    }}
                    onClick={() => setSelectedPercentage(percentage)}
                  >
                    <p
                      style={{
                        fontFamily: 'Pretendard, sans-serif',
                        fontSize: '24px',
                        fontWeight: 700,
                        lineHeight: 1.5,
                        color: isCenter ? '#3490FF' : '#99C7FF',
                        margin: 0
                      }}
                    >
                      {percentage}
                    </p>
                  </div>
                );
              })}
                </div>
              </div>
            </div>

            {/* Right Label */}
            <p
              style={{
                fontFamily: 'Pretendard, sans-serif',
                fontSize: '18px',
                fontWeight: 500,
                lineHeight: 1.5,
                color: '#000000',
                margin: 0
              }}
            >
              %
            </p>
          </div>
        </div>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Target Profit Display */}
        <div
          style={{
            backgroundColor: '#E0EEFF',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '12px'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <p
              style={{
                fontFamily: 'Pretendard, sans-serif',
                fontSize: '16px',
                fontWeight: 400,
                lineHeight: 1.5,
                color: '#474C57',
                margin: 0
              }}
            >
              목표 순수익
            </p>
            <div
              style={{
                display: 'flex',
                gap: '7px',
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
                  margin: 0
                }}
              >
                {targetProfit.toLocaleString('ko-KR')}
              </p>
              <p
                style={{
                  fontFamily: 'Pretendard, sans-serif',
                  fontSize: '16px',
                  fontWeight: 400,
                  lineHeight: 1.5,
                  color: '#474C57',
                  margin: 0
                }}
              >
                원
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div
        style={{
          padding: `0 ${LAYOUT.HORIZONTAL_PADDING}px`,
          paddingTop: '12px',
          paddingBottom: '34px',
          backgroundColor: '#FFFFFF'
        }}
      >
        <Button variant="primary" onClick={handleCompleteClick}>
          완료하기
        </Button>
      </div>
    </div>
  );
};

export default AutoCreateStep5;
