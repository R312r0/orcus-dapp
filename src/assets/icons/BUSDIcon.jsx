import React from 'react';

function BUSDIcon({ ratio }) {
  return (
    <svg 
    
    width={ ratio ?? '2.344vw'}
    height={ratio ?? '2.344vw'} viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="23" cy="23" r="23" fill="#F0B90B"/>
<path d="M22.9997 8.06299L26.7005 11.8417L17.3815 21.1327L13.6807 17.443L22.9997 8.06299Z" fill="white"/>
<path d="M28.6178 13.6646L32.3186 17.4432L17.3815 32.3356L13.6807 28.6459L28.6178 13.6646Z" fill="white"/>
<path d="M11.7633 19.2656L15.4642 23.0443L11.7633 26.7341L8.0625 23.0443L11.7633 19.2656Z" fill="white"/>
<path d="M34.236 19.2656L37.9368 23.0443L22.9997 37.9367L19.2988 34.247L34.236 19.2656Z" fill="white"/>
</svg>


  );
}

export default BUSDIcon;
