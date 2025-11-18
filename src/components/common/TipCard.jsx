import React, { useState, useEffect } from 'react';
import iconBackSD from '../../assets/icon_back(S)_D.svg';
import iconBackSU from '../../assets/icon_back(S)_U.svg';
import iconBackSR from '../../assets/icon_back(S)_R.svg';
import iconBookmarkS from '../../assets/icon_bookmark(s)_o.svg';
import iconBookmarkL from '../../assets/icon_bookmark(L)_o.svg';
import iconBookmarkL2 from '../../assets/icon_bookmark(L)_o2.svg';

export const TipCard = ({
  icon = null,
  title = 'TR ETF의 장점이 무엇인가요?',
  tips = [
    {
      title: '복리 효과 극대화',
      content: '배당금을 받을 때마다 부과되는 세금을 즉시 내지 않고, 그 금액을 온전히 재투자해 장기적으로 자산이 더 빠르게 불어납니다.'
    },
    {
      title: '번거로움 해소',
      content: '배당금이 자동으로 재투자되기 때문에, 투자자가 일일이 재투자할 필요가 없어 관리가 편리합니다.'
    },
    {
      title: '장기 투자에 유리',
      content: '꾸준한 현금 흐름보다는 장기적인 자산 성장을 목표로 할 때 가장 효과적인 전략입니다.'
    }
  ],
  linkText = 'TR ETF 상품 검색하기',
  linkIcon = null,
  showLink = true,
  initialBookmarked = false,
  defaultOpen = false,
  collapsedStyle = null, // collapsed 상태의 커스텀 스타일
  onToggle,
  onBookmarkChange,
  onLinkClick,
  style,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);

  // defaultOpen이 변경되면 isOpen 상태를 업데이트 (외부에서 제어 가능)
  useEffect(() => {
    setIsOpen(defaultOpen);
  }, [defaultOpen]);

  const handleToggle = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    if (onToggle) {
      onToggle(newState);
    }
  };

  const handleBookmarkClick = (e) => {
    e.stopPropagation();
    const newBookmarkState = !isBookmarked;
    setIsBookmarked(newBookmarkState);
    if (onBookmarkChange) {
      onBookmarkChange(newBookmarkState);
    }
  };

  const handleLinkClick = () => {
    if (onLinkClick) {
      onLinkClick();
    }
  };

  // collapsed 상태일 때 커스텀 스타일 적용
  const cardStyle = {
    backgroundColor: '#FFFFFF',
    borderRadius: isOpen ? '12px' : '8px',
    boxShadow: '1px 2px 13.6px 0px rgba(0, 0, 0, 0.1)',
    width: '100%',
    boxSizing: 'border-box',
    overflow: 'hidden',
    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
    ...style,
    // collapsed 상태이고 collapsedStyle이 있으면 적용
    ...(!isOpen && collapsedStyle ? collapsedStyle : {}),
  };

  return (
    <div style={cardStyle}>
      {/* 헤더 */}
      <div
        onClick={handleToggle}
        style={{
          padding: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          borderBottom: isOpen ? '1px solid #F7F7F8' : '1px solid transparent',
          transition: 'border-color 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {/* 왼쪽: 아이콘 + 제목 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: icon ? (isOpen ? '12px' : '10px') : '0',
            flex: 1,
            transition: 'gap 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          {icon && (
            <div style={{ flexShrink: 0 }}>
              {typeof icon === 'string' ? (
                <img src={icon} alt="" style={{ width: '24px', height: '24px' }} />
              ) : (
                icon
              )}
            </div>
          )}
          <p
            style={{
              fontFamily: 'Pretendard, sans-serif',
              fontSize: '14px',
              fontWeight: 400,
              lineHeight: 1.5,
              color: '#30343B',
              margin: 0,
              whiteSpace: 'pre',
            }}
          >
            {title}
          </p>
        </div>

        {/* 오른쪽: 북마크 + 화살표 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <div
            onClick={handleBookmarkClick}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: isBookmarked && !isOpen ? '16px' : '0',
              opacity: isBookmarked && !isOpen ? 1 : 0,
              overflow: 'hidden',
              transition: isOpen
                ? 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                : 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: isBookmarked && !isOpen ? 'pointer' : 'default',
              pointerEvents: isBookmarked && !isOpen ? 'auto' : 'none',
            }}
          >
            <img
              src={iconBookmarkS}
              alt="북마크됨"
              style={{
                width: '16px',
                height: '16px',
                flexShrink: 0,
              }}
            />
          </div>
          <img
            src={isOpen ? iconBackSU : iconBackSD}
            alt={isOpen ? '접기' : '펼치기'}
            style={{
              width: '24px',
              height: '24px',
              opacity: 0.5,
              transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: isOpen ? 'rotate(0deg)' : 'rotate(0deg)',
            }}
          />
        </div>
      </div>

      {/* 확장 컨텐츠 */}
      <div
        style={{
          maxHeight: isOpen ? '2000px' : '0',
          opacity: isOpen ? 1 : 0,
          overflow: 'hidden',
          transition: isOpen
            ? 'max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
            : 'max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {/* 북마크 상태 */}
        <div
          style={{
            padding: '12px 40px 0',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <div
            onClick={handleBookmarkClick}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              cursor: 'pointer',
            }}
          >
            <p
              style={{
                fontFamily: 'Pretendard, sans-serif',
                fontSize: '12px',
                fontWeight: 500,
                lineHeight: 1.5,
                color: '#757E8F',
                margin: 0,
                whiteSpace: 'pre',
              }}
            >
              {isBookmarked ? '투자 TIP을 북마크 했어요!' : '이 투자 TIP을 북마크 할까요?'}
            </p>
            <img
              src={isBookmarked ? iconBookmarkL : iconBookmarkL2}
              alt={isBookmarked ? '북마크됨' : '북마크'}
              style={{
                width: '24px',
                height: '24px',
              }}
            />
          </div>
        </div>

        {/* 팁 내용 */}
        <div
          style={{
            padding: '16px 40px 24px',
            borderBottom: '1px solid #F7F7F8',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          {tips.map((tip, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              <p
                style={{
                  fontFamily: 'Pretendard, sans-serif',
                  fontSize: '14px',
                  fontWeight: 500,
                  lineHeight: 1.5,
                  color: '#1A1C20',
                  margin: 0,
                }}
              >
                {tip.title}
              </p>
              <p
                style={{
                  fontFamily: 'Pretendard, sans-serif',
                  fontSize: '14px',
                  fontWeight: 400,
                  lineHeight: 1.5,
                  color: '#1A1C20',
                  margin: 0,
                }}
              >
                {tip.content}
              </p>
            </div>
          ))}
        </div>

        {/* 하단 링크 */}
        {showLink && linkText && (
          <div
            onClick={handleLinkClick}
            style={{
              padding: '12px 40px 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              {linkIcon && (
                <div style={{ flexShrink: 0 }}>
                  {typeof linkIcon === 'string' ? (
                    <img src={linkIcon} alt="" style={{ width: '24px', height: '24px' }} />
                  ) : (
                    linkIcon
                  )}
                </div>
              )}
              <p
                style={{
                  fontFamily: 'Pretendard, sans-serif',
                  fontSize: '14px',
                  fontWeight: 400,
                  lineHeight: 1.5,
                  color: '#000000',
                  margin: 0,
                  whiteSpace: 'pre',
                }}
              >
                {linkText}
              </p>
            </div>
            <img
              src={iconBackSR}
              alt="이동"
              style={{
                width: '24px',
                height: '24px',
                opacity: 0.5,
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
