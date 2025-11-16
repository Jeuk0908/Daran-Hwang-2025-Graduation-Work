/**
 * ListItemSkeleton - 리스트 아이템 스켈레톤 컴포넌트
 * SimpleChartViewer 컴포넌트의 로딩 플레이스홀더
 */
export const ListItemSkeleton = () => {
  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        padding: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '1px 2px 13.6px 0px rgba(0, 0, 0, 0.1)',
        width: '100%',
        boxSizing: 'border-box',
        minHeight: '80px'
      }}
    >
      {/* 왼쪽: 정보 섹션 */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          flex: 1
        }}
      >
        {/* ETF 이름 */}
        <div
          style={{
            width: '60%',
            height: '20px',
            backgroundColor: '#E6E7EA',
            borderRadius: '4px',
            animation: 'pulse 1.5s ease-in-out infinite'
          }}
        />

        {/* ETF 코드 */}
        <div
          style={{
            width: '40%',
            height: '16px',
            backgroundColor: '#E6E7EA',
            borderRadius: '4px',
            animation: 'pulse 1.5s ease-in-out infinite',
            animationDelay: '0.1s'
          }}
        />

        {/* 가격 정보 */}
        <div
          style={{
            width: '50%',
            height: '18px',
            backgroundColor: '#E6E7EA',
            borderRadius: '4px',
            animation: 'pulse 1.5s ease-in-out infinite',
            animationDelay: '0.2s'
          }}
        />
      </div>

      {/* 오른쪽: 차트 영역 */}
      <div
        style={{
          width: '80px',
          height: '50px',
          backgroundColor: '#E6E7EA',
          borderRadius: '4px',
          flexShrink: 0,
          marginLeft: '12px',
          animation: 'pulse 1.5s ease-in-out infinite',
          animationDelay: '0.3s'
        }}
      />

      <style>
        {`
          @keyframes pulse {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: 0.5;
            }
          }
        `}
      </style>
    </div>
  );
};