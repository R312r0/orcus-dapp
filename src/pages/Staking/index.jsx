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
  return (
    <StakingWrapper>
      <HeadingText>Staking</HeadingText>
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
      <TabWrapper>{activeTab === 'Stake' ? <Stake /> : <Unstake />}</TabWrapper>
    </StakingWrapper>
  );
};

export default MintRedeeem;
