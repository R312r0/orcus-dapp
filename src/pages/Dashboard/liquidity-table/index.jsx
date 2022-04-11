import React from 'react';

import OwnedLiqIcon from '../../../assets/icons/OwnedLiqIcon';
import RentedLiqIcon from '../../../assets/icons/RentedLiqIcon';
import { HDiv, IconWrapper, LiquidityTableWrapper, Text, VDiv } from './styled';

const LiquidityTable = () => {
  return (
    <LiquidityTableWrapper>
      <HDiv>
        <IconWrapper fill='#fff'>
          <OwnedLiqIcon />
        </IconWrapper>
        <VDiv>
          <Text>Protocol Owned Liquidity</Text>
          <Text mt='0.156vw'>
            <b>$569,321.64</b>
          </Text>
        </VDiv>
      </HDiv>
      <HDiv mt='2.135vw'>
        <IconWrapper>
          <RentedLiqIcon />
        </IconWrapper>
        <VDiv>
          <Text>Protocol Rented Liquidity</Text>
          <Text mt='0.156vw'>
            <b>$569,321.64</b>
          </Text>
        </VDiv>
      </HDiv>
    </LiquidityTableWrapper>
  );
};

export default LiquidityTable;
