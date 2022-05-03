import React from 'react';

function FarmsIcon({ color, ratio }) {
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
        d='M33.25 22.166H22.167V33.25H33.25V22.166zM15.833 22.166H4.75V33.25h11.083V22.166zM33.25 4.75H22.167v11.083H33.25V4.75zM15.833 4.75H4.75v11.083h11.083V4.75z'
      ></path>
    </svg>
  );
}

export default FarmsIcon;
