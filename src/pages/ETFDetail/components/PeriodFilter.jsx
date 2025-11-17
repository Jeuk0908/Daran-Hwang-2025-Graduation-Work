import React from 'react';

/**
 * 기준일 필터 컴포넌트
 *
 * @param {Object} props
 * @param {Array<string>} props.periods - 기간 목록 (기본값: ['1D', '1M', '3M', '6M', '1Y', 'MAX'])
 * @param {string} props.selectedPeriod - 선택된 기간
 * @param {function} props.onPeriodChange - 기간 변경 핸들러 (newPeriod) => void
 */
export const PeriodFilter = ({
  periods = ['1D', '1M', '3M', '6M', '1Y', 'MAX'],
  selectedPeriod = '1D',
  onPeriodChange
}) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        width: '100%'
      }}
    >
      {/* 기준일 라벨 */}
      <p
        style={{
          fontFamily: 'Pretendard, sans-serif',
          fontSize: '14px',
          fontWeight: 400,
          lineHeight: 1.5,
          color: '#474C57',
          margin: 0,
          whiteSpace: 'nowrap',
          flexShrink: 0
        }}
      >
        기준일
      </p>

      {/* 기간 버튼 컨테이너 */}
      <div
        style={{
          backgroundColor: '#F7F7F8',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          flex: 1
        }}
      >
        {periods.map((period, index) => {
          const isSelected = selectedPeriod === period;
          const isLast = index === periods.length - 1;

          return (
            <button
              key={period}
              onClick={() => onPeriodChange?.(period)}
              style={{
                flex: 1,
                height: '40px',
                backgroundColor: isSelected ? '#3490FF' : 'transparent',
                border: 'none',
                borderRight: isLast ? 'none' : '1px solid #FFFFFF',
                borderRadius: index === 0
                  ? '8px 0 0 8px'
                  : isLast
                  ? '0 8px 8px 0'
                  : '0',
                padding: '10px 12px',
                fontFamily: 'Pretendard, sans-serif',
                fontSize: '14px',
                fontWeight: 500,
                lineHeight: 1.5,
                color: isSelected ? '#FFFFFF' : '#474C57',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease, color 0.2s ease',
                outline: 'none',
                whiteSpace: 'nowrap'
              }}
            >
              {period}
            </button>
          );
        })}
      </div>
    </div>
  );
};
