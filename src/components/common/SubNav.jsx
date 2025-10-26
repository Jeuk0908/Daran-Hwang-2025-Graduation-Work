import React from 'react';

const tabs = [
  { id: 'returns', label: '수익률' },
  { id: 'info', label: '기본정보' },
  { id: 'composition', label: '구성종목' },
  { id: 'dividend', label: '배당' },
];

export const SubNav = ({
  activeTab = 'returns', // 'returns' | 'info' | 'composition' | 'dividend'
  onTabChange,
  style,
}) => {
  const handleTabClick = (tabId) => {
    if (onTabChange) {
      onTabChange(tabId);
    }
  };

  return (
    <div
      style={{
        borderBottom: '1px solid #F7F7F8',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        ...style,
      }}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;

        return (
          <div
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            style={{
              boxSizing: 'border-box',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              paddingLeft: '16px',
              paddingRight: '16px',
              flex: 1,
              cursor: 'pointer',
            }}
          >
            <div
              style={{
                display: 'flex',
                gap: '10px',
                height: '42px',
                alignItems: 'center',
                justifyContent: 'center',
                borderBottom: isActive ? '3px solid #3490FF' : 'none',
              }}
            >
              <p
                style={{
                  fontFamily: 'Pretendard, sans-serif',
                  fontSize: '16px',
                  fontWeight: 600,
                  lineHeight: 1.35,
                  color: isActive ? '#000000' : '#5E6573',
                  whiteSpace: 'pre',
                  margin: 0,
                }}
              >
                {tab.label}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
