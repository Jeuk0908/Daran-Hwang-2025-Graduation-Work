import iconBackR from '../../assets/icon_back(S)_R.svg';

/**
 * MenuCard - 메뉴 카드 컴포넌트 (용어 백과, 북마크, 달성 보관함)
 *
 * @param {Object} props
 * @param {string|JSX.Element} props.icon - 아이콘 (이미지 경로 또는 JSX)
 * @param {string} props.title - 제목 (예: "용어 백과", "북마크")
 * @param {string} props.count - 개수 (예: "16/50", "16건")
 * @param {function} props.onClick - 클릭 핸들러
 * @param {'large' | 'small'} props.variant - 카드 크기 ('large': 용어 백과, 'small': 북마크/달성 보관함)
 */
export const MenuCard = ({
  icon,
  title = '제목',
  count = '0',
  onClick,
  variant = 'large'
}) => {
  const isLarge = variant === 'large';

  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: '#FFFFFF',
        boxShadow: '1px 2px 13.6px 0px rgba(0, 0, 0, 0.1)',
        borderRadius: '12px',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        cursor: onClick ? 'pointer' : 'default',
        width: '100%',
        minHeight: isLarge ? 'auto' : '101px',
        justifyContent: 'space-between'
      }}
    >
      {/* 상단: 아이콘 + 제목 (large) 또는 제목만 (small) */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          justifyContent: 'flex-start'
        }}
      >
        {isLarge && icon && (
          <div style={{ width: '36px', height: '36px', flexShrink: 0 }}>
            {typeof icon === 'string' ? (
              <img
                src={icon}
                alt=""
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'block'
                }}
              />
            ) : (
              icon
            )}
          </div>
        )}
        <p
          style={{
            fontFamily: 'Pretendard, sans-serif',
            fontSize: '18px',
            fontWeight: 500,
            lineHeight: 1.5,
            color: '#000000',
            margin: 0,
            whiteSpace: 'nowrap',
            alignSelf: isLarge ? 'auto' : 'stretch'
          }}
        >
          {title}
        </p>
      </div>

      {/* 하단: 개수 + 화살표 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: '5px'
        }}
      >
        <p
          style={{
            fontFamily: 'Pretendard, sans-serif',
            fontSize: '16px',
            fontWeight: 400,
            lineHeight: 1.5,
            color: isLarge ? '#5E6573' : '#474C57',
            margin: 0,
            whiteSpace: 'nowrap',
            textAlign: 'center'
          }}
        >
          {count}
        </p>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '24px',
            height: '24px'
          }}
        >
          <img
            src={iconBackR}
            alt=""
            style={{
              width: '24px',
              height: '24px',
              display: 'block'
            }}
          />
        </div>
      </div>
    </div>
  );
};
