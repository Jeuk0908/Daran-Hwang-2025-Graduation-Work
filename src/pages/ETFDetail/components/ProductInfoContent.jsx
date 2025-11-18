import React, { useState } from 'react';
import { InfoRow } from './InfoRow';
import { TermTooltip } from './TermTooltip';
import { getTermDefinition } from '../../../data/termsDictionary';
import iconInformation from '../../../assets/icon_information.svg';

/**
 * 상품 정보 탭 콘텐츠 컴포넌트
 *
 * @param {Object} props
 * @param {Object} props.data - ETF 기본 정보 데이터
 */
export const ProductInfoContent = ({ data }) => {
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  const handleTermClick = (term) => {
    const termDef = getTermDefinition(term);
    if (termDef) {
      setSelectedTerm(termDef);
      setIsTooltipOpen(true);
    }
  };

  const handleTooltipClose = () => {
    setIsTooltipOpen(false);
    setTimeout(() => setSelectedTerm(null), 200);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '28px',
        width: '100%'
      }}
    >
      {/* 1. ETF 개요 섹션 */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          width: '100%'
        }}
      >
        {/* 섹션 헤더 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '8px 0',
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
              margin: 0
            }}
          >
            ETF 개요
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
            클릭하여 용어/tip를 확인할 수 있어요.
          </p>
        </div>

        {/* ETF 개요 데이터 */}
        <div
          style={{
            backgroundColor: '#F7F7F8',
            borderRadius: '12px',
            padding: '8px 12px',
            display: 'flex',
            flexDirection: 'column',
            width: '100%'
          }}
        >
          <InfoRow
            label="운용사"
            value={data.manager || '-'}
          />
          <InfoRow
            label="상장일"
            value={data.listingDate || '-'}
          />
          <InfoRow
            label="기초 자산"
            value={data.underlyingAsset || '-'}
          />
          <InfoRow
            label="기초 지수"
            value={data.indexName || '-'}
            isMultiLine={data.indexName && data.indexName.length > 30}
          />
          <InfoRow
            label="시가총액"
            value={data.marketCap || '-'}
            isClickable={true}
            onClick={() => handleTermClick('시가총액')}
          />
          <InfoRow
            label="순자산"
            value={data.netAssets || '-'}
            isClickable={true}
            onClick={() => handleTermClick('순자산')}
          />
          <InfoRow
            label="상장주식수"
            value={data.listedShares || '-'}
            isClickable={true}
            onClick={() => handleTermClick('상장주식수')}
          />
          <InfoRow
            label="구성종목수"
            value={data.numberOfHoldings || '-'}
          />
          <InfoRow
            label="레버리지"
            value={data.leverage || '-'}
            isClickable={true}
            onClick={() => handleTermClick('레버리지')}
            noBorder={true}
          />
        </div>
      </div>

      {/* 2. 수수료(연) 섹션 */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          width: '100%'
        }}
      >
        {/* 섹션 헤더 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2px',
            padding: '8px 0',
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
              margin: 0
            }}
          >
            수수료(연)
          </h3>
          <img
            src={iconInformation}
            alt="정보"
            style={{
              width: '24px',
              height: '24px',
              flexShrink: 0
            }}
          />
        </div>

        {/* 수수료 데이터 */}
        <div
          style={{
            backgroundColor: '#F7F7F8',
            borderRadius: '12px',
            padding: '8px 12px',
            display: 'flex',
            flexDirection: 'column',
            width: '100%'
          }}
        >
          <InfoRow
            label="총보수율"
            value={data.expenseRatio ? `${data.expenseRatio}%` : '-'}
          />
          <InfoRow
            label="TER"
            value={data.ter || '-'}
            isClickable={true}
            onClick={() => handleTermClick('TER')}
          />
          <InfoRow
            label="실부담비용률"
            value={data.actualExpenseRatio || '-'}
            noBorder={true}
          />
        </div>
      </div>

      {/* 3. 세금 섹션 */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          width: '100%'
        }}
      >
        {/* 섹션 헤더 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2px',
            padding: '8px 0',
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
              margin: 0
            }}
          >
            세금
          </h3>
          <img
            src={iconInformation}
            alt="정보"
            style={{
              width: '24px',
              height: '24px',
              flexShrink: 0
            }}
          />
        </div>

        {/* 세금 데이터 */}
        <div
          style={{
            backgroundColor: '#F7F7F8',
            borderRadius: '12px',
            padding: '8px 12px',
            display: 'flex',
            flexDirection: 'column',
            width: '100%'
          }}
        >
          <InfoRow
            label="증권거래"
            value={data.securitiesTax || '-'}
          />
          <InfoRow
            label="매매차익"
            value={data.capitalGainsTax || '-'}
          />
          <InfoRow
            label="현금배당"
            value={data.dividendTax || '-'}
            isClickable={true}
            onClick={() => handleTermClick('현금배당')}
            noBorder={true}
          />
        </div>
      </div>

      {/* 용어 설명 모달 */}
      {selectedTerm && (
        <TermTooltip
          term={selectedTerm.title}
          title={selectedTerm.title}
          description={selectedTerm.description}
          isOpen={isTooltipOpen}
          onClose={handleTooltipClose}
        />
      )}
    </div>
  );
};
