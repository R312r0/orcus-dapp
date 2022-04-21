import React, {useEffect, useState} from 'react';

import FarmsTableItm from './farms-table-item';
import {CONTRACT_ADDRESSES, MASTER_CHEF_POOLS} from '../../constants'
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
import {ethers} from "ethers";
import UNISWAP_PAIR_ABI from "../../abis/UniswapPair.json";
import {useBlockChainContext} from "../../context/blockchain-context";
import LogoIcon from "../../assets/icons/LogoIcon";
import USDCIcon from "../../assets/icons/USDCIcon";
import OUSDIcon from "../../assets/icons/OUSDIcon";
import {formattedNum} from "../../utils";

const Array = [1, 2, 3];

const Farms = () => {

  const {contracts, liquidity} = useBlockChainContext();
  const [masterChefPools, setMasterChefPools] = useState(null);
  const [farmsTVL, setFarmsTVL] = useState(null);

  useEffect(() => {

    if (contracts && liquidity) {
        init();
    }

  }, [contracts, liquidity]);

  const init = async () => {

    const {ORU_USDC, OUSD_USDC, OUSD_ORU} = contracts;

    const oruUSDCTVL =
        (+(await ORU_USDC.balanceOf(CONTRACT_ADDRESSES.MASTER_CHEF)) / 1e18) *
        (liquidity.oruUsdcLiq / (+(await ORU_USDC.totalSupply()) / 1e18 ));

    const ousdUSDCTVL =
        (+(await OUSD_USDC.balanceOf(CONTRACT_ADDRESSES.MASTER_CHEF)) / 1e18) *
        (liquidity.ousdUsdcLiq / (+(await OUSD_USDC.totalSupply()) / 1e18 ));

    const ousdOruTVL =
        (+(await OUSD_ORU.balanceOf(CONTRACT_ADDRESSES.MASTER_CHEF)) / 1e18) *
        (liquidity.oruOusdLiq / (+(await OUSD_ORU.totalSupply()) / 1e18 ));

    setFarmsTVL(oruUSDCTVL + ousdUSDCTVL + ousdOruTVL);

    setMasterChefPools([
        {name: "ORU/USDC", lpToken: ORU_USDC, liquidity:  liquidity.oruUsdcLiq, token0Icon: <LogoIcon/>, token1Icon: <USDCIcon/>},
        {name: "oUSD/USDC", lpToken: OUSD_USDC, liquidity: liquidity.ousdUsdcLiq,token0Icon: <OUSDIcon/>, token1Icon: <USDCIcon/>},
        {name: "oUSD/ORU", lpToken: OUSD_ORU, liquidity:  liquidity.oruOusdLiq,token0Icon: <OUSDIcon/>, token1Icon: <LogoIcon/>},
    ])

  }

  return (
    <FarmsWrapper>
      <HDiv justifyContent='space-between' alignItems='flex-start'>
        <VDiv>
          <HeadingText>Farms TVL</HeadingText>
          <Balance>$ {farmsTVL ? formattedNum(farmsTVL) : null}</Balance>
        </VDiv>
        <VDiv>
          {/*<TotalHarvestedInfo>*/}
          {/*  <span>Total harvested rewards </span>*/}
          {/*  <div />*/}
          {/*  <b>0.0 ORU</b>*/}
          {/*</TotalHarvestedInfo>*/}
          {/*<RewardBtn>Rewards vesting</RewardBtn>*/}
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
        {masterChefPools && masterChefPools.map((item, idx) => (
          <FarmsTableItm key={idx} index={idx} item={item} />
        ))}
      </FarmsTableWrapper>
    </FarmsWrapper>
  );
};

export default Farms;
