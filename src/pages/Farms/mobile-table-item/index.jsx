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
          <IconWrapper h='6vw' w='6vw'>
            {item.token0Icon}
          </IconWrapper>
          <IconWrapper h='6vw' w='6vw'>
            {item.token1Icon}
          </IconWrapper>
          <VDiv ml='0.781vw'>
            <Text>
              <b>{item.name}</b>
            </Text>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src={ArthIcon} width={12} height={12} />
              <Text fontSize='0.729vw' lineHeight='1.094vw' ml='0.313vw'>
                ArthSwap
              </Text>
            </div>
          </VDiv>

          {/* <FarmsColumn center>  */}
          {/* <IconWrapper >
            <LogoIconBlack />
          </IconWrapper> */}
          {/* <Text ml='0.7vw'>
            <b>ORU</b>
          </Text> */}
          {/* </FarmsColumn> */}
          {/* <FarmsColumn center>
          <Text
           >
            <b>${poolInfo && userInfo ? formattedNum(poolInfo.lpPrice * (userInfo.depositedAmt / 1e18)) : 0}</b>
          </Text>
          </FarmsColumn> */}
          {/* <FarmsColumn center>
          <Text >
            <b>${poolInfo ? formattedNum(poolInfo?.tvl) : 0}</b>
          </Text>
          </FarmsColumn>
          <FarmsColumn center>
          <Text>APR</Text>
          <Text ml='0.885vw' 

          >
            <b>{poolInfo ? formattedNum(poolInfo.apr) : 0}%</b>
          </Text>
          </FarmsColumn> */}
          <FarmsColumn  style={{flexDirection: 'column', textAlign: 'right', justifyContent: 'end', alignItems: 'end'}}>
              <div style={{fontSize: '10px', color: 'grey'}}>TVL</div>
          <Text>
            <b>${poolInfo ? formattedNum(poolInfo?.tvl) : 0}</b>
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
            <div>Rewards</div>
            <div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
            <IconWrapper >
              <LogoIconBlack />
            </IconWrapper>
            <b>ORU</b>
            </div>
          </AdditionalRow>
          <HDivider></HDivider>
          <AdditionalRow>
            <div>Deposited</div>
            <div><b>$ {poolInfo && userInfo ? formattedNum(poolInfo.lpPrice * (userInfo.depositedAmt / 1e18)) : 0}</b></div>
          </AdditionalRow>    
          <HDivider></HDivider>      
          <AdditionalRow>
            <div>Rates</div>
            <div>
              APR <b>{poolInfo ? formattedNum(poolInfo.apr) : 0}%</b></div>
          </AdditionalRow>
        </AdditionalExpanded>
        <ExpandedDataWrapper>
          <ExpandedData>
            <VDiv w='100%'>
              <HDiv>
                <Text color='#4F4F4F' fW='300' ml='0.833vw'>Balance: {userInfo ? formattedNum(userInfo.lpBalance / 1e18) : 0.00} {item.name} </Text>
                <Text>
                  <b></b>
                </Text>
              </HDiv>
              <FarmsInputContainer>
                <input type='text'
                       disabled={true}
                       value={fromExponential(depositInput / 1e18)}/>
                <Text>
                  <b>{item.name}</b>
                </Text>
              </FarmsInputContainer>
              <MobileFarmsSlider
                className='range-slider-filter'
                defaultValue={depositSliderPosition}
                marks
                step={1}
                min={1}
                max={5}
                onChange={({target}) => handleSlider(true,target.value)}
                disabled={!userInfo || userInfo.lpBalance === 0}
              />
              <HDiv mt='0.677vw'>
                <Text>
                  <b>0%</b>
                </Text>
                <Text ml='6.354vw'>
                  <b>25%</b>
                </Text>
                <Text ml='6vw'>
                  <b>50%</b>
                </Text>
                <Text ml='5.9vw'>
                  <b>75%</b>
                </Text>
                <Text ml='5.7vw'>
                  <b>100%</b>
                </Text>
              </HDiv>
              <VestingBtn
                  disabled={!signer}
                  onClick={() => userInfo ? userInfo.allowance ? handleDeposit() : handleApprove() : null}>
                {userInfo ? userInfo.allowance ? "Deposit" : "Approve" : <CircularProgress size='1.5rem' color='inherit'/>}
              </VestingBtn>
              <HDiv mt='1.708vw' style={{display: 'flex', justifyContent: 'space-between'}}>
                <OutlineBtn gap='12px' onClick={() => proxyNavigation(item.addURL)} width={ isMobileScreen() ? '48%' : '15.8vw'}>
                  <PlusIcon ratio={isMobileScreen() ? '5vw' : undefined} color='#333'></PlusIcon>
                  Add Liquidity
                </OutlineBtn>
                <OutlineBtn gap='12px' onClick={() => proxyNavigation(item.removeURL)} width={ isMobileScreen() ? '48%' : '15.8vw'}>
                  <TrashIcon ratio={isMobileScreen() ? '5vw' : undefined} ></TrashIcon>
                  Remove Liquidity

                </OutlineBtn>
              </HDiv>
            </VDiv>
            <VDiv w='100%' style={{marginTop: '24px'}}>
              <HDiv>
                <Text ml='0.833vw'>Balance: {userInfo ?  fromExponential(userInfo.depositedAmt / 1e18) : 0.0}&nbsp;{item.name} </Text>
                <Text>
                  
                </Text>

              </HDiv>
              <FarmsInputContainer>
                <input type='text'
                       disabled={true}
                       value={fromExponential(withdrawInput / 1e18)}
                       />
                <Text>
                  <b>{item.name}</b>
                </Text>
              </FarmsInputContainer>
              
              <MobileFarmsSlider
                className='range-slider-filter'
                defaultValue={withdrawSliderPosition}
                marks
                step={1}
                min={1}
                max={5}
                onChange={({target}) => handleSlider(true,target.value)}
                disabled={!userInfo || userInfo.depositedAmt === 0}
              />
              <HDiv mt='0.677vw'>
                <Text>
                  <b>0%</b>
                </Text>
                <Text ml='6.354vw'>
                  <b>25%</b>
                </Text>
                <Text ml='6vw'>
                  <b>50%</b>
                </Text>
                <Text ml='5.9vw'>
                  <b>75%</b>
                </Text>
                <Text ml='5.7vw'>
                  <b>100%</b>
                </Text>
              </HDiv>
              <OutlineBtn
                  mt='32px'
                  disabled={userInfo && userInfo.locked}
                  onClick={() => handleWithdraw()}
              >
                {userInfo ? userInfo.locked ? "Withdraw is locked!" : "Withdraw" : <CircularProgress size='1.5rem' color='inherit'/>}
              </OutlineBtn>
              { index === 1 ? <Locked>3 days of lockup</Locked> : <></>}
              <HDiv mt='2.240vw' justifyContent='space-between' alignItems='center'>
                <div style={{display: 'flex', gap: '4px'}}>
                <HelpCircleContainer>
                  <HelpCircleIcon ratio='3vw'/>
                <HelpText>
                  To start vesting rewards please click on Start Vesting at first, then you will be eligible to claim<br/><br/>
                  Early exit penalty until 4 weeks - 50%
                  </HelpText>
                </HelpCircleContainer>
                <Text color='#333' fw='500' fontSize='12px' mr='0.573vw'>
                  Pending Rewards:<br/> {userInfo ? formattedNum(userInfo.pendingReward) : 0} ORU
                </Text>
                </div>
                
                  <ColorfulBtnContainer>
                  <ColorfulBlock width='105px' bgColor='#DEC9FF'></ColorfulBlock>
                  <ColorfulBlock width='105px' bgColor='#C1FCC9' ml='-45px'></ColorfulBlock>
                  <ColorfulBlock width='105px'  bgColor='#FEEFB5' ml='-45px'></ColorfulBlock>
                <ColorfulBtn onClick={() => handleHarvest()}>
                  Start vesting
                </ColorfulBtn>
                </ColorfulBtnContainer>
              </HDiv>
            </VDiv>
          </ExpandedData>
        </ExpandedDataWrapper>
        </>
      ) : null}
    </FarmsTableItem>
    
  );
};

export default MobileTableItm;
