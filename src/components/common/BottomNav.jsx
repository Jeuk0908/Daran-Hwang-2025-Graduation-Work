import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      id: 'home',
      path: '/home',
      label: '홈(활성화)',
      activeSvg: (
        <svg width="36" height="37" viewBox="0 0 36 37" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="22.5" y="6.5" width="6" height="10.5" rx="0.75" fill="#005CCC" />
          <rect x="7.5" y="14.6875" width="21" height="17.313" rx="1.5" fill="#3490FF" />
          <path d="M16.9327 5.60019C17.5226 4.98848 18.5023 4.98848 19.0922 5.60019L31.2518 18.2099C31.7111 18.6861 31.3735 19.4805 30.7119 19.4805H5.31298C4.65136 19.4805 4.31384 18.6861 4.77311 18.2099L16.9327 5.60019Z" fill="#3490FF" />
          <path d="M13.5 23C13.5 20.5147 15.5147 18.5 18 18.5C20.4853 18.5 22.5 20.5147 22.5 23V32H13.5V23Z" fill="url(#paint0_linear_4066_22410)" />
          <defs>
            <linearGradient id="paint0_linear_4066_22410" x1="18" y1="18.5" x2="10.8388" y2="31.256" gradientUnits="userSpaceOnUse">
              <stop stopColor="#E0EEFF" />
              <stop offset="1" stopColor="#99C7FF" />
            </linearGradient>
          </defs>
        </svg>
      ),
      inactiveSvg: (
        <svg width="36" height="37" viewBox="0 0 36 37" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="22.5" y="6.5" width="6" height="10.5" rx="0.75" fill="#CACDD4" />
          <rect x="7.5" y="14.6875" width="21" height="17.313" rx="1.5" fill="#ADB3BD" />
          <path d="M16.9327 5.60019C17.5226 4.98848 18.5023 4.98848 19.0922 5.60019L31.2518 18.2099C31.7111 18.6861 31.3735 19.4805 30.7119 19.4805H5.31298C4.65136 19.4805 4.31384 18.6861 4.77311 18.2099L16.9327 5.60019Z" fill="#ADB3BD" />
          <path d="M13.5 23C13.5 20.5147 15.5147 18.5 18 18.5C20.4853 18.5 22.5 20.5147 22.5 23V32H13.5V23Z" fill="#E6E7EA" />
        </svg>
      )
    },
    {
      id: 'portfolio',
      path: '/portfolio',
      label: '포트폴리오',
      activeSvg: (
        <svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="12.6665" y="6.5" width="16.5" height="10.5" rx="1.5" fill="#99C7FF" />
          <path d="M20.1665 9.5C20.1665 10.3284 20.8381 11 21.6665 11H32.1665C32.9949 11 33.6665 11.6716 33.6665 12.5V29C33.6665 29.8284 32.9949 30.5 32.1665 30.5H5.1665C4.33808 30.5 3.6665 29.8284 3.6665 29V8C3.6665 7.17157 4.33808 6.5 5.1665 6.5H18.6665C19.4949 6.5 20.1665 7.17157 20.1665 8V9.5Z" fill="url(#paint0_linear_4114_27278)" />
          <path d="M25.2956 22.7488C24.8822 23.9674 24.141 25.0486 23.1532 25.8734C22.1655 26.6983 20.9694 27.2349 19.6966 27.4242C18.4237 27.6136 17.1233 27.4485 15.9382 26.9469C14.7531 26.4453 13.7292 25.6268 12.979 24.5812C12.2288 23.5357 11.7813 22.3035 11.6858 21.0202C11.5902 19.7369 11.8503 18.4521 12.4374 17.3069C13.0245 16.1618 13.9159 15.2007 15.0136 14.5291C16.1114 13.8576 17.373 13.5017 18.6599 13.5005L18.6665 20.5005L25.2956 22.7488Z" fill="#99C7FF" />
          <path d="M24.9592 23.5661C25.4923 22.4719 25.7309 21.2576 25.6515 20.043C25.572 18.8284 25.1772 17.6556 24.506 16.6401C23.8349 15.6247 22.9105 14.8019 21.8242 14.2528C20.738 13.7037 19.5273 13.4473 18.3116 13.509L18.6664 20.5L24.9592 23.5661Z" fill="#E0EEFF" />
          <defs>
            <linearGradient id="paint0_linear_4114_27278" x1="23.9165" y1="14.75" x2="11.9165" y2="34.25" gradientUnits="userSpaceOnUse">
              <stop stopColor="#3490FF" />
              <stop offset="1" stopColor="#005CCC" />
            </linearGradient>
          </defs>
        </svg>
      ),
      inactiveSvg: (
        <svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="12.6665" y="6.5" width="16.5" height="10.5" rx="1.5" fill="#CACDD4" />
          <path d="M20.1665 9.5C20.1665 10.3284 20.8381 11 21.6665 11H32.1665C32.9949 11 33.6665 11.6716 33.6665 12.5V29C33.6665 29.8284 32.9949 30.5 32.1665 30.5H5.1665C4.33808 30.5 3.6665 29.8284 3.6665 29V8C3.6665 7.17157 4.33808 6.5 5.1665 6.5H18.6665C19.4949 6.5 20.1665 7.17157 20.1665 8V9.5Z" fill="#ADB3BD" />
          <path d="M25.2956 22.7488C24.8822 23.9674 24.141 25.0486 23.1532 25.8734C22.1655 26.6983 20.9694 27.2349 19.6966 27.4242C18.4237 27.6136 17.1233 27.4485 15.9382 26.9469C14.7531 26.4453 13.7292 25.6268 12.979 24.5812C12.2288 23.5357 11.7813 22.3035 11.6858 21.0202C11.5902 19.7369 11.8503 18.4521 12.4374 17.3069C13.0245 16.1618 13.9159 15.2007 15.0136 14.5291C16.1114 13.8576 17.373 13.5017 18.6599 13.5005L18.6665 20.5005L25.2956 22.7488Z" fill="#CACDD4" />
          <path d="M24.9592 23.5661C25.4923 22.4719 25.7309 21.2576 25.6515 20.043C25.572 18.8284 25.1772 17.6556 24.506 16.6401C23.8349 15.6247 22.9105 14.8019 21.8242 14.2528C20.738 13.7037 19.5273 13.4473 18.3116 13.509L18.6664 20.5L24.9592 23.5661Z" fill="#E6E7EA" />
        </svg>
      )
    },
    {
      id: 'search',
      path: '/search',
      label: '탐색',
      activeSvg: (
        <svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="6.3335" y="5" width="21" height="27" rx="1.5" fill="url(#paint0_linear_4114_27364)" />
          <rect x="9.3335" y="9.5" width="15" height="1.5" rx="0.75" fill="#99C7FF" />
          <rect x="9.3335" y="17" width="15" height="1.5" rx="0.75" fill="#99C7FF" />
          <rect x="9.3335" y="24.5" width="15" height="1.5" rx="0.75" fill="#99C7FF" />
          <circle cx="20.6276" cy="20.7941" r="5.82353" stroke="#E0EEFF" strokeWidth="1.94118" />
          <path d="M30.0439 31.1865C30.4229 31.5656 31.0375 31.5656 31.4165 31.1865C31.7956 30.8075 31.7956 30.193 31.4165 29.8139L30.7302 30.5002L30.0439 31.1865ZM24.4214 24.1914L23.7351 24.8777L30.0439 31.1865L30.7302 30.5002L31.4165 29.8139L25.1077 23.5051L24.4214 24.1914Z" fill="url(#paint1_linear_4114_27364)" />
          <defs>
            <linearGradient id="paint0_linear_4114_27364" x1="18.3335" y1="17" x2="6.9908" y2="21.2539" gradientUnits="userSpaceOnUse">
              <stop stopColor="#3490FF" />
              <stop offset="1" stopColor="#005CCC" />
            </linearGradient>
            <linearGradient id="paint1_linear_4114_27364" x1="25.0835" y1="24.5005" x2="29.5835" y2="29.7505" gradientUnits="userSpaceOnUse">
              <stop offset="0.227005" stopColor="#E0EEFF" />
              <stop offset="1" stopColor="#99C7FF" />
            </linearGradient>
          </defs>
        </svg>
      ),
      inactiveSvg: (
        <svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="6.3335" y="5" width="21" height="27" rx="1.5" fill="#CACDD4" />
          <rect x="9.3335" y="9.5" width="15" height="1.5" rx="0.75" fill="#E6E7EA" />
          <rect x="9.3335" y="17" width="15" height="1.5" rx="0.75" fill="#E6E7EA" />
          <rect x="9.3335" y="24.5" width="15" height="1.5" rx="0.75" fill="#E6E7EA" />
          <circle cx="20.6276" cy="20.7941" r="5.82353" stroke="#ADB3BD" strokeWidth="1.94118" />
          <path d="M30.0439 31.1865C30.4229 31.5656 31.0375 31.5656 31.4165 31.1865C31.7956 30.8075 31.7956 30.193 31.4165 29.8139L30.7302 30.5002L30.0439 31.1865ZM24.4214 24.1914L23.7351 24.8777L30.0439 31.1865L30.7302 30.5002L31.4165 29.8139L25.1077 23.5051L24.4214 24.1914Z" fill="#ADB3BD" />
        </svg>
      )
    },
    {
      id: 'mypage',
      path: '/mypage',
      label: '마이페이지',
      activeSvg: (
        <svg width="36" height="37" viewBox="0 0 36 37" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="18" cy="11" r="6" fill="#3490FF" />
          <path d="M18 18.5C24.9497 18.5 30.6728 23.7513 31.4179 30.5024C31.5087 31.3258 30.8284 32 30 32H6C5.17157 32 4.49125 31.3258 4.58213 30.5024C5.3272 23.7513 11.0503 18.5 18 18.5Z" fill="url(#paint0_linear_4114_27450)" />
          <defs>
            <linearGradient id="paint0_linear_4114_27450" x1="25.5" y1="16.25" x2="11.25" y2="32.75" gradientUnits="userSpaceOnUse">
              <stop stopColor="#3490FF" />
              <stop offset="1" stopColor="#005CCC" />
            </linearGradient>
          </defs>
        </svg>
      ),
      inactiveSvg: (
        <svg width="36" height="37" viewBox="0 0 36 37" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="18" cy="11" r="6" fill="#CACDD4" />
          <path d="M18 18.5C24.9497 18.5 30.6728 23.7513 31.4179 30.5024C31.5087 31.3258 30.8284 32 30 32H6C5.17157 32 4.49125 31.3258 4.58213 30.5024C5.3272 23.7513 11.0503 18.5 18 18.5Z" fill="#ADB3BD" />
        </svg>
      )
    }
  ];

  const handleNavClick = (path) => {
    navigate(path);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '430px',
        height: 88,
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 34,
        justifyContent: 'space-between',
        alignItems: 'center',
        display: 'inline-flex',
        background: 'white',
        borderTop: '1px solid #F7F7F8',
        backdropFilter: 'blur(16px)',
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000
      }}
    >
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => handleNavClick(item.path)}
          style={{
            width: 80,
            paddingTop: 5,
            paddingLeft: 32,
            paddingRight: 32,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 4,
            display: 'inline-flex',
            border: 'none',
            backgroundColor: 'transparent',
            cursor: 'pointer'
          }}
          aria-label={item.label}
          aria-current={isActive(item.path) ? 'page' : undefined}
        >
          <div style={{position: 'relative'}}>
            {isActive(item.path) ? item.activeSvg : item.inactiveSvg}
          </div>
        </button>
      ))}
    </div>
  );
};
