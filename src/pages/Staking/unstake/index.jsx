import React, { useEffect, useState } from "react";

import ArrowDownIcon from "../../../assets/icons/ArrowDownIcon";
import CalendarIcon from "../../../assets/icons/CalendarIcon";
import ClipboardIcon from "../../../assets/icons/ClipboardIcon";
import LogoIconBlack from "../../../assets/icons/LogoIconBlack";
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
  CustomSpan,
  UnstakeInputWrapper,
} from "./styled";
import { useWeb3React } from "@web3-react/core";
import { useBlockChainContext } from "../../../context/blockchain-context";
import { CONTRACT_ADDRESSES, MAX_INT, ORU_PER_BLOCK } from "../../../constants";
import { formattedNum, formatToDecimal, getDateDiff } from "../../../utils";
import { StakeBtn, StakeDataText } from "../stake/styled";

const Unstake = () => {
  const { account } = useWeb3React();
  const { contracts, connectWallet, signer, liquidity } =
    useBlockChainContext();

  const [xoruInput, setXOruInput] = useState(0);
  const [oruOutPut, setOruOutput] = useState(0);

  const [stakingInfo, setStakingInfo] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (contracts) {
      getStakingInfo();
    }
  }, [contracts]);

  useEffect(() => {
    if (account) {
      getUserInfo();
    }
  }, [account]);

  const getStakingInfo = async () => {
    const { ORU, ORU_STAKE, PRICE_ORACLE } = contracts;

    const lpBalance =
      +(await ORU.balanceOf(CONTRACT_ADDRESSES.ORU_STAKE)) / 1e18 - 45000;
    const apr = (
      ((liquidity.oruPrice * 45000 * 30 * 12) /
        2 /
        (liquidity.oruPrice * lpBalance)) *
      100
    ).toFixed(0);
    const rate = +(await ORU_STAKE.oruPerShare()) / 1e18;
    const tvl =
      (+(await PRICE_ORACLE.oruPrice()) / 1e6) *
      (+(await ORU.balanceOf(CONTRACT_ADDRESSES.ORU_STAKE)) / 1e18);

    console.log(rate);

    setStakingInfo({
      tvl,
      rate,
      apr,
    });
  };

  const getUserInfo = async () => {
    const { ORU, XORU, ORU_STAKE } = contracts;
    const allowance =
      (await XORU.allowance(account, CONTRACT_ADDRESSES.ORU_STAKE)) > 0;

    const userLocks = await ORU_STAKE.userLocks(account);

    const currentDate = new Date();
    const endDate = new Date(+userLocks.unlockTime * 1000);

    const isExpired = +currentDate - +endDate >= 0;
    const diff = getDateDiff(currentDate, endDate);

    const balances = {
      oru: +(await ORU.balanceOf(account)) / 1e18,
      xoru: +(await XORU.balanceOf(account)) / 1e18,
    };

    setUserInfo({
      balances,
      allowance,
      lock: {
        isExpired,
        diff,
      },
    });
  };

  const handleOruOutput = (value) => {
    setXOruInput(value);
    setOruOutput(value * stakingInfo.rate);
  };

  const approve = async () => {
    try {
      const tx = await contracts.XORU.connect(signer).approve(
        CONTRACT_ADDRESSES.ORU_STAKE,
        MAX_INT
      );
      await tx.wait();
      await getStakingInfo();
      await getUserInfo();
    } catch (e) {
      console.error(e.message);
    }
  };

  const withdraw = async () => {
    try {
      const tx = await contracts.ORU_STAKE.connect(signer).unstake(
        formatToDecimal(xoruInput, 18)
      );
      await tx.wait();
      await getStakingInfo();
      await getUserInfo();
    } catch (e) {
      console.error(e.message);
    }
  };

  const UnstakeButton = () => {
    if (account && userInfo) {
      if (!userInfo.allowance) {
        return <UnstakeBtn onClick={() => approve()}>Approve xORU</UnstakeBtn>;
      } else if (userInfo.balances.xoru < xoruInput) {
        return (
          <UnstakeBtn disabled={true}> Insufficient xORU balance </UnstakeBtn>
        );
      } else if (!userInfo.lock.isExpired) {
        return (
          <UnstakeBtn disabled={true}>
            {" "}
            {userInfo.lock.diff.day} days {userInfo.lock.diff.hour} hours{" "}
            {userInfo.lock.diff.minute} minutes
          </UnstakeBtn>
        );
      } else {
        return <UnstakeBtn onClick={() => withdraw()}> Withdraw </UnstakeBtn>;
      }
    } else {
      return (
        <UnstakeBtn onClick={() => connectWallet()}>Connect Wallet</UnstakeBtn>
      );
    }
  };
  const isMobileScreen = () => {
    let query = window.matchMedia("(max-device-width: 480px)");
    return query.matches;
  };

  return (
    <>
      <UnstakeBlockWrapper>
        <HDiv>
          <Text>
            <b>Staking</b>
          </Text>
          <PercentageContainer>
            <Text>
              <b>{stakingInfo ? stakingInfo.apr : 0}% APR</b>
            </Text>
          </PercentageContainer>
        </HDiv>
        <HDiv mt="1.094vw">
          <Text>Unstake ORU using xORU</Text>
          <Text>
            Balance: {userInfo ? formattedNum(userInfo.balances.xoru) : 0}
          </Text>
        </HDiv>
        <UnstakeInputWrapper withBtn>
          <input
            type="text"
            disabled={!stakingInfo}
            placeholder="0.0"
            value={xoruInput}
            onChange={(e) => handleOruOutput(e.target.value)}
          />
          <button onClick={() => handleOruOutput(userInfo?.balances.xoru)}>
            Max
          </button>
          <Divider />
          <IconWrapper
            w={isMobileScreen() ? "5vw" : undefined}
            h={isMobileScreen() ? "5vw" : undefined}
            fill="#000"
            margin="0 0.833vw 0 0"
          >
            <LogoIconBlack />
          </IconWrapper>
          xORU
        </UnstakeInputWrapper>
        <IconWrapper
          w={isMobileScreen() ? "5vw" : undefined}
          h={isMobileScreen() ? "5vw" : undefined}
          margin={isMobileScreen() ? "16px 0 0 0" : "1.667vw 0 0 0"}
        >
          <ArrowDownIcon />
        </IconWrapper>
        <HDiv>
          <Text>Receiving ORU</Text>
          <Text>
            Balance: {userInfo ? formattedNum(userInfo.balances.oru) : 0}
          </Text>
        </HDiv>
        <UnstakeInputWrapper>
          <input type="text" value={oruOutPut} />
          <IconWrapper
            w={isMobileScreen() ? "5vw" : undefined}
            h={isMobileScreen() ? "5vw" : undefined}
            fill="#000"
            margin="0 0.833vw 0 0"
          >
            <LogoIconBlack />
          </IconWrapper>
          ORU
        </UnstakeInputWrapper>
        <UnstakeButton />
      </UnstakeBlockWrapper>

      <UnstakeDataWrapper>
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <ClipboardIcon
            ratio={isMobileScreen() ? "5vw" : undefined}
            color="#000"
          />
          <CustomSpan>Data</CustomSpan>
        </div>
        <HDivider margin="1.875vw 0 0.77vw 0" />
        <HDiv h="50px">
          <UnstakeDataText>Stake TVL</UnstakeDataText>
          <UnstakeDataText bfw="500">
            <b>${stakingInfo ? formattedNum(stakingInfo.tvl) : 0}</b>
          </UnstakeDataText>
        </HDiv>
        <HDivider margin="0.938vw 0 0.781vw 0" />
        <HDiv h="50px">
          <div style={{ display: "flex", alignItems: "center" }}>
            <UnstakeDataText mr="0.339vw">Lock Duration</UnstakeDataText>
            <CalendarIcon />
          </div>
          <div style={{ display: "inherit", alignItems: "inherit" }}>
            <UnstakeDataText bfw="500">
              <b>7&nbsp;</b>
            </UnstakeDataText>
            <UnstakeDataText>Days</UnstakeDataText>
          </div>
        </HDiv>
        <HDivider margin="0.781vw 0 0.938vw  0" />
        <HDiv h="50px">
          <StakeDataText mr="0.339vw">Rate</StakeDataText>
          <div style={{ display: "inherit", alignItems: "inherit" }}>
            <StakeDataText bfw="500">
              <b>1&nbsp;</b>
            </StakeDataText>
            <StakeDataText>xORU</StakeDataText>
            <StakeDataText bfw="500">
              <b>&nbsp;= {stakingInfo ? stakingInfo.rate : 0}&nbsp;</b>
            </StakeDataText>
            <StakeDataText>ORU</StakeDataText>
          </div>
        </HDiv>
        <HDivider margin="0.781vw 0 0.938vw  0" />
      </UnstakeDataWrapper>
    </>
  );
};

export default Unstake;
