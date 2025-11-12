import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { LAYOUT } from '../../constants/layout';
import { useScrollShadow } from '../../hooks/useScrollShadow';
import iconBackL from '../../assets/icon_back_L.svg';
import iconCheckXs from '../../assets/icon_ckeck(XS).svg';
import iconCheckXsGreen from '../../assets/icon_ckeck(XS)_green.svg';

const AutoCreateStep4 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const hasScrolled = useScrollShadow(0);

  // 직접제작 플로우인지 확인
  const isManualFlow = location.pathname === '/portfolio/create/step1';

  // 이전 페이지에서 전달받은 데이터
  const previousData = location.state || {};

  const [portfolioName, setPortfolioName] = useState('');

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleNameChange = (e) => {
    setPortfolioName(e.target.value);
  };

  const handleNextClick = () => {
    if (portfolioName.trim().length < 3) return;

    // 직접제작 플로우일 경우 step2(ETF 선택)로, 자동제작일 경우 step5로 이동
    const nextPath = isManualFlow ? '/portfolio/create/step2' : '/portfolio/create/auto/step5';

    navigate(nextPath, {
      state: {
        ...previousData,
        portfolioName: portfolioName.trim()
      }
    });
  };

  const handleSelectedETFClick = () => {
    console.log('선택 ETF 확인 클릭');
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

          {/* Right section with chip and progress */}
          <div
            style={{
              display: 'flex',
              gap: '12px',
              alignItems: 'center'
            }}
          >
            {/* 선택 ETF 확인 Chip */}
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
                선택 ETF 확인
              </p>
            </div>

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
              {isManualFlow ? '1/4' : '4/5'}
            </p>
          </div>
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
            어떤 포트폴리오 인가요?
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
            포트폴리오의 이름을 알려주세요
          </p>
        </div>

        {/* Text Input Section */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            padding: '24px 0',
            marginTop: '47px'
          }}
        >
          {/* Input Field */}
          <input
            type="text"
            value={portfolioName}
            onChange={handleNameChange}
            placeholder="이름을 작성해 주세요."
            style={{
              backgroundColor: portfolioName.trim().length >= 3 ? '#EFFAEC' : '#E6E7EA',
              borderRadius: '8px',
              padding: '12px',
              border: 'none',
              fontFamily: 'Pretendard, sans-serif',
              fontSize: '16px',
              fontWeight: 400,
              lineHeight: 1.5,
              color: '#1A1C20',
              outline: 'none',
              width: '100%',
              boxSizing: 'border-box'
            }}
          />

          {/* Helper Text */}
          <div
            style={{
              display: 'flex',
              gap: '2px',
              alignItems: 'center'
            }}
          >
            <img
              src={portfolioName.trim().length >= 3 ? iconCheckXsGreen : iconCheckXs}
              alt=""
              style={{
                width: '12px',
                height: '12px',
                display: 'block'
              }}
            />
            <p
              style={{
                fontFamily: 'Pretendard, sans-serif',
                fontSize: '12px',
                fontWeight: 400,
                lineHeight: 1.5,
                color: portfolioName.trim().length >= 3 ? '#43A329' : '#1A1C20',
                margin: 0
              }}
            >
              {portfolioName.trim().length >= 3 ? '좋은 이름이예요' : '최소 3자 이상 입력해주세요'}
            </p>
          </div>
        </div>

        {/* Spacer to push info box to bottom */}
        <div style={{ flex: 1 }} />

        {/* Info Box */}
        <div
          style={{
            backgroundColor: '#F7F7F8',
            borderRadius: '12px',
            padding: '8px 10px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            marginBottom: '20px'
          }}
        >
          {/* Chip */}
          <div
            style={{
              backgroundColor: '#E0EEFF',
              borderRadius: '8px',
              padding: '4px 6px',
              display: 'inline-flex',
              alignSelf: 'flex-start'
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
              어떻게 짓는게 좋을까요?
            </p>
          </div>

          {/* Description */}
          <p
            style={{
              fontFamily: 'Pretendard, sans-serif',
              fontSize: '14px',
              fontWeight: 500,
              lineHeight: 1.5,
              color: '#474C57',
              margin: 0
            }}
          >
            수익률에 대한 목표나, 투자 성향,지역
            <span style={{ color: '#757E8F' }}>을 반영하거나 </span>
            상징적이거나 재치 있는 이름
            <span style={{ color: '#757E8F' }}>도 괜찮아요.</span>
          </p>
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
        <Button
          variant={portfolioName.trim().length >= 3 ? 'primary' : 'grey'}
          onClick={handleNextClick}
          disabled={portfolioName.trim().length < 3}
        >
          ETF 선택하기
        </Button>
      </div>
    </div>
  );
};

export default AutoCreateStep4;
