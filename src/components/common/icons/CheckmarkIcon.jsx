export const CheckmarkIcon = ({ size = 24, color = '#1A1C20' }) => {
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_checkmark)">
          <path
            d="M9.00012 16.2003L5.50012 12.7003C5.11012 12.3103 4.49012 12.3103 4.10012 12.7003C3.71012 13.0903 3.71012 13.7103 4.10012 14.1003L8.29012 18.2903C8.68012 18.6803 9.31012 18.6803 9.70012 18.2903L20.3001 7.70031C20.6901 7.31031 20.6901 6.69031 20.3001 6.30031C19.9101 5.91031 19.2901 5.91031 18.9001 6.30031L9.00012 16.2003Z"
            fill={color}
          />
        </g>
        <defs>
          <clipPath id="clip0_checkmark">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

export const CheckmarkIconXS = ({ size = 12, color = '#43A329' }) => {
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_checkmark_xs)">
          <path
            d="M4.50006 8.10016L2.75006 6.35016C2.55506 6.15516 2.24506 6.15516 2.05006 6.35016C1.85506 6.54516 1.85506 6.85516 2.05006 7.05016L4.14506 9.14516C4.34006 9.34016 4.65506 9.34016 4.85006 9.14516L10.1501 3.85016C10.3451 3.65516 10.3451 3.34516 10.1501 3.15016C9.95506 2.95516 9.64506 2.95516 9.45006 3.15016L4.50006 8.10016Z"
            fill={color}
          />
        </g>
        <defs>
          <clipPath id="clip0_checkmark_xs">
            <rect width="12" height="12" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};
