import { useState } from 'react';
import iconHeartOutline from '../../assets/icon_heart_outline.svg';
import iconHeartFill from '../../assets/icon_heart_fill.svg';

/**
 * PortfolioCard - 사용자 포트폴리오 정보 카드 컴포넌트
 *
 * @param {Object} props
 * @param {boolean} props.isMainPortfolio - 대표 포트폴리오 여부
 * @param {string} props.investmentStyle - 투자 성향 (예: "안정형", "공격형")
 * @param {string} props.investmentKeyword - 투자 키워드 (예: "배당", "성장")
 * @param {string} props.title - 포트폴리오 제목
 * @param {number} props.amount - 포트폴리오 금액
 * @param {number} props.returnRate - 수익률 (%)
 * @param {boolean} props.isBookmarked - 북마크 상태
 * @param {function} props.onBookmarkToggle - 북마크 토글 핸들러
 * @param {function} props.onRebalanceClick - 리밸런싱 확인 버튼 클릭 핸들러
 * @param {function} props.onCheckpointClick - 체크포인트 버튼 클릭 핸들러
 */
export const PortfolioCard = ({
  isMainPortfolio = true,
  investmentStyle = '투자 성향',
  investmentKeyword = '투자 키워드',
  title = '미국 빅테크 배당금',
  amount = 999999999,
  returnRate = 27.3,
  isBookmarked = false,
  onBookmarkToggle,
  onRebalanceClick,
  onCheckpointClick
}) => {
  const [bookmarked, setBookmarked] = useState(isBookmarked);

  const handleBookmarkClick = () => {
    const newState = !bookmarked;
    setBookmarked(newState);
    if (onBookmarkToggle) {
      onBookmarkToggle(newState);
    }
  };

  // 금액 포맷팅 (3자리마다 쉼표)
  const formatAmount = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  // 수익률 부호 및 색상 결정
  const isPositive = returnRate >= 0;
  const returnSign = isPositive ? '+' : '-';
  const returnColor = isPositive ? '#00a600' : '#ea5f00';

  return (
    <div
      style={{
        width: '393px',
        paddingBottom: '12px',
        paddingLeft: '16px',
        paddingRight: '16px',
        borderRadius: '12px',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: '8px',
        display: 'inline-flex'
      }}
    >
      <div
        style={{
          alignSelf: 'stretch',
          paddingLeft: '16px',
          paddingRight: '16px',
          paddingTop: '20px',
          paddingBottom: '20px',
          background: 'white',
          boxShadow: '1px 2px 13.600000381469727px rgba(52, 144, 255, 0.25)',
          borderRadius: '12px',
          outline: '1px #F7F7F8 solid',
          outlineOffset: '-1px',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          gap: '12px',
          display: 'flex'
        }}
      >
        {/* 상단 정보 영역 */}
        <div
          style={{
            paddingBottom: '12px',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            gap: '8px',
            display: 'flex'
          }}
        >
          {/* 제목 및 태그 영역 */}
          <div
            style={{
              width: '327px',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              display: 'inline-flex'
            }}
          >
            <div
              style={{
                width: '303px',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                gap: '4px',
                display: 'inline-flex'
              }}
            >
              {/* 태그들 */}
              <div
                style={{
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  gap: '8px',
                  display: 'inline-flex'
                }}
              >
                {isMainPortfolio && (
                  <div
                    style={{
                      color: '#757E8F',
                      fontSize: '12px',
                      fontFamily: 'Pretendard, sans-serif',
                      fontWeight: 500,
                      lineHeight: '18px',
                      wordWrap: 'break-word'
                    }}
                  >
                    대표 포트폴리오
                  </div>
                )}
                <div
                  style={{
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    gap: '1px',
                    display: 'flex'
                  }}
                >
                  <div
                    style={{
                      color: '#757E8F',
                      fontSize: '12px',
                      fontFamily: 'Pretendard, sans-serif',
                      fontWeight: 500,
                      lineHeight: '18px',
                      wordWrap: 'break-word'
                    }}
                  >
                    #
                  </div>
                  <div
                    style={{
                      color: '#757E8F',
                      fontSize: '12px',
                      fontFamily: 'Pretendard, sans-serif',
                      fontWeight: 500,
                      lineHeight: '18px',
                      wordWrap: 'break-word'
                    }}
                  >
                    {investmentStyle}
                  </div>
                </div>
                <div
                  style={{
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    gap: '1px',
                    display: 'flex'
                  }}
                >
                  <div
                    style={{
                      color: '#757E8F',
                      fontSize: '12px',
                      fontFamily: 'Pretendard, sans-serif',
                      fontWeight: 500,
                      lineHeight: '18px',
                      wordWrap: 'break-word'
                    }}
                  >
                    #
                  </div>
                  <div
                    style={{
                      color: '#757E8F',
                      fontSize: '12px',
                      fontFamily: 'Pretendard, sans-serif',
                      fontWeight: 500,
                      lineHeight: '18px',
                      wordWrap: 'break-word'
                    }}
                  >
                    {investmentKeyword}
                  </div>
                </div>
              </div>

              {/* 포트폴리오 제목 */}
              <div
                style={{
                  alignSelf: 'stretch',
                  color: '#474C57',
                  fontSize: '16px',
                  fontFamily: 'Pretendard, sans-serif',
                  fontWeight: 600,
                  lineHeight: '21.6px',
                  wordWrap: 'break-word'
                }}
              >
                {title}
              </div>
            </div>

            {/* 하트 아이콘 (북마크) */}
            <div
              onClick={handleBookmarkClick}
              style={{
                position: 'relative',
                cursor: 'pointer',
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <img
                src={bookmarked ? iconHeartFill : iconHeartOutline}
                alt={bookmarked ? '북마크됨' : '북마크 추가'}
                style={{
                  width: '24px',
                  height: '24px',
                  objectFit: 'contain',
                  transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  transform: bookmarked ? 'scale(1)' : 'scale(1)',
                  animation: bookmarked ? 'heartBounce 0.5s ease-out' : 'none'
                }}
                key={bookmarked ? 'filled' : 'outline'}
              />
              <style>
                {`
                  @keyframes heartBounce {
                    0% {
                      transform: scale(1);
                    }
                    25% {
                      transform: scale(1.1);
                    }
                    50% {
                      transform: scale(1);
                    }
                    75% {
                      transform: scale(1);
                    }
                    100% {
                      transform: scale(1);
                    }
                  }
                `}
              </style>
            </div>
          </div>

          {/* 금액 및 수익률 */}
          <div
            style={{
              width: '327px',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              display: 'inline-flex'
            }}
          >
            {/* 금액 */}
            <div
              style={{
                flex: '1 1 0',
                alignSelf: 'stretch',
                justifyContent: 'flex-start',
                alignItems: 'center',
                gap: '1px',
                display: 'flex'
              }}
            >
              {/* 부호 표시 (+/-) */}
              <div
                style={{
                  color: returnColor,
                  fontSize: '28px',
                  fontFamily: 'Pretendard, sans-serif',
                  fontWeight: 600,
                  lineHeight: '37.8px',
                  wordWrap: 'break-word'
                }}
              >
                {returnSign}
              </div>
              {/* 금액 숫자 */}
              {formatAmount(amount).split('').map((char, index) => (
                <div
                  key={index}
                  style={{
                    color: '#1A1C20',
                    fontSize: '28px',
                    fontFamily: 'Pretendard, sans-serif',
                    fontWeight: 600,
                    lineHeight: '37.8px',
                    wordWrap: 'break-word'
                  }}
                >
                  {char}
                </div>
              ))}
              {/* 원 단위 */}
              <div
                style={{
                  color: '#757E8F',
                  fontSize: '28px',
                  fontFamily: 'Pretendard, sans-serif',
                  fontWeight: 400,
                  lineHeight: '37.8px',
                  wordWrap: 'break-word'
                }}
              >
                원
              </div>
            </div>

            {/* 수익률 */}
            <div
              style={{
                justifyContent: 'flex-start',
                alignItems: 'center',
                gap: '1px',
                display: 'flex'
              }}
            >
              <div
                style={{
                  color: returnColor,
                  fontSize: '16px',
                  fontFamily: 'Pretendard, sans-serif',
                  fontWeight: 600,
                  lineHeight: '21.6px',
                  wordWrap: 'break-word'
                }}
              >
                {returnSign}
              </div>
              <div
                style={{
                  color: returnColor,
                  fontSize: '16px',
                  fontFamily: 'Pretendard, sans-serif',
                  fontWeight: 600,
                  lineHeight: '21.6px',
                  wordWrap: 'break-word'
                }}
              >
                {Math.abs(returnRate)}
              </div>
              <div
                style={{
                  color: returnColor,
                  fontSize: '16px',
                  fontFamily: 'Pretendard, sans-serif',
                  fontWeight: 600,
                  lineHeight: '21.6px',
                  wordWrap: 'break-word'
                }}
              >
                %
              </div>
            </div>
          </div>
        </div>

        {/* 버튼 영역 */}
        <div
          style={{
            alignSelf: 'stretch',
            justifyContent: 'space-between',
            alignItems: 'center',
            display: 'inline-flex'
          }}
        >
          <div
            style={{
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              gap: '8px',
              display: 'flex'
            }}
          >
            {/* 리밸런싱 버튼 - 손실 상태에 따라 색상과 텍스트 변경 */}
            <button
              onClick={onRebalanceClick}
              style={{
                width: '160px',
                padding: '10px',
                background: isPositive ? '#0092ff' : '#fb7d1d',
                borderRadius: '8px',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '10px',
                display: 'flex',
                border: 'none',
                cursor: 'pointer',
                outline: 'none'
              }}
            >
              <div
                style={{
                  color: 'white',
                  fontSize: '14px',
                  fontFamily: 'Pretendard, sans-serif',
                  fontWeight: 500,
                  lineHeight: '21px',
                  wordWrap: 'break-word'
                }}
              >
                {isPositive ? '리벨런싱 확인' : '리벨런싱 필요'}
              </div>
            </button>

            {/* 체크포인트 버튼 */}
            <button
              onClick={onCheckpointClick}
              style={{
                width: '160px',
                padding: '10px',
                background: 'white',
                borderRadius: '8px',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '10px',
                display: 'flex',
                border: '1px solid #E6E7EA',
                cursor: 'pointer',
                outline: 'none'
              }}
            >
              <div
                style={{
                  color: '#1A1C20',
                  fontSize: '14px',
                  fontFamily: 'Pretendard, sans-serif',
                  fontWeight: 500,
                  lineHeight: '21px',
                  wordWrap: 'break-word'
                }}
              >
                체크포인트
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};