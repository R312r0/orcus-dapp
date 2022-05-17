import React from 'react'

function SwapIcon({color, ratio}){
    return(
        <svg 
        height={ratio ?? '1.779vw'}
        width={ratio ?? '1.779vw'}
         viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M27.2927 19.0537C27.2927 19.606 26.845 20.0537 26.2927 20.0537L6.1222 20.0537L10.8679 24.7994C11.2584 25.1899 11.2584 25.8231 10.8679 26.2136C10.4774 26.6041 9.84419 26.6041 9.45366 26.2136L3.00088 19.7608C2.71488 19.4748 2.62933 19.0447 2.78411 18.671C2.93889 18.2974 3.30352 18.0537 3.70799 18.0537L26.2927 18.0537C26.845 18.0537 27.2927 18.5014 27.2927 19.0537Z" fill={color}/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M2.99998 11C2.99998 10.4477 3.44769 10 3.99998 10L23.5041 10L19.0238 5.72336C18.6243 5.34202 18.6096 4.70902 18.9909 4.30953C19.3722 3.91003 20.0052 3.89531 20.4047 4.27665L26.6905 10.2766C26.9861 10.5588 27.0802 10.9925 26.9282 11.3719C26.7762 11.7513 26.4087 12 26 12L3.99998 12C3.44769 12 2.99998 11.5523 2.99998 11Z" fill={color}/>
</svg>
    )
}

export default SwapIcon;