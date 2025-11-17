import React, { useState, useEffect } from 'react';
import { TreemapChart } from '../../../components/common/TreemapChart';

/**
 * 구성종목 탭 컴포넌트
 *
 * @param {Object} props
 * @param {Array<Object>} props.holdings - 구성 종목 목록
 */
export const CompositionTab = ({ holdings = [] }) => {
  // 선택된 주식 상태 (초기값: 비중이 가장 큰 첫 번째 주식)
  const [selectedStock, setSelectedStock] = useState(null);

  // holdings가 변경되면 첫 번째 항목으로 초기화
  useEffect(() => {
    if (holdings && holdings.length > 0) {
      setSelectedStock(holdings[0]);
    }
  }, [holdings]);
  if (!holdings || holdings.length === 0) {
    return (
      <div
        style={{
          padding: '40px 16px',
          textAlign: 'center'
        }}
      >
        <p
          style={{
            fontFamily: 'Pretendard, sans-serif',
            fontSize: '14px',
            fontWeight: 500,
            color: '#ADB2BD',
            margin: 0
          }}
        >
          구성 종목 정보가 없습니다
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
      }}
    >
      {/* 제목 섹션 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          padding: '8px 16px',
          width: '100%'
        }}
      >
        <h3
          style={{
            fontFamily: 'Pretendard, sans-serif',
            fontSize: '18px',
            fontWeight: 600,
            lineHeight: 1.35,
            color: '#000000',
            margin: 0,
            whiteSpace: 'nowrap'
          }}
        >
          구성종목
        </h3>
        <p
          style={{
            fontFamily: 'Pretendard, sans-serif',
            fontSize: '10px',
            fontWeight: 500,
            lineHeight: 1.25,
            color: '#757E8F',
            margin: 0,
            whiteSpace: 'nowrap'
          }}
        >
          클릭 시 정보를 확인할 수 있어요.
        </p>
      </div>

      {/* 트리맵 차트 */}
      <div
        style={{
          padding: '12px 16px 20px',
          width: '100%'
        }}
      >
        <TreemapChart
          data={holdings.slice(0, 10)}
          height={250}
          selectedStock={selectedStock}
          onSelectStock={setSelectedStock}
        />
      </div>

      {/* 선택된 구성종목 카드 */}
      {selectedStock && (
        <div
          style={{
            padding: '0 16px 20px',
            width: '100%'
          }}
        >
          {(() => {
            const holding = selectedStock;
            const isUp = holding.changeDirection === 'up';
            const changeColor = isUp ? '#00A600' : '#EA5F00';

            return (
              <div
                key={holding.rank}
                style={{
                  backgroundColor: '#FFFFFF',
                  boxShadow: '1px 2px 13.6px 0px rgba(0, 0, 0, 0.1)',
                  borderRadius: '12px',
                  padding: '12px',
                  display: 'flex',
                  alignItems: 'start',
                  justifyContent: 'space-between',
                  width: '100%'
                }}
              >
              {/* 왼쪽: 종목 정보 */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  flex: 1,
                  minWidth: 0
                }}
              >
                {/* 종목명 */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start'
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'Pretendard, sans-serif',
                      fontSize: '16px',
                      fontWeight: 500,
                      lineHeight: 1.5,
                      color: '#1A1C20',
                      margin: 0,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      maxWidth: '100%'
                    }}
                  >
                    {holding.name}
                  </p>
                </div>

                {/* 서브 정보 */}
                <div
                  style={{
                    display: 'flex',
                    gap: '2px',
                    alignItems: 'center'
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'Pretendard, sans-serif',
                      fontSize: '12px',
                      fontWeight: 400,
                      lineHeight: 1.5,
                      color: '#757E8F',
                      margin: 0,
                      whiteSpace: 'nowrap'
                    }}
                  >
                    1개월간 수익률
                  </p>
                </div>
              </div>

              {/* 오른쪽: 비중 및 수익률 */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                  height: '46px',
                  flexShrink: 0,
                  width: '90px'
                }}
              >
                {/* 보유 비중 */}
                <p
                  style={{
                    fontFamily: 'Pretendard, sans-serif',
                    fontSize: '16px',
                    fontWeight: 600,
                    lineHeight: 1.35,
                    color: '#000000',
                    margin: 0,
                    whiteSpace: 'nowrap'
                  }}
                >
                  보유 {holding.weight}%
                </p>

                {/* 수익률 */}
                <div
                  style={{
                    display: 'flex',
                    fontFamily: 'Pretendard, sans-serif',
                    alignItems: 'center',
                    fontSize: '12px',
                    fontWeight: 500,
                    lineHeight: 1.5,
                    color: changeColor,
                    whiteSpace: 'nowrap'
                  }}
                >
                  <p style={{ margin: 0 }}>
                    {Math.abs(holding.change).toFixed(2)}
                  </p>
                  <p style={{ margin: 0 }}>%</p>
                </div>
              </div>
            </div>
            );
          })()}
        </div>
      )}
    </div>
  );
};
