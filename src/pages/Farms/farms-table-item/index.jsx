/* eslint-disable no-unused-vars */
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import React, {useEffect, useState} from 'react';
import {ethers} from "ethers";
import UNISWAP_PAIR_ABI from '../../../abis/UniswapPair.json';

import DepositingIcon from '../../../assets/icons/DepositingIcon';
import HelpCircleIcon from '../../../assets/icons/HelpCircleIcon';
import LogoIcon from '../../../assets/icons/LogoIcon';
import OUSDIcon from '../../../assets/icons/OUSDIcon';
import {
  ExpandBtn,
  ExpandedData,
  ExpandedDataWrapper,
  FarmsInputContainer,
  FarmsSlider,
  FarmsTableItem,
  HDiv,
  IconWrapper,
  MainData,
  Text,
  VDiv,
  VestingBtn,
  VestRewardsBtn,
  WithdrawBtn,
} from './styled';
import {useWeb3React} from "@web3-react/core";
import {useBlockChainContext} from "../../../context/blockchain-context";
import {formattedNum, formatToDecimal} from "../../../utils";
import {CONTRACT_ADDRESSES, MAX_INT, ORU_PER_BLOCK} from "../../../constants";
import pool from "../../SwapPool/pool";

const PERCENTAGES = {
  1: 0,
  2: 0.25,
  3: 0.5,
  4: 0.75,
  5: 1
}

const FarmsTableItm = ({index, item}) => {

  const { account } = useWeb3React();
  const { contracts, signer, liquidity } = useBlockChainContext();

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
    const {MASTER_CHEF} = contracts;
    const {lpToken} = item;

    const lpPrice = item.liquidity /  (+(await lpToken.totalSupply()) / 1e18);
    const lpBalance = +(await lpToken.balanceOf(CONTRACT_ADDRESSES.MASTER_CHEF)) / 1e18;
    const poolInfo = await MASTER_CHEF.poolInfo(index);

    const apr = (((((liquidity.oruPrice * ORU_PER_BLOCK * 86400 * 30 * 12)) / 2) / ((lpPrice * lpBalance)) * 100)).toFixed(0);

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
        lpBalance: +balance / 1e18,
        allowance: allowance > 0,
        depositedAmt: +userContractInfo.amount / 1e18,
        currentVestingSlot,
        pendingReward,
        locked
      })
  }

  const handleApprove = async () => {
    try {

      const {lpToken} = item;

      console.log(lpToken);

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
      setDepositInput(userInfo.lpBalance * PERCENTAGES[value])
      setDepositSliderPosition(value);
    }
    else {
      setWithdrawInput(userInfo.depositedAmt * PERCENTAGES[value])
      setWithdrawSliderPosition(value)
    }
  }

  const handleDeposit = async () => {

    const {MASTER_CHEF} = contracts;

    try {
      // const tx = await MASTER_CHEF.connect(signer).deposit(index, depositInput.toString(), account);
      const tx = await MASTER_CHEF.connect(signer).massUpdatePools();
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

    const amt = withdrawInput * 1e18;

    try {
      const tx = await MASTER_CHEF.connect(signer).withdraw(index, amt.toFixed(0));
      await tx.wait();
      await getUserInfo();
    }
    catch (e) {
      console.log(e.message)
    }
  }

  const handleClaim = async () => {
    const {MASTER_CHEF} = contracts;

    try {
      const tx = await MASTER_CHEF.connect(signer).claim(index, userInfo.currentVestingSlot);
      await tx.wait();
      await getUserInfo();
    }
    catch (e) {
      alert("Vesting does not pass yet!");
    }
  }

  return (
    <FarmsTableItem isExpanded={expanded}>
      <MainData>
        <HDiv alignItems='center'>
          <IconWrapper>
            {item.token0Icon}
          </IconWrapper>
          <IconWrapper>
            {item.token1Icon}
          </IconWrapper>
          <VDiv ml='0.781vw'>
            <Text>
              <b>{item.name}</b>
            </Text>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <DepositingIcon />
              <Text fontSize='0.729vw' lineHeight='1.094vw' ml='0.313vw'>
                ArthSwap
              </Text>
            </div>
          </VDiv>
          <IconWrapper ml='8.698vw'>
            <LogoIcon />
          </IconWrapper>
          <Text ml='0.7vw'>
            <b>ORU</b>
          </Text>
          <Text ml='7.813vw' minW='12.552vw'>
            <b>${poolInfo && userInfo ? formattedNum(poolInfo.lpPrice * userInfo.depositedAmt) : 0}</b>
          </Text>
          <Text minW='11.979vw'>
            <b>${poolInfo ? formattedNum(poolInfo?.tvl) : 0}</b>
          </Text>
          <Text>APR</Text>
          <Text ml='0.885vw' minW='11vw'>
            <b>{poolInfo ? formattedNum(poolInfo.apr) : 0}%</b>
          </Text>
          <ExpandBtn
            onClick={() => setExpanded(!expanded)}
            isExpanded={expanded}
          >
            <KeyboardArrowDownIcon />
          </ExpandBtn>
        </HDiv>
      </MainData>
      {expanded ? (
        <ExpandedDataWrapper>
          <ExpandedData>
            <VDiv w='33.021vw'>
              <HDiv>
                <Text ml='0.833vw'>Balance:&nbsp;</Text>
                <Text>
                  <b>{userInfo ? userInfo.lpBalance : 0.00}&nbsp;</b>
                </Text>
                <Text>{item.name} </Text>
              </HDiv>
              <FarmsInputContainer>
                <input type='text'
                       disabled={true}
                       value={depositInput}/>
                <Text>
                  <b>{item.name}</b>
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
                {userInfo ? userInfo.allowance ? "Deposit" : "Approve" : null}
              </VestingBtn>
              <HDiv mt='2.708vw'>
                <Text>
                  <b>Add Liquidity</b>
                </Text>
                <Text ml='1.875vw'>
                  <b>Remove Liquidity</b>
                </Text>
              </HDiv>
            </VDiv>
            <VDiv w='33.021vw' ml='10.260vw'>
              <HDiv>
                <Text ml='0.833vw'>Balance:&nbsp;</Text>
                <Text>
                  <b>{userInfo ? userInfo.depositedAmt : 0.0}&nbsp;</b>
                </Text>
                <Text>{item.name} </Text>
              </HDiv>
              <FarmsInputContainer>
                <input type='text'
                       disabled={true}
                       value={withdrawInput}
                       />
                <Text>
                  <b>{item.name}</b>
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
              <WithdrawBtn
                  disabled={userInfo && userInfo.locked}
                  onClick={() => handleWithdraw()}
              >
                {userInfo ? userInfo.locked ? "Withdraw is locked!" : "Withdraw" : null}
              </WithdrawBtn>
              <HDiv mt='2.240vw' justifyContent='flex-end' alignItems='center'>
                <Text mr='0.573vw'>
                  <b>Rewards: {userInfo ? formattedNum(userInfo.pendingReward) : 0} ORU</b>
                </Text>
                <HelpCircleIcon />
                <VestRewardsBtn disabled={userInfo ? userInfo.pendingReward === 0 : true} onClick={() => handleHarvest()}>Harvest Rewards</VestRewardsBtn>
                <VestRewardsBtn onClick={() => handleClaim()}>Claim</VestRewardsBtn>
              </HDiv>
            </VDiv>
          </ExpandedData>
        </ExpandedDataWrapper>
      ) : null}
    </FarmsTableItem>
  );
};

export default FarmsTableItm;
