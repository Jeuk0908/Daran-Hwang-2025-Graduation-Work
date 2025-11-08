import React from 'react';

// 버튼 상태별 스타일 테마
const buttonThemes = {
  primary: {
    backgroundColor: '#3490FF',
    textColor: '#FFFFFF',
    outline: 'none',
  },
  grey: {
    backgroundColor: '#ADB2BD',
    textColor: '#5E6573',
    outline: 'none',
  },
  skeleton: {
    backgroundColor: '#E0EEFF',
    textColor: '#005CCC',
    outline: 'none',
  },
  skeleton2: {
    backgroundColor: '#F7F7F8',
    textColor: '#3490FF',
    outline: '1px #F7F7F8 solid',
  },
};

export const Button = ({
  children = '전체 보기',
  variant = 'primary', // 'primary' | 'grey' | 'skeleton' | 'skeleton2'
  onClick,
  disabled = false,
  style,
  width = '100%',
  fullWidth = false,
}) => {
  const theme = buttonThemes[variant] || buttonThemes.primary;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        width: fullWidth ? '100%' : width,
        padding: '16px',
        background: theme.backgroundColor,
        borderRadius: '12px',
        border: 'none',
        outline: theme.outline,
        outlineOffset: theme.outline !== 'none' ? '-1px' : '0',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transition: 'all 0.2s ease',
        ...style,
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.opacity = '0.85';
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.currentTarget.style.opacity = '1';
        }
      }}
    >
      <span
        style={{
          color: theme.textColor,
          fontSize: '16px',
          fontFamily: 'Pretendard, sans-serif',
          fontWeight: 600,
          lineHeight: '21.6px',
          wordWrap: 'break-word',
        }}
      >
        {children}
      </span>
    </button>
  );
};
