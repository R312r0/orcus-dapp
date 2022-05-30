/* eslint-disable no-unused-vars */
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import React, {useEffect, useState} from 'react';
import {ethers, FixedNumber} from "ethers";
import UNISWAP_PAIR_ABI from '../../../abis/UniswapPair.json';

import CircularProgress from '@mui/material/CircularProgress';
import DepositingIcon from '../../../assets/icons/DepositingIcon';

import HelpCircleIcon from '../../../assets/icons/HelpCircleIcon';
import LogoIconBlack from '../../../assets/icons/LogoIconBlack';
import OUSDIcon from '../../../assets/icons/OUSDIcon';
import arbABI from '../../../abis/Arbitrager.json';
import {
  ExpandBtn,
  ExpandedData,
  ExpandedDataWrapper,
  AdditionalExpanded,
  AdditionalRow,
  Locked,
  FarmsInputContainer,
  FarmsSlider,
  FarmsTableItem,
  FarmsRow,
  FarmsColumn,
  HDiv,
  IconWrapper,
  MainData,
  Text,
  VDiv,
  VestingBtn,
  VestRewardsBtn,
  ColorfulBtn,
  ColorfulBlock,
  ColorfulBtnContainer,
  HelpCircleContainer,
  MobileFarmsSlider,
  HelpText,
  WithdrawBtn,
  OutlineBtn,
} from './styled';
import {useWeb3React} from "@web3-react/core";
import {useBlockChainContext} from "../../../context/blockchain-context";
import {formattedNum, formatToDecimal} from "../../../utils";
import {CONTRACT_ADDRESSES, MAX_INT, ORU_PER_BLOCK} from "../../../constants";
import ArthIcon from '../../../assets/icons/ArthIcon.png'
import pool from "../../SwapPool/pool";
import {useNavigate} from "react-router";
import fromExponential from "from-exponential";
import ProfitControllerABI from '../../../abis/ProfitController.json';
import PlusIcon from '../../../assets/icons/PlusIcon';
import TrashIcon from '../../../assets/icons/TrashIcon';

import Pandora from '../../../assets/icons/Pandora.png';
import { HDivider } from '../styled';

const PERCENTAGES = {
  1: 0,
  2: 0.25,
  3: 0.5,
  4: 0.75,
  5: 1
}

const MobileTableItm = ({index, item}) => {

  const { account } = useWeb3React();
  const { contracts, signer, liquidity } = useBlockChainContext();
  const navigate = useNavigate();

  const [poolInfo, setPoolInfo] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [expanded, setExpanded] = useState(false);

  const [depositSliderPosition, setDepositSliderPosition] = useState(1);
  const [withdrawSliderPosition, setWithdrawSliderPosition] = useState(1);

  const [depositInput, setDepositInput] = useState(0);
  const [withdrawInput, setWithdrawInput] = useState(0);

  useEffect(() => {

    if (contracts && liquidity) {
        getPoolInfo();
    }

  }, [contracts])


  useEffect(() => {

    if (signer && poolInfo) {
      getUserInfo()
    }

  }, [signer, poolInfo])


  const getPoolInfo = async () => {
    const {MASTER_CHEF, ORU} = contracts;
    const {lpToken} = item;

    const lpPrice = item.liquidity /  (+(await lpToken.totalSupply()) / 1e18);
    const lpBalance = +(await lpToken.balanceOf(CONTRACT_ADDRESSES.MASTER_CHEF)) / 1e18;
    const poolInfo = await MASTER_CHEF.poolInfo(index);

    console.log(poolInfo)

    const apr = (((((liquidity.oruPrice * (ORU_PER_BLOCK / 3) * 86400 * 30 * 12)) / 2) / ((lpPrice * lpBalance)) * 100)).toFixed(0);

    console.log(lpPrice);

    setPoolInfo({
      lockDuration: +poolInfo.lockDuration,
      tvl: lpPrice * lpBalance,
      lpPrice,
      apr
    })

  }

  const getUserInfo = async () => {

      const {MASTER_CHEF} = contracts;
      const {lpToken} = item;

      const balance = await lpToken.balanceOf(account);
      const allowance = await lpToken.allowance(account, CONTRACT_ADDRESSES.MASTER_CHEF);
      const userContractInfo = await MASTER_CHEF.userInfo(index, account);
      const pendingReward = +(await MASTER_CHEF.pendingOru(index, account)) / 1e18;

      const locked = +userContractInfo.depositTime - (+(poolInfo.lockDuration)) >= +(new Date().getTime() / 1000).toFixed(0);
      const currentVestingSlot = +(await MASTER_CHEF.vestingSlot());

      console.log(currentVestingSlot);

      setUserInfo({
        lpBalance: +balance,
        allowance: allowance > 0,
        depositedAmt: +userContractInfo.amount,
        currentVestingSlot,
        pendingReward,
        locked
      })
  }

  const handleApprove = async () => {
    try {

      const {lpToken} = item;

      const tx = await lpToken.connect(signer).approve(CONTRACT_ADDRESSES.MASTER_CHEF, MAX_INT);

      await tx.wait();

      await getUserInfo();

    }
    catch (e) {
      console.log(e.message);
    }
  }

  const handleSlider = (isDeposit, value) => {

    if (isDeposit) {
      const depositAmt = ((userInfo.lpBalance * PERCENTAGES[value]) - ((userInfo.lpBalance * PERCENTAGES[value]) * 0.00005)).toFixed(0)
      setDepositInput(depositAmt)
      setDepositSliderPosition(value);
    }
    else {
      const withdrawAmt = ((userInfo.depositedAmt * PERCENTAGES[value]) - ((userInfo.depositedAmt * PERCENTAGES[value]) * 0.00005)).toFixed(0)
      setWithdrawInput(withdrawAmt);
      setWithdrawSliderPosition(value)
    }
  }

  const handleDeposit = async () => {

    const {MASTER_CHEF} = contracts;

    // const arbitrager = new ethers.Contract("0xbA9244cd96439Ee9eb6b9689D060BF27005F1E01", arbABI, signer);

    try {
      const tx = await MASTER_CHEF.connect(signer).deposit(index, ethers.BigNumber.from(fromExponential(depositInput)), account);
      // const tx = await arbitrager.sellOusd();
      await tx.wait();
      await getUserInfo();
    }
    catch (e) {
      console.log(e.message);
    }
  }
  const proxyNavigation = ( link ) => {
    window.open(
      link,
      '_blank' // <- This is what makes it open in a new window.
    );
  }


  const handleHarvest = async () => {

    const {MASTER_CHEF} = contracts;

    try {
      const tx = await MASTER_CHEF.connect(signer).harvest(index);
      await tx.wait();
      await getUserInfo();
    }
    catch (e) {
      console.log(e.message)
    }
  }
  
  const isMobileScreen = ( ) => {
    let query = window.matchMedia('(max-device-width: 480px)')
    return query.matches
  }
  const handleWithdraw = async () => {
    const {MASTER_CHEF} = contracts;

    try {
      const tx = await MASTER_CHEF.connect(signer).withdraw(index, ethers.BigNumber.from(fromExponential(withdrawInput)));
      await tx.wait();
      await getUserInfo();
    }
    catch (e) {
      console.log(e.message)
    }
  }

  return (
    <FarmsTableItem isExpanded={expanded}>
      <MainData>
        <FarmsRow>
          <IconWrapper h='16px' w='16px'>
            {item.token0.mobileLogo}         
          </IconWrapper> 
          <IconWrapper h='16px' w='16px'>
            {item.token1.mobileLogo}
          </IconWrapper>
          <VDiv ml='0.781vw'>
            <Text fw='500'>
              <b>{item.name}</b>
            </Text>
            <div style={{ display: 'flex', alignItems: 'center', fontSize: '12px' }}>
            Platform:<img src={Pandora} width='12' /> {item.platform.name}
            </div>
          </VDiv>

          <FarmsColumn  style={{flexDirection: 'column', textAlign: 'right', justifyContent: 'end', alignItems: 'end'}}>
              <div style={{fontSize: '10px', color: 'grey'}}>TVL</div>
          <Text>
            <b>${formattedNum(item.tvl)}</b>
          </Text>
          </FarmsColumn>

          <ExpandBtn onClick={() => setExpanded(!expanded)}isExpanded={expanded}>
            <KeyboardArrowDownIcon style={{width:'4vw', height: '4vw'}}/>
          </ExpandBtn>


        </FarmsRow>
      </MainData>
      {expanded ? (
        <>
        <AdditionalExpanded>
          <AdditionalRow>
            <div>Wallet</div>
            <div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
            <IconWrapper >
              <LogoIconBlack />
            </IconWrapper>
            <b>0 ORU</b>
            </div>
          </AdditionalRow>
          <HDivider></HDivider>
          <AdditionalRow>
            <div>Deposited</div>
            <div><b>$ {formattedNum(item.deposited.lp) ?? '0'}</b></div>
          </AdditionalRow>    
          <HDivider></HDivider>   
          <AdditionalRow>
            <div>APY</div>
            <div><b>{formattedNum(item.apr)}</b></div>
          </AdditionalRow>    
          <HDivider></HDivider>      
          <AdditionalRow>
            <div>Daily</div>
            <div>
            <b>{formattedNum(item.apr / 365)}%</b></div>
          </AdditionalRow>
          <button style={{width: '100%',background: '#333333',
border: '1px solid #E0E0E0',
borderRadius: '30px', color: 'white', height: '41px'}} onClick={() => navigate(`/vaults/${item.id}`)}>Get</button>
        </AdditionalExpanded>
        </>
      ) : null}
    </FarmsTableItem>
    
  );
};

export default MobileTableItm;
