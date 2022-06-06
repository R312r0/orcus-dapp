import React from "react";

function SiriusIcon({ ratio }) {
  return (
    <svg
      width={ratio ?? "2.544vw"}
      height={ratio ?? "2.544vw"}
      viewBox="0 0 52 46"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="29" cy="23" r="23" fill="#140846" />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M35.0488 17.9042C38.0594 17.9042 40.5 20.3462 40.5 23.3584V29.0457C40.5 32.058 38.0594 34.5 35.0488 34.5H22.2998C19.9146 34.5 17.9765 32.5847 17.938 30.2074L17.9374 30.1352H33.0911C35.2621 30.1352 37.022 28.3743 37.022 26.2021C37.022 24.0299 35.2621 22.269 33.0911 22.269H25.9508C24.8669 22.269 23.9883 21.3899 23.9883 20.3054V17.9042H35.0488ZM35.6457 11.5C38.0309 11.5 39.969 13.4153 40.0075 15.7926L40.0081 15.8648H24.9089C22.7379 15.8648 20.978 17.6257 20.978 19.7979C20.978 21.9701 22.7379 23.731 24.9089 23.731H31.6676C32.9623 23.731 34.0117 24.7811 34.0117 26.0764V28.0958H22.9512C19.9406 28.0958 17.5 25.6538 17.5 22.6416V16.9543C17.5 13.942 19.9406 11.5 22.9512 11.5H35.6457Z"
        fill="url(#paint0_linear_802_2037)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_802_2037"
          x1="29"
          y1="11.8712"
          x2="29"
          y2="34.1272"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#FFCDEC" />
          <stop offset="1" stop-color="#6C7DFF" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default SiriusIcon;
