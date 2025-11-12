import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { LAYOUT } from '../../constants/layout';
import { useScrollShadow } from '../../hooks/useScrollShadow';
import iconBackL from '../../assets/icon_back_L.svg';
import iconMonthly from '../../assets/매달 안심 용돈.svg';
import iconGlobal from '../../assets/글로벌 탐험가.svg';
import iconTax from '../../assets/스마트 절세.svg';

const AutoCreateStep2 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const hasScrolled = useScrollShadow(0);
  const [selectedStyle, setSelectedStyle] = useState(null); // 'monthly', 'global', 'tax'

  // 이전 페이지에서 전달받은 선택된 손실 유형
  const previousSelection = location.state?.selectedRiskType;

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleStyleSelect = (style) => {
    setSelectedStyle(style);
  };

  const handleNextClick = () => {
    if (!selectedStyle) return;
    // 다음 단계로 이동 (3/5) - 선택된 스타일을 포함하여 state로 전달
    navigate('/portfolio/create/auto/step3', {
      state: {
        selectedRiskType: previousSelection,
        selectedStyle
      }
    });
  };

  const styles = [
    {
      id: 'monthly',
      title: '매달 안심 용돈',
      description: '매달 꼬박꼬박 배당금을 받을 수 있어요.',
      icon: iconMonthly
    },
    {
      id: 'global',
      title: '글로벌 탐험가',
      description: '해외 위주로 투자할께요.',
      icon: iconGlobal
    },
    {
      id: 'tax',
      title: '스마트 절세',
      description: '배당금을 재투자(TR)하는 상품 위주 투자에요.',
      icon: iconTax
    }
  ];

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
            2/5
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
            어떤 스타일을 추구하나요?
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
            선택한 방법을 참고해 자동 포트폴리오를 제작해요.
          </p>
        </div>

        {/* Style Selection Cards */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            marginTop: '14px'
          }}
        >
          {styles.map((style) => (
            <div
              key={style.id}
              onClick={() => handleStyleSelect(style.id)}
              style={{
                padding: '0',
                cursor: 'pointer'
              }}
            >
              <div
                style={{
                  backgroundColor: selectedStyle === null || selectedStyle === style.id ? '#FFFFFF' : '#F7F7F8',
                  borderRadius: '12px',
                  padding: '24px 16px',
                  display: 'flex',
                  gap: '16px',
                  alignItems: 'center',
                  boxShadow: selectedStyle === style.id ? '1px 2px 13.6px 0px rgba(0, 0, 0, 0.1)' : 'none',
                  border: selectedStyle === style.id
                    ? '1px solid #3490FF'
                    : selectedStyle === null
                      ? '1px solid #F6F7F8'
                      : '1px solid transparent',
                  transition: 'all 0.2s ease'
                }}
              >
                {/* Icon */}
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <img
                    src={style.icon}
                    alt={style.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      display: 'block'
                    }}
                  />
                </div>

                {/* Text Content */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    flex: 1
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'Pretendard, sans-serif',
                      fontSize: '20px',
                      fontWeight: 600,
                      lineHeight: 1.35,
                      color: selectedStyle === null || selectedStyle === style.id ? '#1A1C20' : '#5E6573',
                      margin: 0,
                      transition: 'color 0.2s ease'
                    }}
                  >
                    {style.title}
                  </p>
                  <p
                    style={{
                      fontFamily: 'Pretendard, sans-serif',
                      fontSize: '16px',
                      fontWeight: 500,
                      lineHeight: 1.5,
                      color: '#9198A6',
                      margin: 0
                    }}
                  >
                    {style.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div
        style={{
          padding: `0 ${LAYOUT.HORIZONTAL_PADDING}px`,
          paddingBottom: '34px',
          backgroundColor: '#FFFFFF'
        }}
      >
        {/* Caption */}
        <div
          style={{
            padding: '4px 0',
            textAlign: 'center'
          }}
        >
          <p
            style={{
              fontFamily: 'Pretendard, sans-serif',
              fontSize: '12px',
              fontWeight: 400,
              lineHeight: 1.5,
              color: '#757E8F',
              margin: 0
            }}
          >
            손실 유형을 선택해 주세요
          </p>
        </div>

        {/* Button */}
        <div style={{ padding: '12px 0' }}>
          <Button
            variant={selectedStyle ? 'primary' : 'grey'}
            onClick={handleNextClick}
            disabled={!selectedStyle}
          >
            선택하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AutoCreateStep2;
