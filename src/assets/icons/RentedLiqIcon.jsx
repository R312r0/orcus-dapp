import React from "react";

function RentedLiqIcon({ color }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.563vw"
      height="1.563vw"
      fill="none"
      viewBox="0 0 30 30"
    >
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M27.5 15H25m-5.375.469l-4.039 5.05a.749.749 0 01-1.172 0l-4.039-5.051a.75.75 0 010-.938l4.039-5.05a.75.75 0 011.172 0l4.039 5.05a.75.75 0 010 .938v0zM15 27.5V25v2.5zM15 5V2.5 5zM5 15H2.5 5z"
      ></path>
    </svg>
  );
}

export default RentedLiqIcon;
