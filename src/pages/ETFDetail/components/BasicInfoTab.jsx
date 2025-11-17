import React, { useState } from 'react';
import { Chip } from '../../../components/common/Chip';
import { ProductInfoContent } from './ProductInfoContent';
import { StrategyContent } from './StrategyContent';
import { IndexContent } from './IndexContent';

/**
 * 기본정보 탭 컴포넌트 (3개 서브탭 포함)
 *
 * @param {Object} props
 * @param {Object} props.data - 기본 정보 데이터
 */
export const BasicInfoTab = ({ data }) => {
  if (!data) return null;

  // 서브탭 상태 관리
  const [activeSubTab, setActiveSubTab] = useState('상품 정보');

  const subTabs = ['상품 정보', '특징 및 운용전략', '기초지수'];

  // 서브탭별 콘텐츠 렌더링
  const renderContent = () => {
    switch (activeSubTab) {
      case '상품 정보':
        return <ProductInfoContent data={data.basicInfo || {}} />;

      case '특징 및 운용전략':
        return <StrategyContent data={data} />;

      case '기초지수':
        return <IndexContent data={data.indexDetails || {}} />;

      default:
        return null;
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
      }}
    >
      {/* 서브탭 네비게이션 */}
      <div
        style={{
          display: 'flex',
          gap: '4px',
          padding: '0 16px 20px 16px',
          width: '100%',
          overflowX: 'auto',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        {subTabs.map((tab) => (
          <Chip
            key={tab}
            title={tab}
            color="grey"
            state={activeSubTab === tab ? 'select' : 'nonSelect'}
            onClick={() => setActiveSubTab(tab)}
            size="medium"
          />
        ))}
      </div>

      {/* 서브탭 콘텐츠 */}
      <div
        style={{
          padding: '0 16px 20px 16px',
          width: '100%'
        }}
      >
        {renderContent()}
      </div>
    </div>
  );
};
