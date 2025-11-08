import React from 'react';
import iconSearch from '../../assets/icon_search.svg';

export const SearchBar = ({
  placeholder = '상품 / 투자TIP / 용어를 검색해 보세요',
  value = '',
  state = '검색 전', // '검색 전' | 'state2'
  onChange,
  onClick,
  onFocus,
  onBlur,
  style,
  readOnly = false,
}) => {
  // state2는 검색어가 입력된 상태
  const isSearching = state === 'state2' || value.length > 0;

  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '10px 12px',
        backgroundColor: isSearching ? '#F7F7F8' : '#E6E7EA',
        borderRadius: '12px',
        cursor: onClick || !readOnly ? 'pointer' : 'default',
        transition: 'background-color 0.2s ease',
        width: '100%',
        boxSizing: 'border-box',
        ...style,
      }}
    >
      {/* 검색 아이콘 */}
      <img
        src={iconSearch}
        alt="검색"
        style={{
          width: '24px',
          height: '24px',
          flexShrink: 0,
        }}
      />

      {/* 입력 필드 또는 텍스트 */}
      {readOnly ? (
        <p
          style={{
            fontFamily: 'Pretendard, sans-serif',
            fontSize: '14px',
            fontWeight: 500,
            lineHeight: 1.5,
            color: isSearching ? '#1A1C20' : '#757E8F',
            margin: 0,
            flex: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {value || placeholder}
        </p>
      ) : (
        <input
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          style={{
            fontFamily: 'Pretendard, sans-serif',
            fontSize: '14px',
            fontWeight: 500,
            lineHeight: 1.5,
            color: '#1A1C20',
            backgroundColor: 'transparent',
            border: 'none',
            outline: 'none',
            margin: 0,
            padding: 0,
            flex: 1,
            width: '100%',
          }}
          className="search-bar-input"
        />
      )}

      <style>{`
        .search-bar-input::placeholder {
          color: #757E8F;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
};
