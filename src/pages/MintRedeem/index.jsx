import React from 'react';

import Mint from './mint';
import Redeem from './redeem';
import {
  HeadingText,
  MintRedeemWrapper,
  TabWrapper,
  ToggleBtn,
  ToggleBtnWrapper,
} from './styled';

const MintRedeeem = () => {
  const [activeTab, setActiveTab] = React.useState('Mint');
  const isMobileScreen = ( ) => {
    let query = window.matchMedia('(max-device-width: 480px)')
    return query.matches
  }
// 
  return (
    <MintRedeemWrapper>
      <HeadingText>Mint</HeadingText>
      <div style={{backgroundColor: isMobileScreen() ? 'white' : 'inherit', paddingLeft: '3%', paddingRight: '3%'}}>
      <ToggleBtnWrapper>
        <ToggleBtn
          onClick={() => setActiveTab('Mint')}
          isActive={activeTab === 'Mint'}
        >
          Mint
        </ToggleBtn>
        <ToggleBtn
          onClick={() => setActiveTab('Redeem')}
          isActive={activeTab === 'Redeem'}
        >
          Redeem
        </ToggleBtn>
      </ToggleBtnWrapper>
      </div>
      <TabWrapper>{activeTab === 'Mint' ? <Mint /> : <Redeem />}</TabWrapper>
    </MintRedeemWrapper>
  );
};

export default MintRedeeem;
