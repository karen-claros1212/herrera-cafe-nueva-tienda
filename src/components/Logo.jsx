import React from 'react';

const Logo = ({ size = 60, color = '#c9a87c', ...props }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* Coffee bean shape */}
      <path
        d="M50 10C35 10 20 22 18 38C16 54 22 68 30 76C38 84 45 86 50 86C55 86 62 84 70 76C78 68 84 54 82 38C80 22 65 10 50 10Z"
        fill={color}
        opacity="0.9"
      />
      {/* Center crease line */}
      <path
        d="M50 16C48 22 47 40 50 50C53 60 52 78 50 84"
        stroke="#1a1a1a"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.3"
      />
      {/* Highlight arc */}
      <path
        d="M38 24C33 30 28 42 30 50"
        stroke="#1a1a1a"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
        opacity="0.15"
      />
      {/* Steam wisps */}
      <path
        d="M42 14C44 10 43 6 45 4"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />
      <path
        d="M50 12C52 8 51 4 53 2"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.6"
      />
      <path
        d="M58 14C60 10 59 6 61 4"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />
    </svg>
  );
};

export default Logo;
