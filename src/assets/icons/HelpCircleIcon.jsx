import React from 'react';

function HelpCircleIcon({ ratio }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={ ratio ?? '0.938vw'}
      height={ ratio ?? '0.938vw'}
      fill='none'
      viewBox='0 0 18 18'
    >
      <path
        stroke='#828282'
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M9 16.5a7.5 7.5 0 100-15 7.5 7.5 0 000 15zM9 12.75h.008'
      ></path>
      <path
        stroke='#828282'
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M6.817 6.75a2.25 2.25 0 014.373.75c0 1.5-2.25 2.25-2.25 2.25'
      ></path>
    </svg>
  );
}

export default HelpCircleIcon;
