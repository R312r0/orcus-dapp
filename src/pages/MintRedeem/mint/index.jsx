/* eslint-disable no-unused-vars */
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import React, { useEffect } from "react";

import ArrowDownIcon from "../../../assets/icons/ArrowDownIcon";
import BoldPlusIcon from "../../../assets/icons/BoldPlusIcon";
import ClipboardIcon from "../../../assets/icons/ClipboardIcon";

import CollectRedemtionIcon from "../../../assets/icons/CollectRedemtionIcon";
import HelpCircleIcon from "../../../assets/icons/HelpCircleIcon";
import LogoIconBlack from "../../../assets/icons/LogoIconBlack";
import OUSDIcon from "../../../assets/icons/OUSDIcon";
import USDCIcon from "../../../assets/icons/USDCIcon";
import {
  Divider,
  HDiv,
  HDivider,
  IconWrapper,
  CheckSpan,
  MintBlockWrapper,
  BuyBtn,
  MintBtn,
  MintDataText,
  MintDataWrapper,
  MintInputWrapper,
  Option,
  OptionsWrapper,
  Select,
  CustomSpan,
  RedemtionWrapper,
  RedeemDataText,
  RedemtionBtn,
  Text,
} from "./styled";
import { useBlockChainContext } from "../../../context/blockchain-context";
import { ethers } from "ethers";
import { useWeb3React } from "@web3-react/core";
import { formattedNum, formatToDecimal } from "../../../utils";
import { CONTRACT_ADDRESSES, MAX_INT } from "../../../constants";
import ORUIcon from "../../../assets/icons/ORUIcon";
import ShoppingBagIcon from "../../../assets/icons/ShoppingBagIcon";

const Mint = () => {
  const [value, setValue] = React.useState("ORU");
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [mintInfo, setMintInfo] = React.useState(null);
  const [userInfo, setUserInfo] = React.useState(null);

  const [collateralInput, setCollateralInput] = React.useState("");
  const [shareInput, setShareInput] = React.useState(0);
  const [stableOutput, setStableOutput] = React.useState(0);
  const [stableFeeVal, setStableFeeVal] = React.useState(0);

  const { account } = useWeb3React();
  const { contracts, connectWallet, signer } = useBlockChainContext();

  useEffect(() => {
    if (contracts) {
      getMintInfo();
    }
  }, [contracts]);

  useEffect(() => {
    if (account) {
      getUserInfo();
    }
  }, [account]);

  const getMintInfo = async () => {
    const { BANK, BANK_SAFE, PRICE_ORACLE, OUSD_USDC_ORACLE, USDC } = contracts;

    const tcr = +(await BANK.tcr()) / 1e6;
    const collateralBalance =
      +(await USDC.balanceOf(CONTRACT_ADDRESSES.BANK_SAFE)) / 1e6;
    const aTokenBalance = +(await BANK_SAFE.balanceOfAToken()) / 1e6;

    const prices = {
      collatPrice: +(await PRICE_ORACLE.collatPrice()) / 1e6,
      sharePrice: +(await PRICE_ORACLE.oruPrice()) / 1e6,
      stablePrice: +(await PRICE_ORACLE.ousdPrice()) / 1e6,
    };

    setMintInfo({
      tcr,
      poolBalance: collateralBalance + aTokenBalance,
      prices,
    });
  };

  const getUserInfo = async () => {
    const { OUSD, ORU, USDC } = contracts;

    const usdcBal = +(await USDC.balanceOf(account)) / 1e6;
    const oruBal = +(await ORU.balanceOf(account)) / 1e18;
    const ousdBal = +(await OUSD.balanceOf(account)) / 1e18;

    const usdcAllowance = await USDC["allowance(address,address)"](
      account,
      CONTRACT_ADDRESSES.BANK
    );
    const oruAllowance = await ORU["allowance(address,address)"](
      account,
      CONTRACT_ADDRESSES.BANK
    );

    const allowance = {
      collat: usdcAllowance > 0,
      share: oruAllowance > 0,
    };

    setUserInfo({
      usdcBal,
      oruBal,
      ousdBal,
      allowance,
    });
  };

  const approve = async (isCollat) => {
    const { USDC, ORU } = contracts;

    try {
      if (isCollat) {
        const tx = await USDC.connect(signer).approve(
          CONTRACT_ADDRESSES.BANK,
          MAX_INT
        );
        await tx.wait();
        await getUserInfo();
      } else {
        const tx = await ORU.connect(signer).approve(
          CONTRACT_ADDRESSES.BANK,
          MAX_INT
        );
        await tx.wait();
        await getUserInfo();
      }
    } catch (e) {
      console.error(e.message);
    }
  };

  const mint = async () => {
    const { BANK } = contracts;

    const collatInE6 = formatToDecimal(collateralInput, 6);
    const shareInE18 = formatToDecimal(shareInput, 18);

    console.log(collatInE6);
    console.log(shareInE18);

    try {
      const tx = await BANK.connect(signer).mint(collatInE6, shareInE18, 0);
      await tx.wait();
      await getMintInfo();
      await getUserInfo();
    } catch (e) {
      console.error(e.message);
    }
  };

  const handleCollateralInput = async (value) => {
    const { prices, tcr } = mintInfo;

    let output = (+value * prices.collatPrice) / tcr;
    const shareInput =
      (output - +value * prices.collatPrice) / prices.sharePrice;
    const stableFee = output * 0.003;
    output -= stableFee;

    setCollateralInput(value);
    setShareInput(shareInput + shareInput * 0.01);
    setStableOutput(output);
    setStableFeeVal(stableFee);
  };

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const proxyNavigation = (link) => {
    window.open(
      "https://app.arthswap.org/#/swap",
      "_blank" // <- This is what makes it open in a new window.
    );
  };

  const MintButton = () => {
    if (account && userInfo) {
      if (!userInfo.allowance.collat) {
        return <MintBtn onClick={() => approve(true)}> Approve USDC </MintBtn>;
      } else if (!userInfo.allowance.share) {
        return <MintBtn onClick={() => approve(false)}> Approve ORU </MintBtn>;
      } else if (collateralInput > userInfo.usdcBal) {
        return <MintBtn disabled> Insufficient USDC balance </MintBtn>;
      } else if (shareInput > userInfo.oruBal) {
        return <MintBtn disabled> Insufficient ORU balance </MintBtn>;
      } else {
        return <MintBtn onClick={() => mint()}> Mint </MintBtn>;
      }
    } else {
      return (
        <MintBtn onClick={() => connectWallet()}> Connect Wallet </MintBtn>
      );
    }
  };
  const isMobileScreen = () => {
    let query = window.matchMedia("(max-device-width: 480px)");
    return query.matches;
  };

  return (
    <>
      <MintBlockWrapper>
        <HDiv>
          <Text>TCR {mintInfo ? mintInfo.tcr * 100 : 0}%</Text>
          <Text>Balance: {userInfo ? formattedNum(userInfo.usdcBal) : 0}</Text>
        </HDiv>
        <MintInputWrapper withSelect>
          <input
            type="text"
            placeholder="0.0"
            onChange={(e) => handleCollateralInput(e.target.value)}
            value={collateralInput}
          />
          <button
            onClick={() => handleCollateralInput(userInfo?.usdcBal)}
            disabled={!account}
          >
            Max
          </button>
          <Divider />
          <IconWrapper margin="0 0.833vw" fill="#000">
            <USDCIcon ratio="5vw" />
          </IconWrapper>
          USDC
        </MintInputWrapper>
        <IconWrapper margin={isMobileScreen() ? "16px 0 0 0" : "1.667vw 0 0 0"}>
          <BoldPlusIcon ratio="5vw" />
        </IconWrapper>
        <HDiv>
          <Text>Required ORU {mintInfo ? 100 - mintInfo.tcr * 100 : 0}%</Text>
          <Text>Balance: {userInfo ? formattedNum(userInfo.oruBal) : 0}</Text>
        </HDiv>
        <MintInputWrapper>
          <input disabled={true} type="text" value={shareInput} />
          <IconWrapper margin="0 0.833vw" fill="#000">
            <LogoIconBlack ratio="5vw" />
          </IconWrapper>
          ORU
        </MintInputWrapper>
        <IconWrapper margin={isMobileScreen() ? "16px 0 0 0" : "1.667vw 0 0 0"}>
          <ArrowDownIcon />
        </IconWrapper>
        <HDiv>
          <Text>Output (estimated)</Text>
          <Text>Balance: {userInfo ? formattedNum(userInfo.ousdBal) : 0}</Text>
        </HDiv>
        <MintInputWrapper>
          <input
            disabled={true}
            type="text"
            placeholder="0"
            value={stableOutput}
          />
          <IconWrapper margin="0 0.833vw" fill="#000">
            <OUSDIcon />
          </IconWrapper>
          oUSD
        </MintInputWrapper>
        <MintButton />
      </MintBlockWrapper>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <MintDataWrapper>
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <ClipboardIcon
              ratio={isMobileScreen() ? "5vw" : undefined}
              color="#000"
            />
            <CustomSpan>Data</CustomSpan>
          </div>
          <HDivider margin="1.875vw 0 0.77vw 0" />
          <HDiv h="50px">
            <MintDataText>Minting fee</MintDataText>
            <div style={{ display: "inherit", alignItems: "inherit" }}>
              <MintDataText bfw="500">
                <b>0.3% = {stableFeeVal.toFixed(3)}</b>
              </MintDataText>
              <MintDataText ml="0.677vw">oUSD</MintDataText>
            </div>
          </HDiv>
          <HDivider margin="0.938vw 0 0.781vw 0" />
          <HDiv h="50px">
            <div style={{ display: "inherit", alignItems: "inherit" }}>
              <MintDataText mr="0.339vw">Collateral balance</MintDataText>
              <HelpCircleIcon />
            </div>
            <div style={{ display: "inherit", alignItems: "inherit" }}>
              <MintDataText bfw="500">
                <b>{mintInfo ? formattedNum(mintInfo.poolBalance) : 0}</b>
              </MintDataText>
              <MintDataText ml="0.677vw">USD</MintDataText>
            </div>
          </HDiv>
          <HDivider margin="0.781vw 0 0.938vw  0" />
          <HDiv h="50px">
            <MintDataText>Slippage</MintDataText>
            <MintDataText bfw="500">
              <b>0.50%</b>
            </MintDataText>
          </HDiv>
          <HDivider margin="0.781vw 0 0.938vw  0" />
          <HDiv h="50px">
            <MintDataText>Rates</MintDataText>
            <div style={{ display: "inherit", alignItems: "inherit" }}>
              <MintDataText bfw="500">
                <b>1&nbsp;</b>
              </MintDataText>
              <MintDataText>oUSD</MintDataText>
              <MintDataText bfw="500">
                <b> = {mintInfo ? mintInfo.prices.stablePrice : 0} </b>
              </MintDataText>
              <MintDataText>&nbsp;USD</MintDataText>
            </div>
          </HDiv>
          <HDivider margin="0.781vw 0 0.938vw  0" />
          <HDiv h="50px">
            <div />
            <div style={{ display: "inherit", alignItems: "inherit" }}>
              <MintDataText bfw="500">
                <b>1&nbsp;</b>
              </MintDataText>
              <MintDataText>USDC</MintDataText>
              <MintDataText bfw="500">
                <b>
                  {" "}
                  ={" "}
                  {mintInfo
                    ? (
                        mintInfo.prices.collatPrice /
                        mintInfo.prices.stablePrice
                      ).toFixed(6)
                    : 0}{" "}
                </b>
              </MintDataText>
              <MintDataText>&nbsp;oUSD</MintDataText>
            </div>
          </HDiv>
        </MintDataWrapper>
        <RedemtionWrapper>
          <HDiv>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: isMobileScreen() ? "4px" : "",
              }}
            >
              {/* <CollectRedemtionIcon  ratio={ isMobileScreen() ? '5vw' : undefined}/> */}
              <CheckSpan>
                Check if you have enough{" "}
                <a target="_blank" href="https://app.arthswap.org/#/swap">
                  ORU
                </a>{" "}
                balance
              </CheckSpan>
            </div>
          </HDiv>

          <HDivider margin="1.87vw 0 0.781vw 0" />
          <HDiv>
            <RedeemDataText>
              <div
                style={{ display: "flex", alignItems: "center", gap: "0.4vw" }}
              >
                <ORUIcon ratio={isMobileScreen() ? "5vw" : undefined}></ORUIcon>
                ORU
              </div>
            </RedeemDataText>
            <RedeemDataText>
              <BuyBtn onClick={() => proxyNavigation()}>
                {/* <ShoppingBagIcon fill='#fff' /> */}
                <ShoppingBagIcon fill="#fff" />
                Buy
              </BuyBtn>
            </RedeemDataText>
          </HDiv>
        </RedemtionWrapper>
      </div>
    </>
  );
};

export default Mint;

const tokenList = [
  {
    name: "USDC",
    icon: (
      <IconWrapper margin="0 1.042vw 0 1.250vw">
        <USDCIcon />
      </IconWrapper>
    ),
  },
  {
    name: "ORU",
    icon: (
      <IconWrapper fill="#000" margin="0 1.042vw 0 1.250vw">
        <OUSDIcon />
      </IconWrapper>
    ),
  },
  {
    name: "oUSD",
    icon: (
      <IconWrapper fill="#000" margin="0 1.042vw 0 1.250vw">
        <LogoIconBlack />
      </IconWrapper>
    ),
  },
];
