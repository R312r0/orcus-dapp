import React from 'react';

function ProfitManagerIcon({ color, ratio }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      // width='1.979vw'
      // height='1.979vw'
      height={ratio ?? '1.979vw'}
      width={ratio ?? '1.979vw'}
      fill='none'
      viewBox='0 0 38 38'
    >
      <path
        stroke={color}
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        d='M9.5 3.167L4.75 9.5v22.166a3.167 3.167 0 003.167 3.167h22.166a3.167 3.167 0 003.167-3.166V9.5L28.5 3.167h-19zM25.333 15.834a6.333 6.333 0 01-12.666 0M4.75 9.5h28.5'
      ></path>
    </svg>
  );
}

export default ProfitManagerIcon;
