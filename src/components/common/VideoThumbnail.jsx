import { useState } from 'react';
import iconBookmarkActive from '../../assets/icon_bookmark(L)_o.svg';
import iconBookmarkInactive from '../../assets/icon_bookmark(L)_o2.svg';

/**
 * VideoThumbnail - 영상 썸네일 컴포넌트
 *
 * @param {Object} props
 * @param {string} props.thumbnail - 썸네일 이미지 URL
 * @param {string} props.title - 영상 제목
 * @param {'shorts' | 'landscape'} props.variant - 썸네일 타입 (shorts: 세로형, landscape: 가로형)
 * @param {boolean} props.isBookmarked - 북마크 초기 상태
 * @param {function} props.onBookmarkClick - 북마크 클릭 핸들러
 * @param {function} props.onPlayClick - 재생 버튼 클릭 핸들러
 */
export const VideoThumbnail = ({
  thumbnail,
  title = '영상 제목',
  variant = 'landscape',
  isBookmarked: initialBookmarked = false,
  onBookmarkClick,
  onPlayClick
}) => {
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);
  const isShorts = variant === 'shorts';
  const thumbnailHeight = isShorts ? '313px' : '99px';
  const playButtonSize = isShorts ? '70px' : '40px';
  const playIconSize = isShorts ? '63px' : '36px';

  const handleBookmarkClick = (e) => {
    e.stopPropagation();
    const newBookmarkState = !isBookmarked;
    setIsBookmarked(newBookmarkState);
    if (onBookmarkClick) {
      onBookmarkClick(newBookmarkState);
    }
  };

  const handlePlayClick = () => {
    if (onPlayClick) {
      onPlayClick();
    }
  };

  return (
    <div
      style={{
        width: '176px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }}
    >
      {/* 썸네일 */}
      <div
        onClick={handlePlayClick}
        style={{
          width: '100%',
          height: thumbnailHeight,
          borderRadius: isShorts ? '12px' : '8px',
          position: 'relative',
          overflow: 'hidden',
          cursor: 'pointer',
          backgroundColor: '#E6E7EA'
        }}
      >
        {/* 배경 이미지 */}
        {thumbnail && (
          <img
            src={thumbnail}
            alt=""
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              borderRadius: isShorts ? '12px' : '8px'
            }}
          />
        )}

        {/* 상단: 칩 + 북마크 */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            right: '12px',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            zIndex: 2
          }}
        >
          {/* 영상 TIP 칩 */}
          <div
            style={{
              backgroundColor: '#E6E7EA',
              borderRadius: '8px',
              padding: '4px 6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <p
              style={{
                fontFamily: 'Pretendard, sans-serif',
                fontSize: '12px',
                fontWeight: 500,
                lineHeight: 1.5,
                color: '#474C57',
                margin: 0,
                whiteSpace: 'nowrap'
              }}
            >
              영상 TIP
            </p>
          </div>

          {/* 북마크 아이콘 */}
          <div
            onClick={handleBookmarkClick}
            style={{
              width: '24px',
              height: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <img
              src={isBookmarked ? iconBookmarkActive : iconBookmarkInactive}
              alt={isBookmarked ? '북마크됨' : '북마크'}
              style={{
                width: '100%',
                height: '100%',
                display: 'block'
              }}
            />
          </div>
        </div>

        {/* 중앙: 플레이 버튼 */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: playButtonSize,
            height: playButtonSize,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2
          }}
        >
          {/* 플레이 버튼 배경 */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(255, 255, 255, 0.60)',
              borderRadius: '50%',
              backdropFilter: 'blur(2px)'
            }}
          />
          {/* 플레이 아이콘 */}
          <svg
            width={playIconSize}
            height={playIconSize}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              position: 'relative',
              zIndex: 1
            }}
          >
            <path
              d="M8 5.5C8 4.67 8.84 4.12 9.56 4.53L17.56 9.53C18.28 9.94 18.28 11.06 17.56 11.47L9.56 16.47C8.84 16.88 8 16.33 8 15.5V5.5Z"
              fill="#4CADFF"
            />
          </svg>
        </div>
      </div>

      {/* 제목 */}
      <div
        style={{
          width: '100%',
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
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {title}
        </p>
      </div>
    </div>
  );
};
