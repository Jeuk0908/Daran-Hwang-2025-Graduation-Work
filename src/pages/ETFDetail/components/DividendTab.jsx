import React from 'react';

/**
 * 배당 탭 컴포넌트
 *
 * @param {Object} props
 * @param {Array<Object>} props.dividends - 배당 내역 목록
 */
export const DividendTab = ({ dividends = [] }) => {
  if (!dividends || dividends.length === 0) {
    return (
      <div
        style={{
          padding: '40px 16px',
          textAlign: 'center'
        }}
      >
        <p
          style={{
            fontFamily: 'Pretendard, sans-serif',
            fontSize: '14px',
            fontWeight: 500,
            color: '#ADB2BD',
            margin: 0
          }}
        >
          배당 내역이 없습니다
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: '20px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}
    >
      {/* 제목 */}
      <h3
        style={{
          fontFamily: 'Pretendard, sans-serif',
          fontSize: '18px',
          fontWeight: 600,
          lineHeight: 1.35,
          color: '#1A1C20',
          margin: 0
        }}
      >
        배당 내역 ({dividends.length})
      </h3>

      {/* 테이블 헤더 */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '100px 1fr 80px',
          gap: '8px',
          paddingBottom: '8px',
          borderBottom: '1px solid #F7F7F8'
        }}
      >
        <p style={{ fontFamily: 'Pretendard, sans-serif', fontSize: '12px', fontWeight: 600, color: '#757E8F', margin: 0 }}>
          지급일
        </p>
        <p style={{ fontFamily: 'Pretendard, sans-serif', fontSize: '12px', fontWeight: 600, color: '#757E8F', margin: 0, textAlign: 'right' }}>
          배당금
        </p>
        <p style={{ fontFamily: 'Pretendard, sans-serif', fontSize: '12px', fontWeight: 600, color: '#757E8F', margin: 0, textAlign: 'right' }}>
          수익률
        </p>
      </div>

      {/* 배당 목록 */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}
      >
        {dividends.map((dividend, index) => (
          <div
            key={index}
            style={{
              display: 'grid',
              gridTemplateColumns: '100px 1fr 80px',
              gap: '8px',
              alignItems: 'center',
              padding: '12px 0',
              borderBottom: index === dividends.length - 1 ? 'none' : '1px solid #F7F7F8'
            }}
          >
            {/* 지급일 */}
            <p
              style={{
                fontFamily: 'Pretendard, sans-serif',
                fontSize: '14px',
                fontWeight: 500,
                color: '#757E8F',
                margin: 0
              }}
            >
              {dividend.date}
            </p>

            {/* 배당금 */}
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
                gap: '2px'
              }}
            >
              <p
                style={{
                  fontFamily: 'Pretendard, sans-serif',
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#1A1C20',
                  margin: 0
                }}
              >
                {dividend.amount.toLocaleString('ko-KR')}
              </p>
              <p
                style={{
                  fontFamily: 'Pretendard, sans-serif',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#757E8F',
                  margin: 0,
                  marginBottom: '1px'
                }}
              >
                원
              </p>
            </div>

            {/* 수익률 */}
            <p
              style={{
                fontFamily: 'Pretendard, sans-serif',
                fontSize: '14px',
                fontWeight: 600,
                color: '#3490FF',
                margin: 0,
                textAlign: 'right'
              }}
            >
              {dividend.yieldRate}%
            </p>
          </div>
        ))}
      </div>

      {/* 주석 */}
      <div
        style={{
          marginTop: '8px',
          padding: '12px',
          backgroundColor: '#F7F7F8',
          borderRadius: '8px'
        }}
      >
        <p
          style={{
            fontFamily: 'Pretendard, sans-serif',
            fontSize: '12px',
            fontWeight: 500,
            lineHeight: 1.5,
            color: '#757E8F',
            margin: 0
          }}
        >
          * 배당금은 세전 기준이며, 실제 수령액은 세금 공제 후 지급됩니다.
        </p>
      </div>
    </div>
  );
};
