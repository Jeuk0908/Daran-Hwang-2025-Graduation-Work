import React from 'react';
import iconBackL from '../../assets/icon_back_L.svg';

export const TopNav = ({
  title = '제목제목',
  subtitle = '/제목',
  number = '1',
  totalNumber = '4',
  chipText = '선택 ETF',
  depth = '2', // '1' | '2'
  state = 'number', // 'number' | 'icon' | '2 title'
  showBackButton = true,
  showTitle = true,
  showChip = true,
  showNumber = true,
  showIconL = true,
  showIconR = true,
  iconL = null, // 왼쪽 아이콘 컴포넌트 또는 이미지 src
  iconR = null, // 오른쪽 아이콘 컴포넌트 또는 이미지 src
  onBackClick,
  onIconLClick,
  onIconRClick,
  style,
}) => {
  // depth=2, state=number: 뒤로가기 + 제목 + 칩 + 숫자
  if (depth === '2' && state === 'number') {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          padding: '12px 0',
          backgroundColor: '#FFFFFF',
          ...style,
        }}
      >
        {/* 왼쪽: 뒤로가기 + 제목 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            flex: 1,
          }}
        >
          {showBackButton && (
            <div
              onClick={onBackClick}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '12px 12px 12px 0',
                cursor: onBackClick ? 'pointer' : 'default',
              }}
            >
              <img
                src={iconBackL}
                alt="뒤로가기"
                style={{
                  width: '18px',
                  height: '24px',
                }}
              />
            </div>
          )}
          {showTitle && (
            <p
              style={{
                fontFamily: 'Pretendard, sans-serif',
                fontSize: '24px',
                fontWeight: 600,
                lineHeight: 1.25,
                color: '#1A1C20',
                margin: 0,
                whiteSpace: 'pre',
              }}
            >
              {title}
            </p>
          )}
        </div>

        {/* 오른쪽: 칩 + 숫자 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          {showChip && chipText && (
            <div
              style={{
                backgroundColor: '#FAFCFF',
                padding: '4px 10px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <p
                style={{
                  fontFamily: 'Pretendard, sans-serif',
                  fontSize: '14px',
                  fontWeight: 500,
                  lineHeight: 1.5,
                  color: '#005CCC',
                  margin: 0,
                  whiteSpace: 'pre',
                }}
              >
                {chipText}
              </p>
            </div>
          )}
          {showNumber && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                fontFamily: 'Pretendard, sans-serif',
                fontSize: '20px',
                fontWeight: 400,
                lineHeight: 1.5,
                color: '#757E8F',
                whiteSpace: 'pre',
              }}
            >
              <span>{number}</span>
              <span>/</span>
              <span>{totalNumber}</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  // depth=2, state=icon: 뒤로가기 + 제목 + 2개 아이콘
  if (depth === '2' && state === 'icon') {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          padding: '12px 0',
          backgroundColor: '#FFFFFF',
          ...style,
        }}
      >
        {/* 왼쪽: 뒤로가기 + 제목 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {showBackButton && (
            <div
              onClick={onBackClick}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '12px 12px 12px 0',
                cursor: onBackClick ? 'pointer' : 'default',
              }}
            >
              <img
                src={iconBackL}
                alt="뒤로가기"
                style={{
                  width: '18px',
                  height: '24px',
                }}
              />
            </div>
          )}
          {showTitle && (
            <p
              style={{
                fontFamily: 'Pretendard, sans-serif',
                fontSize: '24px',
                fontWeight: 600,
                lineHeight: 1.25,
                color: '#1A1C20',
                margin: 0,
                whiteSpace: 'pre',
              }}
            >
              {title}
            </p>
          )}
        </div>

        {/* 오른쪽: 2개 아이콘 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {showIconL && iconL && (
            <div
              onClick={onIconLClick}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '12px 8px',
                cursor: onIconLClick ? 'pointer' : 'default',
              }}
            >
              {typeof iconL === 'string' ? (
                <img src={iconL} alt="" style={{ width: '24px', height: '24px' }} />
              ) : (
                iconL
              )}
            </div>
          )}
          {showIconR && iconR && (
            <div
              onClick={onIconRClick}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '12px 0 12px 8px',
                cursor: onIconRClick ? 'pointer' : 'default',
              }}
            >
              {typeof iconR === 'string' ? (
                <img src={iconR} alt="" style={{ width: '24px', height: '24px' }} />
              ) : (
                iconR
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  // depth=1, state=icon: 제목 + 2개 아이콘 (뒤로가기 없음)
  if (depth === '1' && state === 'icon') {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          padding: '12px 0',
          backgroundColor: '#FFFFFF',
          ...style,
        }}
      >
        {/* 왼쪽: 제목 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          {showTitle && (
            <p
              style={{
                fontFamily: 'Pretendard, sans-serif',
                fontSize: '24px',
                fontWeight: 600,
                lineHeight: 1.25,
                color: '#1A1C20',
                margin: 0,
                whiteSpace: 'pre',
              }}
            >
              {title}
            </p>
          )}
        </div>

        {/* 오른쪽: 2개 아이콘 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {showIconL && iconL && (
            <div
              onClick={onIconLClick}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '12px 8px',
                cursor: onIconLClick ? 'pointer' : 'default',
              }}
            >
              {typeof iconL === 'string' ? (
                <img src={iconL} alt="" style={{ width: '24px', height: '24px' }} />
              ) : (
                iconL
              )}
            </div>
          )}
          {showIconR && iconR && (
            <div
              onClick={onIconRClick}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '12px 0 12px 8px',
                cursor: onIconRClick ? 'pointer' : 'default',
              }}
            >
              {typeof iconR === 'string' ? (
                <img src={iconR} alt="" style={{ width: '24px', height: '24px' }} />
              ) : (
                iconR
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  // depth=2, state=2 title: 뒤로가기 + 제목/부제목 + 2개 아이콘
  if (depth === '2' && state === '2 title') {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          padding: '12px 0',
          backgroundColor: '#FFFFFF',
          ...style,
        }}
      >
        {/* 왼쪽: 뒤로가기 + 제목 + 부제목 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {showBackButton && (
            <div
              onClick={onBackClick}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '12px 12px 12px 0',
                cursor: onBackClick ? 'pointer' : 'default',
              }}
            >
              <img
                src={iconBackL}
                alt="뒤로가기"
                style={{
                  width: '18px',
                  height: '24px',
                }}
              />
            </div>
          )}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            {showTitle && (
              <p
                style={{
                  fontFamily: 'Pretendard, sans-serif',
                  fontSize: '24px',
                  fontWeight: 600,
                  lineHeight: 1.25,
                  color: '#1A1C20',
                  margin: 0,
                  whiteSpace: 'pre',
                }}
              >
                {title}
              </p>
            )}
            {showTitle && subtitle && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '40px',
                }}
              >
                <p
                  style={{
                    fontFamily: 'Pretendard, sans-serif',
                    fontSize: '20px',
                    fontWeight: 600,
                    lineHeight: 1.35,
                    color: '#5E6573',
                    margin: 0,
                  }}
                >
                  {subtitle}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* 오른쪽: 2개 아이콘 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {showIconL && iconL && (
            <div
              onClick={onIconLClick}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '12px 8px',
                cursor: onIconLClick ? 'pointer' : 'default',
              }}
            >
              {typeof iconL === 'string' ? (
                <img src={iconL} alt="" style={{ width: '24px', height: '24px' }} />
              ) : (
                iconL
              )}
            </div>
          )}
          {showIconR && iconR && (
            <div
              onClick={onIconRClick}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '12px 0 12px 8px',
                cursor: onIconRClick ? 'pointer' : 'default',
              }}
            >
              {typeof iconR === 'string' ? (
                <img src={iconR} alt="" style={{ width: '24px', height: '24px' }} />
              ) : (
                iconR
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
};
