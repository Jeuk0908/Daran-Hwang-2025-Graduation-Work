import React from 'react';
import { LAYOUT } from '../../constants/layout';

/**
 * ETF 용어 학습용 단어장 카드 컴포넌트
 * @param {Object} props
 * @param {string} props.icon - 아이콘 경로 (활성화/비활성화 아이콘)
 * @param {boolean} props.isLocked - 잠금 상태 (기본값: true)
 * @param {string} props.title - 용어 제목 (활성화 상태일 때 표시)
 * @param {string} props.description - 용어 설명 (활성화 상태일 때 표시)
 * @param {Function} props.onClick - 클릭 핸들러 (활성화 상태일 때만 동작)
 */
const VocabularyCard = ({ icon, isLocked = true, title = '', description = '', onClick }) => {
  const containerStyle = {
    width: `${LAYOUT.getTwoColumnWidth()}px`,
    height: '293px',
    backgroundColor: '#FFFFFF',
    borderRadius: '12px',
    boxShadow: '1px 2px 13.6px 0px rgba(0, 0, 0, 0.1)',
    padding: '32px 16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
    boxSizing: 'border-box',
    cursor: isLocked ? 'default' : 'pointer',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
  };

  const iconWrapperStyle = {
    width: '156px',
    height: '156px',
    backgroundColor: '#F7F7F8',
    borderRadius: '78px',
    padding: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    boxShadow: '0px 1px 3.7px 0px inset rgba(0, 0, 0, 0.25)',
    flexShrink: 0
  };

  const iconImageStyle = {
    width: '132px',
    height: '132px',
    objectFit: 'contain'
  };

  const textContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '5px',
    width: '100%',
    flexShrink: 0
  };

  const titleStyle = {
    fontFamily: 'Pretendard, sans-serif',
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '1.5',
    color: '#000000',
    textAlign: 'center',
    width: '100%',
    margin: 0
  };

  const descriptionStyle = {
    fontFamily: 'Pretendard, sans-serif',
    fontWeight: 500,
    fontSize: '12px',
    lineHeight: '1.5',
    color: '#757E8F',
    textAlign: 'left',
    width: '100%',
    height: '36px',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    margin: 0
  };

  const handleClick = () => {
    if (!isLocked && onClick) {
      onClick()
    }
  }

  return (
    <div style={containerStyle} onClick={handleClick}>
      <div style={iconWrapperStyle}>
        <img
          src={icon}
          alt={isLocked ? "ETF 용어 아이콘" : title}
          style={iconImageStyle}
        />
      </div>
      <div style={textContainerStyle}>
        <p style={titleStyle}>
          {isLocked ? '???' : title}
        </p>
        <p style={descriptionStyle}>
          {isLocked
            ? `아직 발견하지 못한 용어예요.\nETF 상품을 더 살펴볼까요?`
            : description
          }
        </p>
      </div>
    </div>
  );
};

export default VocabularyCard;
