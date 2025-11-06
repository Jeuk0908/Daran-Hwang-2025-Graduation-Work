import iconBackR from '../../assets/icon_back(S)_R_t50.svg';

/**
 * AssetCard - 순자산 카드 컴포넌트
 *
 * @param {Object} props
 * @param {string} props.userName - 사용자 이름 (예: "민수")
 * @param {string} props.amount - 순자산 금액 (예: "999,999,999")
 * @param {function} props.onClick - 클릭 핸들러
 */
export const AssetCard = ({
  userName = '민수',
  amount = '999,999,999',
  onClick
}) => {
  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: '#0073FF',
        padding: '20px 16px',
        borderRadius: '12px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        cursor: onClick ? 'pointer' : 'default',
        width: '100%'
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%'
        }}
      >
        {/* 왼쪽: 제목 */}
        <p
          style={{
            fontFamily: 'Pretendard, sans-serif',
            fontSize: '16px',
            fontWeight: 600,
            lineHeight: 1.35,
            color: '#CACDD4',
            margin: 0,
            whiteSpace: 'nowrap'
          }}
        >
          {userName}님의 순 자산
        </p>

        {/* 오른쪽: 금액 + 화살표 */}
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
              fontSize: '24px',
              fontWeight: 600,
              lineHeight: 1.2,
              color: '#FFFFFF',
              margin: 0,
              whiteSpace: 'nowrap'
            }}
          >
            {amount}
            <span
              style={{
                fontSize: '16px',
                fontWeight: 500,
                lineHeight: 1.5,
                marginLeft: '2px'
              }}
            >
              원
            </span>
          </p>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '24px',
              height: '24px',
              opacity: 0.5
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
    </div>
  );
};
