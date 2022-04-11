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
  return (
    <MintRedeemWrapper>
      <HeadingText>Mint</HeadingText>
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
      <TabWrapper>{activeTab === 'Mint' ? <Mint /> : <Redeem />}</TabWrapper>
    </MintRedeemWrapper>
  );
};

export default MintRedeeem;
