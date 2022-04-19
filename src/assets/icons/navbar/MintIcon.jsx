import React from 'react';

function MintIcon({ color }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      // width='1.979vw'
      // height='1.979vw'
      height='1.484vw'
      width='1.484vw'
      fill='none'
      viewBox='0 0 38 38'
    >
      <path
        stroke={color}
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        d='M33.25 25.333V12.667a3.167 3.167 0 00-1.583-2.74L20.583 3.595a3.166 3.166 0 00-3.166 0L6.333 9.928a3.167 3.167 0 00-1.583 2.739v12.666a3.166 3.166 0 001.583 2.74l11.084 6.333a3.166 3.166 0 003.166 0l11.084-6.333a3.166 3.166 0 001.583-2.74z'
      ></path>
    </svg>
  );
}

export default MintIcon;
