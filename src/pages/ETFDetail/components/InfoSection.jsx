import React from 'react';
import { Chip } from '../../../components/common/Chip';

/**
 * 정보 섹션 컴포넌트
 *
 * @param {Object} props
 * @param {Array<Object>} props.items - 정보 항목 배열
 *   [{ chipTitle: '...', chipColor: 'upTrend', description: '...' }, ...]
 * @param {string} props.footnote - 하단 주석 텍스트
 */
export const InfoSection = ({
  items = [],
  footnote
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        width: '100%'
      }}
    >
      {/* 정보 카드 */}
      {items.length > 0 && (
        <div
          style={{
            backgroundColor: '#F7F7F8',
            borderRadius: '12px',
            padding: '8px 10px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}
        >
          {items.map((item, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                alignItems: 'flex-start'
              }}
            >
              {/* 칩 */}
              <Chip
                title={item.chipTitle}
                color={item.chipColor || 'upTrend'}
                state="select"
              />

              {/* 설명 */}
              <p
                style={{
                  fontFamily: 'Pretendard, sans-serif',
                  fontSize: '14px',
                  fontWeight: 400,
                  lineHeight: 1.5,
                  color: '#474C57',
                  margin: 0,
                  width: '100%'
                }}
              >
                {item.description.split(/\{([^}]+)\}/).map((part, idx) =>
                  idx % 2 === 1 ? (
                    <span key={idx} style={{ fontWeight: 700 }}>
                      {part}
                    </span>
                  ) : (
                    part
                  )
                )}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* 주석 */}
      {footnote && (
        <ul
          style={{
            fontFamily: 'Pretendard, sans-serif',
            fontSize: '10px',
            fontWeight: 500,
            lineHeight: 1.25,
            color: '#757E8F',
            margin: 0,
            paddingLeft: '15px',
            listStylePosition: 'outside'
          }}
        >
          {footnote.split('\n').map((line, index) => (
            <li key={index} style={{ marginBottom: index === 0 ? '0' : '0' }}>
              {line}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
