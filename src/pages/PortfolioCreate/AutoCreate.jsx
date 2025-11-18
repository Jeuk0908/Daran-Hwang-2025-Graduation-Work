import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { LAYOUT } from '../../constants/layout';
import { useScrollShadow } from '../../hooks/useScrollShadow';
import iconBackL from '../../assets/icon_back_L.svg';
import iconCheckOn from '../../assets/icon_check_on.svg';
import iconCheckOff from '../../assets/icon_check_off.svg';

const AutoCreate = () => {
  const navigate = useNavigate();
  const hasScrolled = useScrollShadow(0);
  const [selectedRiskType, setSelectedRiskType] = useState(null); // 'aggressive', 'neutral', 'stable'

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleRiskTypeSelect = (type) => {
    setSelectedRiskType(type);
  };

  const handleNextClick = () => {
    if (!selectedRiskType) return;
    // 다음 단계로 이동 (2/5) - 선택된 손실 유형을 state로 전달
    navigate('/portfolio/create/auto/step2', {
      state: { selectedRiskType }
    });
  };

  const riskTypes = [
    {
      id: 'aggressive',
      title: '공격형',
      titleColor: '#AB5211',
      description: '인생은 모험! 높은 수준의 손실도 감당해요.'
    },
    {
      id: 'neutral',
      title: '중립형',
      titleColor: '#005CCC',
      description: '적당한 손실과 방어로 투자해요.'
    },
    {
      id: 'stable',
      title: '안정형',
      titleColor: '#43A329',
      description: '적어도 내 기본 자금은 잃고 싶지 않아요.'
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
            1/5
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
            손실을 얼마나 감당할 수 있나요?
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

        {/* Risk Type Selection Cards */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            marginTop: '14px'
          }}
        >
          {riskTypes.map((type) => (
            <div
              key={type.id}
              onClick={() => handleRiskTypeSelect(type.id)}
              style={{
                padding: '0',
                cursor: 'pointer'
              }}
            >
              <div
                style={{
                  backgroundColor: selectedRiskType === null || selectedRiskType === type.id ? '#FFFFFF' : '#F7F7F8',
                  borderRadius: '12px',
                  padding: '24px 16px',
                  display: 'flex',
                  gap: '16px',
                  alignItems: 'center',
                  boxShadow: selectedRiskType === type.id ? '1px 2px 13.6px 0px rgba(0, 0, 0, 0.1)' : 'none',
                  border: selectedRiskType === type.id
                    ? '1px solid #3490FF'
                    : selectedRiskType === null
                      ? '1px solid #F6F7F8'
                      : '1px solid transparent',
                  transition: 'all 0.2s ease'
                }}
              >
                {/* Check Icon */}
                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    flexShrink: 0
                  }}
                >
                  <img
                    src={selectedRiskType === type.id ? iconCheckOn : iconCheckOff}
                    alt=""
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
                      color: selectedRiskType === null || selectedRiskType === type.id ? type.titleColor : '#5E6573',
                      margin: 0,
                      transition: 'color 0.2s ease'
                    }}
                  >
                    {type.title}
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
                    {type.description}
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
            variant={selectedRiskType ? 'primary' : 'grey'}
            onClick={handleNextClick}
            disabled={!selectedRiskType}
          >
            선택하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AutoCreate;
