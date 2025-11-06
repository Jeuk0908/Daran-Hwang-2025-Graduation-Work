/**
 * SettingSection - 설정 섹션 컴포넌트
 *
 * @param {Object} props
 * @param {string} props.title - 섹션 제목 (예: "개인 맞춤 설정", "계정 및 보안")
 * @param {JSX.Element} props.children - 자식 컴포넌트 (SettingItem들)
 */
export const SettingSection = ({ title, children }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        width: '100%'
      }}
    >
      {/* 섹션 제목 */}
      <div
        style={{
          padding: '10px 10px 10px 0',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}
      >
        <p
          style={{
            fontFamily: 'Pretendard, sans-serif',
            fontSize: '18px',
            fontWeight: 500,
            lineHeight: 1.5,
            color: '#000000',
            margin: 0,
            whiteSpace: 'nowrap'
          }}
        >
          {title}
        </p>
      </div>

      {/* 설정 항목들 */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%'
        }}
      >
        {children}
      </div>
    </div>
  );
};
