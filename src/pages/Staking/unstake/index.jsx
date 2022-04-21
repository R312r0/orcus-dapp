import React, {useEffect, useState} from 'react';

import ArrowDownIcon from '../../../assets/icons/ArrowDownIcon';
import CalendarIcon from '../../../assets/icons/CalendarIcon';
import ClipboardIcon from '../../../assets/icons/ClipboardIcon';
import LogoIcon from '../../../assets/icons/LogoIcon';
import {
  Divider,
  HDiv,
  HDivider,
  IconWrapper,
  PercentageContainer,
  Text,
  UnstakeBlockWrapper,
  UnstakeBtn,
  UnstakeDataText,
  UnstakeDataWrapper,
  UnstakeInputWrapper,
} from './styled';
import {useWeb3React} from "@web3-react/core";
import {useBlockChainContext} from "../../../context/blockchain-context";
import {CONTRACT_ADDRESSES, MAX_INT} from "../../../constants";
import {formattedNum, formatToDecimal} from "../../../utils";
import {StakeBtn} from "../stake/styled";

const Unstake = () => {

  const {account} = useWeb3React();
  const {contracts, connectWallet, signer} = useBlockChainContext();

  const [xoruInput, setXOruInput] = useState(0);

  const [stakingInfo, setStakingInfo] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {

    if (contracts) {
      getStakingInfo();
    }

  },[contracts])

  useEffect(() => {

    if (account) {
      getUserInfo();
    }

  }, [account])

  const getStakingInfo = async () => {

    const {ORU,PRICE_ORACLE} = contracts;

    const tvl = ((+(await PRICE_ORACLE.oruPrice())) / 1e6) * (+(await ORU.balanceOf(CONTRACT_ADDRESSES.ORU_STAKE)) / 1e18);

    setStakingInfo({
      tvl,
    })
  }

  const getUserInfo = async () => {

    const {ORU, XORU} = contracts;
    const allowance = await XORU.allowance(account, CONTRACT_ADDRESSES.ORU_STAKE) > 0;

    const balances = {
      oru: +(await ORU.balanceOf(account)) / 1e18,
      xoru: +(await XORU.balanceOf(account)) / 1e18
    }

    setUserInfo({
      balances,
      allowance
    })
  }

  const approve = async () => {
    try {
      const tx = await contracts.XORU.connect(signer).approve(CONTRACT_ADDRESSES.ORU_STAKE, MAX_INT);
      await tx.wait();
      await getStakingInfo();
      await getUserInfo();
    }
    catch (e) {
      console.error(e.message);
    }
  }

  const withdraw = async () => {
    try {
      const tx = await contracts.ORU_STAKE.connect(signer).unstake(formatToDecimal(xoruInput, 18))
      await tx.wait();
      await getStakingInfo();
      await getUserInfo();
    }
    catch (e) {
      console.error(e.message);
    }
  }

  const UnstakeButton = () => {

    if (account && userInfo) {

      if(!userInfo.allowance) {
        return <UnstakeBtn onClick={() => approve()}>Approve xORU</UnstakeBtn>
      }

      else if (userInfo.balances.xoru < xoruInput) {
        return <UnstakeBtn disabled={true}> Insufficient xORU balance </UnstakeBtn>
      }

      else {
        return <UnstakeBtn onClick={() => withdraw()}> Withdraw </UnstakeBtn>
      }
    }

    else {
      return <UnstakeBtn onClick={() => connectWallet()}>Connect Wallet</UnstakeBtn>
    }
  }


  return (
    <>
      <UnstakeBlockWrapper>
        <HDiv>
          <Text>
            <b>Staking</b>
          </Text>
          <PercentageContainer>
            <Text>
              <b>3004.14% APR</b>
            </Text>
          </PercentageContainer>
        </HDiv>
        <HDiv mt='1.094vw'>
          <Text>Unstake ORU using xORU</Text>
          <Text>Balance: {userInfo ? formattedNum(userInfo.balances.xoru) : 0}</Text>
        </HDiv>
        <UnstakeInputWrapper withBtn>
          <input type='text' placeholder='0.0' value={xoruInput} onChange={(e) => setXOruInput(e.target.value)}/>
          <button>Max</button>
          <Divider />
          <IconWrapper fill='#000' margin='0 0.833vw 0 0'>
            <LogoIcon />
          </IconWrapper>
          ORU
        </UnstakeInputWrapper>
        <IconWrapper margin='1.719vw 0 0 0'>
          <ArrowDownIcon />
        </IconWrapper>
        <HDiv>
          <Text>Receiving ORU</Text>
          <Text>Balance: {userInfo ? formattedNum(userInfo.balances.oru) : 0}</Text>
        </HDiv>
        <UnstakeInputWrapper>
          <input type='text' value={xoruInput} onChange={(e) => setXOruInput(e.target.value)}/>
          <IconWrapper fill='#000' margin='0 0.833vw 0 0'>
            <LogoIcon />
          </IconWrapper>
          xORU
        </UnstakeInputWrapper>
        <UnstakeButton/>

      </UnstakeBlockWrapper>

      <UnstakeDataWrapper>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <ClipboardIcon color='#000' />
          <span
            style={{
              fontFamily: 'Poppins',
              fontWeight: '500',
              color: '#333',
              fontSize: '1.250vw',
              marginLeft: '1.094vw',
            }}
          >
            Data
          </span>
        </div>
        <HDivider margin='1.875vw 0 0.77vw 0' />
        <HDiv>
          <UnstakeDataText>Stake TVL</UnstakeDataText>
          <UnstakeDataText>
            <b>${stakingInfo ?  formattedNum(stakingInfo.tvl) : 0}</b>
          </UnstakeDataText>
        </HDiv>
        <HDivider margin='0.938vw 0 0.781vw 0' />
        <HDiv>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <UnstakeDataText mr='0.339vw'>Lock Duration</UnstakeDataText>
            <CalendarIcon />
          </div>
          <div style={{ display: 'inherit', alignItems: 'inherit' }}>
            <UnstakeDataText>
              <b>7&nbsp;</b>
            </UnstakeDataText>
            <UnstakeDataText>Days</UnstakeDataText>
          </div>
        </HDiv>
        <HDivider margin='0.781vw 0 0.938vw  0' />
      </UnstakeDataWrapper>
    </>
  );
};

export default Unstake;
