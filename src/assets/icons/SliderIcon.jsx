import React from 'react';

function SliderIcon({ ratio }) {
  return (
    <svg
      width={ratio ?? '1.563vw'}
      height={ratio ?? '1.563vw'}
        viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_1017_2329)">
<path d="M2.25 15L6 15" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6 12.75L6 17.25" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M2.25 3L7.5 3" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7.5 0.75L7.5 5.25" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M2.25 9L9 9" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 6.75L12 11.25" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9 15L15.75 15" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 9L15.75 9" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.5 3L15.75 3" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_1017_2329">
<rect width="18" height="18" fill="white" transform="translate(18) rotate(90)"/>
</clipPath>
</defs>
</svg>

  );
}

export default SliderIcon;
