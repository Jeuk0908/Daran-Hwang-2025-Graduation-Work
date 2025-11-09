import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { LAYOUT } from '../../constants/layout';
import { useScrollShadow } from '../../hooks/useScrollShadow';
import iconCheckOn from '../../assets/icon_check_on.svg';
import iconBackL from '../../assets/icon_back_L.svg';

const PortfolioCreate = () => {
  const navigate = useNavigate();
  const hasScrolled = useScrollShadow(0);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleStartClick = () => {
    navigate('/portfolio/create/method');
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
          padding: `${LAYOUT.SAFE_AREA_TOP} ${LAYOUT.HORIZONTAL_PADDING}px 0`,
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
              margin: 0,
              whiteSpace: 'pre-line'
            }}
          >
            {'지금부터\n포트폴리오 제작을 시작할께요'}
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
            아래 사항을 참고하여 바로 시작해 볼까요?
          </p>
        </div>

        {/* Info Cards */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            marginTop: '48px'
          }}
        >
          {/* Card 1 */}
          <div
            style={{
              backgroundColor: '#FAFCFF',
              borderRadius: '8px',
              padding: '40px 16px',
              display: 'flex',
              gap: '12px',
              alignItems: 'center'
            }}
          >
            <img
              src={iconCheckOn}
              alt=""
              style={{
                width: '24px',
                height: '24px',
                flexShrink: 0
              }}
            />
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                flex: 1
              }}
            >
              <p
                style={{
                  fontFamily: 'Pretendard, sans-serif',
                  fontSize: '16px',
                  fontWeight: 600,
                  lineHeight: 1.35,
                  color: '#1A1C20',
                  margin: 0
                }}
              >
                제작 가능 포트폴리오는 총 3개
              </p>
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
                목표 순수익을 넘겼을 때 추가로 더 제작이 가능해요!
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div
            style={{
              backgroundColor: '#FAFCFF',
              borderRadius: '8px',
              padding: '40px 16px',
              display: 'flex',
              gap: '12px',
              alignItems: 'center'
            }}
          >
            <img
              src={iconCheckOn}
              alt=""
              style={{
                width: '24px',
                height: '24px',
                flexShrink: 0
              }}
            />
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                flex: 1
              }}
            >
              <p
                style={{
                  fontFamily: 'Pretendard, sans-serif',
                  fontSize: '16px',
                  fontWeight: 600,
                  lineHeight: 1.35,
                  color: '#1A1C20',
                  margin: 0
                }}
              >
                포함 ETF는 5개까지
              </p>
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
                목표 순수익을 넘겼을 때 더 많은 ETF를 추가할 수 있어요!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Button */}
      <div
        style={{
          padding: `12px ${LAYOUT.HORIZONTAL_PADDING}px`,
          paddingBottom: '34px', // Home indicator area
          backgroundColor: '#FFFFFF'
        }}
      >
        <Button variant="primary" onClick={handleStartClick}>
          시작하기
        </Button>
      </div>
    </div>
  );
};

export default PortfolioCreate;