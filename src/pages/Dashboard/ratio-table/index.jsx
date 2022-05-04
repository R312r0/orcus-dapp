import React, {useEffect, useState} from 'react';

import EffectiveRatioIcon from '../../../assets/icons/EffectiveRatioIcon';
import TargetRatioIcon from '../../../assets/icons/TargetRatioIcon';
import { HDiv, IconWrapper, RatioTableWrapper, Text, VDiv } from './styled';
import {useBlockChainContext} from "../../../context/blockchain-context";

const RatioTable = () => {

  const {contracts} = useBlockChainContext();
  const [rates, setRates] = useState(null);

  useEffect(() => {

    if (contracts) {
      getInfo();
    }
  }, [contracts])

  const getInfo = async () => {

    const {BANK} = contracts;

    const tcr = +(await BANK.tcr()) / 1e4;
    const ecr = +(await BANK.ecr()) / 1e4;

    setRates({
      tcr,
      ecr
    })
  }

  
  const isMobileScreen = ( ) => {
    let query = window.matchMedia('(max-device-width: 480px)')
    return query.matches
  }

  return (
    <RatioTableWrapper>
      <HDiv>
        <IconWrapper fill='#fff'>
          <TargetRatioIcon />
        </IconWrapper>
        <VDiv>
          <Text>Target Collateral Ratio</Text>
          <Text  mt={isMobileScreen() ? '10px' : '0.156vw'}>
            <b>{rates ? rates.tcr : 0}%</b>
          </Text>
        </VDiv>
      </HDiv>
      <HDiv mt='2.135vw'>
        <IconWrapper stroke='#fff'>
          <EffectiveRatioIcon />
        </IconWrapper>
        <VDiv>
          <Text>Effective Collateral Ratio</Text>
          <Text  mt={isMobileScreen() ? '10px' : '0.156vw'}>
            <b>{rates ? rates.ecr : 0}%</b>
          </Text>
        </VDiv>
      </HDiv>
    </RatioTableWrapper>
  );
};

export default RatioTable;
