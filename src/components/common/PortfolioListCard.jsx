import iconHeartOutline from '../../assets/icon_heart_outline.svg';
import iconHeartFill from '../../assets/icon_heart_fill.svg';
import iconUpupS from '../../assets/자산 card ui/icon_upup_s.svg';
import iconDowndownS from '../../assets/자산 card ui/icon_downdown_s.svg';

/**
 * PortfolioListCard - 포트폴리오 리스트 카드 컴포넌트
 *
 * @param {Object} props
 * @param {string} props.title - 포트폴리오 제목
 * @param {string} props.investmentStyle - 투자 성향
 * @param {string} props.investmentKeyword - 투자 키워드
 * @param {string} props.price - 가격 (예: "21,970")
 * @param {string} props.changePercent - 변동률 (예: "2.59")
 * @param {'up' | 'down'} props.changeDirection - 변동 방향
 * @param {string} props.primaryButtonText - 주요 버튼 텍스트
 * @param {string} props.secondaryButtonText - 보조 버튼 텍스트
 * @param {boolean} props.isFavorite - 즐겨찾기 여부
 * @param {function} props.onFavoriteClick - 즐겨찾기 클릭 핸들러
 * @param {function} props.onPrimaryButtonClick - 주요 버튼 클릭 핸들러
 * @param {function} props.onSecondaryButtonClick - 보조 버튼 클릭 핸들러
 */
export const PortfolioListCard = ({
  title = 'AI 산업 테마',
  investmentStyle = '투자 성향',
  investmentKeyword = '투자 키워드',
  price = '21,970',
  changePercent = '2.59',
  changeDirection = 'down',
  primaryButtonText = '리밸런싱 확인',
  secondaryButtonText = '체크포인트',
  isFavorite = false,
  onFavoriteClick,
  onPrimaryButtonClick,
  onSecondaryButtonClick
}) => {
  const isUp = changeDirection === 'up';
  const changeColor = isUp ? '#43A329' : '#EB843A';
  const sign = isUp ? '+' : '-';

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid #FAFCFF',
        borderRadius: '12px',
        padding: '20px 16px 14px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        width: '100%',
        boxShadow: '1px 2px 13.6px 0px rgba(0, 0, 0, 0.1)'
      }}
    >
      {/* 상단: 제목 + 태그 + 하트 + 가격/변동률 */}
      <div
        style={{
          borderBottom: '1px solid #F7F7F8',
          paddingBottom: '12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          width: '100%'
        }}
      >
        {/* 제목 + 태그 + 하트 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%'
          }}
        >
          {/* 좌측: 제목 + 태그 */}
          <div
            style={{
              display: 'flex',
              gap: '8px',
              alignItems: 'center',
              flex: 1
            }}
          >
            {/* 제목 */}
            <p
              style={{
                fontFamily: 'Pretendard, sans-serif',
                fontSize: '16px',
                fontWeight: 500,
                lineHeight: 1.5,
                color: '#474C57',
                margin: 0,
                whiteSpace: 'nowrap'
              }}
            >
              {title}
            </p>

            {/* 태그들 */}
            <div
              style={{
                display: 'flex',
                gap: '2px',
                alignItems: 'flex-start'
              }}
            >
              <p
                style={{
                  fontFamily: 'Pretendard, sans-serif',
                  fontSize: '10px',
                  fontWeight: 500,
                  lineHeight: 1.25,
                  color: '#757E8F',
                  margin: 0,
                  whiteSpace: 'nowrap'
                }}
              >
                # {investmentStyle}
              </p>
              <p
                style={{
                  fontFamily: 'Pretendard, sans-serif',
                  fontSize: '10px',
                  fontWeight: 500,
                  lineHeight: 1.25,
                  color: '#757E8F',
                  margin: 0,
                  whiteSpace: 'nowrap'
                }}
              >
                # {investmentKeyword}
              </p>
            </div>
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
              src={isFavorite ? iconHeartFill : iconHeartOutline}
              alt="즐겨찾기"
              style={{
                width: '100%',
                height: '100%',
                display: 'block'
              }}
            />
          </div>
        </div>

        {/* 가격 + 변동률 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%'
          }}
        >
          {/* 가격 */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <p
              style={{
                fontFamily: 'Pretendard, sans-serif',
                fontSize: '20px',
                fontWeight: 700,
                lineHeight: 1.5,
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
                fontSize: '20px',
                fontWeight: 700,
                lineHeight: 1.5,
                color: '#000000',
                margin: 0,
                whiteSpace: 'nowrap'
              }}
            >
              {price}
            </p>
          </div>

          {/* 변동률 */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 0
            }}
          >
            <p
              style={{
                fontFamily: 'Pretendard, sans-serif',
                fontSize: '14px',
                fontWeight: 500,
                lineHeight: 1.5,
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
                fontSize: '14px',
                fontWeight: 500,
                lineHeight: 1.5,
                color: changeColor,
                margin: 0,
                whiteSpace: 'nowrap'
              }}
            >
              {changePercent}
            </p>
            <p
              style={{
                fontFamily: 'Pretendard, sans-serif',
                fontSize: '14px',
                fontWeight: 500,
                lineHeight: 1.5,
                color: changeColor,
                margin: 0,
                whiteSpace: 'nowrap'
              }}
            >
              %
            </p>
            <div
              style={{
                width: '10px',
                height: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <img
                src={isUp ? iconUpupS : iconDowndownS}
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

      {/* 하단: 버튼 2개 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%'
        }}
      >
        {/* 주요 버튼 */}
        <button
          onClick={onPrimaryButtonClick}
          style={{
            borderRight: '1px solid #F7F7F8',
            padding: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            border: 'none',
            borderRight: '1px solid #F7F7F8',
            backgroundColor: 'transparent',
            cursor: onPrimaryButtonClick ? 'pointer' : 'default'
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
            {primaryButtonText}
          </p>
        </button>

        {/* 보조 버튼 */}
        <button
          onClick={onSecondaryButtonClick}
          style={{
            padding: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            border: 'none',
            backgroundColor: 'transparent',
            cursor: onSecondaryButtonClick ? 'pointer' : 'default'
          }}
        >
          <p
            style={{
              fontFamily: 'Pretendard, sans-serif',
              fontSize: '14px',
              fontWeight: 500,
              lineHeight: 1.5,
              color: '#30343B',
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
