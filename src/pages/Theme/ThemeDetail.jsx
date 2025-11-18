import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { TopNav } from '../../components/common/TopNav';
import { SimpleChartViewer } from '../../components/common/SimpleChartViewer';
import { LAYOUT } from '../../constants/layout';
import { THEME_DATA, getAllETFs } from '../ETFDetail/data/mockData';

const ThemeDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { filter, selectedThemeId } = location.state || { filter: 'up', selectedThemeId: null };
  const sectionRefs = useRef({});

  // 모든 ETF 가져오기
  const allETFs = getAllETFs();

  // ETF 데이터를 SimpleChartViewer 형식으로 변환
  const convertETFToViewerFormat = (etf) => {
    return {
      id: etf.id,
      name: etf.name,
      code: etf.code,
      currentPrice: etf.currentPrice.toLocaleString('ko-KR'),
      changePercent: Math.abs(etf.changePercent).toFixed(2),
      changeDirection: etf.changeDirection
    };
  };

  // 상위 3개 테마를 선택 (필터에 따라)
  const selectedThemes = filter === 'up' ? THEME_DATA.slice(0, 3) : THEME_DATA.slice(3, 6);

  // 각 테마별 ETF 목록 생성
  const themeSections = selectedThemes.map((theme, index) => {
    const themeETFs = allETFs.filter(etf => theme.etfIds.includes(etf.id));
    const etfList = themeETFs.map(convertETFToViewerFormat);

    return {
      id: theme.id,
      rank: index + 1,
      name: theme.name,
      etfCount: etfList.length,
      etfs: etfList
    };
  });

  // 선택된 테마로 자동 스크롤
  useEffect(() => {
    if (selectedThemeId) {
      // 페이지 렌더링 완료 후 스크롤
      setTimeout(() => {
        const element = sectionRefs.current[selectedThemeId];
        if (!element) return;

        const topNavHeight = 50; // TopNav 높이
        const offset = 13; // 추가 여백

        // 요소의 절대 위치 계산
        const elementRect = element.getBoundingClientRect();
        const absoluteElementTop = elementRect.top + window.pageYOffset;
        const targetPosition = absoluteElementTop - topNavHeight - offset;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }, 100);
    }
  }, [selectedThemeId, themeSections]);

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#FFFFFF',
        position: 'relative',
        paddingBottom: '88px' // 하단 라벨 + Home Indicator 영역
      }}
    >
      {/* TopNav */}
      <div style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: '#FFFFFF'
      }}>
        <TopNav
          title="인기 테마"
          depth="2"
          state="number"
          showBackButton={true}
          showTitle={true}
          onBackClick={() => navigate(-1)}
        />
      </div>

      {/* 모든 테마 섹션 */}
      {themeSections.map((section, sectionIndex) => (
        <div
          key={sectionIndex}
          ref={(el) => (sectionRefs.current[section.id] = el)}
          style={{
            width: '100%',
            paddingTop: sectionIndex === 0 ? '13px' : '32px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}
        >
          {/* 섹션 헤더 */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              padding: `12px ${LAYOUT.HORIZONTAL_PADDING}px`,
              width: '100%'
            }}
          >
            <p
              style={{
                fontFamily: 'Pretendard, sans-serif',
                fontSize: '20px',
                fontWeight: 600,
                lineHeight: 1.35,
                color: '#000000',
                margin: 0,
                whiteSpace: 'nowrap'
              }}
            >
              <span style={{ color: '#474C57' }}>TOP {section.rank} </span>
              {section.name}
            </p>
            <p
              style={{
                fontFamily: 'Pretendard, sans-serif',
                fontSize: '14px',
                fontWeight: 400,
                lineHeight: 1.5,
                color: '#474C57',
                margin: 0,
                whiteSpace: 'nowrap'
              }}
            >
              {section.etfCount}종목
            </p>
          </div>

          {/* ETF 목록 */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              padding: `0 ${LAYOUT.HORIZONTAL_PADDING}px`,
              width: '100%'
            }}
          >
            {section.etfs.map((etf) => (
              <SimpleChartViewer
                key={etf.id}
                name={etf.name}
                code={etf.code}
                currentPrice={etf.currentPrice}
                changePercent={etf.changePercent}
                changeDirection={etf.changeDirection}
                showTopLabel={false}
                showPriceComparison={false}
                showChart={true}
                onClick={() => navigate(`/etf/${etf.id}/detail`)}
              />
            ))}
          </div>
        </div>
      ))}

      {/* 하단 라벨 영역 + Home Indicator */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: '430px',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#FFFFFF'
        }}
      >
        {/* 라벨 영역 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: `0 ${LAYOUT.HORIZONTAL_PADDING}px`,
            width: '100%',
            borderTop: '1px solid #F7F7F8'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '10px',
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
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '10px'
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
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              padding: '10px',
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

        {/* Home Indicator */}
        <div
          style={{
            height: '34px',
            width: '100%',
            backgroundColor: '#FFFFFF',
            borderTop: '1px solid #F7F7F8',
            position: 'relative',
            backdropFilter: 'blur(16px)'
          }}
        >
          <div
            style={{
              position: 'absolute',
              bottom: '8px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '134px',
              height: '5px',
              backgroundColor: '#000000',
              borderRadius: '100px'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ThemeDetail;
