import React from "react";

function ArrowDownIcon({ color }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.250vw"
      height="1.250vw"
      fill="none"
      viewBox="0 0 24 23"
    >
      <path
        fill={color}
        d="M10.94 22.06a1.5 1.5 0 002.12 0l9.547-9.545a1.5 1.5 0 10-2.122-2.122L12 18.88l-8.485-8.486a1.5 1.5 0 00-2.122 2.122l9.546 9.546zM10.5 0v21h3V0h-3z"
      ></path>
    </svg>
  );
}

export default ArrowDownIcon;
