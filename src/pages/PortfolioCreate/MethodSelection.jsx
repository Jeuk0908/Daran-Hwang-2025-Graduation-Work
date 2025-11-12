import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { LAYOUT } from '../../constants/layout';
import { useScrollShadow } from '../../hooks/useScrollShadow';
import iconBackL from '../../assets/icon_back_L.svg';
import iconAutoCreate from '../../assets/자동제작.svg';
import iconManualCreate from '../../assets/수동제작.svg';

const MethodSelection = () => {
  const navigate = useNavigate();
  const hasScrolled = useScrollShadow(0);
  const [selectedMethod, setSelectedMethod] = useState(null); // 'auto' or 'manual'

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleMethodSelect = (method) => {
    setSelectedMethod(method);
  };

  const handleStartClick = () => {
    if (!selectedMethod) return;

    if (selectedMethod === 'auto') {
      navigate('/portfolio/create/auto');
    } else if (selectedMethod === 'manual') {
      navigate('/portfolio/create/step1');
    }
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
      {/* Back Button with Safe Area */}
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
            alignItems: 'center'
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
            어떤 방식으로 만들어볼까요?
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
            선택한 방법으로 포트폴리오를 만들 수 있어요.
          </p>
        </div>

        {/* Method Selection Cards */}
        <div
          style={{
            display: 'flex',
            gap: '16px',
            marginTop: '48px',
            justifyContent: 'center'
          }}
        >
          {/* Auto Method Card */}
          <div
            onClick={() => handleMethodSelect('auto')}
            style={{
              backgroundColor: selectedMethod === null || selectedMethod === 'auto' ? '#FFFFFF' : '#F5F5F5',
              borderRadius: '12px',
              padding: '40px 16px 24px',
              width: '176px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              alignItems: 'center',
              cursor: 'pointer',
              boxShadow: selectedMethod === 'auto' ? '1px 2px 13.6px 0px rgba(0, 0, 0, 0.1)' : 'none',
              position: 'relative',
              border: selectedMethod === 'auto'
                ? '1px solid rgba(52, 144, 255, 0.25)'
                : selectedMethod === null
                  ? '1px solid #F6F7F8'
                  : '1px solid transparent',
              transition: 'all 0.2s ease'
            }}
          >
            {/* Tag */}
            <div
              style={{
                position: 'absolute',
                top: '18px',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: '#FFFFFF',
                border: '1px solid #3490FF',
                borderRadius: '8px',
                padding: '4px 8px',
                whiteSpace: 'nowrap'
              }}
            >
              <p
                style={{
                  fontFamily: 'Pretendard, sans-serif',
                  fontSize: '12px',
                  fontWeight: 500,
                  lineHeight: 1.5,
                  color: '#3490FF',
                  margin: 0
                }}
              >
                처음이라 어렵다면
              </p>
            </div>

            {/* Icon */}
            <div
              style={{
                width: '120px',
                height: '120px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: selectedMethod === null || selectedMethod === 'auto' ? 1 : 0.4,
                transition: 'opacity 0.2s ease'
              }}
            >
              <img
                src={iconAutoCreate}
                alt="자동 제작"
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
                gap: '4px',
                alignItems: 'center',
                textAlign: 'center'
              }}
            >
              <p
                style={{
                  fontFamily: 'Pretendard, sans-serif',
                  fontSize: '16px',
                  fontWeight: 600,
                  lineHeight: 1.35,
                  color: selectedMethod === null || selectedMethod === 'auto' ? '#1A1C20' : '#9198A6',
                  margin: 0,
                  transition: 'color 0.2s ease'
                }}
              >
                자동 제작하기
              </p>
              <p
                style={{
                  fontFamily: 'Pretendard, sans-serif',
                  fontSize: '12px',
                  fontWeight: 400,
                  lineHeight: 1.5,
                  color: selectedMethod === null || selectedMethod === 'auto' ? '#5E6573' : '#9198A6',
                  margin: 0,
                  whiteSpace: 'pre-line',
                  transition: 'color 0.2s ease'
                }}
              >
                {'원하는 방법에 맞춰\n자동 제작해요'}
              </p>
            </div>
          </div>

          {/* Manual Method Card */}
          <div
            onClick={() => handleMethodSelect('manual')}
            style={{
              backgroundColor: selectedMethod === null || selectedMethod === 'manual' ? '#FFFFFF' : '#F5F5F5',
              borderRadius: '12px',
              padding: '40px 16px 24px',
              width: '176px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              alignItems: 'center',
              cursor: 'pointer',
              boxShadow: selectedMethod === 'manual' ? '1px 2px 13.6px 0px rgba(0, 0, 0, 0.1)' : 'none',
              position: 'relative',
              border: selectedMethod === 'manual'
                ? '1px solid rgba(52, 144, 255, 0.25)'
                : selectedMethod === null
                  ? '1px solid #F6F7F8'
                  : '1px solid transparent',
              transition: 'all 0.2s ease'
            }}
          >
            {/* Tag */}
            <div
              style={{
                position: 'absolute',
                top: '18px',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: '#FFFFFF',
                border: '1px solid #DA6816',
                borderRadius: '8px',
                padding: '4px 8px',
                whiteSpace: 'nowrap'
              }}
            >
              <p
                style={{
                  fontFamily: 'Pretendard, sans-serif',
                  fontSize: '12px',
                  fontWeight: 500,
                  lineHeight: 1.5,
                  color: '#DA6816',
                  margin: 0
                }}
              >
                도전적인 당신에게
              </p>
            </div>

            {/* Icon */}
            <div
              style={{
                width: '120px',
                height: '120px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: selectedMethod === null || selectedMethod === 'manual' ? 1 : 0.4,
                transition: 'opacity 0.2s ease'
              }}
            >
              <img
                src={iconManualCreate}
                alt="직접 제작"
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
                gap: '4px',
                alignItems: 'center',
                textAlign: 'center'
              }}
            >
              <p
                style={{
                  fontFamily: 'Pretendard, sans-serif',
                  fontSize: '16px',
                  fontWeight: 600,
                  lineHeight: 1.35,
                  color: selectedMethod === null || selectedMethod === 'manual' ? '#1A1C20' : '#9198A6',
                  margin: 0,
                  transition: 'color 0.2s ease'
                }}
              >
                직접 제작하기
              </p>
              <p
                style={{
                  fontFamily: 'Pretendard, sans-serif',
                  fontSize: '12px',
                  fontWeight: 400,
                  lineHeight: 1.5,
                  color: selectedMethod === null || selectedMethod === 'manual' ? '#5E6573' : '#9198A6',
                  margin: 0,
                  whiteSpace: 'pre-line',
                  transition: 'color 0.2s ease'
                }}
              >
                {'도전적으로 직접 제작해\n전략을 구성해요'}
              </p>
            </div>
          </div>
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
            바로 제작해 볼까요?
          </p>
        </div>

        {/* Button */}
        <div style={{ padding: '12px 0' }}>
          <Button
            variant={selectedMethod ? 'primary' : 'grey'}
            onClick={handleStartClick}
            disabled={!selectedMethod}
          >
            시작하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MethodSelection;
