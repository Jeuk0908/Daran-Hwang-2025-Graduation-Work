/**
 * 비활동 경고 컴포넌트
 *
 * 사용자가 일정 시간 동안 비활동 상태일 때 화면 상단에 경고를 표시합니다.
 *
 * @param {Object} props
 * @param {boolean} props.show - 경고 표시 여부
 *
 * @example
 * <InactivityWarning show={showWarning} />
 */
export function InactivityWarning({ show }) {
  if (!show) return null

  return (
    <>
      <div style={{
        position: 'fixed',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: '430px',
        padding: '16px',
        backgroundColor: '#FFC107',
        color: '#000000',
        borderRadius: '0 0 8px 8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        fontFamily: 'Pretendard',
        fontWeight: 600,
        fontSize: '14px',
        lineHeight: '1.5',
        animation: 'slideDownFadeIn 0.3s ease-out'
      }}>
        <span style={{
          fontSize: '18px'
        }}>
          ⚠️
        </span>
        <span>
          15초 후 자동 종료됩니다
        </span>
      </div>

      {/* 애니메이션 CSS */}
      <style>{`
        @keyframes slideDownFadeIn {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }
      `}</style>
    </>
  )
}
