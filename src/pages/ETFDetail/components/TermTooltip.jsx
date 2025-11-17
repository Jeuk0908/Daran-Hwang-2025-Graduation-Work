import React, { useEffect } from 'react';

/**
 * 용어 설명 모달/툴팁 컴포넌트
 *
 * @param {Object} props
 * @param {string} props.term - 용어명
 * @param {string} props.title - 모달 제목
 * @param {string} props.description - 용어 설명
 * @param {boolean} props.isOpen - 모달 열림 상태
 * @param {Function} props.onClose - 모달 닫기 핸들러
 */
export const TermTooltip = ({
  term,
  title,
  description,
  isOpen,
  onClose
}) => {
  // 모달이 열릴 때 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // ESC 키로 닫기
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* 배경 딤 처리 */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}
        onClick={onClose}
      >
        {/* 모달 컨텐츠 */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            padding: '24px',
            maxWidth: '360px',
            width: '100%',
            maxHeight: '80vh',
            overflowY: 'auto',
            boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.15)',
            position: 'relative'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* 제목 */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '16px'
            }}
          >
            <h3
              style={{
                fontFamily: 'Pretendard, sans-serif',
                fontSize: '18px',
                fontWeight: 600,
                lineHeight: 1.35,
                color: '#1A1C20',
                margin: 0
              }}
            >
              {title || term}
            </h3>

            {/* 닫기 버튼 */}
            <button
              onClick={onClose}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ADB2BD',
                fontSize: '24px',
                lineHeight: 1
              }}
              aria-label="닫기"
            >
              ×
            </button>
          </div>

          {/* 설명 */}
          <div
            style={{
              fontFamily: 'Pretendard, sans-serif',
              fontSize: '14px',
              fontWeight: 400,
              lineHeight: 1.6,
              color: '#474C57',
              whiteSpace: 'pre-wrap',
              wordBreak: 'keep-all'
            }}
          >
            {description}
          </div>

          {/* 확인 버튼 */}
          <button
            onClick={onClose}
            style={{
              marginTop: '20px',
              width: '100%',
              backgroundColor: '#3490FF',
              border: 'none',
              borderRadius: '8px',
              padding: '12px',
              fontFamily: 'Pretendard, sans-serif',
              fontSize: '16px',
              fontWeight: 600,
              color: '#FFFFFF',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#2680EB';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#3490FF';
            }}
          >
            확인
          </button>
        </div>
      </div>
    </>
  );
};
