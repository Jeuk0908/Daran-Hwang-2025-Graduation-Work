import React from 'react';

/**
 * ETF 수익률 표 컴포넌트
 *
 * @param {Object} props
 * @param {Object} props.data - 수익률 데이터
 *   { close: [7.62, 7.62, null, ...], nav: [...], index: [...] }
 * @param {Array<string>} props.periods - 기간 목록 ['1M', '3M', '6M', '1Y', '3Y', '5Y', '상장이후']
 */
export const ETFReturnsTable = ({
  data = {
    close: [7.62, -7.62, null, null, null, null, 7.62],
    nav: [-7.66, 7.66, null, null, null, null, 7.66],
    index: [7.56, -7.56, null, null, null, null, 7.56]
  },
  periods = ['1M', '3M', '6M', '1Y', '3Y', '5Y', '상장이후']
}) => {
  // 수익률 값 렌더링 (색상 포함)
  const renderValue = (value) => {
    if (value === null || value === undefined) {
      return (
        <p
          style={{
            fontFamily: 'Pretendard, sans-serif',
            fontSize: '14px',
            fontWeight: 500,
            lineHeight: 1.5,
            color: '#000000',
            margin: 0,
            whiteSpace: 'nowrap'
          }}
        >
          -
        </p>
      );
    }

    const color = value > 0 ? '#43A329' : value < 0 ? '#DA6816' : '#000000';
    const displayValue = value > 0 ? `${value}%` : `${value}%`;

    return (
      <p
        style={{
          fontFamily: 'Pretendard, sans-serif',
          fontSize: '14px',
          fontWeight: 500,
          lineHeight: 1.5,
          color: color,
          margin: 0,
          whiteSpace: 'nowrap'
        }}
      >
        {displayValue}
      </p>
    );
  };

  // 컬럼 너비 계산 (1Y, 3Y, 5Y는 61px, 나머지는 60px)
  const getColumnWidth = (index) => {
    return (index === 3 || index === 4 || index === 5) ? '61px' : '60px';
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        width: '100%',
        gap: '0'
      }}
    >
      {/* 왼쪽 고정 열 (행 레이블) */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          width: '69px',
          flexShrink: 0
        }}
      >
        {/* 데이터 행 레이블 */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            display: 'flex',
            flexDirection: 'column',
            width: '100%'
          }}
        >
          {/* 종가 */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              height: '41px',
              padding: '10px 16px 10px 12px',
              boxSizing: 'border-box',
              width: '100%'
            }}
          >
            <p
              style={{
                fontFamily: 'Pretendard, sans-serif',
                fontSize: '12px',
                fontWeight: 500,
                lineHeight: 1.5,
                color: '#000000',
                margin: 0,
                whiteSpace: 'nowrap'
              }}
            >
              종가
            </p>
          </div>

          {/* NAV */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              height: '41px',
              padding: '10px 16px 10px 12px',
              boxSizing: 'border-box',
              width: '100%'
            }}
          >
            <p
              style={{
                fontFamily: 'Pretendard, sans-serif',
                fontSize: '12px',
                fontWeight: 500,
                lineHeight: 1.5,
                color: '#000000',
                margin: 0,
                whiteSpace: 'nowrap'
              }}
            >
              NAV
            </p>
          </div>

          {/* 기초지수 */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              height: '41px',
              padding: '10px 12px 10px 12px',
              boxSizing: 'border-box',
              width: '100%'
            }}
          >
            <p
              style={{
                fontFamily: 'Pretendard, sans-serif',
                fontSize: '12px',
                fontWeight: 500,
                lineHeight: 1.5,
                color: '#000000',
                margin: 0,
                whiteSpace: 'nowrap'
              }}
            >
              기초지수
            </p>
          </div>
        </div>

        {/* 기준일 */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            padding: '10px 16px 10px 12px',
            boxSizing: 'border-box',
            width: '100%'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              width: '100%'
            }}
          >
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
              기준일
            </p>
          </div>
        </div>
      </div>

      {/* 오른쪽 스크롤 가능 영역 (데이터) */}
      <div
        style={{
          backgroundColor: '#F7F7F8',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          flex: 1,
          overflowX: 'auto',
          overflowY: 'hidden',
          maxWidth: 'calc(100% - 69px)'
        }}
      >
        {/* 데이터 행들 */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}
        >
          {/* 종가 행 */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '100%'
            }}
          >
            {data.close.map((value, index) => (
              <div
                key={index}
                style={{
                  boxSizing: 'border-box',
                  display: 'flex',
                  gap: '10px',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '10px',
                  width: getColumnWidth(index),
                  flexShrink: 0
                }}
              >
                {renderValue(value)}
              </div>
            ))}
          </div>

          {/* NAV 행 */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '100%'
            }}
          >
            {data.nav.map((value, index) => (
              <div
                key={index}
                style={{
                  boxSizing: 'border-box',
                  display: 'flex',
                  gap: '10px',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '10px',
                  width: getColumnWidth(index),
                  flexShrink: 0
                }}
              >
                {renderValue(value)}
              </div>
            ))}
          </div>

          {/* 기초지수 행 */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '100%'
            }}
          >
            {data.index.map((value, index) => (
              <div
                key={index}
                style={{
                  boxSizing: 'border-box',
                  display: 'flex',
                  gap: '10px',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '10px',
                  width: getColumnWidth(index),
                  flexShrink: 0
                }}
              >
                {renderValue(value)}
              </div>
            ))}
          </div>
        </div>

        {/* 기간 헤더 행 (하단) */}
        <div
          style={{
            borderTop: '1px solid #FFFFFF',
            overflow: 'hidden'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              overflow: 'hidden'
            }}
          >
            {periods.map((period, index) => (
              <div
                key={index}
                style={{
                  borderRight: index < periods.length - 1 ? '1px solid #FFFFFF' : 'none',
                  boxSizing: 'border-box',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '10px 12px',
                  width: getColumnWidth(index),
                  flexShrink: 0
                }}
              >
                <p
                  style={{
                    fontFamily: 'Pretendard, sans-serif',
                    fontSize: '14px',
                    fontWeight: 500,
                    lineHeight: 1.5,
                    color: '#474C57',
                    margin: 0,
                    whiteSpace: 'nowrap'
                  }}
                >
                  {period}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
