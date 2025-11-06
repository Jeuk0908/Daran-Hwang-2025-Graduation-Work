import iconHeartOutline from '../../assets/icon_heart_outline.svg';
import iconHeartFill from '../../assets/icon_heart_fill.svg';
import iconBackSRT50 from '../../assets/icon_back(S)_R_t50.svg';

/**
 * TotalProfitCard - 총 수익 카드 컴포넌트
 *
 * @param {Object} props
 * @param {string} props.userName - 사용자 이름 (예: "민수")
 * @param {string} props.profitAmount - 수익 금액 (예: "999,999,999")
 * @param {'up' | 'down'} props.profitDirection - 수익 방향 (up: 상승, down: 하락)
 * @param {string} props.profitPercent - 수익률 (예: "27.3")
 * @param {boolean} props.hasRebalancing - 리벨런싱 칩 표시 여부 (기본값: false)
 * @param {boolean} props.hasCheckpoint - 체크포인트 칩 표시 여부 (기본값: false)
 * @param {boolean} props.isBookmarked - 북마크 상태
 * @param {function} props.onBookmarkToggle - 북마크 토글 핸들러
 * @param {function} props.onRebalanceClick - 리벨런싱 칩 클릭 핸들러
 * @param {function} props.onCheckpointClick - 체크포인트 칩 클릭 핸들러
 * @param {function} props.onViewClick - 확인하기 클릭 핸들러
 */
export const TotalProfitCard = ({
  userName = '민수',
  profitAmount = '999,999,999',
  profitDirection = 'up',
  profitPercent = '27.3',
  hasRebalancing = false,
  hasCheckpoint = false,
  isBookmarked = false,
  onBookmarkToggle,
  onRebalanceClick,
  onCheckpointClick,
  onViewClick
}) => {
  const isUp = profitDirection === 'up';
  const profitColor = isUp ? '#43A329' : '#DA6816';
  const rebalanceColor = isUp ? '#3490FF' : '#EB843A';
  const rebalanceText = isUp ? '리벨런싱 확인' : '리벨런싱 필요';

  const handleBookmarkClick = (e) => {
    e.stopPropagation();
    if (onBookmarkToggle) {
      onBookmarkToggle(!isBookmarked);
    }
  };

  const handleRebalanceClick = (e) => {
    e.stopPropagation();
    if (onRebalanceClick) {
      onRebalanceClick();
    }
  };

  const handleCheckpointClick = (e) => {
    e.stopPropagation();
    if (onCheckpointClick) {
      onCheckpointClick();
    }
  };

  const handleViewClick = (e) => {
    e.stopPropagation();
    if (onViewClick) {
      onViewClick();
    }
  };

  return (
    <div
      style={{
        padding: '0 16px 12px 16px',
        borderRadius: '12px',
        width: '100%'
      }}
    >
      <div
        style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #F7F7F8',
          borderRadius: '12px',
          padding: '20px 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          width: '100%'
        }}
      >
        {/* 상단: 제목 + 북마크 */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            borderBottom: !isUp ? '1px solid #F7F7F8' : 'none',
            paddingBottom: !isUp ? '12px' : '0'
          }}
        >
          <div
            style={{
              height: '24px',
              width: '100%',
              position: 'relative'
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: '1.5px',
                display: 'flex',
                alignItems: 'center',
                gap: '1px',
                color: '#757E8F'
              }}
            >
              <p
                style={{
                  fontFamily: 'Pretendard, sans-serif',
                  fontSize: '14px',
                  fontWeight: 600,
                  lineHeight: 1.35,
                  color: '#757E8F',
                  margin: 0,
                  whiteSpace: 'nowrap'
                }}
              >
                {userName}
              </p>
              <p
                style={{
                  fontFamily: 'Pretendard, sans-serif',
                  fontSize: '14px',
                  fontWeight: 400,
                  lineHeight: 1.5,
                  color: '#757E8F',
                  margin: 0,
                  whiteSpace: 'nowrap'
                }}
              >
                의 총 수익
              </p>
            </div>
            <div
              onClick={handleBookmarkClick}
              style={{
                position: 'absolute',
                right: 0,
                top: 0,
                width: '24px',
                height: '24px',
                cursor: onBookmarkToggle ? 'pointer' : 'default',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <img
                src={isBookmarked ? iconHeartFill : iconHeartOutline}
                alt=""
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'block'
                }}
              />
            </div>
          </div>

          {/* 금액 + 수익률 */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              width: '100%'
            }}
          >
            {/* 금액 */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1px',
                height: '100%'
              }}
            >
              <p
                style={{
                  fontFamily: 'Pretendard, sans-serif',
                  fontSize: '28px',
                  fontWeight: 600,
                  lineHeight: 1.35,
                  color: profitColor,
                  margin: 0,
                  whiteSpace: 'nowrap'
                }}
              >
                {isUp ? '+' : '-'}
              </p>
              <p
                style={{
                  fontFamily: 'Pretendard, sans-serif',
                  fontSize: '28px',
                  fontWeight: 600,
                  lineHeight: 1.35,
                  color: '#1A1C20',
                  margin: 0,
                  whiteSpace: 'nowrap'
                }}
              >
                {profitAmount}
              </p>
              <p
                style={{
                  fontFamily: 'Pretendard, sans-serif',
                  fontSize: '28px',
                  fontWeight: 400,
                  lineHeight: 1.35,
                  color: '#757E8F',
                  margin: 0,
                  whiteSpace: 'nowrap'
                }}
              >
                원
              </p>
            </div>

            {/* 수익률 */}
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
                  fontSize: '16px',
                  fontWeight: 600,
                  lineHeight: 1.35,
                  color: profitColor,
                  margin: 0,
                  whiteSpace: 'nowrap'
                }}
              >
                {isUp ? '+' : '-'}
              </p>
              <p
                style={{
                  fontFamily: 'Pretendard, sans-serif',
                  fontSize: '16px',
                  fontWeight: 600,
                  lineHeight: 1.35,
                  color: profitColor,
                  margin: 0,
                  whiteSpace: 'nowrap'
                }}
              >
                {profitPercent}
              </p>
              <p
                style={{
                  fontFamily: 'Pretendard, sans-serif',
                  fontSize: '16px',
                  fontWeight: 600,
                  lineHeight: 1.35,
                  color: profitColor,
                  margin: 0,
                  whiteSpace: 'nowrap'
                }}
              >
                %
              </p>
            </div>
          </div>
        </div>

        {/* 하단: 칩 + 확인하기 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            width: '100%'
          }}
        >
          {/* 칩 영역 */}
          <div
            style={{
              display: 'flex',
              gap: '8px',
              alignItems: 'center'
            }}
          >
            {hasRebalancing && (
              <div
                onClick={handleRebalanceClick}
                style={{
                  backgroundColor: rebalanceColor,
                  borderRadius: '8px',
                  padding: '4px 6px',
                  cursor: onRebalanceClick ? 'pointer' : 'default'
                }}
              >
                <p
                  style={{
                    fontFamily: 'Pretendard, sans-serif',
                    fontSize: '12px',
                    fontWeight: 500,
                    lineHeight: 1.5,
                    color: '#FFFFFF',
                    margin: 0,
                    whiteSpace: 'nowrap'
                  }}
                >
                  {rebalanceText}
                </p>
              </div>
            )}
            {hasCheckpoint && (
              <div
                onClick={handleCheckpointClick}
                style={{
                  backgroundColor: '#E6E7EA',
                  borderRadius: '8px',
                  padding: '4px 6px',
                  cursor: onCheckpointClick ? 'pointer' : 'default'
                }}
              >
                <p
                  style={{
                    fontFamily: 'Pretendard, sans-serif',
                    fontSize: '12px',
                    fontWeight: 500,
                    lineHeight: 1.5,
                    color: '#474C57',
                    margin: 0,
                    whiteSpace: 'nowrap'
                  }}
                >
                  체크포인트
                </p>
              </div>
            )}
          </div>

          {/* 확인하기 */}
          <div
            onClick={handleViewClick}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: onViewClick ? 'pointer' : 'default'
            }}
          >
            <p
              style={{
                fontFamily: 'Pretendard, sans-serif',
                fontSize: '12px',
                fontWeight: 500,
                lineHeight: 1.5,
                color: '#757E8F',
                margin: 0,
                whiteSpace: 'nowrap'
              }}
            >
              확인하기
            </p>
            <div
              style={{
                width: '24px',
                height: '24px',
                transform: 'rotate(90deg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <img
                src={iconBackSRT50}
                alt=""
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'block'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
