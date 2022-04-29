import React from 'react';

function DashboardIcon({ color, ratio }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      // width='1.979vw'
      // height='1.979vw'
      height={ratio ?? '1.484vw'}
      width={ratio ?? '1.484vw'}
      fill='none'
      viewBox='0 0 38 38'
    >
      <path
        stroke={color}
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        d='M34.833 19H28.5l-4.75 14.25-9.5-28.5L9.5 19H3.167'
      ></path>
    </svg>
  );
}

export default DashboardIcon;
