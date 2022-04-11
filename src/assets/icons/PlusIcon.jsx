import React from 'react';

function PlusIcon({ color }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='1.250vw'
      height='1.250vw'
      fill='none'
      viewBox='0 0 24 24'
    >
      <path
        stroke={color}
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        d='M12 5v14M5 12h14'
      ></path>
    </svg>
  );
}

export default PlusIcon;
