import React from 'react';

import FarmsTableItm from './farms-table-item';
import {
  Balance,
  FarmsTableWrapper,
  FarmsWrapper,
  HDiv,
  HeadingText,
  RewardBtn,
  Text,
  TotalHarvestedInfo,
  VDiv,
} from './styled';

const Array = [1, 2, 3];

const Farms = () => {
  return (
    <FarmsWrapper>
      <HDiv justifyContent='space-between' alignItems='flex-start'>
        <VDiv>
          <HeadingText>Farms TVL</HeadingText>
          <Balance>$ 1,686,657</Balance>
        </VDiv>
        <VDiv>
          <TotalHarvestedInfo>
            <span>Total harvested rewards </span>
            <div />
            <b>0.0 ORU</b>
          </TotalHarvestedInfo>
          <RewardBtn>Rewards vesting</RewardBtn>
        </VDiv>
      </HDiv>
      <HDiv mt='2.083vw'>
        <Text ml='3.802vw'>Asset</Text>
        <Text ml='18.177vw'>Rewards</Text>
        <Text ml='9.427vw'>Deposited</Text>
        <Text ml='7.813vw'>TVL</Text>
        <Text ml='10.469vw'>Rates</Text>
      </HDiv>
      <FarmsTableWrapper>
        {Array.map((item, idx) => (
          <FarmsTableItm key={idx} />
        ))}
      </FarmsTableWrapper>
    </FarmsWrapper>
  );
};

export default Farms;
