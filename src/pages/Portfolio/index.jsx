import { useNavigate } from 'react-router-dom';
import { TopNav } from '../../components/common/TopNav';
import { PortfolioMainCard } from '../../components/common/PortfolioMainCard';
import { LAYOUT } from '../../constants/layout';
import { useScrollShadow } from '../../hooks/useScrollShadow';
import iconSetting from '../../assets/icon_setting2.svg';

const Portfolio = () => {
  const navigate = useNavigate();
  const hasScrolled = useScrollShadow(0);

  const handleBackClick = () => {
    navigate(-1);
  };

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
        paddingTop: LAYOUT.SAFE_AREA_TOP,
        padding: `${LAYOUT.SAFE_AREA_TOP} ${LAYOUT.HORIZONTAL_PADDING}px 0`,
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
        {/* 대표 포트폴리오 카드 */}
        <PortfolioMainCard
          portfolioType="대표 포트폴리오"
          tags={['#투자 성향', '#투자 키워드']}
          title="미국 빅테크 배당금"
          isFavorite={true}
          amount="999,999,999"
          changePercent="27.3"
          changeDirection="up"
          primaryButtonText="리밸런싱 확인"
          secondaryButtonText="체크포인트"
          onFavoriteClick={() => console.log('Favorite clicked')}
          onPrimaryButtonClick={() => console.log('리밸런싱 확인 clicked')}
          onSecondaryButtonClick={() => console.log('체크포인트 clicked')}
        />
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
  );
};

export default Portfolio;
