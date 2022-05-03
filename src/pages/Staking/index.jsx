import React from 'react';

import Stake from './stake';
import {
  HeadingText,
  StakingWrapper,
  TabWrapper,
  ToggleBtn,
  ToggleBtnWrapper,
} from './styled';
import Unstake from './unstake';

const MintRedeeem = () => {
  const [activeTab, setActiveTab] = React.useState('Stake');
  const isMobileScreen = ( ) => {
    let query = window.matchMedia('(max-device-width: 480px)')
    return query.matches
  }
  return (
    <StakingWrapper>
      <HeadingText>Staking</HeadingText>
      
      <div style={{backgroundColor: isMobileScreen() ? 'white' : 'inherit', paddingLeft: '3%', paddingRight: '3%'}}>
      <ToggleBtnWrapper>
        <ToggleBtn
          onClick={() => setActiveTab('Stake')}
          isActive={activeTab === 'Stake'}
        >
          Stake
        </ToggleBtn>
        <ToggleBtn
          onClick={() => setActiveTab('Unstake')}
          isActive={activeTab === 'Unstake'}
        >
          Unstake
        </ToggleBtn>
      </ToggleBtnWrapper>
      </div>
      <TabWrapper>{activeTab === 'Stake' ? <Stake /> : <Unstake />}</TabWrapper>
    </StakingWrapper>
  );
};

export default MintRedeeem;
