import iconHeartFill from '../../assets/icon_heart_fill.svg';

/**
 * PortfolioMainCard - 대표 포트폴리오 메인 카드 컴포넌트
 *
 * @param {Object} props
 * @param {string} props.portfolioType - 포트폴리오 타입 (예: "대표 포트폴리오")
 * @param {string[]} props.tags - 태그 목록 (예: ["#투자 성향", "#투자 키워드"])
 * @param {string} props.title - 포트폴리오 제목 (예: "미국 빅테크 배당금")
 * @param {boolean} props.isFavorite - 즐겨찾기 여부
 * @param {string} props.amount - 금액 (예: "-999,999,998")
 * @param {string} props.changePercent - 변동률 (예: "-27.3")
 * @param {'up' | 'down'} props.changeDirection - 변동 방향
 * @param {string} props.primaryButtonText - 주요 버튼 텍스트 (예: "리밸런싱 확인")
 * @param {string} props.secondaryButtonText - 보조 버튼 텍스트 (예: "체크포인트")
 * @param {function} props.onFavoriteClick - 즐겨찾기 클릭 핸들러
 * @param {function} props.onPrimaryButtonClick - 주요 버튼 클릭 핸들러
 * @param {function} props.onSecondaryButtonClick - 보조 버튼 클릭 핸들러
 */
export const PortfolioMainCard = ({
  portfolioType = '대표 포트폴리오',
  tags = ['#투자 성향', '#투자 키워드'],
  title = '미국 빅테크 배당금',
  isFavorite = false,
  amount = '-999,999,998',
  changePercent = '-27.3',
  changeDirection = 'down',
  primaryButtonText = '리밸런싱 확인',
  secondaryButtonText = '체크포인트',
  onFavoriteClick,
  onPrimaryButtonClick,
  onSecondaryButtonClick
}) => {
  const isDown = changeDirection === 'down';
  const changeColor = isDown ? '#DA6816' : '#43A329';
  const sign = isDown ? '-' : '+';

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        boxShadow: '1px 2px 13.6px 0px rgba(52, 144, 255, 0.25)',
        borderRadius: '12px',
        padding: '20px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        width: '100%'
      }}
    >
      {/* 상단: 태그 + 제목 + 하트 */}
      <div
        style={{
          paddingBottom: '12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}
      >
        {/* 태그 + 제목 + 하트 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            width: '100%'
          }}
        >
          {/* 좌측: 태그 + 제목 */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              flex: 1
            }}
          >
            {/* 태그들 */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
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
                {portfolioType}
              </p>
              {tags.map((tag, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1px'
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
                    {tag}
                  </p>
                </div>
              ))}
            </div>

            {/* 제목 */}
            <p
              style={{
                fontFamily: 'Pretendard, sans-serif',
                fontSize: '16px',
                fontWeight: 600,
                lineHeight: 1.35,
                color: '#474C57',
                margin: 0,
                whiteSpace: 'nowrap'
              }}
            >
              {title}
            </p>
          </div>

          {/* 우측: 하트 아이콘 */}
          <div
            onClick={onFavoriteClick}
            style={{
              width: '24px',
              height: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: onFavoriteClick ? 'pointer' : 'default',
              flexShrink: 0
            }}
          >
            <img
              src={iconHeartFill}
              alt={isFavorite ? '즐겨찾기됨' : '즐겨찾기'}
              style={{
                width: '100%',
                height: '100%',
                display: 'block',
                opacity: isFavorite ? 1 : 0.3
              }}
            />
          </div>
        </div>

        {/* 금액 + 변동률 */}
        <div
          style={{
            display: 'flex',
            height: '38px',
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
              gap: '6px'
            }}
          >
            <p
              style={{
                fontFamily: 'Pretendard, sans-serif',
                fontSize: '28px',
                fontWeight: 600,
                lineHeight: 1.35,
                color: changeColor,
                margin: 0,
                whiteSpace: 'nowrap'
              }}
            >
              {sign}
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
              {amount.replace(/^[+-]/, '')}
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

          {/* 변동률 */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0px'
            }}
          >
            <p
              style={{
                fontFamily: 'Pretendard, sans-serif',
                fontSize: '16px',
                fontWeight: 600,
                lineHeight: 1.35,
                color: changeColor,
                margin: 0,
                whiteSpace: 'nowrap'
              }}
            >
              {sign}
            </p>
            <p
              style={{
                fontFamily: 'Pretendard, sans-serif',
                fontSize: '16px',
                fontWeight: 600,
                lineHeight: 1.35,
                color: changeColor,
                margin: 0,
                whiteSpace: 'nowrap'
              }}
            >
              {changePercent.replace(/^[+-]/, '')}
            </p>
            <p
              style={{
                fontFamily: 'Pretendard, sans-serif',
                fontSize: '16px',
                fontWeight: 600,
                lineHeight: 1.35,
                color: changeColor,
                margin: 0,
                whiteSpace: 'nowrap'
              }}
            >
              %
            </p>
          </div>
        </div>
      </div>

      {/* 하단: 버튼 2개 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          gap: '16px'
        }}
      >
        {/* 주요 버튼 (리밸런싱 확인) */}
        <button
          onClick={onPrimaryButtonClick}
          style={{
            backgroundColor: isDown ? '#EB843A' : '#3490FF',
            borderRadius: '8px',
            padding: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            flex: 1,
            border: 'none',
            cursor: onPrimaryButtonClick ? 'pointer' : 'default',
            transition: 'opacity 0.2s ease'
          }}
          onMouseEnter={(e) => {
            if (onPrimaryButtonClick) {
              e.currentTarget.style.opacity = '0.85';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '1';
          }}
        >
          <p
            style={{
              fontFamily: 'Pretendard, sans-serif',
              fontSize: '14px',
              fontWeight: 500,
              lineHeight: 1.5,
              color: '#FFFFFF',
              margin: 0,
              whiteSpace: 'nowrap'
            }}
          >
            {primaryButtonText}
          </p>
        </button>

        {/* 보조 버튼 (체크포인트) */}
        <button
          onClick={onSecondaryButtonClick}
          style={{
            backgroundColor: '#F7F7F8',
            borderRadius: '8px',
            padding: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            flex: 1,
            border: 'none',
            cursor: onSecondaryButtonClick ? 'pointer' : 'default',
            transition: 'opacity 0.2s ease'
          }}
          onMouseEnter={(e) => {
            if (onSecondaryButtonClick) {
              e.currentTarget.style.opacity = '0.85';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '1';
          }}
        >
          <p
            style={{
              fontFamily: 'Pretendard, sans-serif',
              fontSize: '14px',
              fontWeight: 500,
              lineHeight: 1.5,
              color: '#1A1C20',
              margin: 0,
              whiteSpace: 'nowrap'
            }}
          >
            {secondaryButtonText}
          </p>
        </button>
      </div>
    </div>
  );
};
