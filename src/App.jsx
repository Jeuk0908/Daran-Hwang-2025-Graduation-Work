import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { BottomNav } from './components/common/BottomNav'
import IconShowcase from './pages/Dev/IconShowcase'
import Vocabulary from './Pages/Vocabulary'
import MyPage from './Pages/MyPage'
import Bookmark from './pages/Bookmark'
import './App.css'

// 임시 페이지 컴포넌트들
const HomePage = () => <div style={{ padding: '20px', paddingTop: 'max(env(safe-area-inset-top), 12px)' }}><h1>홈 페이지</h1></div>
const ExhibitionPage = () => <div style={{ padding: '20px', paddingTop: 'max(env(safe-area-inset-top), 12px)' }}><h1>전시 페이지</h1></div>
const ArtistPage = () => <div style={{ padding: '20px', paddingTop: 'max(env(safe-area-inset-top), 12px)' }}><h1>작가 페이지</h1></div>

function AppContent() {
  const location = useLocation();
  const isDevPage = location.pathname.startsWith('/dev');
  const isVocabularyPage = location.pathname === '/vocabulary';
  const isBookmarkPage = location.pathname === '/bookmark';
  const hideBottomNav = isDevPage || isVocabularyPage || isBookmarkPage;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      minHeight: '-webkit-fill-available',
      width: '100%',
      maxWidth: isDevPage ? 'none' : '430px',
      margin: '0 auto',
      position: 'relative',
      backgroundColor: '#ffffff'
    }}>
      <main style={{
        flex: 1,
        paddingBottom: hideBottomNav ? '0' : '88px', // BottomNav 높이 (54px) + 홈 인디케이터 영역 (34px)
        overflowY: 'auto',
        overflowX: 'hidden',
        WebkitOverflowScrolling: 'touch',
        width: '100%'
      }}>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/exhibition" element={<ExhibitionPage />} />
          <Route path="/artist" element={<ArtistPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/vocabulary" element={<Vocabulary />} />
          <Route path="/bookmark" element={<Bookmark />} />
          {/* 개발용 페이지 */}
          <Route path="/dev/icons" element={<IconShowcase />} />
        </Routes>
      </main>
      {!hideBottomNav && <BottomNav />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
