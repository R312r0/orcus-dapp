import React, {useEffect, useState} from 'react';

import { Divider, HDiv, ProtocolTableWrapper, Text } from './styled';
import {useBlockChainContext} from "../../../context/blockchain-context";
import {CONTRACT_ADDRESSES} from "../../../constants";
import {formattedNum} from "../../../utils";

const ProtocolTable = ({setProtocolTVL}) => {

    const {contracts, liquidity} = useBlockChainContext();
    const [info, setInfo] = useState(null);

    useEffect(() => {

        if (contracts && liquidity) {
            getInfo();
        }

    }, [contracts, liquidity])


    const getInfo = async () => {

        const {USDC, BANK_SAFE, ORU, PRICE_ORACLE, ORU_USDC, OUSD_USDC, OUSD_ORU} = contracts

        const oruUSDCTVL =
            (+(await ORU_USDC.balanceOf(CONTRACT_ADDRESSES.MASTER_CHEF)) / 1e18) *
            (liquidity.oruUsdcLiq / (+(await ORU_USDC.totalSupply()) / 1e18 ));

        const ousdUSDCTVL =
            (+(await OUSD_USDC.balanceOf(CONTRACT_ADDRESSES.MASTER_CHEF)) / 1e18) *
            (liquidity.ousdUsdcLiq / (+(await OUSD_USDC.totalSupply()) / 1e18 ));

        const ousdOruTVL =
            (+(await OUSD_ORU.balanceOf(CONTRACT_ADDRESSES.MASTER_CHEF)) / 1e18) *
            (liquidity.oruOusdLiq / (+(await OUSD_ORU.totalSupply()) / 1e18 ));


        const bankTVL = (+(await USDC.balanceOf(CONTRACT_ADDRESSES.BANK_SAFE)) / 1e6) + (+(await BANK_SAFE.balanceOfAToken()) / 1e6);
        const farmTVL = oruUSDCTVL + ousdUSDCTVL + ousdOruTVL; // TODO: change it.
        const stakeTVL = (+(await ORU.balanceOf(CONTRACT_ADDRESSES.ORU_STAKE)) / 1e18) * (+(await PRICE_ORACLE.oruPrice()) / 1e6);
        const protocolTVL = bankTVL + farmTVL + stakeTVL

        setProtocolTVL(protocolTVL)

        setInfo({
            bankTVL,
            farmTVL,
            stakeTVL,
            protocolTVL
        })



    }


  return (
    <ProtocolTableWrapper>
      <HDiv>
        <Text>
          <b>Protocol TVL</b>
        </Text>
        <Text>
          <b>${info ? formattedNum(info.protocolTVL) : 0}</b>
        </Text>
      </HDiv>
      <HDiv mt='1.094vw'>
        <Text>Bank</Text>
        <Text>${info ? formattedNum(info.bankTVL) : 0}</Text>
      </HDiv>
      <Divider />
      <HDiv>
        <Text>Farm</Text>
        <Text>${info ? formattedNum(info.farmTVL) : 0}</Text>
      </HDiv>
      <Divider />
      <HDiv>
        <Text>Stake</Text>
        <Text>${info ? formattedNum(info.stakeTVL) : 0}</Text>
      </HDiv>
    </ProtocolTableWrapper>
  );
};

export default ProtocolTable;
