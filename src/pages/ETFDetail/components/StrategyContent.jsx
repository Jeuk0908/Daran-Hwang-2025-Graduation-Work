import React, { useState } from 'react';
import { Chip } from '../../../components/common/Chip';
import iconBackSU from '../../../assets/icon_back(S)_U.svg';

/**
 * 특징 및 운용전략 탭 콘텐츠 컴포넌트
 *
 * @param {Object} props
 * @param {Object} props.data - 전체 ETF 데이터
 */
export const StrategyContent = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!data) return null;

  const { strategy, strategyDetails } = data;

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
          이 상품의 투자전략
        </h3>
      </div>

      {/* 카드 컨테이너 */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          width: '100%'
        }}
      >
        {/* 첫 번째 카드: 요약 (흰색 배경, 그림자) */}
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
          {/* 칩 2개 */}
          <div
            style={{
              display: 'flex',
              gap: '10px',
              alignItems: 'flex-start',
              flexWrap: 'wrap'
            }}
          >
            <Chip
              title={strategy?.title || '운용 전략'}
              color="primary"
              state="select"
              size="small"
            />
            <Chip
              title="요약"
              color="grey"
              state="nonSelect"
              size="small"
            />
          </div>

          {/* 요약 설명 */}
          <p
            style={{
              fontFamily: 'Pretendard, sans-serif',
              fontSize: '14px',
              fontWeight: 500,
              lineHeight: 1.5,
              color: '#474C57',
              margin: 0,
              wordBreak: 'keep-all'
            }}
          >
            {strategy?.description.split(/\{([^}]+)\}/).map((part, index) =>
              index % 2 === 1 ? (
                <span key={index} style={{ color: strategy.highlightColor || '#3490FF' }}>
                  {part}
                </span>
              ) : (
                part
              )
            )}
          </p>
        </div>

        {/* 두 번째 카드: 상세 내용 (회색 배경) */}
        <div
          style={{
            backgroundColor: '#F7F7F8',
            borderRadius: '12px',
            padding: isExpanded ? '12px' : '12px 12px 0 12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            width: '100%'
          }}
        >
          {/* 긴 텍스트 콘텐츠 */}
          <p
            style={{
              fontFamily: 'Pretendard, sans-serif',
              fontSize: '14px',
              fontWeight: 400,
              lineHeight: 1.5,
              color: '#474C57',
              margin: 0,
              whiteSpace: 'pre-wrap',
              wordBreak: 'keep-all',
              maxHeight: isExpanded ? 'none' : '525px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: isExpanded ? 'unset' : 25,
              WebkitBoxOrient: 'vertical'
            }}
          >
            {strategyDetails?.investmentStrategy || '등록된 운용전략이 없습니다.'}
          </p>

          {/* 접기/펼치기 버튼 */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '8px 0 12px 0',
              width: '100%'
            }}
          >
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              style={{
                display: 'flex',
                gap: '4px',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                outline: 'none'
              }}
            >
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
                {isExpanded ? '접기' : '펼치기'}
              </p>
              <img
                src={iconBackSU}
                alt={isExpanded ? '접기' : '펼치기'}
                style={{
                  width: '24px',
                  height: '24px',
                  transform: isExpanded ? 'rotate(0deg)' : 'rotate(180deg)',
                  transition: 'transform 0.3s ease'
                }}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
