import React from 'react';

function FilterIcon({ color, ratio }) {
  return (
    <svg
      width={ratio ?? '1.563vw'}
      height={ratio ?? '1.563vw'}
      viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.5 2.25H1.5L7.5 9.345V14.25L10.5 15.75V9.345L16.5 2.25Z" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      
  );
}

export default FilterIcon;
