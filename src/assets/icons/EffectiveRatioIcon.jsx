import React from 'react';

function EffectiveRatioIcon({ color }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='1.563vw'
      height='1.563vw'
      fill='none'
      viewBox='0 0 30 30'
    >
      <path
        stroke={color}
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='1.5'
        d='M22.611 22.534l5 4.977m-12.017-1.036l3.416-7.494 7.93-2.325-6.104-5.55.23-8.227-7.188 4.065-7.788-2.76 1.66 8.062-5.042 6.52 8.215.92 4.671 6.789h0z'
      ></path>
    </svg>
  );
}

export default EffectiveRatioIcon;
