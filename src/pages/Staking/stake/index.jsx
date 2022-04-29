import React, {useEffect, useState} from 'react';

import ArrowDownIcon from '../../../assets/icons/ArrowDownIcon';
import CalendarIcon from '../../../assets/icons/CalendarIcon';
import ClipboardIcon from '../../../assets/icons/ClipboardIcon';
import LogoIconBlack from '../../../assets/icons/LogoIconBlack';
import {
  Divider,
  HDiv,
  HDivider,
  IconWrapper,
  PercentageContainer,
  StakeBlockWrapper,
  StakeBtn,
  StakeDataText,
  StakeDataWrapper,
  StakeInputWrapper,
  Text,
  CustomSpan,
} from './styled';
import {useWeb3React} from "@web3-react/core";
import {useBlockChainContext} from "../../../context/blockchain-context";
import {CONTRACT_ADDRESSES, MAX_INT} from "../../../constants";
import {formattedNum, formatToDecimal} from "../../../utils";

const Stake = () => {

  const {account} = useWeb3React();
  const {contracts, connectWallet, signer, liquidity} = useBlockChainContext();

  const [oruInput, setOruInput] = useState(0);

  const [stakingInfo, setStakingInfo] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {

    if (contracts && liquidity) {
      getStakingInfo();
    }

  },[contracts, liquidity])

  useEffect(() => {

    if (account) {
      getUserInfo();
    }

  }, [account])

  const getStakingInfo = async () => {

    const {ORU, PRICE_ORACLE, ORU_STAKE} = contracts;

    const tvl = ((+(await PRICE_ORACLE.oruPrice())) / 1e6) * (+(await ORU.balanceOf(CONTRACT_ADDRESSES.ORU_STAKE)) / 1e18);
    const rate = +(await ORU_STAKE.oruPerShare()) / 1e18;
    const lpBalance = (+(await ORU.balanceOf(CONTRACT_ADDRESSES.ORU_STAKE)) / 1e18) - 45000;
    const apr = (((((liquidity.oruPrice * 45000 * 30 * 12)) / 2) / ((liquidity.oruPrice * lpBalance)) * 100)).toFixed(0);


    setStakingInfo({
      tvl,
      rate,
      apr,
    })
  }

  const getUserInfo = async () => {

    const {ORU, XORU} = contracts;
    const allowance = await ORU.allowance(account, CONTRACT_ADDRESSES.ORU_STAKE) > 0;

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
        const tx = await contracts.ORU.connect(signer).approve(CONTRACT_ADDRESSES.ORU_STAKE, MAX_INT);
        await tx.wait();
        await getStakingInfo();
        await getUserInfo();
    }
    catch (e) {
        console.error(e.message);
    }
  }

  const deposit = async () => {

    const amt = oruInput - (oruInput * 0.005) // Slippage

      try {
        const tx = await contracts.ORU_STAKE.connect(signer).stake(formatToDecimal(amt, 18))
        await tx.wait();
        await getStakingInfo();
        await getUserInfo();
      }
      catch (e) {
        console.error(e.message);
      }
  }

  const StakeButton = () => {

    if (account && userInfo) {
       if(!userInfo.allowance) {
          return <StakeBtn onClick={() => approve()}>Approve ORU</StakeBtn>
       }
       else if (userInfo.balances.oru < oruInput) {
         return <StakeBtn disabled={true}> Insufficient ORU balance </StakeBtn>
       }

       else {
         return <StakeBtn onClick={() => deposit()}> Deposit </StakeBtn>
       }

    }
    else {
      return <StakeBtn onClick={() => connectWallet()}>Connect Wallet</StakeBtn>
    }
  }

  return (
    <>
      <StakeBlockWrapper>
        <HDiv>
          <Text>
            <b>Staking</b>
          </Text>
          <PercentageContainer>
            <Text>
              <b>{stakingInfo?.apr}% APR</b>
            </Text>
          </PercentageContainer>
        </HDiv>
        <HDiv mt='1.094vw'>
          <Text>Depositing ORU</Text>
          <Text>Balance: {userInfo ? formattedNum(userInfo.balances.oru)  : 0}</Text>
        </HDiv>
        <StakeInputWrapper withBtn>
          <input type='text' placeholder='0.0' value={oruInput} onChange={(e) => setOruInput(e.target.value)} />
          <button onClick={() => setOruInput(userInfo?.balances.oru)} >Max</button>
          <Divider />
          <IconWrapper w='5vw' h='5vw' fill='#000' margin='0 0.833vw 0 0'>
            <LogoIconBlack />
          </IconWrapper>
          ORU
        </StakeInputWrapper>
        <IconWrapper  w='5vw' h='5vw' margin='1.719vw 0 0 0'>
          <ArrowDownIcon />
        </IconWrapper>
        <HDiv>
          <Text>Receiving xORU</Text>
          <Text>Balance: {userInfo ? formattedNum(userInfo.balances.xoru) : 0}</Text>
        </HDiv>
        <StakeInputWrapper>
          <input type='text' placeholder={"0.0"} value={oruInput} disabled={true}/>
          <IconWrapper  w='5vw' h='5vw' fill='#000' margin='0 0.833vw 0 0'>
            <LogoIconBlack />
          </IconWrapper>
          xORU
        </StakeInputWrapper>
        <StakeButton/>
      </StakeBlockWrapper>

      <StakeDataWrapper>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <ClipboardIcon color='#000' />
          <CustomSpan>Data</CustomSpan>
        </div>
        <HDivider margin='1.875vw 0 0.77vw 0' />
        <HDiv>
          <StakeDataText>Stake TVL</StakeDataText>
          <StakeDataText>
            <b>${stakingInfo ? formattedNum(stakingInfo.tvl) : 0}</b>
          </StakeDataText>
        </HDiv>
        <HDivider margin='0.938vw 0 0.781vw 0' />
        <HDiv>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <StakeDataText mr='0.339vw'>Lock Duration</StakeDataText>
            <CalendarIcon />
          </div>
          <div style={{ display: 'inherit', alignItems: 'inherit' }}>
            <StakeDataText>
              <b>7&nbsp;</b>
            </StakeDataText>
            <StakeDataText>Days</StakeDataText>
          </div>
        </HDiv>
        <HDivider margin='0.781vw 0 0.938vw  0' />
        <HDiv>
          <StakeDataText mr='0.339vw'>Rate</StakeDataText>
          <div style={{ display: 'inherit', alignItems: 'inherit' }}>
            <StakeDataText>
              <b>1&nbsp;</b>
            </StakeDataText>
            <StakeDataText>xORU</StakeDataText>
            <StakeDataText>
              <b>&nbsp;= {stakingInfo ? stakingInfo.rate : 0}&nbsp;</b>
            </StakeDataText>
            <StakeDataText>ORU</StakeDataText>
          </div>
        </HDiv>
        <HDivider margin='0.781vw 0 0.938vw  0' />
      </StakeDataWrapper>
    </>
  );
};

export default Stake;
