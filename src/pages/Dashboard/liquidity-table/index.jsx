import React, {useEffect, useState} from 'react';

import OwnedLiqIcon from '../../../assets/icons/OwnedLiqIcon';
import RentedLiqIcon from '../../../assets/icons/RentedLiqIcon';
import { HDiv, IconWrapper, LiquidityTableWrapper, Text, VDiv } from './styled';
import {useBlockChainContext} from "../../../context/blockchain-context";
import {CONTRACT_ADDRESSES} from "../../../constants";
import {formattedNum} from "../../../utils";

const LiquidityTable = ({lpPrice}) => {

  const { contracts} = useBlockChainContext()

  const [protocolLiquidity, setProtocolLiquidity] = useState(null)

  useEffect(() => {

    if (contracts && lpPrice) {
      getProtocolLiquidity()
    }

  }, [contracts, lpPrice])

  const getProtocolLiquidity = async () => {

    const {ORU_USDC} = contracts;

    const protocolOwned = (+(await ORU_USDC.balanceOf(CONTRACT_ADDRESSES.TREASURY)) / 1e18) * lpPrice;
    const protocolRented = (+(await ORU_USDC.balanceOf(CONTRACT_ADDRESSES.DUSTBIN)) / 1e18) * lpPrice;

    setProtocolLiquidity({
      protocolOwned,
      protocolRented
    })

  }

  const isMobileScreen = ( ) => {
    let query = window.matchMedia('(max-device-width: 480px)')
    return query.matches
  }

  return (
    <LiquidityTableWrapper>
      <HDiv>
        <IconWrapper fill='#fff'>
          <OwnedLiqIcon />
        </IconWrapper>
        <VDiv>
          <Text>Protocol Owned Liquidity</Text>
          <Text mt={isMobileScreen() ? '10px' : '0.156vw'}>
            <b>${protocolLiquidity ? formattedNum(protocolLiquidity.protocolOwned) : 0}</b>
          </Text>
        </VDiv>
      </HDiv>
      <HDiv mt='2.135vw'>
        <IconWrapper>
          <RentedLiqIcon />
        </IconWrapper>
        <VDiv>
          <Text>Protocol Rented Liquidity</Text>
          <Text mt={isMobileScreen() ? '10px' : '0.156vw'}>
            <b>${protocolLiquidity ? formattedNum(protocolLiquidity.protocolRented) : 0}</b>
          </Text>
        </VDiv>
      </HDiv>
    </LiquidityTableWrapper>
  );
};

export default LiquidityTable;
