import { SmallToggle } from './ToggleButton.jsx';
import { Label } from './Label.jsx';
import iconBackSR from '../../assets/icon_back(S)_R.svg';

/**
 * RebalanceInfoCard - 리벨런싱 정보 카드 컴포넌트
 *
 * @param {Object} props
 * @param {string} props.title - 카드 제목 (기본값: "리밸런싱 정보")
 * @param {boolean} props.isExpanded - 펼쳐진 상태 여부
 * @param {function} props.onToggleExpand - 펼침/접힘 토글 핸들러
 * @param {string} props.totalValue - 포트폴리오 총 가치
 * @param {string} props.netProfit - 순 수익
 * @param {boolean} props.isProfitMode - 수익 모드 여부 (true: 수익, false: 수익률)
 * @param {function} props.onProfitModeToggle - 수익/수익률 토글 핸들러
 * @param {string} props.changeRate - 설정 변화율
 * @param {function} props.onChangeRateClick - 설정 변화율 클릭 핸들러
 * @param {boolean} props.needsRebalance - 리벨런싱 필요 여부
 * @param {string} props.rebalanceReason - 리벨런싱 이유 설명
 */
export const RebalanceInfoCard = ({
  title = '리밸런싱 정보',
  isExpanded = false,
  onToggleExpand,
  totalValue = '123,345,677',
  netProfit = '123,345,677',
  changeRate = 'n',
  onChangeRateClick,
  needsRebalance = true,
  rebalanceReason = '리밸런싱을 통해 하락에 대비할 수 있어요.'
}) => {
  return (
    <div
      style={{
        width: '361px',
        padding: '16px 0',
        backgroundColor: '#F7F7F8',
        borderRadius: '12px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }}
    >
      {/* 헤더: 제목 + 토글 버튼 */}
      <div
        style={{
          alignSelf: 'stretch',
          paddingLeft: '12px',
          paddingRight: '12px',
          paddingTop: '4px',
          paddingBottom: '4px',
          display: 'inline-flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <div
          style={{
            fontFamily: 'Pretendard, sans-serif',
            fontSize: '18px',
            fontWeight: 500,
            lineHeight: '27px',
            color: '#474C57',
            wordWrap: 'break-word'
          }}
        >
          {title}
        </div>
        <div
          onClick={onToggleExpand}
          style={{
            paddingLeft: '10px',
            paddingRight: '10px',
            paddingTop: '4px',
            paddingBottom: '4px',
            backgroundColor: '#FAFCFF',
            borderRadius: '12px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer'
          }}
        >
          <div
            style={{
              fontFamily: 'Pretendard, sans-serif',
              fontSize: '14px',
              fontWeight: 500,
              lineHeight: '21px',
              color: '#005CCC',
              wordWrap: 'break-word'
            }}
          >
            {isExpanded ? '정보 자세히' : '정보 간략히'}
          </div>
        </div>
      </div>

      {/* 콘텐츠 영역 */}
      <div
        style={{
          alignSelf: 'stretch',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          transition: 'gap 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }}
      >
        {/* 포트폴리오 총 가치 + 순 수익 */}
        <div
          style={{
            alignSelf: 'stretch',
            display: 'inline-flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: '9px',
            paddingLeft: '12px',
            paddingRight: '12px'
          }}
        >
          {/* 포트폴리오 총 가치 */}
          <div
            style={{
              width: '163px',
              height: '88px',
              padding: '14px 10px',
              outline: '1px #E6E7EA solid',
              outlineOffset: '-1px',
              borderRadius: '12px',
              display: 'inline-flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              gap: '12px'
            }}
          >
            <div
              style={{
                fontFamily: 'Pretendard, sans-serif',
                fontSize: '14px',
                fontWeight: 500,
                lineHeight: '21px',
                color: '#474C57',
                textAlign: 'center',
                whiteSpace: 'nowrap',
                wordWrap: 'break-word'
              }}
            >
              포트폴리오 총 가치
            </div>
            <div
              style={{
                display: 'inline-flex',
                justifyContent: 'center',
                alignItems: 'flex-end',
                gap: '6px'
              }}
            >
              <div
                style={{
                  fontFamily: 'Pretendard, sans-serif',
                  fontSize: '16px',
                  fontWeight: 600,
                  lineHeight: '21.6px',
                  color: '#000000',
                  textAlign: 'right',
                  whiteSpace: 'nowrap',
                  wordWrap: 'break-word'
                }}
              >
                {totalValue}
              </div>
              <div
                style={{
                  fontFamily: 'Pretendard, sans-serif',
                  fontSize: '16px',
                  fontWeight: 400,
                  lineHeight: '24px',
                  color: '#000000',
                  textAlign: 'right',
                  whiteSpace: 'nowrap',
                  wordWrap: 'break-word'
                }}
              >
                원
              </div>
            </div>
          </div>

          {/* 순 수익 */}
          <div
            style={{
              width: '165px',
              height: '88px',
              padding: '14px 10px',
              outline: '1px #E6E7EA solid',
              outlineOffset: '-1px',
              borderRadius: '12px',
              display: 'inline-flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              gap: '12px'
            }}
          >
            <div
              style={{
                fontFamily: 'Pretendard, sans-serif',
                fontSize: '14px',
                fontWeight: 500,
                lineHeight: '21px',
                color: '#474C57',
                textAlign: 'center',
                whiteSpace: 'nowrap',
                wordWrap: 'break-word'
              }}
            >
              순 수익
            </div>
            <div
              style={{
                display: 'inline-flex',
                justifyContent: 'center',
                alignItems: 'flex-end',
                gap: '6px'
              }}
            >
              <div
                style={{
                  fontFamily: 'Pretendard, sans-serif',
                  fontSize: '16px',
                  fontWeight: 600,
                  lineHeight: '21.6px',
                  color: '#000000',
                  textAlign: 'right',
                  whiteSpace: 'nowrap',
                  wordWrap: 'break-word'
                }}
              >
                {netProfit}
              </div>
              <div
                style={{
                  fontFamily: 'Pretendard, sans-serif',
                  fontSize: '16px',
                  fontWeight: 400,
                  lineHeight: '24px',
                  color: '#000000',
                  textAlign: 'right',
                  whiteSpace: 'nowrap',
                  wordWrap: 'break-word'
                }}
              >
                원
              </div>
            </div>
          </div>
        </div>

        {/* 간략히 모드일 때만 표시: 설정 변화율 + 리밸런싱 필요 여부 */}
        <div
          style={{
            maxHeight: !isExpanded ? '500px' : '0',
            opacity: !isExpanded ? 1 : 0,
            overflow: 'hidden',
            transition: 'max-height 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            alignSelf: 'stretch',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {/* 설정 변화율 */}
          <div
            onClick={onChangeRateClick}
            style={{
              alignSelf: 'stretch',
              padding: '12px',
              display: 'inline-flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              cursor: 'pointer'
            }}
          >
            <div
              style={{
                fontFamily: 'Pretendard, sans-serif',
                fontSize: '14px',
                fontWeight: 400,
                lineHeight: '21px',
                color: '#000000',
                textAlign: 'right',
                whiteSpace: 'nowrap',
                wordWrap: 'break-word'
              }}
            >
              설정 변화률
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                gap: '1px'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  gap: '3px'
                }}
              >
                <div
                  style={{
                    fontFamily: 'Pretendard, sans-serif',
                    fontSize: '16px',
                    fontWeight: 400,
                    lineHeight: '24px',
                    color: '#000000',
                    textAlign: 'right',
                    whiteSpace: 'nowrap',
                    wordWrap: 'break-word'
                  }}
                >
                  {changeRate}
                </div>
                <div
                  style={{
                    fontFamily: 'Pretendard, sans-serif',
                    fontSize: '16px',
                    fontWeight: 400,
                    lineHeight: '24px',
                    color: '#000000',
                    textAlign: 'right',
                    whiteSpace: 'nowrap',
                    wordWrap: 'break-word'
                  }}
                >
                  %
                </div>
              </div>
              <img
                src={iconBackSR}
                alt=""
                style={{
                  width: '24px',
                  height: '24px'
                }}
              />
            </div>
          </div>

          {/* 리밸런싱 필요 여부 */}
          <div
            style={{
              alignSelf: 'stretch',
              padding: '10px 12px 6px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              gap: '4px'
            }}
          >
            <div
              style={{
                alignSelf: 'stretch',
                display: 'inline-flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div
                style={{
                  fontFamily: 'Pretendard, sans-serif',
                  fontSize: '14px',
                  fontWeight: 400,
                  lineHeight: '21px',
                  color: '#000000',
                  textAlign: 'right',
                  whiteSpace: 'nowrap',
                  wordWrap: 'break-word'
                }}
              >
                리밸런싱 필요 여부
              </div>
              <Label title="리벨런싱 필요" color={needsRebalance ? 'down' : 'grey'} />
            </div>
          </div>
        </div>

        {/* 리밸런싱을 하는 이유 - 항상 표시 */}
        <div
          style={{
            alignSelf: 'stretch',
            paddingLeft: '12px',
            paddingRight: '12px',
            marginTop: !isExpanded ? '0' : '12px',
            justifyContent: 'space-between',
            alignItems: 'center',
            display: 'inline-flex'
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: '4px',
              alignItems: 'center',
              flexShrink: 0
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M6.00098 10.25C8.34819 10.25 10.251 8.34721 10.251 6C10.251 3.65279 8.34819 1.75 6.00098 1.75C3.65377 1.75 1.75098 3.65279 1.75098 6C1.75098 8.34721 3.65377 10.25 6.00098 10.25ZM6.00098 11C8.7624 11 11.001 8.76142 11.001 6C11.001 3.23858 8.7624 1 6.00098 1C3.23955 1 1.00098 3.23858 1.00098 6C1.00098 8.76142 3.23955 11 6.00098 11Z" fill="#757E8F"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M10.251 6C10.251 8.34721 8.34819 10.25 6.00098 10.25C3.65377 10.25 1.75098 8.34721 1.75098 6C1.75098 3.65279 3.65377 1.75 6.00098 1.75C8.34819 1.75 10.251 3.65279 10.251 6ZM6.14273 5.56873C5.72735 5.82817 5.48999 6.09097 5.48339 6.95013C5.48339 6.95013 5.48154 6.98717 5.48339 7.01078C5.507 7.31112 6.23121 7.31112 6.25482 7.01078C6.25668 6.98717 6.25482 6.95013 6.25482 6.95013C6.26142 6.44474 6.41966 6.21226 6.80207 5.97305C7.23065 5.71361 7.49768 5.35647 7.50098 4.80728C7.49768 4.00539 6.88779 3.5 5.99768 3.5C5.01855 3.51758 4.50071 4.37106 4.50098 4.86792C4.50124 5.36479 5.28942 5.27618 5.32515 4.86792C5.36088 4.45967 5.66471 4.20081 5.99109 4.20081C6.35043 4.20081 6.64054 4.4434 6.63724 4.82075C6.64054 5.15768 6.42295 5.38342 6.14273 5.56873ZM5.89219 7.45552C5.60867 7.45889 5.3746 7.69137 5.3779 7.97439C5.3746 8.26415 5.60867 8.5 5.89219 8.5C6.16581 8.5 6.39988 8.26415 6.39988 7.97439C6.39988 7.69137 6.16581 7.45889 5.89219 7.45552Z" fill="#757E8F"/>
            </svg>
            <div
              style={{
                color: '#757E8F',
                fontSize: '12px',
                fontFamily: 'Pretendard, sans-serif',
                fontWeight: 500,
                lineHeight: '18px',
                wordWrap: 'break-word'
              }}
            >
              리밸런싱을 하는 이유?
            </div>
          </div>
          <div
            style={{
              textAlign: 'right',
              color: '#757E8F',
              fontSize: '10px',
              fontFamily: 'Pretendard, sans-serif',
              fontWeight: 500,
              lineHeight: '12.5px',
              wordWrap: 'break-word'
            }}
          >
            {rebalanceReason}
          </div>
        </div>
      </div>
    </div>
  );
};
