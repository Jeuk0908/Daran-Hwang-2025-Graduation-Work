import React from 'react';
import cancelIcon from '../../assets/icon_cancel(XS).svg';
import checkIcon from '../../assets/icon_ckeck(XS).svg';

// 기본 색상 테마
const defaultTheme = {
  default: {
    backgroundColor: '#E6E7EA',
    titleColor: '#5E6573',
    counterColor: '#757E8F',
    messageColor: '#1A1C20',
    icon: checkIcon,
  },
  error: {
    backgroundColor: '#FEF6F1',
    titleColor: '#1A1C20',
    counterColor: '#DA6816',
    messageColor: '#DA6816',
    icon: cancelIcon,
  },
  pass: {
    backgroundColor: '#EFFAEC',
    titleColor: '#1A1C20',
    counterColor: '#43A329',
    messageColor: '#43A329',
    icon: checkIcon,
  },
};

export const PhoneNumFild = ({
  title = '휴대폰 번호 (- 없이 숫자만 입력)',
  placeholder = '휴대폰 번호를 입력해주세요',
  value = '',
  maxLength = 5,
  showMessage = true,
  showCounter = true,
  state = 'default', // 'default' | 'error' | 'pass'
  message = '휴대폰 번호를 입력해주세요',
  onChange,
  style,
  // 커스텀 색상 (선택적)
  customColors = null, // { default: {...}, error: {...}, pass: {...} }
}) => {
  // 커스텀 색상이 제공되면 사용, 아니면 기본 테마 사용
  const theme = customColors || defaultTheme;

  // 상태별 스타일 정의
  const stateStyles = {
    default: {
      container: {
        backgroundColor: theme.default.backgroundColor,
      },
      title: {
        color: theme.default.titleColor,
      },
      counter: {
        color: theme.default.counterColor,
      },
      message: {
        color: theme.default.messageColor,
      },
      icon: theme.default.icon,
    },
    error: {
      container: {
        backgroundColor: theme.error.backgroundColor,
      },
      title: {
        color: theme.error.titleColor,
      },
      counter: {
        color: theme.error.counterColor,
      },
      message: {
        color: theme.error.messageColor,
      },
      icon: theme.error.icon,
    },
    pass: {
      container: {
        backgroundColor: theme.pass.backgroundColor,
      },
      title: {
        color: theme.pass.titleColor,
      },
      counter: {
        color: theme.pass.counterColor,
      },
      message: {
        color: theme.pass.messageColor,
      },
      icon: theme.pass.icon,
    },
  };

  const currentStyle = stateStyles[state];
  const currentLength = value.length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', width: '100%', ...style }}>
      {/* 텍스트 필드 */}
      <div
        style={{
          ...currentStyle.container,
          boxSizing: 'border-box',
          display: 'flex',
          gap: '10px',
          alignItems: 'center',
          padding: '12px',
          borderRadius: '8px',
          width: '100%',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: '108px',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <p
            style={{
              fontFamily: 'Pretendard, sans-serif',
              fontSize: '16px',
              fontWeight: 400,
              lineHeight: 1.5,
              ...currentStyle.title,
              flex: 1,
              margin: 0,
            }}
          >
            {title}
          </p>
          {showCounter && (
            <div
              style={{
                fontFamily: 'Pretendard, sans-serif',
                fontSize: '16px',
                fontWeight: 400,
                lineHeight: 1.5,
                ...currentStyle.counter,
                display: 'flex',
                alignItems: 'center',
                whiteSpace: 'pre',
              }}
            >
              <span>{currentLength}</span>
              <span>/{maxLength}</span>
            </div>
          )}
        </div>
      </div>

      {/* 메시지 */}
      {showMessage && message && (
        <div
          style={{
            display: 'flex',
            gap: '2px',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <img
            src={currentStyle.icon}
            alt=""
            style={{
              width: '12px',
              height: '12px',
              flexShrink: 0,
            }}
          />
          <p
            style={{
              fontFamily: 'Pretendard, sans-serif',
              fontSize: '12px',
              fontWeight: 400,
              lineHeight: 1.5,
              ...currentStyle.message,
              margin: 0,
              whiteSpace: 'pre',
            }}
          >
            {message}
          </p>
        </div>
      )}
    </div>
  );
};
