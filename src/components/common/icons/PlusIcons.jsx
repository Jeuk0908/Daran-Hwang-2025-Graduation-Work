// Large Plus Icon
export const PlusIconL = ({ size = 24, color = '#1A1C20' }) => {
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12.6976 2.69767C12.6976 2.31236 12.3852 2 11.9999 2C11.6146 2 11.3022 2.31236 11.3022 2.69767V11.3024H2.69767C2.31236 11.3024 2 11.6147 2 12C2 12.3854 2.31236 12.6977 2.69767 12.6977H11.3022V21.3023C11.3022 21.6876 11.6146 22 11.9999 22C12.3852 22 12.6976 21.6876 12.6976 21.3023V12.6977H21.3023C21.6876 12.6977 22 12.3854 22 12C22 11.6147 21.6876 11.3024 21.3023 11.3024H12.6976V2.69767Z"
          fill={color}
        />
      </svg>
    </div>
  );
};

// Small Plus Icon
export const PlusIconS = ({ size = 24, color = '#020203' }) => {
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12.8 4.8C12.8 4.35817 12.4418 4 12 4C11.5582 4 11.2 4.35817 11.2 4.8V11.2H4.8C4.35817 11.2 4 11.5582 4 12C4 12.4418 4.35817 12.8 4.8 12.8H11.2V19.2C11.2 19.6418 11.5582 20 12 20C12.4418 20 12.8 19.6418 12.8 19.2V12.8H19.2C19.6418 12.8 20 12.4418 20 12C20 11.5582 19.6418 11.2 19.2 11.2H12.8V4.8Z"
          fill={color}
        />
      </svg>
    </div>
  );
};

// Small Plus Icon (50% opacity / Gray color)
export const PlusIconST50 = ({ size = 24, color = '#757E8F' }) => {
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12.8 4.8C12.8 4.35817 12.4418 4 12 4C11.5582 4 11.2 4.35817 11.2 4.8V11.2H4.8C4.35817 11.2 4 11.5582 4 12C4 12.4418 4.35817 12.8 4.8 12.8H11.2V19.2C11.2 19.6418 11.5582 20 12 20C12.4418 20 12.8 19.6418 12.8 19.2V12.8H19.2C19.6418 12.8 20 12.4418 20 12C20 11.5582 19.6418 11.2 19.2 11.2H12.8V4.8Z"
          fill={color}
        />
      </svg>
    </div>
  );
};
