import { useState } from 'react';
import { Chip } from './Chip';
import iconBookmarkActive from '../../assets/icon_bookmark(L)_o.svg';
import iconBookmarkInactive from '../../assets/icon_bookmark(L)_o2.svg';
import { LAYOUT } from '../../constants/layout';

/**
 * NewsCard - 뉴스 썸네일 카드 컴포넌트
 *
 * @param {Object} props
 * @param {string} props.thumbnail - 뉴스 썸네일 이미지 경로
 * @param {string} props.title - 뉴스 제목
 * @param {boolean} props.isBookmarked - 북마크 상태
 * @param {function} props.onCardClick - 카드 클릭 핸들러
 * @param {function} props.onBookmarkClick - 북마크 클릭 핸들러
 */
export const NewsCard = ({
  thumbnail,
  title,
  isBookmarked: initialBookmarked = false,
  onCardClick,
  onBookmarkClick
}) => {
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);

  const handleCardClick = () => {
    if (onCardClick) {
      onCardClick();
    }
  };

  const handleBookmarkClick = (e) => {
    e.stopPropagation();
    const newBookmarkState = !isBookmarked;
    setIsBookmarked(newBookmarkState);
    if (onBookmarkClick) {
      onBookmarkClick(newBookmarkState);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        paddingBottom: '16px',
        width: '100%'
      }}
    >
      {/* 썸네일 이미지 컨테이너 */}
      <div
        onClick={handleCardClick}
        style={{
          position: 'relative',
          width: `${LAYOUT.getTwoColumnWidth()}px`,
          height: `${LAYOUT.getTwoColumnWidth()}px`,
          borderRadius: '12px',
          overflow: 'hidden',
          cursor: onCardClick ? 'pointer' : 'default'
        }}
      >
        {/* 썸네일 이미지 */}
        <img
          src={thumbnail}
          alt={title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block'
          }}
        />

        {/* 뉴스 칩 - 좌측 상단 */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px'
          }}
        >
          <Chip title="뉴스" color="grey" state="select" />
        </div>

        {/* 북마크 아이콘 - 우측 상단 */}
        <div
          onClick={handleBookmarkClick}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            width: '24px',
            height: '24px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 0.2s ease'
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = 'scale(0.9)';
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <img
            src={isBookmarked ? iconBookmarkActive : iconBookmarkInactive}
            alt={isBookmarked ? '북마크됨' : '북마크'}
            style={{
              width: '24px',
              height: '24px',
              display: 'block'
            }}
          />
        </div>
      </div>

      {/* 제목 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 1px'
        }}
      >
        <p
          style={{
            fontFamily: 'Pretendard, sans-serif',
            fontSize: '14px',
            fontWeight: 500,
            lineHeight: 1.5,
            color: '#000000',
            margin: 0,
            width: `${LAYOUT.getTwoColumnWidth() - 2}px`,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            wordBreak: 'break-word'
          }}
        >
          {title}
        </p>
      </div>
    </div>
  );
};
