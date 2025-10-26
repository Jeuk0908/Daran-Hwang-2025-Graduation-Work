/**
 * CaptionButton Components
 *
 * CaptionButton - 캡션 텍스트가 있는 버튼 (아이콘 없음)
 * CaptionIconButton - 캡션 텍스트 + 물음표 아이콘이 있는 버튼
 */

/**
 * CaptionButton - 캡션 텍스트만 있는 버튼
 *
 * @param {Object} props
 * @param {string} props.caption - 캡션 텍스트
 * @param {string} props.buttonText - 버튼 텍스트
 * @param {function} props.onClick - 클릭 핸들러
 * @param {boolean} props.disabled - 비활성화 여부
 * @param {'default' | 'primary' | 'primary2' | 'primary3'} props.colorState - 색상 상태
 */
export const CaptionButton = ({
  caption = '인증을 요청하면 만 18세 이상이며, 핀핏의 개인정보처리방침 및\n이용약관에 동의한 것으로 간주합니다.',
  buttonText = '인증문자 받기',
  onClick,
  disabled = false,
  colorState = 'default'
}) => {
  // 색상 상태별 스타일
  const colorStyles = {
    default: {
      caption: '#757E8F',
      iconFill: '#757E8F',
      button: {
        backgroundColor: '#E6E7EA',
        color: '#9198A6'
      }
    },
    primary: {
      caption: '#5E6573',
      iconFill: '#5E6573',
      button: {
        backgroundColor: '#3490FF',
        color: '#FFFFFF'
      }
    },
    primary2: {
      caption: '#5E6573',
      iconFill: '#5E6573',
      button: {
        backgroundColor: '#E0EEFF',
        color: '#004599'
      }
    },
    primary3: {
      caption: '#5E6573',
      iconFill: '#5E6573',
      button: {
        backgroundColor: '#F7F7F8',
        color: '#004599'
      }
    }
  };

  const styles = colorStyles[colorState];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: '393px'
      }}
    >
      {/* 캡션 영역 */}
      <div
        style={{
          alignSelf: 'stretch',
          display: 'inline-flex',
          gap: '10px',
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: 0,
          paddingTop: '4px',
          paddingLeft: '16px',
          paddingRight: '16px'
        }}
      >
        <div
          style={{
            fontFamily: 'Pretendard, sans-serif',
            fontSize: '12px',
            fontWeight: 400,
            lineHeight: '18px',
            color: styles.caption,
            textAlign: 'center',
            whiteSpace: 'pre-line',
            wordWrap: 'break-word'
          }}
        >
          {caption}
        </div>
      </div>

      {/* 버튼 영역 */}
      <div
        style={{
          alignSelf: 'stretch',
          display: 'inline-flex',
          gap: '12px',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '12px 16px',
          borderRadius: '8px'
        }}
      >
        <div
          style={{
            width: '361px',
            padding: '16px',
            backgroundColor: styles.button.backgroundColor,
            borderRadius: '12px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '10px'
          }}
        >
          <button
            onClick={onClick}
            disabled={disabled}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: disabled ? 'not-allowed' : 'pointer',
              opacity: disabled ? 0.5 : 1
            }}
          >
            <div
              style={{
                fontFamily: 'Pretendard, sans-serif',
                fontSize: '16px',
                fontWeight: 600,
                lineHeight: '21.6px',
                color: styles.button.color,
                whiteSpace: 'nowrap',
                wordWrap: 'break-word'
              }}
            >
              {buttonText}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * CaptionIconButton - 캡션 텍스트 + 물음표 아이콘이 있는 버튼
 *
 * @param {Object} props
 * @param {string} props.caption - 캡션 텍스트
 * @param {string} props.buttonText - 버튼 텍스트
 * @param {function} props.onClick - 클릭 핸들러
 * @param {boolean} props.disabled - 비활성화 여부
 * @param {'default' | 'primary' | 'primary2' | 'primary3'} props.colorState - 색상 상태
 */
export const CaptionIconButton = ({
  caption = '인증을 요청하면 만 18세 이상이며, 핀핏의 개인정보처리방침 및\n이용약관에 동의한 것으로 간주합니다.',
  buttonText = '인증문자 받기',
  onClick,
  disabled = false,
  colorState = 'default'
}) => {
  // 색상 상태별 스타일
  const colorStyles = {
    default: {
      caption: '#757E8F',
      iconFill: '#757E8F',
      button: {
        backgroundColor: '#E6E7EA',
        color: '#9198A6'
      }
    },
    primary: {
      caption: '#5E6573',
      iconFill: '#5E6573',
      button: {
        backgroundColor: '#3490FF',
        color: '#FFFFFF'
      }
    },
    primary2: {
      caption: '#5E6573',
      iconFill: '#5E6573',
      button: {
        backgroundColor: '#E0EEFF',
        color: '#004599'
      }
    },
    primary3: {
      caption: '#5E6573',
      iconFill: '#5E6573',
      button: {
        backgroundColor: '#F7F7F8',
        color: '#004599'
      }
    }
  };

  const styles = colorStyles[colorState];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: '393px'
      }}
    >
      {/* 캡션 영역 (아이콘 포함) */}
      <div
        style={{
          alignSelf: 'stretch',
          display: 'inline-flex',
          gap: '10px',
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: 0,
          paddingTop: '4px',
          paddingLeft: '16px',
          paddingRight: '16px'
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: '2px',
            alignItems: 'center',
            justifyContent: 'flex-start'
          }}
        >
          {/* 물음표 아이콘 */}
          <div style={{ position: 'relative' }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.00098 10.25C8.34819 10.25 10.251 8.34721 10.251 6C10.251 3.65279 8.34819 1.75 6.00098 1.75C3.65377 1.75 1.75098 3.65279 1.75098 6C1.75098 8.34721 3.65377 10.25 6.00098 10.25ZM6.00098 11C8.7624 11 11.001 8.76142 11.001 6C11.001 3.23858 8.7624 1 6.00098 1C3.23955 1 1.00098 3.23858 1.00098 6C1.00098 8.76142 3.23955 11 6.00098 11Z"
                fill={styles.iconFill}
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.251 6C10.251 8.34721 8.34819 10.25 6.00098 10.25C3.65377 10.25 1.75098 8.34721 1.75098 6C1.75098 3.65279 3.65377 1.75 6.00098 1.75C8.34819 1.75 10.251 3.65279 10.251 6ZM6.14273 5.56873C5.72735 5.82817 5.48999 6.09097 5.48339 6.95013C5.48339 6.95013 5.48154 6.98717 5.48339 7.01078C5.507 7.31112 6.23121 7.31112 6.25482 7.01078C6.25668 6.98717 6.25482 6.95013 6.25482 6.95013C6.26142 6.44474 6.41966 6.21226 6.80207 5.97305C7.23065 5.71361 7.49768 5.35647 7.50098 4.80728C7.49768 4.00539 6.88779 3.5 5.99768 3.5C5.01855 3.51758 4.50071 4.37106 4.50098 4.86792C4.50124 5.36479 5.28942 5.27618 5.32515 4.86792C5.36088 4.45967 5.66471 4.20081 5.99109 4.20081C6.35043 4.20081 6.64054 4.4434 6.63724 4.82075C6.64054 5.15768 6.42295 5.38342 6.14273 5.56873ZM5.89219 7.45552C5.60867 7.45889 5.3746 7.69137 5.3779 7.97439C5.3746 8.26415 5.60867 8.5 5.89219 8.5C6.16581 8.5 6.39988 8.26415 6.39988 7.97439C6.39988 7.69137 6.16581 7.45889 5.89219 7.45552Z"
                fill={styles.iconFill}
              />
            </svg>
          </div>
          <div
            style={{
              fontFamily: 'Pretendard, sans-serif',
              fontSize: '12px',
              fontWeight: 400,
              lineHeight: '18px',
              color: styles.caption,
              textAlign: 'center',
              whiteSpace: 'pre-line',
              wordWrap: 'break-word'
            }}
          >
            {caption}
          </div>
        </div>
      </div>

      {/* 버튼 영역 */}
      <div
        style={{
          alignSelf: 'stretch',
          display: 'inline-flex',
          gap: '12px',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '12px 16px',
          borderRadius: '8px'
        }}
      >
        <div
          style={{
            width: '361px',
            padding: '16px',
            backgroundColor: styles.button.backgroundColor,
            borderRadius: '12px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '10px'
          }}
        >
          <button
            onClick={onClick}
            disabled={disabled}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: disabled ? 'not-allowed' : 'pointer',
              opacity: disabled ? 0.5 : 1
            }}
          >
            <div
              style={{
                fontFamily: 'Pretendard, sans-serif',
                fontSize: '16px',
                fontWeight: 600,
                lineHeight: '21.6px',
                color: styles.button.color,
                whiteSpace: 'nowrap',
                wordWrap: 'break-word'
              }}
            >
              {buttonText}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
