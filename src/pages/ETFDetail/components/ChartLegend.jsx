import React from 'react';

/**
 * 차트 범례 컴포넌트
 *
 * @param {Object} props
 * @param {Array<Object>} props.items - 범례 항목 배열
 *   [{ color: '#3490FF', label: '종가' }, ...]
 */
export const ChartLegend = ({
  items = [
    { color: '#0092FF', label: '종가' },
    { color: '#FB7D1D', label: '기준가격(NAV)' },
    { color: '#4AD944', label: '기초지수' }
  ]
}) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: '8px',
        width: '100%',
        padding: '12px 0'
      }}
    >
      {items.map((item, index) => (
        <div
          key={index}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          {/* 색상 점 */}
          <div
            style={{
              width: '14px',
              height: '14px',
              backgroundColor: item.color,
              borderRadius: '10px',
              flexShrink: 0
            }}
          />

          {/* 라벨 */}
          <p
            style={{
              fontFamily: 'Pretendard, sans-serif',
              fontSize: '10px',
              fontWeight: 500,
              lineHeight: 1.25,
              color: '#474C57',
              margin: 0,
              whiteSpace: 'nowrap'
            }}
          >
            {item.label}
          </p>
        </div>
      ))}
    </div>
  );
};
