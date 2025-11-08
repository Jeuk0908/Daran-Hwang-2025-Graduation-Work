import { useRef, useEffect, useState } from 'react';

/**
 * CenterTabNav - 중앙 탭 네비게이션 바 컴포넌트
 *
 * @param {Object} props
 * @param {string[]} props.tabs - 탭 라벨 배열 (예: ['전체', 'Q&A', '영상 TIP', '뉴스'])
 * @param {string} props.activeTab - 현재 활성화된 탭
 * @param {function} props.onTabChange - 탭 변경 핸들러
 */
export const CenterTabNav = ({ tabs = [], activeTab, onTabChange }) => {
  const tabRefs = useRef([]);
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    width: 0
  });

  const handleTabClick = (tab) => {
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  // 활성 탭이 변경될 때 인디케이터 위치 업데이트
  useEffect(() => {
    const activeIndex = tabs.indexOf(activeTab);
    if (activeIndex !== -1 && tabRefs.current[activeIndex]) {
      const tabElement = tabRefs.current[activeIndex];
      setIndicatorStyle({
        left: tabElement.offsetLeft,
        width: tabElement.offsetWidth
      });
    }
  }, [activeTab, tabs]);

  return (
    <div
      style={{
        width: '100%',
        position: 'relative'
      }}
    >
      {/* 탭 컨테이너 */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          position: 'relative',
          paddingLeft: '10px'
        }}
      >
        {tabs.map((tab, index) => {
          const isActive = tab === activeTab;
          const isFirst = index === 0;
          const isLast = index === tabs.length - 1;
          const horizontalPadding = isFirst || isLast ? '16px' : '8px';

          return (
            <div
              key={tab}
              ref={(el) => (tabRefs.current[index] = el)}
              onClick={() => handleTabClick(tab)}
              style={{
                paddingTop: '8px',
                paddingBottom: '12px',
                paddingLeft: horizontalPadding,
                paddingRight: horizontalPadding,
                opacity: 0.8,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '10px',
                cursor: onTabChange ? 'pointer' : 'default'
              }}
            >
              <div
                style={{
                  color: isActive ? '#005CCC' : '#757E8F',
                  fontSize: '20px',
                  fontFamily: 'Pretendard, sans-serif',
                  fontWeight: 600,
                  lineHeight: 1.35,
                  whiteSpace: 'nowrap',
                  transition: 'color 0.3s ease'
                }}
              >
                {tab}
              </div>
            </div>
          );
        })}
      </div>

      {/* 애니메이션 인디케이터 */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: activeTab === '전체' ? indicatorStyle.left + 5 : indicatorStyle.left,
          width: activeTab === '전체' ? indicatorStyle.width - 10 : indicatorStyle.width,
          height: '3px',
          backgroundColor: '#3490FF',
          borderRadius: '1.5px',
          transition: 'left 0.3s ease, width 0.3s ease'
        }}
      />
    </div>
  );
};
