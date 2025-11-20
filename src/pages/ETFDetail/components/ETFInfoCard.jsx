import React from 'react';
import { Chip } from '../../../components/common/Chip';
import iconInformationS from '../../../assets/icon_information_s.svg';

/**
 * ETF 정보 카드 컴포넌트
 *
 * @param {Object} props
 * @param {string} props.title - 카드 제목 (예: "현재가", "기준가(iNAV)")
 * @param {string} props.value - 주요 값 (예: "11,650")
 * @param {string} props.unit - 단위 (예: "원")
 * @param {string} props.change - 변동량 (예: "+555" 또는 "-294")
 * @param {string} props.changePercent - 변동률 (예: "2.59")
 * @param {'up' | 'down'} props.changeDirection - 변동 방향
 * @param {string} props.description - 설명 칩 텍스트
 * @param {'emphasis' | 'normal'} props.variant - 카드 스타일 (emphasis: 강조형, normal: 일반형)
 * @param {string} props.chipColor - 칩 색상 직접 지정 (지정 시 changeDirection 무시)
 * @param {function} props.onInfoClick - 정보 아이콘 클릭 핸들러
 */
export const ETFInfoCard = ({
  title = '현재가',
  value = '11,650',
  unit = '원',
  change,
  changePercent,
  changeDirection = 'up',
  description = '현재 상품의 가격',
  variant = 'emphasis',
  chipColor,
  onInfoClick
}) => {
  const isUp = changeDirection === 'up';

  // variant별 스타일
  const backgroundColor = '#F1F7FF';
  const borderColor = '#F7F7F8';

  return (
    <div
      style={{
        width: '193px', // 아이폰 14 Pro Max 기준 - (396px content - 10px gap) / 2 = 193px
        backgroundColor: backgroundColor,
        border: `1px solid ${borderColor}`,
        borderRadius: '8px',
        padding: '12px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        alignItems: 'flex-start'
      }}
    >
      {/* 제목 + 정보 아이콘 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%'
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
          {title}
        </p>

        {/* 정보 아이콘 - onInfoClick이 있을 때만 표시 */}
        {onInfoClick && (
          <div
            onClick={onInfoClick}
            style={{
              width: '24px',
              height: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <img
              src={iconInformationS}
              alt="정보"
              style={{
                width: '24px',
                height: '24px',
                display: 'block'
              }}
            />
          </div>
        )}
      </div>

      {/* 가격 정보 */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: variant === 'normal' ? '4px' : '0px',
          width: '100%',
          alignItems: 'flex-start'
        }}
      >
        {/* 주요 가격 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1px'
          }}
        >
          <p
            style={{
              fontFamily: 'Pretendard, sans-serif',
              fontSize: variant === 'emphasis' ? '24px' : '14px',
              fontWeight: variant === 'emphasis' ? 700 : 500,
              lineHeight: 1.5,
              color: variant === 'emphasis' ? '#000000' : '#1A1C20',
              margin: 0,
              whiteSpace: 'nowrap'
            }}
          >
            {value}
          </p>
          <p
            style={{
              fontFamily: 'Pretendard, sans-serif',
              fontSize: '14px',
              fontWeight: 500,
              lineHeight: 1.5,
              color: variant === 'emphasis' ? '#474C57' : '#1A1C20',
              margin: 0,
              marginBottom: variant === 'emphasis' ? '3px' : '0px'
            }}
          >
            {unit}
          </p>
        </div>

        {/* 변동 정보 */}
        {(change || changePercent) && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2px'
            }}
          >
            <p
              style={{
                fontFamily: 'Pretendard, sans-serif',
                fontSize: '12px',
                fontWeight: 500,
                lineHeight: 1.5,
                color: isUp ? '#43A329' : '#DA6816',
                margin: 0
              }}
            >
              {change || (isUp ? '+' : '-')}{changePercent}%
            </p>

            {/* 화살표 아이콘 */}
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                transform: isUp ? 'rotate(0deg)' : 'rotate(180deg)'
              }}
            >
              <path
                d="M5 3L2 6L8 6L5 3Z"
                fill={isUp ? '#43A329' : '#DA6816'}
              />
            </svg>
          </div>
        )}
      </div>

      {/* 설명 칩 */}
      {description && (
        <Chip
          title={description}
          color={chipColor || (variant === 'emphasis' ? (isUp ? 'up2' : 'down2') : 'grey')}
          state="nonSelect"
          size="small"
          style={{
            alignSelf: 'flex-start'
          }}
        />
      )}
    </div>
  );
};
