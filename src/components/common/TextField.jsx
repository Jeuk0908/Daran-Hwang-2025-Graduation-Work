import React, { useState } from 'react';

const TextField = ({
  placeholder = '텍스트를 입력하세요',
  value = '',
  onChange,
  disabled = false,
  error = false,
  helperText = '',
  maxLength,
  type = 'text'
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  // 상태에 따른 배경색 결정
  const getBackgroundColor = () => {
    if (disabled) return '#F5F6F7';
    if (error) return '#FFE5E5';
    if (isFocused) return '#E0EEFF';
    return '#E0EEFF';
  };

  // 상태에 따른 텍스트 색상 결정
  const getTextColor = () => {
    if (disabled) return '#ADB2BD';
    if (error) return '#FF3B30';
    return '#1A1C20';
  };

  return (
    <div style={{ width: '100%' }}>
      <div
        style={{
          paddingLeft: 16,
          paddingRight: 16,
          paddingTop: 8,
          paddingBottom: 8,
          background: getBackgroundColor(),
          borderRadius: 4,
          justifyContent: 'center',
          alignItems: 'center',
          gap: 10,
          display: 'flex',
          border: error ? '1px solid #FF3B30' : 'none',
        }}
      >
        <input
          type={type}
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={disabled}
          placeholder={placeholder}
          maxLength={maxLength}
          style={{
            width: '100%',
            border: 'none',
            outline: 'none',
            background: 'transparent',
            color: getTextColor(),
            fontSize: 16,
            fontFamily: 'Pretendard',
            fontWeight: '600',
            lineHeight: '21.60px',
            wordWrap: 'break-word',
          }}
        />
      </div>

      {helperText && (
        <div
          style={{
            marginTop: 4,
            paddingLeft: 16,
            color: error ? '#FF3B30' : '#ADB2BD',
            fontSize: 12,
            fontFamily: 'Pretendard',
            fontWeight: '400',
            lineHeight: '16px',
          }}
        >
          {helperText}
        </div>
      )}

      {maxLength && value && (
        <div
          style={{
            marginTop: 4,
            paddingRight: 16,
            textAlign: 'right',
            color: '#ADB2BD',
            fontSize: 12,
            fontFamily: 'Pretendard',
            fontWeight: '400',
            lineHeight: '16px',
          }}
        >
          {value.length}/{maxLength}
        </div>
      )}
    </div>
  );
};

export default TextField;