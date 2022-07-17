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
  FarmsInputContainer,
  FarmsSlider,
  FarmsTableItem,
  FarmsRow,
  FarmsColumn,
  Locked,
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
  HelpText,
  WithdrawBtn,
  OutlineBtn,
} from './styled';
import {useWeb3React} from "@web3-react/core";
import {useBlockChainContext} from "../../../context/blockchain-context";
import {formattedNum, formatToDecimal} from "../../../utils";
import {CONTRACT_ADDRESSES, MAX_INT, ORU_PER_BLOCK} from "../../../constants";
import ArthIcon from '../../../assets/icons/ArthIcon.png'
import fromExponential from "from-exponential";
import PlusIcon from '../../../assets/icons/PlusIcon';
import TrashIcon from '../../../assets/icons/TrashIcon';

const PERCENTAGES = {
  1: 0,
  2: 0.25,
  3: 0.5,
  4: 0.75,
  5: 1
}

const FarmsTableItm = ({index, item}) => {

  const { account } = useWeb3React();
  const { contracts, signer } = useBlockChainContext();

  const [poolInfo, setPoolInfo] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [expanded, setExpanded] = useState(false);

  const [depositSliderPosition, setDepositSliderPosition] = useState(1);
  const [withdrawSliderPosition, setWithdrawSliderPosition] = useState(1);

  const [depositInput, setDepositInput] = useState(0);
  const [withdrawInput, setWithdrawInput] = useState(0);

  useEffect(() => {

    if (contracts && item && !userInfo) {
        getPoolInfo();
    }

  }, [contracts, item])

  const proxyNavigation = ( link ) => {
    window.open(
      link,
      '_blank' // <- This is what makes it open in a new window.
    );
  }

  useEffect(() => {

    if (signer && poolInfo) {
      getUserInfo()
    }

  }, [signer, poolInfo])


  const getPoolInfo = async () => {
    const {MASTER_CHEF} = contracts;

    const poolInfo = await MASTER_CHEF.poolInfo(index);

    setPoolInfo({
      lockDuration: +poolInfo.lockDuration,
      tvl: item.tvl,
      lpPrice: item.lpPrice,
      apr: item.apr
    })

  }

  const getUserInfo = async () => {

      const {MASTER_CHEF} = contracts;
      const {lpToken} = item;

      const balance = await lpToken.connect(signer).balanceOf(account);
      const allowance = await lpToken.connect(signer).allowance(account, CONTRACT_ADDRESSES.MASTER_CHEF);
      const userContractInfo = await MASTER_CHEF.userInfo(index, account);
      const pendingReward = +(await MASTER_CHEF.pendingOru(index, account)) / 1e18;

      const locked = +userContractInfo.depositTime - (+(poolInfo.lockDuration)) >= +(new Date().getTime() / 1000).toFixed(0);
      const currentVestingSlot = +(await MASTER_CHEF.vestingSlot());

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

    try {
      const tx = await MASTER_CHEF.connect(signer).deposit(index, ethers.BigNumber.from(fromExponential(depositInput)), account);
      await tx.wait();
      await getUserInfo();
    }
    catch (e) {
      console.log(e.message);
    }
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
          <FarmsColumn>
          <IconWrapper>
            {item.token0Icon}
          </IconWrapper>
          <IconWrapper>
            {item.token1Icon}
          </IconWrapper>
          <VDiv ml='0.781vw'>
            <Text>
              <b>{item.name.toUpperCase()}</b>
            </Text>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src={ArthIcon} width={15} height={15} />
              <Text fontSize='0.729vw' lineHeight='1.094vw' ml='0.313vw'>
                ArthSwap
              </Text>
            </div>
          </VDiv>
          </FarmsColumn>
          <FarmsColumn center> 
          <IconWrapper 

          >
            <LogoIconBlack />
          </IconWrapper>
          <Text ml='0.7vw'>
            <b>ORU</b>
          </Text>
          </FarmsColumn>
          <FarmsColumn center>
          <Text
           >
            <b>${poolInfo && userInfo ? formattedNum(poolInfo.lpPrice * (userInfo.depositedAmt / 1e18)) : 0}</b>
          </Text>
          </FarmsColumn>
          <FarmsColumn center>
          <Text 

          >
            <b>${poolInfo ? formattedNum(poolInfo?.tvl) : 0}</b>
          </Text>
          </FarmsColumn>
          <FarmsColumn center>
          <Text>APR</Text>
          <Text ml='0.885vw' 

          >
            <b>{poolInfo ? formattedNum(poolInfo.apr) : 0}%</b>
          </Text>
          </FarmsColumn>
          <FarmsColumn center>
          <ExpandBtn
            onClick={() => setExpanded(!expanded)}
            isExpanded={expanded}
          >
            <KeyboardArrowDownIcon />
          </ExpandBtn>
          </FarmsColumn>

        </FarmsRow>
      </MainData>
      {expanded ? (
        <ExpandedDataWrapper>
          <ExpandedData>
            <VDiv w='33.021vw'>
              <HDiv>
                <Text ml='0.833vw'>Balance:&nbsp;</Text>
                <Text>
                  <b>{userInfo ? formattedNum(userInfo.lpBalance / 1e18) : 0.00}&nbsp;</b>
                </Text>
                <Text>{item.name.toUpperCase()} </Text>
              </HDiv>
              <FarmsInputContainer>
                <input type='text'
                       disabled={true}
                       value={fromExponential(depositInput / 1e18)}/>
                <Text>
                  <b>{item.name.toUpperCase()}</b>
                </Text>
              </FarmsInputContainer>
              <FarmsSlider
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
                {/* put loader in '' */}
              </VestingBtn>
              <HDiv mt='1.708vw' style={{display: 'flex', justifyContent: 'space-between'}}>
                <OutlineBtn gap='12px' onClick={() => proxyNavigation(item.addURL)} width='15.8vw'>
                  <PlusIcon color='#333'></PlusIcon>
                  <Text>
                    <b>Add Liquidity</b>
                  </Text>
                </OutlineBtn>
                <OutlineBtn gap='12px' onClick={() => proxyNavigation(item.removeURL)} width='15.8vw'>
                  <TrashIcon></TrashIcon>
                  <Text>
                  <b>Remove Liquidity</b>
                  </Text>
                </OutlineBtn>
              </HDiv>
            </VDiv>
            <VDiv w='33.021vw' ml='10.260vw'>
              <HDiv>
                <Text ml='0.833vw'>Deposited:&nbsp;</Text>
                <Text>
                  <b>{userInfo ?  fromExponential(userInfo.depositedAmt / 1e18) : 0.0}&nbsp;</b>
                </Text>
                <Text>{item.name.toUpperCase()} </Text>
              </HDiv>
              <FarmsInputContainer>
                <input type='text'
                       disabled={true}
                       value={fromExponential(withdrawInput / 1e18)}
                       />
                <Text>
                  <b>{item.name.toUpperCase()}</b>
                </Text>
              </FarmsInputContainer>
              <FarmsSlider
                className='range-slider-filter'
                defaultValue={withdrawSliderPosition}
                marks
                step={1}
                min={1}
                max={5}
                onChange={({target}) => handleSlider(false, target.value)}
                disabled={!userInfo || userInfo.depositedAmt === 0} // TODO: change this for withdraw info.
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
                  mt='2vw'
                  disabled={userInfo && userInfo.locked}
                  onClick={() => handleWithdraw()}
              >
                {userInfo ? userInfo.locked ? "Withdraw is locked!" : "Withdraw" :  <CircularProgress size='1.5rem' color='inherit'/>}
              </OutlineBtn>
              { index === 1 ? <Locked>3 days of lockup</Locked> : <></>}
              <HDiv mt={index === 1 ? '0.840vw' : '2.240vw'}   justifyContent='flex-end' alignItems='center'>
                <Text mr='0.573vw'>
                  <b>Rewards: {userInfo ? formattedNum(userInfo.pendingReward) : 0} ORU</b>
                </Text>
                <HelpCircleContainer>
                  <HelpCircleIcon />
                  <HelpText>
                  To start vesting rewards please click on Start Vesting at first, then you will be eligible to claim<br/><br/>
                  Early exit penalty until 4 weeks - 50%
                  </HelpText>
                </HelpCircleContainer>
                <ColorfulBtnContainer>
                <ColorfulBlock width='10vw' bgColor='#DEC9FF'></ColorfulBlock>
                <ColorfulBlock width='10vw' bgColor='#C1FCC9' ml='-4vw'></ColorfulBlock>
                <ColorfulBlock width='8vw'  bgColor='#FEEFB5' ml='-4vw'></ColorfulBlock>
                <ColorfulBtn onClick={() => handleHarvest()}>
                  Start vesting
                </ColorfulBtn>
                </ColorfulBtnContainer>
              </HDiv>
            </VDiv>
          </ExpandedData>
        </ExpandedDataWrapper>
      ) : null}
    </FarmsTableItem>
  );
};

export default FarmsTableItm;
