import React, {useEffect, useState} from 'react';

import { Divider, HDiv, ProtocolTableWrapper, Text } from './styled';
import {useBlockChainContext} from "../../../context/blockchain-context";
import {CONTRACT_ADDRESSES} from "../../../constants";
import {formattedNum} from "../../../utils";

const ProtocolTable = ({protocolTvl}) => {

    const {contracts} = useBlockChainContext();
    const [addTvl, setAddTvl] = React.useState(null);

    useEffect(() => {

        if (contracts && protocolTvl) {
            getAdditionalTVL()
        }

    }, [contracts, protocolTvl])

    const getAdditionalTVL = async () => {

        const {BANK_SAFE, ORU_STAKE, USDC, IUSDC, ORU} = contracts;

        const bankTVL = (+(await USDC.balanceOf(BANK_SAFE.address)) / 1e6) + (+(await IUSDC.balanceOf(BANK_SAFE.address) / 1e6));
        const oruStakeTVL = (+(await ORU.balanceOf(ORU_STAKE.address)) / 1e18) * protocolTvl.oruPrice;

        setAddTvl({bankTVL, oruStakeTVL});
    }

    const isMobileScreen = ( ) => {
      let query = window.matchMedia('(max-device-width: 480px)')
      return query.matches
    }

  return (
    <ProtocolTableWrapper>
      <HDiv>
        <Text>
          <b>Protocol TVL</b>
        </Text>
        <Text>
          <b>${protocolTvl ? formattedNum(protocolTvl.pair) : 0}</b>
        </Text>
      </HDiv>
      <HDiv mt={!isMobileScreen() ? '1.094vw' : '16px'}>
        <Text>Bank</Text>
        <Text>${protocolTvl ? formattedNum(addTvl?.bankTVL) : 0}</Text>
      </HDiv>
      <Divider />
      <HDiv>
        <Text>Farm</Text>
        <Text>${protocolTvl ? formattedNum(protocolTvl.farm) : 0}</Text>
      </HDiv>
      <Divider />
      <HDiv>
        <Text>Stake</Text>
        <Text>${protocolTvl ? formattedNum(addTvl?.oruStakeTVL) : 0}</Text>
      </HDiv>
    </ProtocolTableWrapper>
  );
};

export default ProtocolTable;
