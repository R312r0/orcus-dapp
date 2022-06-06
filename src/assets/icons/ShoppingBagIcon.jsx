import React from "react";

function ShoppingBagIcon({ color }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.250vw"
      height="1.250vw"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        fill={color}
        d="M19 7h-3V6a4 4 0 10-8 0v1H5a1 1 0 00-1 1v11a3 3 0 003 3h10a3 3 0 003-3V8a1 1 0 00-1-1zm-9-1a2 2 0 114 0v1h-4V6zm8 13a1 1 0 01-1 1H7a1 1 0 01-1-1V9h2v1a1 1 0 102 0V9h4v1a1 1 0 002 0V9h2v10z"
      ></path>
    </svg>
  );
}

export default ShoppingBagIcon;
