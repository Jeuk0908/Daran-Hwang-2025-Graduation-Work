import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TopNav } from '../../components/common/TopNav';
import { CenterTabNav } from '../../components/common/CenterTabNav';
import { VideoThumbnail } from '../../components/common/VideoThumbnail';
import { LAYOUT } from '../../constants/layout';
import { useScrollShadow } from '../../hooks/useScrollShadow';
import thumbnail1 from '../../assets/images/pexels-anna-nekrashevich-6801650.jpg';
import thumbnail2 from '../../assets/images/pexels-artempodrez-5716034.jpg';
import thumbnail3 from '../../assets/images/pexels-energepic-com-27411-159888.jpg';
import thumbnail4 from '../../assets/images/pexels-inspiredimages-157520.jpg';
import thumbnail5 from '../../assets/images/pexels-jakubzerdzicki-34518920.jpg';
import thumbnail6 from '../../assets/images/pexels-mikhail-nilov-8296992.jpg';
import thumbnail7 from '../../assets/images/pexels-nicola-barts-7927389.jpg';
import thumbnail8 from '../../assets/images/pexels-pixabay-259200.jpg';

const VideoTIP = () => {
  const navigate = useNavigate();
  const hasScrolled = useScrollShadow(0);
  const [activeTab, setActiveTab] = useState('영상 TIP');

  // Mock video data
  const videos = [
    {
      id: 1,
      thumbnail: thumbnail1,
      title: 'ETF 투자 초보자를 위한 완벽 가이드',
      variant: 'shorts',
      isBookmarked: true
    },
    {
      id: 2,
      thumbnail: thumbnail2,
      title: 'S&P500 ETF 투자 전략',
      variant: 'landscape',
      isBookmarked: true
    },
    {
      id: 3,
      thumbnail: thumbnail3,
      title: '배당 ETF로 월세 만들기',
      variant: 'landscape',
      isBookmarked: true
    },
    {
      id: 4,
      thumbnail: thumbnail4,
      title: 'TR ETF vs 일반 ETF 차이점 완벽 비교',
      variant: 'shorts',
      isBookmarked: true
    },
    {
      id: 5,
      thumbnail: thumbnail5,
      title: '리밸런싱 타이밍 잡는 법',
      variant: 'landscape',
      isBookmarked: true
    },
    {
      id: 6,
      thumbnail: thumbnail6,
      title: 'ETF 총보수 비교하는 방법',
      variant: 'landscape',
      isBookmarked: true
    },
    {
      id: 7,
      thumbnail: thumbnail7,
      title: '2024년 추천 ETF 포트폴리오 구성하기',
      variant: 'shorts',
      isBookmarked: true
    },
    {
      id: 8,
      thumbnail: thumbnail8,
      title: 'NAV와 시장가격 차이 이해하기',
      variant: 'landscape',
      isBookmarked: true
    }
  ];

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'Q&A') {
      navigate('/qa');
    } else if (tab === '전체') {
      navigate('/qa');
    }
  };

  const handleVideoPlay = (videoId) => {
    console.log(`비디오 재생: ${videoId}`);
  };

  const handleBookmarkToggle = (videoId, newBookmarkState) => {
    console.log(`비디오 ${videoId} 북마크 ${newBookmarkState ? '추가' : '제거'}`);
  };

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#FFFFFF',
        paddingBottom: '88px'
      }}
    >
      {/* TopNav with Safe Area */}
      <div style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: '#FFFFFF',
        padding: `0 ${LAYOUT.HORIZONTAL_PADDING}px 0`,
        boxShadow: hasScrolled ? '0 2px 8px 0 rgba(0, 0, 0, 0.04)' : 'none',
        transition: 'box-shadow 0.2s ease'
      }}>
        <TopNav
          title="북마크"
          depth="2"
          state="icon"
          showBackButton={true}
          showTitle={true}
          showIconL={false}
          showIconR={false}
          onBackClick={handleBackClick}
        />
      </div>

      {/* 탭 네비게이션 */}
      <div>
        <CenterTabNav
          tabs={['전체', 'Q&A', '영상 TIP', '뉴스']}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      </div>

      {/* 비디오 썸네일 그리드 */}
      <div
        style={{
          padding: `0 ${LAYOUT.HORIZONTAL_PADDING}px 20px`,
          marginTop: '31px',
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: `${LAYOUT.GRID_GAP.ROW}px`,
          columnGap: `${LAYOUT.GRID_GAP.COLUMN}px`,
          justifyItems: 'center',
          alignItems: 'center'
        }}
      >
        {videos.map((video) => (
          <div
            key={video.id}
            style={{
              // Shorts variant takes up more vertical space
              gridRowEnd: video.variant === 'shorts' ? 'span 3' : 'span 1'
            }}
          >
            <VideoThumbnail
              thumbnail={video.thumbnail}
              title={video.title}
              variant={video.variant}
              isBookmarked={video.isBookmarked}
              onPlayClick={() => handleVideoPlay(video.id)}
              onBookmarkClick={(newState) => handleBookmarkToggle(video.id, newState)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoTIP;
