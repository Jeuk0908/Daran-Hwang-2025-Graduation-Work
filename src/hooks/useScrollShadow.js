import { useState, useEffect } from 'react';

/**
 * 스크롤 위치를 감지하여 그림자 표시 여부를 반환하는 훅
 * @param {number} threshold - 그림자를 표시할 스크롤 임계값 (기본값: 0)
 * @returns {boolean} - 스크롤이 임계값을 넘었는지 여부
 */
export const useScrollShadow = (threshold = 0) => {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      setHasScrolled(scrollY > threshold);
    };

    // 초기 스크롤 위치 확인
    handleScroll();

    // 스크롤 이벤트 리스너 등록
    window.addEventListener('scroll', handleScroll, { passive: true });

    // 클린업
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold]);

  return hasScrolled;
};
