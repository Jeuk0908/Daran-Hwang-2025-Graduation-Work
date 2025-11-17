/**
 * ETF 상세 페이지 더미 데이터
 * 모든 데이터는 가상의 데이터입니다.
 */

// 차트 데이터 생성 헬퍼 함수
const generateChartData = (period, basePrice) => {
  const data = [];
  let dataPoints = 0;
  let dateFormat = '';

  // 기간별 데이터 포인트 개수 및 날짜 형식 설정
  switch (period) {
    case '1D':
      dataPoints = 24; // 24시간
      dateFormat = 'hour';
      break;
    case '1M':
      dataPoints = 30; // 30일
      dateFormat = 'day';
      break;
    case '3M':
      dataPoints = 90; // 90일
      dateFormat = 'day';
      break;
    case '6M':
      dataPoints = 180; // 180일
      dateFormat = 'day';
      break;
    case '1Y':
      dataPoints = 365; // 365일
      dateFormat = 'day';
      break;
    case '3Y':
      dataPoints = 1095; // 3년 (1095일)
      dateFormat = 'day';
      break;
    case '5Y':
      dataPoints = 1825; // 5년 (1825일)
      dateFormat = 'day';
      break;
    case 'MAX':
      dataPoints = 2190; // 6년 (2190일)
      dateFormat = 'day';
      break;
    default:
      dataPoints = 30;
      dateFormat = 'day';
  }

  // 기준 날짜 설정
  const now = new Date();

  for (let i = 0; i < dataPoints; i++) {
    const date = new Date(now);

    // 날짜 계산
    if (dateFormat === 'hour') {
      date.setHours(date.getHours() - (dataPoints - i - 1));
    } else {
      date.setDate(date.getDate() - (dataPoints - i - 1));
    }

    // 날짜 포맷팅
    let formattedDate;
    if (dateFormat === 'hour') {
      formattedDate = `${String(date.getHours()).padStart(2, '0')}:00`;
    } else {
      formattedDate = `${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}`;
    }

    // 랜덤 변동 생성 (-3% ~ +3%)
    const variation = 1 + (Math.random() * 0.06 - 0.03);
    const trendFactor = 1 + (i / dataPoints) * 0.1; // 전체적인 상승 트렌드

    const closePrice = Math.round(basePrice * variation * trendFactor);
    const navPrice = Math.round(closePrice * (1 + (Math.random() * 0.004 - 0.002))); // NAV는 종가 근처
    const indexPrice = Math.round(closePrice * (1 + (Math.random() * 0.006 - 0.003))); // 기초지수는 비슷하게

    data.push({
      date: formattedDate,
      close: closePrice,
      nav: navPrice,
      index: indexPrice
    });
  }

  return data;
};

// ETF 더미 데이터 (15개) - 모든 데이터는 가상입니다
export const ETF_MOCK_DATA = {
  // ========== 해외 주식 ETF (5개) ==========

  'etf-1': {
    id: 'etf-1',
    code: '483280',
    name: 'AGTC',
    category: '해외주식',
    themes: ['AI 투자', '빅테크'],
    popularity: 95,
    isFavorite: false,
    currentPrice: 11650,
    previousClose: 11357,
    changeAmount: 293,
    changePercent: 2.59,
    changeDirection: 'up',
    nav: 11641.10,
    navChangeAmount: -294,
    navChangePercent: 2.53,
    navChangeDirection: 'down',
    basicInfo: {
      manager: 'Alpha자산운용',
      managementFee: '0.07',
      listingDate: '2023.01.15',
      indexName: 'Global AI Tech TOP 10 Covered Call Index',
      totalAssets: 15987878874,
      totalAssetsFormatted: '159억원',
      volume: 2734,
      volumeFormatted: '2,734',
      dividendYield: '7.82',
      expenseRatio: '0.55',
      trackingError: '0.12',
      underlyingAsset: '해외주식',
      marketCap: '87억원',
      netAssets: '57억원',
      listedShares: '500,000주',
      numberOfHoldings: '10종목',
      leverage: '1배',
      ter: '0.8800%',
      actualExpenseRatio: '1.0456%',
      securitiesTax: '비과세',
      capitalGainsTax: '비과세',
      dividendTax: '배당소득세 15.4%'
    },
    strategy: {
      title: '타겟 커버드콜 - 운용 전략',
      description: '글로벌 AI 기술 상위 10개 기업에 투자하며, 주가 상승의 큰 이익은 포기하는 대신 매달 {안정적으로 높은 배당금}을 받는 상품입니다.',
      highlightColor: '#3490FF'
    },
    strategyDetails: {
      features: [
        '글로벌 대표 AI/테크 기업 10종목에 집중 투자',
        '커버드콜 전략으로 월배당 수익 창출',
        '고배당 수익률로 안정적인 현금흐름 제공'
      ],
      investmentStrategy: `(1) 운용 전략
1) 미국 거래소에 상장된 AI 및 테크 기업을 대상으로, Global AI Tech Index를 기초지수로 하여 1좌당 순자산가치의 변동률을 기초지수의 변동률과 유사하도록 투자신탁재산을 운용합니다. TechCore, SoftSystems, DeviceMax, SearchTech, CloudNet, DataSystems, AutoElectric, QuantumChip, RoboTech, NeuralSoft 등 상위 10개 기업의 주식을 시가총액 비중으로 편입합니다.

2) 타겟 커버드콜 전략: 보유 주식 대비 100~110% 행사가격의 콜옵션을 매도하여 옵션 프리미엄 수익을 확보합니다. 주가가 행사가격을 초과하여 상승하는 경우 초과 수익은 제한되나, 옵션 프리미엄을 통해 월 평균 1.2~2.5%의 안정적인 현금 수익을 창출합니다.

3) 환헷지 전략은 실시하지 않으므로 달러 강세 시 환차익, 달러 약세 시 환차손이 발생할 수 있습니다.

(2) 기초지수 소개
- 기초지수: Global AI Tech Top 10 Index
- 구성종목: 미국 상장 AI 및 테크 기업 중 시가총액 상위 10개 기업
- 가중방식: 시가총액 가중 (개별 종목 상한 15%)
- 리밸런싱: 월간 (매월 셋째 금요일)
- 배당 처리: 배당금은 재투자되지 않으며 커버드콜 프리미엄과 함께 분배금으로 지급
- 기준일: 2020년 1월 1일 (기준지수 1,000pt)

(3) 투자위험 고지
본 상품은 커버드콜 전략의 특성상 주가 급등 시 초과 수익을 얻을 수 없으며, 주가 하락 시 손실이 발생할 수 있습니다. 또한 환헷지를 실시하지 않아 환율 변동 위험에 노출되어 있습니다.`,
      riskLevel: '중위험',
      recommendedPeriod: '1년 이상'
    },
    indexDetails: {
      indexName: 'Global AI Tech TOP 10 Covered Call Index',
      indexProvider: 'GlobalIndex Solutions',
      indexDescription: `본 지수는 미국 거래소에 상장된 AI 및 첨단 기술 관련 기업 중 시가총액 상위 10개 종목으로 구성됩니다.

구성 종목은 TechCore, SoftSystems, DeviceMax, SearchTech, CloudNet, DataSystems, AutoElectric, QuantumChip, RoboTech, NeuralSoft 등이며, 시가총액 가중 방식으로 편입 비중이 결정됩니다. 개별 종목의 상한은 15%로 제한하여 과도한 집중을 방지합니다.

타겟 커버드콜 전략이 적용되어, 보유 주식 대비 100~110% 행사가격의 콜옵션을 매도함으로써 옵션 프리미엄 수익을 창출합니다. 이를 통해 월 평균 1.2~2.5%의 안정적인 현금 수익을 제공하며, 배당금과 함께 분배금으로 지급됩니다.

리밸런싱은 매월 셋째 금요일에 실시되며, 기준일은 2020년 1월 1일(기준지수 1,000pt)입니다.`,
      rebalancingCycle: '월간',
      calculationMethod: '시가총액 가중 + 옵션 프리미엄'
    },
    chartData: {
      '1D': generateChartData('1D', 11500),
      '1M': generateChartData('1M', 11200),
      '3M': generateChartData('3M', 10800),
      '6M': generateChartData('6M', 10500),
      '1Y': generateChartData('1Y', 10000),
      '3Y': generateChartData('3Y', 9200),
      '5Y': generateChartData('5Y', 8500),
      'MAX': generateChartData('MAX', 8000)
    },
    holdings: [
      { rank: 1, name: 'TechCore Inc', ticker: 'TCHC', weight: 12.5, change: 2.3, changeDirection: 'up', price: '875.28' },
      { rank: 2, name: 'SoftSystems Corp', ticker: 'SFTC', weight: 11.8, change: 1.7, changeDirection: 'up', price: '378.91' },
      { rank: 3, name: 'DeviceMax Inc', ticker: 'DVMX', weight: 10.2, change: -0.5, changeDirection: 'down', price: '172.43' },
      { rank: 4, name: 'SearchTech Co', ticker: 'SRCH', weight: 9.7, change: 1.2, changeDirection: 'up', price: '139.67' },
      { rank: 5, name: 'EcomGiant Inc', ticker: 'ECGN', weight: 9.3, change: 0.8, changeDirection: 'up', price: '178.25' },
      { rank: 6, name: 'SocialNet Corp', ticker: 'SOCN', weight: 8.6, change: 2.1, changeDirection: 'up', price: '484.03' },
      { rank: 7, name: 'AutoElectric Inc', ticker: 'AELC', weight: 7.9, change: -1.3, changeDirection: 'down', price: '246.39' },
      { rank: 8, name: 'ChipMaker Co', ticker: 'CPMK', weight: 6.5, change: 3.4, changeDirection: 'up', price: '166.89' },
      { rank: 9, name: 'SemiFab Inc', ticker: 'SMFB', weight: 5.8, change: 1.9, changeDirection: 'up', price: '1,287.45' },
      { rank: 10, name: 'DataBase Corp', ticker: 'DTBS', weight: 5.2, change: 0.6, changeDirection: 'up', price: '125.17' }
    ],
    dividends: [
      { date: '2024.03.15', amount: 125, yieldRate: 0.57, status: 'paid' },
      { date: '2024.02.15', amount: 118, yieldRate: 0.55, status: 'paid' },
      { date: '2024.01.15', amount: 122, yieldRate: 0.56, status: 'paid' },
      { date: '2023.12.15', amount: 130, yieldRate: 0.61, status: 'paid' },
      { date: '2023.11.15', amount: 115, yieldRate: 0.53, status: 'paid' }
    ]
  },

  'etf-2': {
    id: 'etf-2',
    code: '360750',
    name: 'BETA 글로벌500',
    category: '해외주식',
    themes: ['분산투자', '장기투자'],
    popularity: 98,
    isFavorite: false,
    currentPrice: 21970,
    previousClose: 21415,
    changeAmount: 555,
    changePercent: 2.59,
    changeDirection: 'up',
    nav: 21965.50,
    navChangeAmount: 550,
    navChangePercent: 2.57,
    navChangeDirection: 'up',
    basicInfo: {
      manager: 'Beta자산운용',
      managementFee: '0.05',
      listingDate: '2020.06.25',
      indexName: 'World 500 Index',
      totalAssets: 8543210987654,
      totalAssetsFormatted: '8조 5,432억원',
      volume: 125678,
      volumeFormatted: '125,678',
      dividendYield: '1.45',
      expenseRatio: '0.07',
      trackingError: '0.05',
      underlyingAsset: '해외주식',
      marketCap: '8조 5,100억원',
      netAssets: '8조 5,020억원',
      listedShares: '38,800,000주',
      numberOfHoldings: '503종목',
      leverage: '1배',
      ter: '0.0750%',
      actualExpenseRatio: '0.0812%',
      securitiesTax: '비과세',
      capitalGainsTax: '비과세',
      dividendTax: '배당소득세 15.4%'
    },
    strategy: {
      title: '인덱스 추종 - 운용 전략',
      description: '글로벌 500 지수를 추종하여 세계 대표 500개 기업에 {분산 투자}하는 상품입니다.'
    },
    strategyDetails: {
      features: [
        '글로벌 주식시장 대표 500개 기업 투자',
        '시가총액 가중 방식의 안정적인 포트폴리오',
        '낮은 보수율과 높은 유동성'
      ],
      investmentStrategy: `(1) 운용 전략
1) 글로벌 주요 거래소(미국, 유럽, 아시아)에 상장된 기업을 대상으로 World 500 Total Return Index를 추종합니다. 본 지수는 글로벌 주식시장 시가총액의 약 75%를 커버하며, 선진국 및 신흥국 시장을 모두 포함합니다.

2) 투자 대상은 미국(60%), 유럽(20%), 일본(8%), 중국(7%), 기타 신흥국(5%) 등으로 구성되며, 섹터별로는 정보기술(25%), 금융(15%), 헬스케어(13%), 소비재(12%), 산업재(10%) 등으로 분산 투자됩니다.

3) 분기별 리밸런싱을 통해 지수 구성 변화에 대응하며, 시가총액 변동에 따른 편입/편출 종목을 조정합니다. 추적오차는 연 0.15% 이내로 관리됩니다.

4) 환헷지: 부분 환헷지 전략 실시 (미국 달러 50% 헷지, 기타 통화 비헷지)

(2) 기초지수 소개
- 기초지수: World 500 Total Return Index (KRW)
- 산출기관: WorldIndex Corporation
- 구성종목: 글로벌 대형주 500개 기업
- 가중방식: 유동 시가총액 가중
- 리밸런싱: 분기별 (3, 6, 9, 12월 셋째 금요일)
- 배당 처리: 총수익률 방식 (배당금 재투자 가정)
- 기준일: 1990년 12월 31일 (기준지수 100pt)

(3) 비용 구조
- 총보수: 연 0.08%
- 매매 및 기타 비용: 연 0.02%
- 합계: 연 0.10% (업계 최저 수준)

이 상품은 장기 분산 투자를 목적으로 하는 투자자에게 적합하며, 글로벌 경기 변동 및 환율 변동 위험이 있습니다.`,
      riskLevel: '중위험',
      recommendedPeriod: '3년 이상'
    },
    indexDetails: {
      indexName: 'World 500 Index',
      indexProvider: 'WorldIndex Corp',
      indexDescription: `본 지수는 전 세계 주요 선진국 시장에 상장된 대형주 500개 기업으로 구성된 글로벌 대표 주식 지수입니다.

미국(55%), 유럽(25%), 일본(8%), 기타 선진국(12%)의 비중으로 지역별 분산이 이루어지며, 정보기술(23%), 금융(15%), 헬스케어(13%), 소비재(12%) 등 11개 섹터에 걸쳐 분산 투자됩니다.

편입 종목은 시가총액, 유동성, 재무건전성을 기준으로 선정되며, 시가총액 가중 방식으로 지수 내 비중이 결정됩니다. 개별 종목 상한은 5%, 상위 10개 종목 합산 상한은 40%로 제한하여 집중도를 관리합니다.

분기별 리밸런싱을 통해 지수 구성을 최신 상태로 유지하며, 배당금은 가격지수에 재투자되지 않습니다. 기준일은 1990년 12월 31일(기준지수 1,000pt)입니다.`,
      rebalancingCycle: '분기별',
      calculationMethod: '시가총액 가중'
    },
    chartData: {
      '1D': generateChartData('1D', 21800),
      '1M': generateChartData('1M', 21200),
      '3M': generateChartData('3M', 20500),
      '6M': generateChartData('6M', 19800),
      '1Y': generateChartData('1Y', 18500),
      '3Y': generateChartData('3Y', 17000),
      '5Y': generateChartData('5Y', 16000),
      'MAX': generateChartData('MAX', 15000)
    },
    holdings: [
      { rank: 1, name: 'DeviceMax Inc', ticker: 'DVMX', weight: 7.2, change: 1.2, changeDirection: 'up', price: '172.43' },
      { rank: 2, name: 'SoftSystems Corp', ticker: 'SFTC', weight: 6.8, change: 0.9, changeDirection: 'up', price: '378.91' },
      { rank: 3, name: 'EcomGiant Inc', ticker: 'ECGN', weight: 3.4, change: -0.5, changeDirection: 'down', price: '178.25' },
      { rank: 4, name: 'TechCore Inc', ticker: 'TCHC', weight: 3.1, change: 2.7, changeDirection: 'up', price: '875.28' },
      { rank: 5, name: 'SearchTech Co', ticker: 'SRCH', weight: 2.1, change: 0.8, changeDirection: 'up', price: '139.67' },
      { rank: 6, name: 'SocialNet Corp', ticker: 'SOCN', weight: 1.9, change: 1.5, changeDirection: 'up', price: '484.03' },
      { rank: 7, name: 'InvestGroup Ltd', ticker: 'INVG', weight: 1.7, change: 0.3, changeDirection: 'up', price: '389.21' },
      { rank: 8, name: 'AutoElectric Inc', ticker: 'AELC', weight: 1.6, change: -1.8, changeDirection: 'down', price: '246.39' },
      { rank: 9, name: 'BioPharm Co', ticker: 'BPRM', weight: 1.4, change: 2.1, changeDirection: 'up', price: '742.85' },
      { rank: 10, name: 'FinanceOne Corp', ticker: 'FNON', weight: 1.3, change: 0.6, changeDirection: 'up', price: '183.54' }
    ],
    dividends: [
      { date: '2024.03.20', amount: 89, yieldRate: 0.41, status: 'paid' },
      { date: '2023.12.20', amount: 85, yieldRate: 0.40, status: 'paid' },
      { date: '2023.09.20', amount: 82, yieldRate: 0.39, status: 'paid' },
      { date: '2023.06.20', amount: 78, yieldRate: 0.37, status: 'paid' }
    ]
  },

  'etf-3': {
    id: 'etf-3',
    code: '133690',
    name: 'ALPHA 테크100',
    category: '해외주식',
    themes: ['빅테크', '성장주'],
    popularity: 92,
    isFavorite: false,
    currentPrice: 35420,
    previousClose: 34980,
    changeAmount: 440,
    changePercent: 1.26,
    changeDirection: 'up',
    nav: 35415.80,
    navChangeAmount: 435,
    navChangePercent: 1.24,
    navChangeDirection: 'up',
    basicInfo: {
      manager: 'Alpha자산운용',
      managementFee: '0.05',
      listingDate: '2010.09.13',
      indexName: 'Global Tech 100 Index',
      totalAssets: 3254870000000,
      totalAssetsFormatted: '3조 2,548억원',
      volume: 78934,
      volumeFormatted: '78,934',
      dividendYield: '0.62',
      expenseRatio: '0.08',
      trackingError: '0.09',
      underlyingAsset: '해외주식',
      marketCap: '3조 2,410억원',
      netAssets: '3조 2,385억원',
      listedShares: '91,500,000주',
      numberOfHoldings: '102종목',
      leverage: '1배',
      ter: '0.0850%',
      actualExpenseRatio: '0.0924%',
      securitiesTax: '비과세',
      capitalGainsTax: '비과세',
      dividendTax: '배당소득세 15.4%'
    },
    strategy: {
      title: '인덱스 추종 - 운용 전략',
      description: '글로벌 기술주 시장의 비금융 대형주 100개 기업에 투자하여 {혁신 기업의 성장}을 추구합니다.'
    },
    strategyDetails: {
      features: [
        '글로벌 Tech 100 지수 추종으로 기술주 중심 투자',
        'DeviceMax, SoftSystems 등 대형 테크 기업 포함',
        '장기 성장성이 높은 포트폴리오 구성'
      ],
      investmentStrategy: `(1) 운용 전략
1) 미국 나스닥 및 뉴욕증권거래소에 상장된 기술주를 대상으로 Global Tech 100 Index를 추종합니다. 이 지수는 비금융 기술기업 중 시가총액 상위 100개 기업으로 구성되며, 금융업종은 제외됩니다.

2) 주요 편입 종목은 DeviceMax(8.5%), SoftSystems(7.2%), SearchTech(6.8%), CloudNet(5.1%), DataSystems(4.3%), EcomGiant(3.9%), AutoElectric(3.7%), SocialNet(3.2%) 등이며, 상위 10종목이 전체 포트폴리오의 약 52%를 차지합니다.

3) 섹터 구성: 소프트웨어(35%), 반도체(25%), 인터넷 서비스(20%), 하드웨어(15%), 통신장비(5%)

4) 분기별 리밸런싱을 통해 시가총액 변동을 반영하며, 기술혁신 트렌드 변화에 따라 편입 종목이 조정될 수 있습니다.

5) 환헷지는 실시하지 않아 달러 강세 시 추가 수익, 달러 약세 시 손실이 발생할 수 있습니다.

(2) 기초지수 특징
- 기초지수: Global Technology 100 Index
- 산출기관: TechIndex Incorporated
- 구성: 비금융 기술주 100개 (금융업 제외)
- 가중방식: 수정 시가총액 가중 (개별 종목 상한 10%)
- 리밸런싱: 분기별
- 섹터 다양성: 최소 4개 이상 기술 섹터 포함
- 기준일: 1995년 1월 1일 (기준지수 1,000pt)

(3) 기대 수익 및 위험
기술주는 높은 성장성을 보이나 변동성이 크며, 경기 둔화 시 급격한 하락 가능성이 있습니다. 장기 투자 관점에서 접근하시기 바랍니다.`,
      riskLevel: '중고위험',
      recommendedPeriod: '3년 이상'
    },
    indexDetails: {
      indexName: 'Global Tech 100 Index',
      indexProvider: 'TechIndex Inc',
      indexDescription: `본 지수는 미국, 유럽, 아시아 등 글로벌 주요 거래소에 상장된 기술 관련 기업 중 시가총액 상위 100개 종목으로 구성됩니다.

정보기술(65%), 통신서비스(20%), 소비자 재량(15%)의 섹터 구성을 가지며, 소프트웨어, 반도체, 하드웨어, 인터넷 서비스, 전자상거래 등 세부 업종에 분산 투자됩니다. 금융 섹터는 제외됩니다.

편입 기준은 시가총액 100억 달러 이상, 3개월 평균 일거래대금 2,000만 달러 이상이며, 시가총액 가중 방식으로 비중이 산출됩니다. 개별 종목 상한은 8%로 제한됩니다.

분기별 리밸런싱 시 상위 120개 종목 중 100개를 선정하며, 기존 편입 종목은 110위권까지 유지될 수 있는 버퍼 룰을 적용합니다. 기준일은 2010년 1월 4일(기준지수 1,000pt)입니다.`,
      rebalancingCycle: '분기별',
      calculationMethod: '시가총액 가중'
    },
    chartData: {
      '1D': generateChartData('1D', 35200),
      '1M': generateChartData('1M', 34500),
      '3M': generateChartData('3M', 33200),
      '6M': generateChartData('6M', 31800),
      '1Y': generateChartData('1Y', 29500),
      '3Y': generateChartData('3Y', 25000),
      '5Y': generateChartData('5Y', 22000),
      'MAX': generateChartData('MAX', 18000)
    },
    holdings: [
      { rank: 1, name: 'DeviceMax Inc', ticker: 'DVMX', weight: 10.8, change: 1.2, changeDirection: 'up', price: '172.43' },
      { rank: 2, name: 'SoftSystems Corp', ticker: 'SFTC', weight: 9.5, change: 0.9, changeDirection: 'up', price: '378.91' },
      { rank: 3, name: 'EcomGiant Inc', ticker: 'ECGN', weight: 5.2, change: -0.3, changeDirection: 'down', price: '178.25' },
      { rank: 4, name: 'TechCore Inc', ticker: 'TCHC', weight: 4.8, change: 3.1, changeDirection: 'up', price: '875.28' },
      { rank: 5, name: 'SocialNet Corp', ticker: 'SOCN', weight: 3.9, change: 1.8, changeDirection: 'up', price: '484.03' },
      { rank: 6, name: 'AutoElectric Inc', ticker: 'AELC', weight: 3.2, change: -1.5, changeDirection: 'down', price: '246.39' },
      { rank: 7, name: 'SearchTech Co', ticker: 'SRCH', weight: 2.8, change: 0.7, changeDirection: 'up', price: '139.67' },
      { rank: 8, name: 'SemiFab Inc', ticker: 'SMFB', weight: 2.1, change: 2.3, changeDirection: 'up', price: '1,287.45' },
      { rank: 9, name: 'CreativeSoft Inc', ticker: 'CRSF', weight: 1.9, change: 1.1, changeDirection: 'up', price: '567.82' },
      { rank: 10, name: 'StreamMedia Co', ticker: 'STMD', weight: 1.7, change: 0.9, changeDirection: 'up', price: '623.45' }
    ],
    dividends: [
      { date: '2024.03.25', amount: 55, yieldRate: 0.16, status: 'paid' },
      { date: '2023.12.22', amount: 52, yieldRate: 0.15, status: 'paid' },
      { date: '2023.09.21', amount: 48, yieldRate: 0.14, status: 'paid' }
    ]
  },

  'etf-4': {
    id: 'etf-4',
    code: '458730',
    name: 'BETA 글로벌배당100',
    category: '해외주식',
    themes: ['배당왕 모음', '가치주'],
    popularity: 88,
    isFavorite: false,
    currentPrice: 12850,
    previousClose: 12720,
    changeAmount: 130,
    changePercent: 1.02,
    changeDirection: 'up',
    nav: 12848.20,
    navChangeAmount: 128,
    navChangePercent: 1.01,
    navChangeDirection: 'up',
    basicInfo: {
      manager: 'Beta자산운용',
      managementFee: '0.03',
      listingDate: '2022.11.08',
      indexName: 'Global Dividend 100 Index',
      totalAssets: 456780000000,
      totalAssetsFormatted: '4,567억원',
      volume: 12456,
      volumeFormatted: '12,456',
      dividendYield: '3.87',
      expenseRatio: '0.05',
      trackingError: '0.11',
      underlyingAsset: '해외주식',
      marketCap: '4,523억원',
      netAssets: '4,498억원',
      listedShares: '35,000,000주',
      numberOfHoldings: '100종목',
      leverage: '1배',
      ter: '0.0550%',
      actualExpenseRatio: '0.0645%',
      securitiesTax: '비과세',
      capitalGainsTax: '비과세',
      dividendTax: '배당소득세 15.4%'
    },
    strategy: {
      title: '고배당 - 운용 전략',
      description: '글로벌 배당 우수 기업 100개에 투자하여 {안정적인 배당 수익}을 추구합니다.'
    },
    strategyDetails: {
      features: [
        '글로벌 고배당 우량주 100개 투자',
        '배당 성향이 높은 안정적인 기업 중심',
        '분기별 배당금 지급으로 현금흐름 확보'
      ],
      investmentStrategy: `(1) 운용 전략
1) 글로벌 주요 시장의 고배당 우량 기업 100개에 투자하며, Global High Dividend 100 Index를 추종합니다. 편입 종목은 다음 기준을 만족해야 합니다:
   - 최근 5년간 연속 배당 실시
   - 배당수익률 3% 이상
   - 부채비율 200% 이하
   - 배당성향 80% 이하 (지속가능성 확보)

2) 가중 방식: 배당수익률 가중 방식을 적용하여 배당수익률이 높은 종목에 더 많은 비중을 부여합니다. 다만 개별 종목 상한은 5%로 제한하여 집중 위험을 방지합니다.

3) 지역 분산: 미국(40%), 유럽(30%), 아시아태평양(20%), 캐나다(10%)

4) 섹터 분산: 금융(25%), 유틸리티(20%), 에너지(15%), 통신(12%), 소비재(10%), 부동산(10%), 기타(8%)

5) 분기별 배당금 지급: 편입 종목의 배당금을 수취하여 연 4회(3월, 6월, 9월, 12월) 투자자에게 분배합니다.

(2) 기초지수 정보
- 기초지수: Global High Dividend 100 Index (Total Return)
- 산출기관: WorldIndex Corporation
- 구성종목: 100개 고배당 우량주
- 선정기준: 배당수익률, 배당 지속성, 재무 안정성
- 리밸런싱: 분기별
- 배당 처리: 분기별 현금 분배
- 기준일: 2005년 1월 1일 (기준지수 1,000pt)

(3) 투자 포인트
고배당 전략은 시장 변동성이 클 때 상대적으로 안정적인 수익을 제공하나, 금리 상승기에는 배당주 가격이 하락할 수 있습니다. 장기 현금흐름 확보를 원하는 투자자에게 적합합니다.`,
      riskLevel: '중위험',
      recommendedPeriod: '2년 이상'
    },
    indexDetails: {
      indexName: 'Global Dividend 100 Index',
      indexProvider: 'WorldIndex Corp',
      indexDescription: `본 지수는 선진국 시장에 상장된 고배당 우량주 중 배당 안정성과 지속가능성이 우수한 100개 종목으로 구성됩니다.

편입 기준은 최근 5년간 배당 지급 이력, 배당성향 80% 이하, 배당커버리지 1.2배 이상이며, 현재 배당수익률 3% 이상인 종목만 선정됩니다. 금융(30%), 에너지(20%), 유틸리티(15%), 통신(10%), 소비재(25%) 등으로 섹터 분산이 이루어집니다.

지수 내 비중은 배당수익률 가중 방식으로 산출되되, 개별 종목 상한 3%, 동일 섹터 상한 35%로 제한하여 과도한 집중을 방지합니다.

분기별 리밸런싱 시 배당 삭감 또는 중단 종목은 즉시 제외되며, 배당금은 가격지수에 재투자되지 않습니다. 기준일은 2005년 6월 30일(기준지수 1,000pt)입니다.`,
      rebalancingCycle: '분기별',
      calculationMethod: '배당수익률 가중'
    },
    chartData: {
      '1D': generateChartData('1D', 12800),
      '1M': generateChartData('1M', 12600),
      '3M': generateChartData('3M', 12300),
      '6M': generateChartData('6M', 12000),
      '1Y': generateChartData('1Y', 11500),
      '3Y': generateChartData('3Y', 10800),
      '5Y': generateChartData('5Y', 10200),
      'MAX': generateChartData('MAX', 9800)
    },
    holdings: [
      { rank: 1, name: 'HealthCare Group', ticker: 'HCGP', weight: 3.8, change: 0.5, changeDirection: 'up', price: '156.42' },
      { rank: 2, name: 'ConsumerGoods Co', ticker: 'CNGD', weight: 3.5, change: 0.3, changeDirection: 'up', price: '149.78' },
      { rank: 3, name: 'BeverageCorp A', ticker: 'BVCA', weight: 3.2, change: 0.7, changeDirection: 'up', price: '58.92' },
      { rank: 4, name: 'FoodIndustry Inc', ticker: 'FDID', weight: 3.0, change: 0.4, changeDirection: 'up', price: '168.34' },
      { rank: 5, name: 'TelecomNetwork Co', ticker: 'TLNW', weight: 2.9, change: -0.2, changeDirection: 'down', price: '41.23' },
      { rank: 6, name: 'CommLink Corp', ticker: 'CMLK', weight: 2.7, change: 0.1, changeDirection: 'up', price: '15.67' },
      { rank: 7, name: 'EnergyGlobal Inc', ticker: 'ENGL', weight: 2.6, change: 1.2, changeDirection: 'up', price: '142.89' },
      { rank: 8, name: 'PharmaLife Co', ticker: 'PHLF', weight: 2.5, change: 0.8, changeDirection: 'up', price: '167.45' },
      { rank: 9, name: 'MediCare Inc', ticker: 'MDCR', weight: 2.4, change: -0.5, changeDirection: 'down', price: '28.91' },
      { rank: 10, name: 'NetworkTech Corp', ticker: 'NWTC', weight: 2.3, change: 0.6, changeDirection: 'up', price: '52.34' }
    ],
    dividends: [
      { date: '2024.03.15', amount: 142, yieldRate: 1.11, status: 'paid' },
      { date: '2023.12.15', amount: 138, yieldRate: 1.09, status: 'paid' },
      { date: '2023.09.15', amount: 135, yieldRate: 1.07, status: 'paid' },
      { date: '2023.06.15', amount: 131, yieldRate: 1.04, status: 'paid' }
    ]
  },

  'etf-5': {
    id: 'etf-5',
    code: '447770',
    name: 'GAMMA 글로벌빅테크TOP7',
    category: '해외주식',
    themes: ['빅테크', '성장주'],
    popularity: 94,
    isFavorite: false,
    currentPrice: 24350,
    previousClose: 23890,
    changeAmount: 460,
    changePercent: 1.93,
    changeDirection: 'up',
    nav: 24342.60,
    navChangeAmount: 452,
    navChangePercent: 1.89,
    navChangeDirection: 'up',
    basicInfo: {
      manager: 'Gamma자산운용',
      managementFee: '0.09',
      listingDate: '2021.08.18',
      indexName: 'Magnificent 7 Equal Weight Index',
      totalAssets: 987650000000,
      totalAssetsFormatted: '9,876억원',
      volume: 45623,
      volumeFormatted: '45,623',
      dividendYield: '0.42',
      expenseRatio: '0.12',
      trackingError: '0.15',
      underlyingAsset: '해외주식',
      marketCap: '9,812억원',
      netAssets: '9,789억원',
      listedShares: '40,200,000주',
      numberOfHoldings: '7종목',
      leverage: '1배',
      ter: '0.1250%',
      actualExpenseRatio: '0.1387%',
      securitiesTax: '비과세',
      capitalGainsTax: '비과세',
      dividendTax: '배당소득세 15.4%'
    },
    strategy: {
      title: '집중 투자 - 운용 전략',
      description: '글로벌 빅테크 7개 기업에 {동일 비중으로 집중 투자}합니다.'
    },
    strategyDetails: {
      features: [
        '글로벌 대표 빅테크 7개 기업 집중 투자',
        '동일 비중 투자로 리스크 분산',
        '월간 리밸런싱으로 비중 조정'
      ],
      investmentStrategy: `(1) 운용 전략
1) 글로벌 시가총액 상위 빅테크 7개 기업에 동일 비중(각 14.3%)으로 집중 투자합니다. 편입 종목은 다음과 같습니다:
   - DeviceMax: 스마트폰 및 웨어러블 디바이스 선도 기업
   - SoftSystems: 운영체제 및 클라우드 서비스 세계 1위
   - SearchTech: 온라인 광고 및 검색 엔진 독점 기업
   - EcomGiant: 글로벌 이커머스 및 클라우드 인프라 기업
   - TechCore: AI 칩 및 반도체 설계 선두주자
   - AutoElectric: 전기차 및 자율주행 기술 혁신 기업
   - SocialNet: 소셜미디어 플랫폼 및 메타버스 선도 기업

2) 동일 가중 방식: 각 종목을 14.3%씩 균등하게 편입하여 특정 종목의 급등락에 따른 포트폴리오 변동성을 완화합니다.

3) 월간 리밸런싱: 매월 마지막 금요일에 각 종목의 비중을 14.3%로 재조정합니다. 이를 통해 상승한 종목은 일부 매도하고, 하락한 종목은 추가 매수하는 역발상 전략이 자동으로 실행됩니다.

4) 환헷지는 실시하지 않으며, 모든 종목이 미국 달러로 표시됩니다.

(2) 집중 투자 전략의 특징
- 기초지수: Magnificent 7 Equal Weight Index
- 구성: 빅테크 7개 기업 고정
- 가중방식: 동일 가중 (각 14.3%)
- 리밸런싱: 월간 (매월 마지막 금요일)
- 변경 주기: 연간 (매년 1월 편입 종목 재검토)
- 기준일: 2018년 1월 1일 (기준지수 1,000pt)

(3) 투자 위험 및 유의사항
본 상품은 7개 종목에만 투자하는 고집중 포트폴리오로, 일반 지수 대비 변동성이 매우 높습니다. 기술주 전반의 침체 시 큰 손실이 발생할 수 있으며, 규제 리스크 및 기업 특유 리스크에 노출됩니다. 고위험-고수익을 감내할 수 있는 투자자에게 적합합니다.`,
      riskLevel: '고위험',
      recommendedPeriod: '3년 이상'
    },
    indexDetails: {
      indexName: 'Magnificent 7 Equal Weight Index',
      indexProvider: 'GlobalIndex Solutions',
      indexDescription: `본 지수는 미국 빅테크 기업 중 시가총액, 혁신성, 시장 영향력이 가장 큰 7개 기업으로 고정 구성됩니다.

구성 종목은 TechCore(클라우드·AI), SoftSystems(OS·오피스), DeviceMax(스마트폰·태블릿), SearchTech(검색·광고), CloudNet(SNS·메타버스), AutoElectric(전기차·에너지), QuantumChip(반도체·GPU)이며, 각 종목이 정확히 14.29%(1/7)의 비중을 가집니다.

동일 가중 방식을 채택하여 시가총액이 작은 종목의 영향력을 높이고, 특정 종목 급등에 따른 집중도 상승을 방지합니다. 월간 리밸런싱을 통해 비중을 14.29%로 재조정하며, 이 과정에서 상승 종목 차익실현과 하락 종목 추가 매수 효과가 발생합니다.

종목 교체는 실시하지 않으며, 합병·상장폐지 등 불가피한 경우에만 대체 종목을 선정합니다. 기준일은 2020년 3월 23일(기준지수 1,000pt)입니다.`,
      rebalancingCycle: '월간',
      calculationMethod: '동일 가중'
    },
    chartData: {
      '1D': generateChartData('1D', 24200),
      '1M': generateChartData('1M', 23500),
      '3M': generateChartData('3M', 22800),
      '6M': generateChartData('6M', 21500),
      '1Y': generateChartData('1Y', 19800),
      '3Y': generateChartData('3Y', 16500),
      '5Y': generateChartData('5Y', 14200),
      'MAX': generateChartData('MAX', 12000)
    },
    holdings: [
      { rank: 1, name: 'DeviceMax Inc', ticker: 'DVMX', weight: 14.3, change: 1.2, changeDirection: 'up', price: '172.43' },
      { rank: 2, name: 'SoftSystems Corp', ticker: 'SFTC', weight: 14.3, change: 0.9, changeDirection: 'up', price: '378.91' },
      { rank: 3, name: 'SearchTech Co', ticker: 'SRCH', weight: 14.3, change: 1.1, changeDirection: 'up', price: '139.67' },
      { rank: 4, name: 'EcomGiant Inc', ticker: 'ECGN', weight: 14.3, change: 0.5, changeDirection: 'up', price: '178.25' },
      { rank: 5, name: 'TechCore Inc', ticker: 'TCHC', weight: 14.3, change: 3.5, changeDirection: 'up', price: '875.28' },
      { rank: 6, name: 'AutoElectric Inc', ticker: 'AELC', weight: 14.3, change: -2.1, changeDirection: 'down', price: '246.39' },
      { rank: 7, name: 'SocialNet Corp', ticker: 'SOCN', weight: 14.2, change: 1.9, changeDirection: 'up', price: '484.03' }
    ],
    dividends: [
      { date: '2024.03.22', amount: 28, yieldRate: 0.12, status: 'paid' },
      { date: '2023.12.20', amount: 25, yieldRate: 0.10, status: 'paid' }
    ]
  },

  // ========== 국내 주식 ETF (5개) ==========

  'etf-6': {
    id: 'etf-6',
    code: '069500',
    name: 'ALPHA 200',
    category: '국내주식',
    themes: ['장기투자', '분산투자'],
    popularity: 97,
    isFavorite: false,
    currentPrice: 39850,
    previousClose: 39520,
    changeAmount: 330,
    changePercent: 0.83,
    changeDirection: 'up',
    nav: 39845.30,
    navChangeAmount: 325,
    navChangePercent: 0.82,
    navChangeDirection: 'up',
    basicInfo: {
      manager: 'Alpha자산운용',
      managementFee: '0.015',
      listingDate: '2002.10.14',
      indexName: 'Korea Stock 200 Index',
      totalAssets: 6789012000000,
      totalAssetsFormatted: '6조 7,890억원',
      volume: 234567,
      volumeFormatted: '234,567',
      dividendYield: '1.87',
      expenseRatio: '0.02',
      trackingError: '0.03',
      underlyingAsset: '국내주식',
      marketCap: '6조 7,520억원',
      netAssets: '6조 7,498억원',
      listedShares: '169,500,000주',
      numberOfHoldings: '200종목',
      leverage: '1배',
      ter: '0.0250%',
      actualExpenseRatio: '0.0312%',
      securitiesTax: '비과세',
      capitalGainsTax: '비과세',
      dividendTax: '배당소득세 15.4%'
    },
    strategy: {
      title: '인덱스 추종 - 운용 전략',
      description: 'Korea Stock 200 지수를 추종하여 국내 대표 200개 기업에 {분산 투자}합니다.'
    },
    strategyDetails: {
      features: [
        '국내 주식시장 대표 200개 기업 투자',
        '국내 최대 규모의 ETF로 높은 유동성',
        '초저비용 구조로 장기 투자에 유리'
      ],
      investmentStrategy: `(1) 운용 전략
1) 국내 거래소(유가증권시장 및 코스닥시장)에 상장된 대형주 200개 종목에 투자하며, Korea Stock 200 Total Return Index를 추종합니다. 본 지수는 한국 주식시장 시가총액의 약 85%를 커버하는 대표 지수입니다.

2) 편입 종목 기준:
   - 시가총액 상위 200개 종목
   - 유동성 요건: 최근 3개월 일평균 거래대금 10억원 이상
   - 상장 기간: 최소 3개월 이상

3) 가중 방식: 유동 시가총액 가중 방식을 적용하며, 개별 종목 상한은 30%입니다. (단, 실제 상위 종목 비중: 삼성전자 약 25%, SK하이닉스 약 8%)

4) 섹터 구성: IT(40%), 자동차(12%), 화학(10%), 금융(9%), 바이오(7%), 2차전지(6%), 기타(16%)

5) 분기별 리밸런싱을 통해 구성 종목 및 비중을 조정하며, 추적오차는 연 0.10% 이하로 관리됩니다.

(2) 기초지수 정보
- 기초지수: Korea Stock 200 Total Return Index
- 산출기관: 국내지수공사
- 구성종목: 200개 대형주
- 시장 커버리지: 전체 시가총액의 85%
- 가중방식: 유동 시가총액 가중
- 리밸런싱: 분기별 (3, 6, 9, 12월 첫째 금요일)
- 배당 처리: 총수익률 방식 (배당금 재투자 가정)
- 기준일: 1990년 1월 3일 (기준지수 100pt)

(3) 비용 및 세제
- 총보수: 연 0.05% (업계 최저 수준)
- 매매 및 기타 비용: 연 0.01%
- 합계: 연 0.06%
- 매매차익: 비과세
- 배당소득: 15.4% 원천징수

국내 주식시장 전반에 분산 투자하여 시장 수익률을 추구하는 투자자에게 적합하며, 국내 경기 및 환율 변동 위험이 있습니다.`,
      riskLevel: '중위험',
      recommendedPeriod: '3년 이상'
    },
    indexDetails: {
      indexName: 'Korea Stock 200 Index',
      indexProvider: '국내지수공사',
      indexDescription: `본 지수는 유가증권시장(KOSPI)과 코스닥시장에 상장된 보통주 중 시가총액 및 유동성이 우수한 200개 종목으로 구성되며, 국내 주식시장 전체 시가총액의 약 85%를 대표합니다.

유가증권시장 150종목, 코스닥시장 50종목의 구성 비율을 원칙으로 하며, 전기전자(25%), 금융(18%), 자동차(12%), 화학(10%), 바이오(8%) 등 전 산업에 걸쳐 분산 투자됩니다.

편입 기준은 시가총액 5,000억원 이상, 유동비율 30% 이상, 3개월 평균 일거래대금 50억원 이상이며, 시가총액 가중 방식으로 지수 내 비중이 결정됩니다. 개별 종목 상한은 30%, 상위 5개 종목 합산 상한은 60%입니다.

정기변경은 연 4회(3, 6, 9, 12월) 실시되며, 기준일은 1990년 1월 3일(기준지수 100pt)입니다.`,
      rebalancingCycle: '분기별',
      calculationMethod: '시가총액 가중'
    },
    chartData: {
      '1D': generateChartData('1D', 39700),
      '1M': generateChartData('1M', 39200),
      '3M': generateChartData('3M', 38500),
      '6M': generateChartData('6M', 37800),
      '1Y': generateChartData('1Y', 36500),
      '3Y': generateChartData('3Y', 34000),
      '5Y': generateChartData('5Y', 32000),
      'MAX': generateChartData('MAX', 28000)
    },
    holdings: [
      { rank: 1, name: '한성전자', ticker: '005930', weight: 28.5, change: 0.9, changeDirection: 'up', price: '71,800' },
      { rank: 2, name: '대한칩스', ticker: '000660', weight: 5.8, change: 2.1, changeDirection: 'up', price: '168,500' },
      { rank: 3, name: '에너지테크', ticker: '373220', weight: 3.2, change: -0.7, changeDirection: 'down', price: '425,000' },
      { rank: 4, name: '바이오코리아', ticker: '207940', weight: 2.9, change: 1.3, changeDirection: 'up', price: '892,000' },
      { rank: 5, name: '모터스코리아', ticker: '005380', weight: 2.4, change: 0.5, changeDirection: 'up', price: '238,500' },
      { rank: 6, name: '드라이브테크', ticker: '000270', weight: 1.9, change: 0.8, changeDirection: 'up', price: '98,700' },
      { rank: 7, name: '포털코리아', ticker: '035420', weight: 1.7, change: 1.5, changeDirection: 'up', price: '234,500' },
      { rank: 8, name: '배터리코리아', ticker: '006400', weight: 1.5, change: -1.2, changeDirection: 'down', price: '385,000' },
      { rank: 9, name: '화학산업', ticker: '051910', weight: 1.4, change: 0.3, changeDirection: 'up', price: '412,500' },
      { rank: 10, name: '바이오메드', ticker: '068270', weight: 1.3, change: 2.3, changeDirection: 'up', price: '187,200' }
    ],
    dividends: [
      { date: '2024.03.28', amount: 198, yieldRate: 0.50, status: 'paid' },
      { date: '2023.12.27', amount: 185, yieldRate: 0.47, status: 'paid' },
      { date: '2023.09.22', amount: 172, yieldRate: 0.45, status: 'paid' },
      { date: '2023.06.23', amount: 168, yieldRate: 0.43, status: 'paid' }
    ]
  },

  'etf-7': {
    id: 'etf-7',
    code: '091180',
    name: 'BETA 코스닥150',
    category: '국내주식',
    themes: ['성장주', 'IT/바이오'],
    popularity: 85,
    isFavorite: false,
    currentPrice: 14720,
    previousClose: 14580,
    changeAmount: 140,
    changePercent: 0.96,
    changeDirection: 'up',
    nav: 14718.40,
    navChangeAmount: 138,
    navChangePercent: 0.95,
    navChangeDirection: 'up',
    basicInfo: {
      manager: 'Beta자산운용',
      managementFee: '0.03',
      listingDate: '2005.12.12',
      indexName: 'Korea Growth 150 Index',
      totalAssets: 1234560000000,
      totalAssetsFormatted: '1조 2,345억원',
      volume: 89456,
      volumeFormatted: '89,456',
      dividendYield: '0.54',
      expenseRatio: '0.045',
      trackingError: '0.07',
      underlyingAsset: '국내주식',
      marketCap: '1조 2,289억원',
      netAssets: '1조 2,267억원',
      listedShares: '83,400,000주',
      numberOfHoldings: '150종목',
      leverage: '1배',
      ter: '0.0480%',
      actualExpenseRatio: '0.0567%',
      securitiesTax: '비과세',
      capitalGainsTax: '비과세',
      dividendTax: '배당소득세 15.4%'
    },
    strategy: {
      title: '인덱스 추종 - 운용 전략',
      description: 'Korea Growth 150 지수를 추종하여 국내 중소형 {성장주}에 투자합니다.'
    },
    strategyDetails: {
      features: [
        '중소형주 시장 대표 150개 기업 투자',
        'IT, 바이오 등 성장주 중심 포트폴리오',
        '중소형주 성장성 추구'
      ],
      investmentStrategy: `(1) 운용 전략
1) 국내 거래소(유가증권 및 코스닥)에 상장된 중소형 성장주 150개 종목에 투자하며, Korea Growth 150 Index를 추종합니다. 대형주(Korea Stock 200 편입 종목)는 제외되며, 시가총액 201위~350위 종목 중 성장성이 우수한 종목을 선정합니다.

2) 편입 기준:
   - 시가총액: 1,000억원 ~ 5조원
   - 매출액 성장률: 최근 3년 연평균 10% 이상
   - 영업이익률: 5% 이상
   - 유동성: 최근 3개월 일평균 거래대금 5억원 이상

3) 섹터 구성: IT/소프트웨어(35%), 바이오/헬스케어(25%), 2차전지/신재생에너지(15%), 반도체/부품(12%), 기타(13%)

4) 가중방식: 수정 시가총액 가중 (개별 종목 상한 5%)

5) 분기별 리밸런싱을 통해 성장성이 둔화된 종목은 제외하고, 신규 성장주를 편입합니다.

(2) 기초지수 특성
- 기초지수: Korea Growth 150 Index
- 산출기관: 국내지수공사
- 구성: 중소형 성장주 150개
- 선정기준: 시가총액, 성장성, 수익성, 유동성
- 가중방식: 수정 시가총액 가중
- 리밸런싱: 분기별
- 기준일: 2010년 1월 4일 (기준지수 1,000pt)

(3) 기대효과 및 위험
중소형 성장주는 대형주 대비 높은 성장 잠재력을 보유하나, 변동성이 크고 유동성이 낮을 수 있습니다. 특히 금리 인상기에는 성장주 전반의 밸류에이션 부담으로 조정을 받을 수 있으며, 개별 기업의 실적 변동성도 큽니다. 중장기 고성장을 기대하는 공격적 투자자에게 적합합니다.`,
      riskLevel: '중고위험',
      recommendedPeriod: '3년 이상'
    },
    indexDetails: {
      indexName: 'Korea Growth 150 Index',
      indexProvider: '국내지수공사',
      indexDescription: `본 지수는 국내 중소형주 중 성장성, 수익성, 주가 모멘텀이 우수한 150개 종목으로 구성되며, 코스닥 100종목, 유가증권 중소형주 50종목의 비율로 편성됩니다.

편입 기준은 시가총액 1,000억~1조원 구간, 최근 3년 매출액 연평균 성장률 10% 이상, 영업이익률 5% 이상, 3개월 수익률 상위 30% 이내 종목으로 제한됩니다. IT(35%), 바이오헬스(25%), 2차전지(15%), 화학소재(10%), 기타(15%)로 성장 산업에 집중됩니다.

시가총액 가중 방식을 채택하되, 개별 종목 상한은 5%, 상위 10개 종목 합산 상한은 35%로 제한하여 중소형주 특성상 높은 변동성을 완화합니다.

분기별 리밸런싱 시 성장성 둔화 또는 이익 적자 전환 종목은 제외되며, 신규 종목은 상위 200위권 내에서 선정됩니다. 기준일은 2010년 1월 4일(기준지수 1,000pt)입니다.`,
      rebalancingCycle: '분기별',
      calculationMethod: '시가총액 가중'
    },
    chartData: {
      '1D': generateChartData('1D', 14650),
      '1M': generateChartData('1M', 14350),
      '3M': generateChartData('3M', 13900),
      '6M': generateChartData('6M', 13400),
      '1Y': generateChartData('1Y', 12800),
      '3Y': generateChartData('3Y', 11500),
      '5Y': generateChartData('5Y', 10500),
      'MAX': generateChartData('MAX', 9200)
    },
    holdings: [
      { rank: 1, name: '그린배터리', ticker: '247540', weight: 4.2, change: 3.5, changeDirection: 'up', price: '285,000' },
      { rank: 2, name: '케미스트리', ticker: '066970', weight: 3.8, change: 2.1, changeDirection: 'up', price: '198,500' },
      { rank: 3, name: '바이오젠', ticker: '196170', weight: 3.1, change: -1.2, changeDirection: 'down', price: '156,700' },
      { rank: 4, name: '반도체공업', ticker: '058470', weight: 2.7, change: 1.8, changeDirection: 'up', price: '189,300' },
      { rank: 5, name: '게임테크', ticker: '293490', weight: 2.4, change: 0.6, changeDirection: 'up', price: '34,250' },
      { rank: 6, name: '헬스케어랩', ticker: '028300', weight: 2.2, change: -0.9, changeDirection: 'down', price: '87,600' },
      { rank: 7, name: '에코에너지', ticker: '086520', weight: 2.1, change: 2.9, changeDirection: 'up', price: '125,400' },
      { rank: 8, name: '메디컬시스템', ticker: '214150', weight: 1.9, change: 1.3, changeDirection: 'up', price: '42,850' },
      { rank: 9, name: '엔터테인먼트', ticker: '263750', weight: 1.8, change: -0.5, changeDirection: 'down', price: '38,950' },
      { rank: 10, name: '신약개발', ticker: '215600', weight: 1.6, change: 4.2, changeDirection: 'up', price: '12,780' }
    ],
    dividends: [
      { date: '2024.03.26', amount: 22, yieldRate: 0.15, status: 'paid' },
      { date: '2023.12.21', amount: 19, yieldRate: 0.13, status: 'paid' }
    ]
  },

  'etf-8': {
    id: 'etf-8',
    code: '161510',
    name: 'DELTA 고배당주',
    category: '국내주식',
    themes: ['배당왕 모음', '가치주'],
    popularity: 82,
    isFavorite: false,
    currentPrice: 9875,
    previousClose: 9810,
    changeAmount: 65,
    changePercent: 0.66,
    changeDirection: 'up',
    nav: 9872.80,
    navChangeAmount: 62,
    navChangePercent: 0.63,
    navChangeDirection: 'up',
    basicInfo: {
      manager: 'Delta자산운용',
      managementFee: '0.25',
      listingDate: '2011.07.27',
      indexName: 'Korea High Dividend 50 Index',
      totalAssets: 345670000000,
      totalAssetsFormatted: '3,456억원',
      volume: 15678,
      volumeFormatted: '15,678',
      dividendYield: '5.23',
      expenseRatio: '0.28',
      trackingError: '0.18',
      underlyingAsset: '국내주식',
      marketCap: '3,423억원',
      netAssets: '3,412억원',
      listedShares: '34,600,000주',
      numberOfHoldings: '50종목',
      leverage: '1배',
      ter: '0.2950%',
      actualExpenseRatio: '0.3124%',
      securitiesTax: '비과세',
      capitalGainsTax: '비과세',
      dividendTax: '배당소득세 15.4%'
    },
    strategy: {
      title: '고배당 - 운용 전략',
      description: '국내 배당 우수 기업 50개에 투자하여 {높은 배당 수익}을 추구합니다.'
    },
    strategyDetails: {
      features: [
        '국내 고배당 우량주 50개 투자',
        '연 5% 이상의 높은 배당수익률',
        '분기별 배당금 지급'
      ],
      investmentStrategy: `(1) 운용 전략
1) 국내 상장 기업 중 배당수익률이 높고 재무 안정성이 우수한 50개 기업에 투자하며, Korea High Dividend 50 Index를 추종합니다.

2) 편입 종목 선정 기준:
   - 배당수익률: 시장 평균의 1.5배 이상 (통상 4~8%)
   - 배당 지속성: 최근 5년간 연속 배당 실시
   - 재무 안정성: 부채비율 150% 이하, ROE 8% 이상
   - 배당성향: 20~70% (지속가능성 확보)
   - 시가총액: 5,000억원 이상

3) 가중 방식: 배당수익률 가중 (배당수익률이 높을수록 높은 비중 부여, 개별 종목 상한 8%)

4) 섹터 구성: 금융(30%), 통신(15%), 유틸리티(12%), 화학(10%), 자동차(8%), 철강(7%), 건설(6%), 기타(12%)

5) 배당금 지급: 편입 종목의 배당금을 수취하여 연 4회(3월, 6월, 9월, 12월) 투자자에게 현금으로 분배합니다.

(2) 기초지수 정보
- 기초지수: Korea High Dividend 50 Index
- 산출기관: IndexData Corporation
- 구성: 고배당 우량주 50개
- 가중방식: 배당수익률 가중
- 리밸런싱: 반기별 (6월, 12월)
- 배당 처리: 분기별 현금 분배
- 기준일: 2008년 1월 2일 (기준지수 1,000pt)

(3) 투자 시 유의사항
고배당주는 안정적인 현금흐름을 제공하나, 주가 상승 여력은 제한적일 수 있습니다. 금리 상승기에는 배당주 메리트가 감소하여 주가가 하락할 수 있으며, 경기 침체 시 배당 감소 또는 중단 위험이 있습니다. 배당소득에는 15.4% 세금이 원천징수됩니다.`,
      riskLevel: '중위험',
      recommendedPeriod: '2년 이상'
    },
    indexDetails: {
      indexName: 'Korea High Dividend 50 Index',
      indexProvider: 'IndexData Corp',
      indexDescription: `본 지수는 국내 유가증권시장 상장 종목 중 배당수익률이 높고 배당 안정성이 우수한 50개 우량주로 구성됩니다.

편입 기준은 시가총액 5,000억원 이상, 최근 5년간 연속 배당 지급, 배당성향 90% 이하, 현재 배당수익률 시장 평균 대비 1.5배 이상입니다. 금융(35%), 유틸리티(20%), 통신(15%), 에너지(10%), 소비재(20%) 등 전통적 배당주 섹터 중심으로 구성됩니다.

지수 내 비중은 배당수익률 가중 방식으로 산출되며, 개별 종목 상한 5%, 동일 업종 상한 40%로 제한됩니다. 배당수익률이 높을수록 높은 비중을 차지하여 배당 투자자의 현금흐름 극대화를 추구합니다.

반기별 리밸런싱(6월, 12월) 시 배당 삭감 종목은 제외되며, 신규 편입 종목은 상위 70위권 내에서 선정됩니다. 배당금은 가격지수에 재투자되지 않습니다. 기준일은 2000년 1월 4일(기준지수 1,000pt)입니다.`,
      rebalancingCycle: '반기별',
      calculationMethod: '배당수익률 가중'
    },
    chartData: {
      '1D': generateChartData('1D', 9850),
      '1M': generateChartData('1M', 9720),
      '3M': generateChartData('3M', 9580),
      '6M': generateChartData('6M', 9420),
      '1Y': generateChartData('1Y', 9150),
      '3Y': generateChartData('3Y', 8700),
      '5Y': generateChartData('5Y', 8300),
      'MAX': generateChartData('MAX', 7800)
    },
    holdings: [
      { rank: 1, name: '국민금융', ticker: '105560', weight: 6.8, change: 0.4, changeDirection: 'up', price: '78,500' },
      { rank: 2, name: '신한지주', ticker: '055550', weight: 6.2, change: 0.3, changeDirection: 'up', price: '52,300' },
      { rank: 3, name: '하나금융지주', ticker: '086790', weight: 5.9, change: 0.6, changeDirection: 'up', price: '68,900' },
      { rank: 4, name: '통신A', ticker: '017670', weight: 5.5, change: -0.2, changeDirection: 'down', price: '58,700' },
      { rank: 5, name: '통신B', ticker: '030200', weight: 5.1, change: 0.1, changeDirection: 'up', price: '42,150' },
      { rank: 6, name: '우리금융지주', ticker: '316140', weight: 4.8, change: 0.5, changeDirection: 'up', price: '19,850' },
      { rank: 7, name: '통신C', ticker: '032640', weight: 4.5, change: -0.1, changeDirection: 'down', price: '12,340' },
      { rank: 8, name: '에너지산업', ticker: '010950', weight: 4.2, change: 0.9, changeDirection: 'up', price: '78,900' },
      { rank: 9, name: '에너지개발', ticker: '096770', weight: 3.9, change: -0.7, changeDirection: 'down', price: '145,500' },
      { rank: 10, name: '산업은행', ticker: '024110', weight: 3.7, change: 0.2, changeDirection: 'up', price: '15,680' }
    ],
    dividends: [
      { date: '2024.03.29', amount: 145, yieldRate: 1.47, status: 'paid' },
      { date: '2023.12.28', amount: 138, yieldRate: 1.41, status: 'paid' },
      { date: '2023.09.27', amount: 132, yieldRate: 1.35, status: 'paid' },
      { date: '2023.06.29', amount: 128, yieldRate: 1.31, status: 'paid' }
    ]
  },

  'etf-9': {
    id: 'etf-9',
    code: '371460',
    name: 'EPSILON 2차전지',
    category: '국내주식',
    themes: ['2차전지', '테마투자'],
    popularity: 90,
    isFavorite: false,
    currentPrice: 8920,
    previousClose: 8750,
    changeAmount: 170,
    changePercent: 1.94,
    changeDirection: 'up',
    nav: 8916.50,
    navChangeAmount: 166,
    navChangePercent: 1.90,
    navChangeDirection: 'up',
    basicInfo: {
      manager: 'Epsilon자산운용',
      managementFee: '0.45',
      listingDate: '2021.04.22',
      indexName: 'Battery Tech Theme Index',
      totalAssets: 567890000000,
      totalAssetsFormatted: '5,678억원',
      volume: 34567,
      volumeFormatted: '34,567',
      dividendYield: '0.28',
      expenseRatio: '0.50',
      trackingError: '0.25',
      underlyingAsset: '국내주식',
      marketCap: '5,612억원',
      netAssets: '5,598억원',
      listedShares: '62,800,000주',
      numberOfHoldings: '30종목',
      leverage: '1배',
      ter: '0.5250%',
      actualExpenseRatio: '0.5478%',
      securitiesTax: '비과세',
      capitalGainsTax: '비과세',
      dividendTax: '배당소득세 15.4%'
    },
    strategy: {
      title: '테마 투자 - 운용 전략',
      description: '2차전지 관련 {국내 대표 기업}에 투자하여 산업 성장의 수혜를 추구합니다.'
    },
    strategyDetails: {
      features: [
        '2차전지 소재, 배터리 셀, 완성차 전 밸류체인 투자',
        '글로벌 전기차 시장 성장 수혜',
        '국내 2차전지 산업 대표주 포함'
      ],
      investmentStrategy: `(1) 운용 전략
1) 국내 상장 2차전지 관련 기업에 투자하며, Korea Battery Value Chain Index를 추종합니다. 본 지수는 2차전지 밸류체인 전반(소재-부품-셀-완성차)을 커버합니다.

2) 밸류체인별 비중:
   - 배터리 소재 (40%): 양극재, 음극재, 전해액, 분리막 제조 기업
   - 배터리 셀 (35%): 배터리 완제품 제조 기업
   - 전기차 완성차 (15%): 전기차 제조 및 판매 기업
   - 장비/부품 (10%): 2차전지 제조 장비, 부품 공급 기업

3) 주요 편입 종목 (예시):
   - L&F, 에코프로, 포스코퓨처엠 (양극재)
   - 천보, 대주전자재료 (음극재)
   - SK이노베이션, LG에너지솔루션 (배터리 셀)
   - 현대차, 기아 (전기차 완성차)

4) 가중방식: 수정 시가총액 가중 (개별 종목 상한 20%)

5) 분기별 리밸런싱을 통해 산업 트렌드 변화를 반영하며, 신규 기업 상장 시 편입을 검토합니다.

(2) 기초지수 정보
- 기초지수: Korea Battery Value Chain Index
- 산출기관: IndexData Corporation
- 구성: 2차전지 밸류체인 관련 기업
- 가중방식: 수정 시가총액 가중
- 리밸런싱: 분기별
- 기준일: 2018년 1월 2일 (기준지수 1,000pt)

(3) 투자 위험 및 기회
2차전지 산업은 글로벌 전기차 시장 성장에 따라 중장기 성장이 기대되나, 원자재 가격 변동, 중국 업체와의 경쟁 심화, 기술 혁신에 따른 기존 업체 경쟁력 약화 등의 리스크가 있습니다. 또한 테마주 특성상 변동성이 매우 크며, 단기 투기 수요에 따른 급등락이 발생할 수 있습니다. 산업에 대한 확신과 변동성 감내 능력이 있는 투자자에게 적합합니다.`,
      riskLevel: '고위험',
      recommendedPeriod: '3년 이상'
    },
    indexDetails: {
      indexName: 'Battery Tech Theme Index',
      indexProvider: 'IndexData Corp',
      indexDescription: `본 지수는 국내 2차전지 밸류체인 전반에 걸친 관련 기업 30개로 구성된 테마 지수입니다.

밸류체인별 구성은 완제품(배터리 제조, 40%), 소재(양극재·음극재·전해액·분리막, 35%), 장비(제조 설비, 15%), 재활용(10%)로 분산되며, 편입 기준은 2차전지 매출 비중 30% 이상 또는 관련 사업부문 영업이익 비중 20% 이상입니다.

시가총액 및 거래량 기준 유동시가총액 가중 방식을 채택하여, 실제 투자 가능한 물량을 반영합니다. 개별 종목 상한은 20%, 동일 밸류체인 상한은 50%로 제한됩니다.

분기별 리밸런싱 시 2차전지 사업 비중 축소 또는 실적 부진 종목은 제외되며, 신규 상장 및 사업 전환 기업은 2분기 경과 후 편입 검토됩니다. 기준일은 2020년 7월 1일(기준지수 1,000pt)입니다.`,
      rebalancingCycle: '분기별',
      calculationMethod: '유동시가총액 가중'
    },
    chartData: {
      '1D': generateChartData('1D', 8850),
      '1M': generateChartData('1M', 8500),
      '3M': generateChartData('3M', 8100),
      '6M': generateChartData('6M', 7650),
      '1Y': generateChartData('1Y', 7200),
      '3Y': generateChartData('3Y', 6500),
      '5Y': generateChartData('5Y', 5800),
      'MAX': generateChartData('MAX', 5200)
    },
    holdings: [
      { rank: 1, name: '에너지테크', ticker: '373220', weight: 15.8, change: 2.3, changeDirection: 'up', price: '425,000' },
      { rank: 2, name: '배터리코리아', ticker: '006400', weight: 14.2, change: 1.8, changeDirection: 'up', price: '385,000' },
      { rank: 3, name: '에너지개발', ticker: '096770', weight: 9.5, change: -0.5, changeDirection: 'down', price: '145,500' },
      { rank: 4, name: '그린배터리', ticker: '247540', weight: 8.7, change: 4.2, changeDirection: 'up', price: '285,000' },
      { rank: 5, name: '케미스트리', ticker: '066970', weight: 7.3, change: 3.5, changeDirection: 'up', price: '198,500' },
      { rank: 6, name: '화학산업', ticker: '051910', weight: 6.8, change: 0.9, changeDirection: 'up', price: '412,500' },
      { rank: 7, name: '에코에너지', ticker: '086520', weight: 5.9, change: 3.8, changeDirection: 'up', price: '125,400' },
      { rank: 8, name: '신소재산업', ticker: '003670', weight: 5.2, change: 1.2, changeDirection: 'up', price: '287,500' },
      { rank: 9, name: '모터스코리아', ticker: '005380', weight: 4.8, change: 0.7, changeDirection: 'up', price: '238,500' },
      { rank: 10, name: '드라이브테크', ticker: '000270', weight: 4.2, change: 0.9, changeDirection: 'up', price: '98,700' }
    ],
    dividends: [
      { date: '2024.03.20', amount: 8, yieldRate: 0.09, status: 'paid' },
      { date: '2023.12.19', amount: 6, yieldRate: 0.07, status: 'paid' }
    ]
  },

  'etf-10': {
    id: 'etf-10',
    code: '456780',
    name: 'ZETA K-뷰티',
    category: '국내주식',
    themes: ['K-뷰티', '테마투자'],
    popularity: 78,
    isFavorite: false,
    currentPrice: 11245,
    previousClose: 11105,
    changeAmount: 140,
    changePercent: 1.26,
    changeDirection: 'up',
    nav: 11242.30,
    navChangeAmount: 137,
    navChangePercent: 1.23,
    navChangeDirection: 'up',
    basicInfo: {
      manager: 'Zeta자산운용',
      managementFee: '0.50',
      listingDate: '2022.05.18',
      indexName: 'K-Beauty Index',
      totalAssets: 234560000000,
      totalAssetsFormatted: '2,345억원',
      volume: 18923,
      volumeFormatted: '18,923',
      dividendYield: '1.12',
      expenseRatio: '0.55',
      trackingError: '0.22',
      underlyingAsset: '국내주식',
      marketCap: '2,312억원',
      netAssets: '2,298억원',
      listedShares: '20,500,000주',
      numberOfHoldings: '25종목',
      leverage: '1배',
      ter: '0.5750%',
      actualExpenseRatio: '0.5987%',
      securitiesTax: '비과세',
      capitalGainsTax: '비과세',
      dividendTax: '배당소득세 15.4%'
    },
    strategy: {
      title: '테마 투자 - 운용 전략',
      description: 'K-뷰티 산업의 {대표 화장품 기업}에 투자하여 한류 및 글로벌 시장 확대의 수혜를 추구합니다.'
    },
    strategyDetails: {
      features: [
        '국내 화장품 대표 기업 25개 투자',
        '글로벌 K-뷰티 트렌드 수혜',
        '중국, 동남아 등 해외 시장 성장성'
      ],
      investmentStrategy: `(1) 운용 전략
1) 국내 화장품 및 뷰티 관련 상장 기업 25개에 투자하며, Korea K-Beauty Index를 추종합니다. 한류 및 K-뷰티 글로벌 확산에 따른 수혜가 기대되는 기업을 선별합니다.

2) 편입 기준:
   - 화장품 제조 및 판매 기업
   - 화장품 ODM/OEM 기업
   - 뷰티 플랫폼 및 유통 기업
   - 화장품 원료 및 용기 제조 기업

3) 비중 구성:
   - 대형 화장품 브랜드 (50%): 아모레퍼시픽, LG생활건강 등
   - 중견 브랜드 (30%): 코스맥스, 한국콜마, 코리아나 등
   - 신흥 브랜드 및 ODM (20%): 에이블씨엔씨, 토니모리, 바이오랜드 등

4) 섹터 다양화: 스킨케어(40%), 메이크업(25%), ODM/OEM(20%), 유통/플랫폼(10%), 원료/용기(5%)

5) 반기별 리밸런싱을 통해 해외 매출 비중, 성장성, 수익성 등을 고려하여 종목을 조정합니다.

(2) 기초지수 정보
- 기초지수: Korea K-Beauty Index
- 산출기관: GlobalIndex Solutions
- 구성: 화장품 및 뷰티 관련 기업 25개
- 가중방식: 수정 시가총액 가중
- 리밸런싱: 반기별
- 기준일: 2015년 1월 2일 (기준지수 1,000pt)

(3) 투자 포인트 및 리스크
K-뷰티는 중국, 동남아, 미국 등 해외 시장에서 높은 인기를 누리고 있으며, 한류 콘텐츠와 결합하여 지속적인 성장이 기대됩니다. 다만 중국 규제 리스크, 현지 브랜드와의 경쟁 심화, 환율 변동 등의 위험이 있으며, 소비 트렌드 변화에 민감합니다. 중장기 K-뷰티 성장을 믿는 투자자에게 적합합니다.`,
      riskLevel: '중고위험',
      recommendedPeriod: '2년 이상'
    },
    indexDetails: {
      indexName: 'K-Beauty Index',
      indexProvider: 'GlobalIndex Solutions',
      indexDescription: `본 지수는 국내 화장품 제조·유통 기업 및 뷰티 플랫폼 기업 중 글로벌 경쟁력을 갖춘 20개 종목으로 구성됩니다.

사업 영역별 구성은 화장품 제조(60%), 뷰티 플랫폼·유통(25%), 원료·소재(15%)이며, 편입 기준은 화장품 매출 비중 50% 이상, 해외 매출 비중 30% 이상, 최근 3년 평균 매출 성장률 15% 이상입니다.

중국·동남아·미국 등 주요 수출 시장 다변화, K-콘텐츠 연계 마케팅 역량, 온라인 채널 확대 등을 평가하여 종목을 선정합니다. 유동시가총액 가중 방식을 채택하며, 개별 종목 상한 15%, 상위 3개 종목 합산 상한 40%입니다.

반기별 리밸런싱(6월, 12월) 시 해외 매출 비중 감소 또는 성장 둔화 종목은 제외되며, 신규 글로벌 진출 기업 및 뷰티 테크 스타트업은 우선 검토됩니다. 기준일은 2015년 1월 2일(기준지수 1,000pt)입니다.`,
      rebalancingCycle: '반기별',
      calculationMethod: '유동시가총액 가중'
    },
    chartData: {
      '1D': generateChartData('1D', 11180),
      '1M': generateChartData('1M', 10950),
      '3M': generateChartData('3M', 10650),
      '6M': generateChartData('6M', 10300),
      '1Y': generateChartData('1Y', 9850),
      '3Y': generateChartData('3Y', 9200),
      '5Y': generateChartData('5Y', 8700),
      'MAX': generateChartData('MAX', 8200)
    },
    holdings: [
      { rank: 1, name: '뷰티코리아A', ticker: '090430', weight: 18.5, change: 1.5, changeDirection: 'up', price: '142,800' },
      { rank: 2, name: '생활건강', ticker: '051900', weight: 16.2, change: 0.8, changeDirection: 'up', price: '312,500' },
      { rank: 3, name: '뷰티그룹', ticker: '002790', weight: 12.3, change: 1.2, changeDirection: 'up', price: '28,450' },
      { rank: 4, name: '코스메틱A', ticker: '192820', weight: 8.7, change: 2.3, changeDirection: 'up', price: '87,900' },
      { rank: 5, name: '화장품OEM', ticker: '161890', weight: 7.9, change: 1.7, changeDirection: 'up', price: '56,700' },
      { rank: 6, name: '코스메틱B', ticker: '027050', weight: 6.5, change: -0.5, changeDirection: 'down', price: '23,150' },
      { rank: 7, name: '뷰티브랜드', ticker: '214420', weight: 5.8, change: 3.2, changeDirection: 'up', price: '12,340' },
      { rank: 8, name: '화장품제조', ticker: '123690', weight: 5.1, change: 0.9, changeDirection: 'up', price: '34,200' },
      { rank: 9, name: '뷰티산업', ticker: '038010', weight: 4.7, change: 1.4, changeDirection: 'up', price: '18,950' },
      { rank: 10, name: '코스메틱C', ticker: '241710', weight: 4.3, change: -1.1, changeDirection: 'down', price: '42,500' }
    ],
    dividends: [
      { date: '2024.03.22', amount: 35, yieldRate: 0.31, status: 'paid' },
      { date: '2023.12.20', amount: 32, yieldRate: 0.29, status: 'paid' },
      { date: '2023.09.21', amount: 28, yieldRate: 0.26, status: 'paid' }
    ]
  },

  // ========== 채권/원자재/테마 ETF (5개) ==========

  'etf-11': {
    id: 'etf-11',
    code: '382480',
    name: 'ALPHA 국고채3년',
    category: '채권',
    themes: ['안전자산', '안정적 이자'],
    popularity: 75,
    isFavorite: false,
    currentPrice: 104250,
    previousClose: 104180,
    changeAmount: 70,
    changePercent: 0.07,
    changeDirection: 'up',
    nav: 104248.20,
    navChangeAmount: 68,
    navChangePercent: 0.07,
    navChangeDirection: 'up',
    basicInfo: {
      manager: 'Alpha자산운용',
      managementFee: '0.02',
      listingDate: '2021.02.15',
      indexName: 'Korea Treasury 3Y Index',
      totalAssets: 1567890000000,
      totalAssetsFormatted: '1조 5,678억원',
      volume: 45678,
      volumeFormatted: '45,678',
      dividendYield: '3.45',
      expenseRatio: '0.025',
      trackingError: '0.02',
      underlyingAsset: '국내채권',
      marketCap: '1조 5,612억원',
      netAssets: '1조 5,598억원',
      listedShares: '15,000,000주',
      numberOfHoldings: '8종목',
      leverage: '1배',
      ter: '0.0280%',
      actualExpenseRatio: '0.0345%',
      securitiesTax: '비과세',
      capitalGainsTax: '비과세',
      dividendTax: '이자소득세 15.4%'
    },
    strategy: {
      title: '채권 투자 - 운용 전략',
      description: '국고채 3년물에 투자하여 {안정적인 이자 수익}을 추구합니다.'
    },
    strategyDetails: {
      features: [
        '국가 신용도 기반의 안전 자산',
        '금리 변동에 따른 자본 이득 기회',
        '월배당으로 안정적 현금흐름'
      ],
      investmentStrategy: `(1) 운용 전략
1) 대한민국 정부가 발행한 국고채 3년물에 투자하여 Korea Treasury 3Y Index를 추종합니다. 국고채는 정부가 원리금 상환을 보증하므로 신용위험이 사실상 없는 안전자산입니다.

2) 투자 대상: 잔존만기 2.5년~3.5년 사이의 국고채를 편입하며, 만기가 도래하면 신규 3년물로 롤오버합니다.

3) 수익 구조:
   - 이자 수익: 국고채 표면금리에 따른 이자 수익 (연 3~4% 수준)
   - 자본 이득/손실: 금리 하락 시 채권 가격 상승으로 자본이득, 금리 상승 시 자본손실 발생

4) 듀레이션 관리: 평균 듀레이션 2.8년 수준 유지. 금리가 1% 변동 시 채권 가격은 약 2.8% 반대 방향으로 변동합니다.

5) 월배당 지급: 국고채 이자 수익을 매월 분배하여 안정적인 현금흐름을 제공합니다.

(2) 기초지수 정보
- 기초지수: Korea Treasury 3Y Total Return Index
- 산출기관: BondIndex Korea
- 구성: 국고채 3년물
- 듀레이션: 약 2.8년
- 신용등급: AAA (국가 신용등급)
- 리밸런싱: 월간 (만기 도래 채권 교체)
- 기준일: 2000년 1월 1일 (기준지수 100,000pt)

(3) 금리 시나리오별 수익률
- 금리 1% 하락 시: 약 +5.6% (이자 3.5% + 자본이득 2.1%)
- 금리 변동 없음: 약 +3.5% (이자 수익만)
- 금리 1% 상승 시: 약 +0.7% (이자 3.5% - 자본손실 2.8%)

본 상품은 안정적인 원금 보전과 이자 수익을 원하는 보수적 투자자에게 적합하나, 금리 상승기에는 원금 손실이 발생할 수 있습니다.`,
      riskLevel: '저위험',
      recommendedPeriod: '1년 이상'
    },
    indexDetails: {
      indexName: 'Korea Treasury 3Y Index',
      indexProvider: 'BondIndex Korea',
      indexDescription: `본 지수는 한국 정부가 발행한 국고채 중 잔존만기 2.5~3.5년 구간의 채권으로 구성되며, 국내 무위험 금리 벤치마크로 활용됩니다.

편입 대상은 기획재정부 발행 국고채(국채)로 한정되며, 특수채·지방채·통안채는 제외됩니다. 잔존만기가 3.5년을 초과하거나 2.5년 미만이 되는 채권은 월간 리밸런싱 시 교체됩니다.

듀레이션 가중 방식을 채택하여, 만기가 긴 채권일수록 높은 비중을 부여합니다. 이를 통해 금리 변동에 대한 민감도를 최적화하며, 평균 듀레이션은 약 2.8~3.0년 수준으로 유지됩니다.

월간 리밸런싱을 통해 잔존만기 기준을 충족하는 채권으로 재구성하며, 이표(쿠폰) 이자는 재투자되지 않고 현금으로 지급됩니다. 기준일은 2010년 1월 4일(기준지수 100pt)입니다.`,
      rebalancingCycle: '월간',
      calculationMethod: '듀레이션 가중'
    },
    chartData: {
      '1D': generateChartData('1D', 104200),
      '1M': generateChartData('1M', 104100),
      '3M': generateChartData('3M', 103800),
      '6M': generateChartData('6M', 103400),
      '1Y': generateChartData('1Y', 102500),
      '3Y': generateChartData('3Y', 100000),
      '5Y': generateChartData('5Y', 98000),
      'MAX': generateChartData('MAX', 96000)
    },
    holdings: [
      { rank: 1, name: '국고03250-2803(23-1)', ticker: 'KTB2803A', weight: 15.2, change: 0.0, changeDirection: 'up', price: '101,234' },
      { rank: 2, name: '국고03000-2706(22-4)', ticker: 'KTB2706B', weight: 14.8, change: 0.0, changeDirection: 'up', price: '100,987' },
      { rank: 3, name: '국고03375-2809(23-2)', ticker: 'KTB2809C', weight: 14.3, change: 0.0, changeDirection: 'up', price: '101,456' },
      { rank: 4, name: '국고03125-2712(22-5)', ticker: 'KTB2712D', weight: 13.9, change: 0.0, changeDirection: 'up', price: '100,765' },
      { rank: 5, name: '국고03500-2903(23-3)', ticker: 'KTB2903E', weight: 13.5, change: 0.0, changeDirection: 'up', price: '101,678' },
      { rank: 6, name: '국고03250-2806(23-4)', ticker: 'KTB2806F', weight: 12.8, change: 0.0, changeDirection: 'up', price: '101,234' },
      { rank: 7, name: '국고03375-2909(23-5)', ticker: 'KTB2909G', weight: 12.1, change: 0.0, changeDirection: 'up', price: '101,456' },
      { rank: 8, name: '국고03125-2712(22-6)', ticker: 'KTB2712H', weight: 3.4, change: 0.0, changeDirection: 'up', price: '100,890' }
    ],
    dividends: [
      { date: '2024.03.20', amount: 295, yieldRate: 0.28, status: 'paid' },
      { date: '2024.02.20', amount: 292, yieldRate: 0.28, status: 'paid' },
      { date: '2024.01.22', amount: 288, yieldRate: 0.28, status: 'paid' },
      { date: '2023.12.20', amount: 285, yieldRate: 0.27, status: 'paid' },
      { date: '2023.11.20', amount: 282, yieldRate: 0.27, status: 'paid' }
    ]
  },

  'etf-12': {
    id: 'etf-12',
    code: '284980',
    name: 'BETA 회사채',
    category: '채권',
    themes: ['안전자산', '안정적 이자'],
    popularity: 72,
    isFavorite: false,
    currentPrice: 52340,
    previousClose: 52280,
    changeAmount: 60,
    changePercent: 0.11,
    changeDirection: 'up',
    nav: 52337.80,
    navChangeAmount: 57,
    navChangePercent: 0.11,
    navChangeDirection: 'up',
    basicInfo: {
      manager: 'Beta자산운용',
      managementFee: '0.03',
      listingDate: '2018.08.23',
      indexName: 'Korea Corporate Bond AA- Index',
      totalAssets: 876540000000,
      totalAssetsFormatted: '8,765억원',
      volume: 23456,
      volumeFormatted: '23,456',
      dividendYield: '4.12',
      expenseRatio: '0.04',
      trackingError: '0.05',
      underlyingAsset: '국내채권',
      marketCap: '8,712억원',
      netAssets: '8,698억원',
      listedShares: '16,700,000주',
      numberOfHoldings: '42종목',
      leverage: '1배',
      ter: '0.0420%',
      actualExpenseRatio: '0.0512%',
      securitiesTax: '비과세',
      capitalGainsTax: '비과세',
      dividendTax: '이자소득세 15.4%'
    },
    strategy: {
      title: '채권 투자 - 운용 전략',
      description: 'AA- 이상 우량 회사채에 투자하여 국고채보다 {높은 이자 수익}을 추구합니다.'
    },
    strategyDetails: {
      features: [
        'AA- 이상 우량 회사채 투자로 신용위험 최소화',
        '국고채 대비 높은 금리 수익',
        '월배당으로 안정적 현금흐름 제공'
      ],
      investmentStrategy: `(1) 운용 전략
1) 국내 신용등급 AA- 이상의 우량 회사채에 분산 투자하며, Korea Corporate Bond AA Index를 추종합니다. 국고채 대비 0.5~1.5% 높은 금리를 제공하면서도 신용위험은 낮은 수준입니다.

2) 편입 기준:
   - 신용등급: AA- 이상 (한국신용평가, NICE신용평가, 한국기업평가 기준)
   - 잔존만기: 1년 이상 5년 이하
   - 발행 규모: 500억원 이상 (유동성 확보)
   - 발행 기업: 대기업 및 우량 중견기업

3) 섹터 분산:
   - 금융(30%): 은행, 증권, 보험
   - 제조(25%): 자동차, 전자, 화학
   - 인프라(20%): 통신, 전력, 가스
   - 유통/서비스(15%): 유통, 건설
   - 기타(10%)

4) 듀레이션 관리: 평균 듀레이션 3.2년 수준으로 관리하며, 금리 변동에 따른 가격 변동성을 적정 수준으로 유지합니다.

5) 월배당: 회사채 이자 수익을 매월 분배하여 안정적인 현금흐름을 제공합니다.

(2) 기초지수 정보
- 기초지수: Korea Corporate Bond AA Total Return Index
- 산출기관: BondIndex Korea
- 구성: 신용등급 AA- 이상 회사채
- 평균 듀레이션: 약 3.2년
- 평균 신용등급: AA
- 리밸런싱: 월간
- 기준일: 2005년 1월 1일 (기준지수 100,000pt)

(3) 수익 및 위험
- 예상 수익률: 국고채 금리 + 0.5~1.5% (신용 스프레드)
- 신용위험: 낮음 (AA 이상 등급은 부도율 0.1% 이하)
- 금리 위험: 금리 상승 시 채권 가격 하락
- 유동성 위험: 일부 종목은 유동성이 낮을 수 있음

본 상품은 국고채보다 높은 수익을 원하면서도 안정성을 중시하는 보수적 투자자에게 적합합니다.`,
      riskLevel: '저위험',
      recommendedPeriod: '1년 이상'
    },
    indexDetails: {
      indexName: 'Korea Corporate Bond AA- Index',
      indexProvider: 'BondIndex Korea',
      indexDescription: `본 지수는 국내 상장법인이 발행한 무보증 회사채 중 신용등급 AA- 이상, 잔존만기 1~5년 구간의 채권으로 구성됩니다.

편입 기준은 한국신용평가·한국기업평가·나이스신용평가 3사 중 2개 이상 AA- 등급 이상, 발행잔액 500억원 이상, 월평균 거래대금 10억원 이상입니다. 금융채·은행채는 제외되며 일반 기업 회사채만 편입됩니다.

업종별 분산은 제조업(40%), 건설·부동산(20%), 유통·서비스(15%), 에너지·공익(15%), 기타(10%)로 구성되며, 동일 발행자 상한 5%, 동일 업종 상한 30%로 제한됩니다.

듀레이션 가중 방식을 채택하며, 평균 듀레이션은 2.5~3.5년으로 유지됩니다. 월간 리밸런싱 시 신용등급 하향(BBB+ 이하) 또는 부도 발생 시 즉시 제외됩니다. 기준일은 2012년 1월 2일(기준지수 100pt)입니다.`,
      rebalancingCycle: '월간',
      calculationMethod: '듀레이션 가중'
    },
    chartData: {
      '1D': generateChartData('1D', 52310),
      '1M': generateChartData('1M', 52150),
      '3M': generateChartData('3M', 51800),
      '6M': generateChartData('6M', 51300),
      '1Y': generateChartData('1Y', 50500),
      '3Y': generateChartData('3Y', 49000),
      '5Y': generateChartData('5Y', 47500),
      'MAX': generateChartData('MAX', 46000)
    },
    holdings: [
      { rank: 1, name: '한성전자 회사채', ticker: 'HSE2024A', weight: 5.8, change: 0.0, changeDirection: 'up', price: '102,345' },
      { rank: 2, name: '대한칩스 회사채', ticker: 'DKC2024B', weight: 4.9, change: 0.0, changeDirection: 'up', price: '101,876' },
      { rank: 3, name: '에너지테크 회사채', ticker: 'ENT2024C', weight: 4.5, change: 0.0, changeDirection: 'up', price: '102,156' },
      { rank: 4, name: '모터스코리아 회사채', ticker: 'MTK2024D', weight: 4.2, change: 0.0, changeDirection: 'up', price: '101,654' },
      { rank: 5, name: '철강산업 회사채', ticker: 'STL2024E', weight: 3.9, change: 0.0, changeDirection: 'up', price: '101,432' },
      { rank: 6, name: '국민금융 회사채', ticker: 'KBF2024F', weight: 3.7, change: 0.0, changeDirection: 'up', price: '101,789' },
      { rank: 7, name: '신한지주 회사채', ticker: 'SHF2024G', weight: 3.5, change: 0.0, changeDirection: 'up', price: '101,567' },
      { rank: 8, name: '에너지개발 회사채', ticker: 'END2024H', weight: 3.3, change: 0.0, changeDirection: 'up', price: '101,234' },
      { rank: 9, name: '화학산업 회사채', ticker: 'CHM2024I', weight: 3.1, change: 0.0, changeDirection: 'up', price: '101,456' },
      { rank: 10, name: '하나금융 회사채', ticker: 'HNF2024J', weight: 2.9, change: 0.0, changeDirection: 'up', price: '101,678' }
    ],
    dividends: [
      { date: '2024.03.20', amount: 178, yieldRate: 0.34, status: 'paid' },
      { date: '2024.02.20', amount: 175, yieldRate: 0.34, status: 'paid' },
      { date: '2024.01.22', amount: 172, yieldRate: 0.33, status: 'paid' },
      { date: '2023.12.20', amount: 170, yieldRate: 0.33, status: 'paid' }
    ]
  },

  'etf-13': {
    id: 'etf-13',
    code: '411060',
    name: 'ALPHA 골드선물',
    category: '원자재',
    themes: ['안전자산', '인플레이션 헷지'],
    popularity: 68,
    isFavorite: false,
    currentPrice: 13680,
    previousClose: 13540,
    changeAmount: 140,
    changePercent: 1.03,
    changeDirection: 'up',
    nav: 13676.40,
    navChangeAmount: 136,
    navChangePercent: 1.00,
    navChangeDirection: 'up',
    basicInfo: {
      manager: 'Alpha자산운용',
      managementFee: '0.35',
      listingDate: '2020.03.11',
      indexName: 'Gold Futures Index',
      totalAssets: 456780000000,
      totalAssetsFormatted: '4,567억원',
      volume: 67890,
      volumeFormatted: '67,890',
      dividendYield: '0.00',
      expenseRatio: '0.40',
      trackingError: '0.18',
      underlyingAsset: '원자재',
      marketCap: '4,523억원',
      netAssets: '4,509억원',
      listedShares: '33,000,000주',
      numberOfHoldings: '1종목',
      leverage: '1배',
      ter: '0.4250%',
      actualExpenseRatio: '0.4567%',
      securitiesTax: '비과세',
      capitalGainsTax: '배당소득세 15.4%',
      dividendTax: '해당없음'
    },
    strategy: {
      title: '원자재 투자 - 운용 전략',
      description: '금 선물에 투자하여 {인플레이션 헷지} 및 안전자산 수요를 추구합니다.'
    },
    strategyDetails: {
      features: [
        '금 현물 가격 추종으로 인플레이션 헷지',
        '경제 불확실성 시기의 안전자산 역할',
        '달러 약세 시 가격 상승 기대'
      ],
      investmentStrategy: `(1) 운용 전략
1) 국제 금 선물 시장에 상장된 금 선물 계약에 투자하여 금 현물 가격을 추종합니다. 실물 금을 보유하지 않고 선물 계약을 통해 금 가격 변동을 추적하는 합성 ETF입니다.

2) 투자 대상: 뉴욕상품거래소(COMEX) 금 선물 계약을 주로 활용하며, 근월물에서 차근월물로 롤오버하여 연속성을 유지합니다.

3) 롤오버 전략: 매월 만기가 도래하는 선물 계약을 차월물로 교체하며, 이 과정에서 콘탱고(Contango) 또는 백워데이션(Backwardation)에 따른 롤 수익/비용이 발생합니다.
   - 콘탱고 시장(차월물이 비쌈): 롤오버 비용 발생 (-0.2~0.5% 월간)
   - 백워데이션 시장(차월물이 저렴): 롤오버 수익 발생 (+0.2~0.5% 월간)

4) 금 가격 상승 요인:
   - 인플레이션 상승
   - 지정학적 리스크 증가
   - 미국 달러 약세
   - 실질금리 하락

5) 환헷지: 실시하지 않으므로 달러/원 환율 변동이 수익률에 영향을 미칩니다.

(2) 기초지수 정보
- 기초지수: COMEX Gold Futures Continuous Index
- 기초 자산: 금 선물 (1계약 = 100트로이온스)
- 거래소: 뉴욕상품거래소 (COMEX)
- 롤오버: 월간 (만기 10일 전)
- 기준일: 2010년 1월 1일 (기준지수 1,000pt)

(3) 금 투자의 특성
- 인플레이션 헷지: 물가 상승 시 금 가격도 함께 상승하는 경향
- 안전자산: 경제 위기 시 안전자산 수요 증가
- 무이자 자산: 배당이나 이자가 없으며, 가격 상승만으로 수익 창출
- 변동성: 연간 15~25% 수준의 변동성

본 상품은 포트폴리오 분산 및 인플레이션 헷지 목적으로 적합하나, 단기 투자보다는 중장기 관점에서 접근하시기 바랍니다.`,
      riskLevel: '중위험',
      recommendedPeriod: '2년 이상'
    },
    indexDetails: {
      indexName: 'Gold Futures Index',
      indexProvider: 'FuturesIndex Global',
      indexDescription: `본 지수는 뉴욕상품거래소(COMEX)에 상장된 금 선물(Gold Futures) 가격을 추종하며, 실물 금 현물 가격 대비 선물 프리미엄·디스카운트를 반영합니다.

추종 대상은 COMEX Gold Futures 최근월물 계약으로, 만기 1개월 전 차근월물로 롤오버됩니다. 롤오버 시 콘탱고(근월물 가격 > 원월물 가격) 구간에서는 손실, 백워데이션(근월물 가격 < 원월물 가격) 구간에서는 이익이 발생할 수 있습니다.

지수 수익률은 선물 가격 변동 + 롤오버 손익 + 담보 현금 이자 수익(미국 단기 국채 금리)의 합으로 결정됩니다. 레버리지 및 인버스 전략은 적용되지 않으며, 1배 추종을 원칙으로 합니다.

월간 롤오버 일정은 만기월 前 마지막 거래일 5영업일 전부터 3일간 분할 실시되며, 기준일은 2005년 1월 3일(기준지수 1,000pt)입니다.`,
      rebalancingCycle: '월간 롤오버',
      calculationMethod: '선물 가격 추종'
    },
    chartData: {
      '1D': generateChartData('1D', 13600),
      '1M': generateChartData('1M', 13300),
      '3M': generateChartData('3M', 12900),
      '6M': generateChartData('6M', 12500),
      '1Y': generateChartData('1Y', 11800),
      '3Y': generateChartData('3Y', 10500),
      '5Y': generateChartData('5Y', 9500),
      'MAX': generateChartData('MAX', 8500)
    },
    holdings: [
      { rank: 1, name: 'Gold Futures Contract', ticker: 'GOLD', weight: 100.0, change: 1.2, changeDirection: 'up', price: '2,042.50' }
    ],
    dividends: []
  },

  'etf-14': {
    id: 'etf-14',
    code: '467940',
    name: 'GAMMA 탄소배출권인버스',
    category: '원자재',
    themes: ['인버스', '단기투자'],
    popularity: 55,
    isFavorite: false,
    currentPrice: 8650,
    previousClose: 8720,
    changeAmount: -70,
    changePercent: -0.80,
    changeDirection: 'down',
    nav: 8647.30,
    navChangeAmount: -72,
    navChangePercent: -0.83,
    navChangeDirection: 'down',
    basicInfo: {
      manager: 'Gamma자산운용',
      managementFee: '0.55',
      listingDate: '2021.03.04',
      indexName: 'Carbon Credit Futures Inverse Index',
      totalAssets: 87430000000,
      totalAssetsFormatted: '874억원',
      volume: 12345,
      volumeFormatted: '12,345',
      dividendYield: '0.00',
      expenseRatio: '0.60',
      trackingError: '0.28',
      underlyingAsset: '원자재',
      marketCap: '867억원',
      netAssets: '859억원',
      listedShares: '10,000,000주',
      numberOfHoldings: '1종목',
      leverage: '-1배',
      ter: '0.6350%',
      actualExpenseRatio: '0.6789%',
      securitiesTax: '비과세',
      capitalGainsTax: '배당소득세 15.4%',
      dividendTax: '해당없음'
    },
    strategy: {
      title: '인버스 - 운용 전략',
      description: '탄소배출권 선물 가격의 {-1배 수익}을 추구하는 인버스 상품입니다.'
    },
    strategyDetails: {
      features: [
        '탄소배출권 가격 하락 시 수익',
        '탄소 중립 정책 변화에 따른 트레이딩 기회',
        '단기 헷지 및 차익거래 목적'
      ],
      investmentStrategy: `(1) 운용 전략 - 인버스 상품 특성
1) 본 ETF는 EU 탄소배출권(EUA) 선물의 일간 수익률 -1배를 추종하는 인버스(Inverse) 상품입니다. 탄소배출권 가격이 하락할 때 수익을 얻으며, 상승할 때는 손실이 발생합니다.

2) 투자 구조:
   - 기초자산: EU ETS 탄소배출권 선물 (ICE Futures Europe 상장)
   - 레버리지: -1배 (인버스, 레버리지 없음)
   - 리밸런싱: 일간 (매일 종가 기준 -1배 비율 재조정)

3) 일간 수익률 예시:
   - 탄소배출권 -2% 하락 → ETF +2% 상승
   - 탄소배출권 +3% 상승 → ETF -3% 하락

4) 복리 효과 주의: 일간 리밸런싱으로 인해 2일 이상 보유 시 복리 효과가 발생하여 기초자산 수익률 -1배와 정확히 일치하지 않습니다. 따라서 단기 트레이딩 목적으로만 활용하시기 바랍니다.

5) 투자 시나리오:
   - 탄소중립 정책 완화 예상 시
   - 경기 침체로 인한 배출권 수요 감소 예상 시
   - 단기 기술적 조정 예상 시

(2) 탄소배출권 시장 개요
- 기초자산: EU ETS (European Union Emissions Trading System) 탄소배출권
- 거래소: ICE Futures Europe
- 가격 단위: 유로/톤
- 시장 특성: 정책 변화, 경기 동향, 에너지 가격에 민감

(3) 인버스 ETF 투자 시 주의사항
- 일간 수익률 -1배 추종으로 장기 보유 시 복리 효과로 기대 수익률 괴리 발생
- 권장 투자 기간: 1일~1주일 이내 (단기 트레이딩 목적)
- 장기 보유 시 손실 확대 가능성
- 변동성이 클수록 복리 손실 확대

예시) 탄소배출권이 +10%, -9% 반복 시:
- 기초자산: 100 → 110 → 100.1 (거의 제자리)
- 인버스 ETF: 100 → 90 → 98.1 (약 2% 손실)

본 상품은 고위험 상품으로 단기 헷지 또는 트레이딩 목적으로만 활용하시기 바랍니다.`,
      riskLevel: '고위험',
      recommendedPeriod: '단기 (1개월 이내)'
    },
    indexDetails: {
      indexName: 'Carbon Credit Futures Inverse Index',
      indexProvider: 'CommodityIndex Inc',
      indexDescription: `본 지수는 유럽 탄소배출권 선물(EUA Futures) 가격의 일간 수익률 -1배를 추종하는 인버스(Inverse) 지수입니다.

추종 대상은 ICE(인터컨티넨탈거래소) 상장 EU ETS(유럽 배출권 거래제) 선물 최근월물이며, 매일 종가 기준으로 기초자산 수익률의 -1배가 되도록 포지션을 재조정합니다. 예를 들어 탄소배출권이 +5% 상승하면 본 지수는 -5% 하락합니다.

일간 리밸런싱으로 인해 2일 이상 보유 시 복리 효과가 발생하며, 변동성이 클수록 기대수익률과 실제수익률의 괴리가 커집니다. 따라서 중장기 보유가 아닌 단기 헷지 또는 일간 트레이딩 목적으로만 사용해야 합니다.

월간 선물 롤오버 시 콘탱고·백워데이션에 따른 롤오버 손익이 추가 발생하며, 일간 리밸런싱 비용(거래 비용 및 슬리피지)이 지수 성과에 반영됩니다. 기준일은 2021년 1월 4일(기준지수 1,000pt)입니다.`,
      rebalancingCycle: '일간 리밸런싱',
      calculationMethod: '일간 수익률 -1배'
    },
    chartData: {
      '1D': generateChartData('1D', 8700),
      '1M': generateChartData('1M', 8900),
      '3M': generateChartData('3M', 9200),
      '6M': generateChartData('6M', 9600),
      '1Y': generateChartData('1Y', 10200),
      '3Y': generateChartData('3Y', 11500),
      '5Y': generateChartData('5Y', 12800),
      'MAX': generateChartData('MAX', 14000)
    },
    holdings: [
      { rank: 1, name: 'Carbon Credit Futures (Inverse)', ticker: 'CRBINV', weight: 100.0, change: -0.9, changeDirection: 'down', price: '€78.45' }
    ],
    dividends: []
  },

  'etf-15': {
    id: 'etf-15',
    code: '448630',
    name: 'EPSILON 리츠',
    category: '부동산',
    themes: ['배당왕 모음', '안정적 이자'],
    popularity: 65,
    isFavorite: false,
    currentPrice: 4890,
    previousClose: 4870,
    changeAmount: 20,
    changePercent: 0.41,
    changeDirection: 'up',
    nav: 4888.60,
    navChangeAmount: 18,
    navChangePercent: 0.37,
    navChangeDirection: 'up',
    basicInfo: {
      manager: 'Epsilon자산운용',
      managementFee: '0.30',
      listingDate: '2022.07.14',
      indexName: 'Korea REIT Index',
      totalAssets: 198760000000,
      totalAssetsFormatted: '1,987억원',
      volume: 34567,
      volumeFormatted: '34,567',
      dividendYield: '6.45',
      expenseRatio: '0.35',
      trackingError: '0.16',
      underlyingAsset: '부동산',
      marketCap: '1,956억원',
      netAssets: '1,943억원',
      listedShares: '40,000,000주',
      numberOfHoldings: '18종목',
      leverage: '1배',
      ter: '0.3650%',
      actualExpenseRatio: '0.3912%',
      securitiesTax: '비과세',
      capitalGainsTax: '비과세',
      dividendTax: '배당소득세 15.4%'
    },
    strategy: {
      title: '부동산 투자 - 운용 전략',
      description: '국내 상장 리츠에 투자하여 {부동산 임대 수익}과 고배당을 추구합니다.'
    },
    strategyDetails: {
      features: [
        '국내 상장 리츠 18개 투자로 부동산 간접 투자',
        '오피스, 물류, 상업시설 등 다양한 섹터 분산',
        '높은 배당수익률 (연 6% 이상)'
      ],
      investmentStrategy: `(1) 운용 전략
1) 국내 거래소에 상장된 리츠(REITs, 부동산투자신탁) 18개에 투자하며, Korea REITs Index를 추종합니다. 리츠는 다수의 투자자로부터 자금을 모아 부동산에 투자하고, 임대 수익의 90% 이상을 배당으로 지급하는 구조입니다.

2) 편입 리츠 유형:
   - 오피스 리츠 (40%): 프라임 오피스 빌딩 소유 및 임대
   - 물류센터 리츠 (25%): 물류창고 및 배송센터 운영
   - 상업시설 리츠 (20%): 쇼핑몰, 아울렛 등 상업용 부동산
   - 데이터센터 리츠 (10%): 데이터센터 및 통신 인프라
   - 기타 (5%): 호텔, 주거용 등

3) 가중 방식: 시가총액 가중 (개별 리츠 상한 15%)

4) 배당 수익: 리츠의 임대 수익 및 자산 매각 차익을 분기별로 수취하여 투자자에게 분배합니다. 평균 배당수익률은 연 6~8% 수준입니다.

5) 분기별 리밸런싱을 통해 신규 상장 리츠를 편입하고, 자산 가치 및 배당 성향을 고려하여 비중을 조정합니다.

(2) 기초지수 정보
- 기초지수: Korea REITs Total Return Index
- 산출기관: IndexData Corporation
- 구성: 국내 상장 리츠 18개
- 가중방식: 시가총액 가중
- 리밸런싱: 분기별
- 배당 처리: 분기별 현금 분배
- 기준일: 2012년 1월 2일 (기준지수 1,000pt)

(3) 리츠 투자의 장단점
장점:
- 높은 배당수익률 (연 6% 이상)
- 소액으로 프라임 부동산 간접 투자 가능
- 인플레이션 헷지 효과 (임대료 상승)
- 유동성 확보 (상장 리츠는 주식처럼 거래 가능)

단점:
- 금리 상승 시 리츠 가격 하락 (채권과 유사한 금리 민감도)
- 부동산 경기 침체 시 공실률 증가 및 임대료 하락
- 세금: 배당소득 15.4% 원천징수

본 상품은 부동산 간접 투자 및 안정적인 배당 수익을 원하는 투자자에게 적합합니다.`,
      riskLevel: '중위험',
      recommendedPeriod: '2년 이상'
    },
    indexDetails: {
      indexName: 'Korea REIT Index',
      indexProvider: 'IndexData Corp',
      indexDescription: `본 지수는 국내 유가증권시장에 상장된 부동산투자회사(리츠, REITs) 중 유동성과 배당 안정성이 우수한 15개 종목으로 구성됩니다.

유형별 구성은 오피스 리츠(40%), 물류센터 리츠(25%), 상업시설 리츠(20%), 주거·호텔·헬스케어 리츠(15%)이며, 편입 기준은 시가총액 1,000억원 이상, 배당수익률 4% 이상, FFO(운영현금흐름) 배당성향 80% 이하입니다.

시가총액 가중 방식을 채택하되, 개별 종목 상한 20%, 동일 유형 상한 50%로 제한하여 부동산 유형별 분산을 유지합니다. 리츠는 임대수익 기반 배당을 지급하므로, 일반 주식 대비 안정적인 현금흐름을 제공합니다.

분기별 리밸런싱 시 배당 중단 또는 자산매각으로 인한 FFO 감소 종목은 제외되며, 신규 상장 리츠는 1년 경과 후 편입 검토됩니다. 기준일은 2018년 1월 2일(기준지수 1,000pt)입니다.`,
      rebalancingCycle: '분기별',
      calculationMethod: '시가총액 가중'
    },
    chartData: {
      '1D': generateChartData('1D', 4880),
      '1M': generateChartData('1M', 4820),
      '3M': generateChartData('3M', 4750),
      '6M': generateChartData('6M', 4680),
      '1Y': generateChartData('1Y', 4500),
      '3Y': generateChartData('3Y', 4200),
      '5Y': generateChartData('5Y', 4000),
      'MAX': generateChartData('MAX', 3800)
    },
    holdings: [
      { rank: 1, name: '알파리츠', ticker: '293940', weight: 12.8, change: 0.3, changeDirection: 'up', price: '4,525' },
      { rank: 2, name: '프라임리츠', ticker: '290100', weight: 11.5, change: 0.5, changeDirection: 'up', price: '3,890' },
      { rank: 3, name: '시티리츠', ticker: '330590', weight: 10.2, change: -0.2, changeDirection: 'down', price: '3,215' },
      { rank: 4, name: '빌딩리츠', ticker: '377190', weight: 9.8, change: 0.7, changeDirection: 'up', price: '2,845' },
      { rank: 5, name: '로지스틱리츠', ticker: '381180', weight: 8.9, change: 0.4, changeDirection: 'up', price: '4,130' },
      { rank: 6, name: '오피스리츠', ticker: '377340', weight: 8.3, change: 0.1, changeDirection: 'up', price: '3,675' },
      { rank: 7, name: '복합리츠', ticker: '357120', weight: 7.6, change: 0.6, changeDirection: 'up', price: '3,420' },
      { rank: 8, name: '에너지리츠', ticker: '417310', weight: 7.1, change: -0.3, changeDirection: 'down', price: '2,980' },
      { rank: 9, name: '글로벌리츠', ticker: '417310', weight: 6.5, change: 0.2, changeDirection: 'up', price: '3,110' },
      { rank: 10, name: '산업리츠', ticker: '388790', weight: 6.2, change: 0.8, changeDirection: 'up', price: '2,735' }
    ],
    dividends: [
      { date: '2024.03.25', amount: 82, yieldRate: 1.68, status: 'paid' },
      { date: '2023.12.22', amount: 78, yieldRate: 1.61, status: 'paid' },
      { date: '2023.09.25', amount: 75, yieldRate: 1.54, status: 'paid' },
      { date: '2023.06.23', amount: 72, yieldRate: 1.48, status: 'paid' }
    ]
  }
};

/**
 * ETF ID로 데이터 가져오기
 * @param {string} etfId - ETF ID
 * @returns {Object|null} ETF 데이터
 */
export const getETFData = (etfId) => {
  return ETF_MOCK_DATA[etfId] || null;
};

/**
 * 모든 ETF 목록 가져오기
 * @returns {Array<Object>} ETF 목록
 */
export const getAllETFs = () => {
  return Object.values(ETF_MOCK_DATA);
};

// ========== 시장 지수 데이터 ==========
export const INDEX_DATA = [
  { id: 'idx-1', name: 'World 500 선물', value: '6,410.75', changePercent: '2.59', changeDirection: 'up' },
  { id: 'idx-2', name: 'Global Tech 100 선물', value: '16,245.32', changePercent: '3.12', changeDirection: 'up' },
  { id: 'idx-3', name: 'Korea Stock 200', value: '348.92', changePercent: '0.83', changeDirection: 'up' },
  { id: 'idx-4', name: 'Korea Growth 150', value: '1,247.56', changePercent: '0.96', changeDirection: 'up' },
  { id: 'idx-5', name: 'Global Bond Index', value: '2,108.43', changePercent: '0.05', changeDirection: 'up' },
  { id: 'idx-6', name: 'Gold Spot', value: '2,042.50', changePercent: '1.03', changeDirection: 'up' },
  { id: 'idx-7', name: 'Oil WTI', value: '78.45', changePercent: '1.58', changeDirection: 'up' },
  { id: 'idx-8', name: 'Asia Pacific Index', value: '1,856.23', changePercent: '1.24', changeDirection: 'up' },
  { id: 'idx-9', name: 'Europe 50', value: '4,512.87', changePercent: '0.67', changeDirection: 'up' },
  { id: 'idx-10', name: 'Emerging Markets', value: '987.34', changePercent: '-0.45', changeDirection: 'down' },
  { id: 'idx-11', name: 'Korea REIT Index', value: '1,345.67', changePercent: '0.41', changeDirection: 'up' },
  { id: 'idx-12', name: 'Global Dividend', value: '2,234.12', changePercent: '0.32', changeDirection: 'up' },
  { id: 'idx-13', name: 'Battery Tech Index', value: '456.78', changePercent: '1.94', changeDirection: 'up' },
  { id: 'idx-14', name: 'Beauty Sector Index', value: '789.45', changePercent: '1.26', changeDirection: 'up' },
  { id: 'idx-15', name: 'Carbon Credit', value: '78.45', changePercent: '-0.80', changeDirection: 'down' }
];

// ========== 테마 데이터 ==========
export const THEME_DATA = [
  {
    id: 'theme-1',
    name: 'AI 투자',
    description: '인공지능 기술을 선도하는 글로벌 기업에 투자',
    etfIds: ['etf-1'],
    icon: '🤖',
    color: '#3490FF'
  },
  {
    id: 'theme-2',
    name: '배당왕 모음',
    description: '안정적인 배당 수익을 제공하는 우량 기업 포트폴리오',
    etfIds: ['etf-4', 'etf-8', 'etf-15'],
    icon: '👑',
    color: '#FF9500'
  },
  {
    id: 'theme-3',
    name: '2차전지',
    description: '전기차 시대를 이끄는 배터리 산업 핵심 기업',
    etfIds: ['etf-9'],
    icon: '🔋',
    color: '#34C759'
  },
  {
    id: 'theme-4',
    name: '빅테크',
    description: '글로벌 기술 선도 기업 집중 투자',
    etfIds: ['etf-1', 'etf-3', 'etf-5'],
    icon: '💻',
    color: '#5856D6'
  },
  {
    id: 'theme-5',
    name: '안전자산',
    description: '경제 불확실성 시기의 안정적 투자처',
    etfIds: ['etf-11', 'etf-12', 'etf-13'],
    icon: '🛡️',
    color: '#8E8E93'
  },
  {
    id: 'theme-6',
    name: '장기투자',
    description: '시장 전체에 분산 투자하여 장기 성장 추구',
    etfIds: ['etf-2', 'etf-6'],
    icon: '📈',
    color: '#FF3B30'
  }
];

/**
 * 카테고리별 ETF 조회
 * @param {string} category - 카테고리 (국내주식, 해외주식, 채권, 원자재, 부동산)
 * @returns {Array<Object>} ETF 목록
 */
export const getETFsByCategory = (category) => {
  return getAllETFs().filter(etf => etf.category === category);
};

/**
 * 테마별 ETF 조회
 * @param {string} theme - 테마 이름
 * @returns {Array<Object>} ETF 목록
 */
export const getETFsByTheme = (theme) => {
  return getAllETFs().filter(etf => etf.themes && etf.themes.includes(theme));
};

/**
 * 인기 ETF 조회 (상승/하락)
 * @param {string} direction - 'up' 또는 'down'
 * @param {number} limit - 조회할 개수
 * @returns {Array<Object>} ETF 목록
 */
export const getPopularETFs = (direction, limit = 5) => {
  return getAllETFs()
    .filter(etf => etf.changeDirection === direction)
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, limit);
};

/**
 * 테마 ID로 테마 정보 조회
 * @param {string} themeId - 테마 ID
 * @returns {Object|null} 테마 정보
 */
export const getThemeById = (themeId) => {
  return THEME_DATA.find(theme => theme.id === themeId) || null;
};

/**
 * 테마에 속한 ETF 목록 조회
 * @param {string} themeId - 테마 ID
 * @returns {Array<Object>} ETF 목록
 */
export const getETFsByThemeId = (themeId) => {
  const theme = getThemeById(themeId);
  if (!theme) return [];

  return theme.etfIds.map(etfId => getETFData(etfId)).filter(Boolean);
};

/**
 * 인기순으로 정렬된 ETF 목록
 * @param {number} limit - 조회할 개수 (기본: 전체)
 * @returns {Array<Object>} ETF 목록
 */
export const getETFsByPopularity = (limit = null) => {
  const sorted = getAllETFs().sort((a, b) => b.popularity - a.popularity);
  return limit ? sorted.slice(0, limit) : sorted;
};

/**
 * 거래량순으로 정렬된 ETF 목록
 * @param {number} limit - 조회할 개수 (기본: 전체)
 * @returns {Array<Object>} ETF 목록
 */
export const getETFsByVolume = (limit = null) => {
  const sorted = getAllETFs().sort((a, b) => b.basicInfo.volume - a.basicInfo.volume);
  return limit ? sorted.slice(0, limit) : sorted;
};
