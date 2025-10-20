import React from 'react';

export const AuthLayout = ({ children }) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      {children}
    </div>
  );
};
