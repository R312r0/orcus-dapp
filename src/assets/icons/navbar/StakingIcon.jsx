import React from 'react';

function StakingIcon({ color }) {
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
        d='M33.25 19c0 2.628-6.333 4.75-14.25 4.75S4.75 21.628 4.75 19M19 12.667c7.87 0 14.25-2.127 14.25-4.75 0-2.624-6.38-4.75-14.25-4.75S4.75 5.293 4.75 7.917c0 2.623 6.38 4.75 14.25 4.75z'
      ></path>
      <path
        stroke={color}
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        d='M4.75 7.917v22.166c0 2.629 6.333 4.75 14.25 4.75s14.25-2.121 14.25-4.75V7.917'
      ></path>
    </svg>
  );
}

export default StakingIcon;
