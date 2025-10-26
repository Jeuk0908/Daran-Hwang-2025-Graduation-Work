export const IconBackL = ({ size = 24 }) => {
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16.7699 2.2253C16.463 1.9249 15.9655 1.9249 15.6587 2.2253L6.23013 11.4561C5.92329 11.7565 5.92329 12.2435 6.23013 12.5439L15.6587 21.7747C15.9655 22.0751 16.463 22.0751 16.7699 21.7747C17.0767 21.4743 17.0767 20.9872 16.7699 20.6868L7.89688 12L16.7699 3.31316C17.0767 3.01276 17.0767 2.52571 16.7699 2.2253Z"
          fill="#1A1C20"
        />
      </svg>
    </div>
  );
};

export const IconBackR = ({ size = 24 }) => {
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.23013 2.2253C7.53697 1.9249 8.03446 1.9249 8.3413 2.2253L17.7699 11.4561C18.0767 11.7565 18.0767 12.2435 17.7699 12.5439L8.3413 21.7747C8.03446 22.0751 7.53697 22.0751 7.23013 21.7747C6.92329 21.4743 6.92329 20.9872 7.23013 20.6868L16.1031 12L7.23013 3.31316C6.92329 3.01276 6.92329 2.52571 7.23013 2.2253Z"
          fill="#1A1C20"
        />
      </svg>
    </div>
  );
};

export const IconBackSL = ({ size = 24, color = '#1A1C20', strokeWidth = 1.5 }) => {
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M14 16L10 12L14 8"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export const IconBackSR = ({ size = 24, color = '#1A1C20', strokeWidth = 1.5 }) => {
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M10 8L14 12L10 16"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export const IconBackSLT50 = ({ size = 24, color = '#1A1C20', strokeWidth = 1.5 }) => {
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g opacity="0.5">
          <path
            d="M14 16L10 12L14 8"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    </div>
  );
};

export const IconBackSRT50 = ({ size = 24, color = '#1A1C20', strokeWidth = 1.5 }) => {
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g opacity="0.5">
          <path
            d="M10 16L14 12L10 8"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    </div>
  );
};
