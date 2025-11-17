import React from 'react';

/**
 * 기초지수 탭 콘텐츠 컴포넌트
 *
 * @param {Object} props
 * @param {Object} props.data - ETF 기초지수 정보 데이터
 */
export const IndexContent = ({ data }) => {
  if (!data) return null;

  const {
    indexName,
    indexDescription
  } = data;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        width: '100%'
      }}
    >
      {/* 섹션 제목 */}
      <div
        style={{
          padding: '8px 0',
          width: '100%'
        }}
      >
        <h3
          style={{
            fontFamily: 'Pretendard, sans-serif',
            fontSize: '18px',
            fontWeight: 600,
            lineHeight: 1.35,
            color: '#000000',
            margin: 0
          }}
        >
          기초지수 정보
        </h3>
      </div>

      {/* 정보 카드 (흰색 배경, 그림자) */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          boxShadow: '1px 2px 13.6px 0px rgba(0, 0, 0, 0.1)',
          width: '100%'
        }}
      >
        {/* 기초지수 이름 */}
        <h4
          style={{
            fontFamily: 'Pretendard, sans-serif',
            fontSize: '18px',
            fontWeight: 600,
            lineHeight: 1.35,
            color: '#1A1C20',
            margin: 0
          }}
        >
          {indexName || '기초지수명'}
        </h4>

        {/* 기초지수 설명 */}
        <p
          style={{
            fontFamily: 'Pretendard, sans-serif',
            fontSize: '14px',
            fontWeight: 500,
            lineHeight: 1.5,
            color: '#474C57',
            margin: 0,
            whiteSpace: 'pre-wrap',
            wordBreak: 'keep-all'
          }}
        >
          {indexDescription || '등록된 지수 설명이 없습니다.'}
        </p>
      </div>
    </div>
  );
};
