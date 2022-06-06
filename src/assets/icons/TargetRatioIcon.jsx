import React from "react";

function TargetRatioIcon({ color }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.563vw"
      height="1.563vw"
      fill="none"
      viewBox="0 0 30 30"
    >
      <path
        fill={color}
        d="M26.943 7.964a.75.75 0 01-.162.817l-3 3a.75.75 0 01-.531.22h-4.19l-2.029 2.029a2.25 2.25 0 11-1.06-1.06L18 10.94V6.75a.75.75 0 01.219-.53l3-3a.75.75 0 011.281.53V7.5h3.75a.75.75 0 01.693.464zM24.439 9H21.75a.75.75 0 01-.75-.75V5.56l-1.5 1.5v3.44h3.44l1.5-1.5zm1.971 2.273a12 12 0 11-7.683-7.682l-1.212 1.212a10.5 10.5 0 107.682 7.683l1.213-1.213zM22.35 13.5a7.5 7.5 0 11-5.85-5.85v1.54a6 6 0 104.311 4.31h1.539z"
      ></path>
    </svg>
  );
}

export default TargetRatioIcon;
