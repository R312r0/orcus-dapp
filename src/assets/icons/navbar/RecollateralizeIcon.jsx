import React from "react";

function RecollateralizeIcon({ color, ratio }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      // height={ratio ?? '1.979vw'}
      // width={ratio ?? '1.979vw'}
      height={ratio ?? "1.779vw"}
      width={ratio ?? "1.779vw"}
      fill="none"
      viewBox="0 0 38 38"
    >
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M19 4.26l8.962 8.96a12.667 12.667 0 11-17.908 0L19 4.26z"
      ></path>
    </svg>
  );
}

export default RecollateralizeIcon;
