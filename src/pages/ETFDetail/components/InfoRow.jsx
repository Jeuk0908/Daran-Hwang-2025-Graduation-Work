import React from 'react';
import iconWhy from '../../../assets/icon_why(12_12).svg';

/**
 * ETF 정보 행 컴포넌트
 *
 * @param {Object} props
 * @param {string} props.label - 라벨 텍스트
 * @param {string} props.value - 값 텍스트
 * @param {boolean} props.isClickable - 클릭 가능 여부 (파란색 라벨 + 물음표 아이콘)
 * @param {Function} props.onClick - 클릭 핸들러 (클릭 가능할 때만)
 * @param {boolean} props.isMultiLine - 값이 여러 줄인지 여부
 * @param {boolean} props.noBorder - 하단 보더 제거 여부
 */
export const InfoRow = ({
  label,
  value,
  isClickable = false,
  onClick,
  isMultiLine = false,
  noBorder = false
}) => {
  return (
    <div
      style={{
        borderBottom: noBorder ? 'none' : '1px solid #E6E7EA',
        display: 'flex',
        alignItems: isMultiLine ? 'flex-start' : 'center',
        justifyContent: 'space-between',
        padding: '12px 0',
        width: '100%'
      }}
    >
      {/* 왼쪽: 라벨 (+ 물음표 아이콘) */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '2px',
          cursor: isClickable ? 'pointer' : 'default'
        }}
        onClick={isClickable ? onClick : undefined}
      >
        <p
          style={{
            fontFamily: 'Pretendard, sans-serif',
            fontSize: '14px',
            fontWeight: isClickable ? 400 : 400,
            lineHeight: 1.5,
            color: isClickable ? '#005CCC' : '#474C57',
            margin: 0,
            whiteSpace: 'nowrap',
            width: isClickable ? 'auto' : '86px'
          }}
        >
          {label}
        </p>
        {isClickable && (
          <img
            src={iconWhy}
            alt="도움말"
            style={{
              width: '12px',
              height: '12px',
              flexShrink: 0
            }}
          />
        )}
      </div>

      {/* 오른쪽: 값 */}
      <p
        style={{
          fontFamily: 'Pretendard, sans-serif',
          fontSize: '14px',
          fontWeight: 500,
          lineHeight: 1.5,
          color: '#000000',
          margin: 0,
          textAlign: 'right',
          whiteSpace: isMultiLine ? 'pre-wrap' : 'nowrap',
          wordBreak: isMultiLine ? 'keep-all' : 'normal',
          flex: isMultiLine ? 1 : 'none',
          marginLeft: isMultiLine ? '12px' : '0'
        }}
      >
        {value}
      </p>
    </div>
  );
};
