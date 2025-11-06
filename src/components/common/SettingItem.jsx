import iconBackR from '../../assets/icon_back(S)_R.svg';

/**
 * SettingItem - 설정 항목 컴포넌트
 *
 * @param {Object} props
 * @param {string} props.title - 항목 제목 (예: "알림 설정", "화면 설정")
 * @param {function} props.onClick - 클릭 핸들러
 * @param {boolean} props.showBorder - 하단 구분선 표시 여부 (기본값: true)
 */
export const SettingItem = ({ title, onClick, showBorder = true }) => {
  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: '12px',
        paddingBottom: '12px',
        borderBottom: showBorder ? '1px solid #F7F7F8' : 'none',
        cursor: onClick ? 'pointer' : 'default',
        width: '100%'
      }}
    >
      {/* 제목 */}
      <p
        style={{
          fontFamily: 'Pretendard, sans-serif',
          fontSize: '16px',
          fontWeight: 500,
          lineHeight: 1.5,
          color: '#30343B',
          margin: 0,
          whiteSpace: 'nowrap'
        }}
      >
        {title}
      </p>

      {/* 우측 화살표 */}
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
  );
};
