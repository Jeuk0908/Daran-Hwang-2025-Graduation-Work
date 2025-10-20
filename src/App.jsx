import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { BottomNav } from './components/common/BottomNav'
import './App.css'

// 임시 페이지 컴포넌트들
const HomePage = () => <div style={{ padding: '20px' }}><h1>홈 페이지</h1></div>
const ExhibitionPage = () => <div style={{ padding: '20px' }}><h1>전시 페이지</h1></div>
const ArtistPage = () => <div style={{ padding: '20px' }}><h1>작가 페이지</h1></div>
const MyPage = () => <div style={{ padding: '20px' }}><h1>마이 페이지</h1></div>

function App() {
  return (
    <Router>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        minHeight: '-webkit-fill-available',
        width: '100%',
        maxWidth: '393px',
        margin: '0 auto',
        position: 'relative',
        backgroundColor: '#ffffff'
      }}>
        <main style={{
          flex: 1,
          paddingBottom: '88px', // BottomNav 높이 (54px) + 홈 인디케이터 영역 (34px)
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
          </Routes>
        </main>
        <BottomNav />
      </div>
    </Router>
  )
}

export default App
