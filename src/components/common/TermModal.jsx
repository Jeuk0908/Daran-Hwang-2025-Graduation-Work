import React, { useEffect, useState } from 'react';

/**
 * 용어 설명 모달 컴포넌트
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - 모달 열림 상태
 * @param {function} props.onClose - 모달 닫기 핸들러
 * @param {string} props.imageSrc - 표시할 용어 설명 이미지 경로
 */
export const TermModal = ({ isOpen, onClose, imageSrc }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // 모달이 열릴 때 애니메이션 시작
      setIsAnimating(true);
      // body 스크롤 방지
      document.body.style.overflow = 'hidden';
    } else {
      // 모달이 닫힐 때 애니메이션 종료
      setIsAnimating(false);
      // body 스크롤 복원
      document.body.style.overflow = '';
    }

    return () => {
      // 컴포넌트 언마운트 시 스크롤 복원
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)', // Safari 지원
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '20px',
        opacity: isAnimating ? 1 : 0,
        transition: 'opacity 0.3s ease-in-out'
      }}
    >
      {/* 모달 컨텐츠 */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '390px',
          width: '100%',
          maxHeight: '90vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: isAnimating ? 'scale(1)' : 'scale(0.9)',
          opacity: isAnimating ? 1 : 0,
          transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
          position: 'relative'
        }}
      >
        {/* 용어 설명 이미지 */}
        <img
          src={imageSrc}
          alt="용어 설명"
          style={{
            width: '100%',
            height: 'auto',
            objectFit: 'contain',
            borderRadius: '12px',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)'
          }}
        />

        {/* X 버튼 클릭 영역 (우측 상단) */}
        <div
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '0',
            right: '0',
            width: '80px',
            height: '80px',
            cursor: 'pointer',
            zIndex: 1001,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'flex-end',
            padding: '20px'
          }}
          aria-label="닫기"
        />
      </div>
    </div>
  );
};
