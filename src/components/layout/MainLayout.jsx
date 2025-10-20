import React from 'react';
import { BottomNav } from '../common/BottomNav';

export const MainLayout = ({ children }) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      width: '100%'
    }}>
      <main style={{
        flex: 1,
        paddingBottom: '54px', // BottomNav 높이만큼 여백
        overflowY: 'auto'
      }}>
        {children}
      </main>
      <BottomNav />
    </div>
  );
};
