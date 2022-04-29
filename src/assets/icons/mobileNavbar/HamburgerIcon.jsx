import React from 'react';

function HamburgerIcon({ color, ratio }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      height={ ratio ?? '1.484vw'}
      width={ ratio ?? '1.484vw'}
      fill='none'
      viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 18H20M4 6H20H4ZM4 12H20H4Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
  );
}

export default HamburgerIcon;
