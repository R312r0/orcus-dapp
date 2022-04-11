import React from 'react';

import EffectiveRatioIcon from '../../../assets/icons/EffectiveRatioIcon';
import TargetRatioIcon from '../../../assets/icons/TargetRatioIcon';
import { HDiv, IconWrapper, RatioTableWrapper, Text, VDiv } from './styled';

const RatioTable = () => {
  return (
    <RatioTableWrapper>
      <HDiv>
        <IconWrapper fill='#fff'>
          <TargetRatioIcon />
        </IconWrapper>
        <VDiv>
          <Text>Target Collateral Ratio</Text>
          <Text mt='0.156vw'>
            <b>$569,321.64</b>
          </Text>
        </VDiv>
      </HDiv>
      <HDiv mt='2.135vw'>
        <IconWrapper stroke='#fff'>
          <EffectiveRatioIcon />
        </IconWrapper>
        <VDiv>
          <Text>Effective Collateral Ratio</Text>
          <Text mt='0.156vw'>
            <b>$569,321.64</b>
          </Text>
        </VDiv>
      </HDiv>
    </RatioTableWrapper>
  );
};

export default RatioTable;
