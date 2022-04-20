/* eslint-disable no-unused-vars */
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import React, {useEffect} from 'react';

import ArrowDownIcon from '../../../assets/icons/ArrowDownIcon';
import LogoIcon from '../../../assets/icons/LogoIcon';
import OUSDIcon from '../../../assets/icons/OUSDIcon';
import USDCIcon from '../../../assets/icons/USDCIcon';
import {
  HDiv,
  IconWrapper,
  SwapBlockWrapper,
  SwapBtn,
  SwapInputWrapper,
  Option,
  OptionsWrapper,
  Select,
  Text,
} from './styled';
import {useWeb3React} from "@web3-react/core";
import {useBlockChainContext} from "../../../context/blockchain-context";
import {CONTRACT_ADDRESSES, MAX_INT} from "../../../constants";

const Swap = () => {

  const {account} = useWeb3React();
  const {contracts, connectWallet, signer} = useBlockChainContext();

  const [value, setValue] = React.useState('ORU');
  const [secondValueIndex, setSecondValueIndex] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [swapPools, setSwapPools] = React.useState(null);
  const [secondTarget, setSecondTarget] = React.useState(null);

  const [allowances, setAllowances] = React.useState(null);
  const [reserves, setReserves] = React.useState(null);
  const [token0Input, setToken0Input] = React.useState(0);
  const [token1Input, setToken1Input] = React.useState(0);

  const open = Boolean(anchorEl);
  const secondOpen = Boolean(secondTarget);

  useEffect(() => {
    init()
  }, [])

  useEffect(() => {

    if (account && signer && contracts) {
      getPrices();
      getUserInfo();
    }

  }, [account, signer, contracts])

  const getPrices = async () => {

    const {OUSD_USDC, ORU_USDC, OUSD_ORU} = contracts;

    const resOusdUsdc = await OUSD_USDC.getReserves();
    const resOruUsdc = await ORU_USDC.getReserves();
    const resOusdOru = await OUSD_ORU.getReserves();

    const reserves = {
      ousdUsdc: {token0: +resOusdUsdc[0] / 1e18, token1: +resOusdUsdc[1] / 1e6},
      oruUSsdc: {token0: +resOruUsdc[0] / 1e18, token1: +resOruUsdc[1] / 1e6},
      ousdOru: {token0: +resOusdOru[0] / 1e18, token1: +resOusdOru[1] / 1e18}

    }

    // const lol = {
    //   USDC: {
    //     ORU: ,
    //     OUSD: ,
    //   }
    // }

    setReserves(reserves);

  }

  const init = () => {

    const obj = [
      {name: "OUSD", icon: <IconWrapper margin='0 1.042vw 0 1.250vw'><OUSDIcon /></IconWrapper>,
        tokensToSwap: [{name: "USDC", icon: <IconWrapper margin='0 1.042vw 0 1.250vw'><USDCIcon /></IconWrapper>}, {name: "ORU", icon: <IconWrapper margin='0 1.042vw 0 1.250vw'><LogoIcon /></IconWrapper>}]
      },
      {name: "ORU", icon: <IconWrapper margin='0 1.042vw 0 1.250vw'><LogoIcon /></IconWrapper>,
        tokensToSwap: [{name: "USDC", icon: <IconWrapper margin='0 1.042vw 0 1.250vw'><USDCIcon /></IconWrapper>}, {name: "OUSD", icon: <IconWrapper margin='0 1.042vw 0 1.250vw'><OUSDIcon /></IconWrapper>}]
      },
      {name: "USDC", icon: <IconWrapper margin='0 1.042vw 0 1.250vw'><USDCIcon /></IconWrapper>,
        tokensToSwap: [{name: "ORU", icon: <IconWrapper margin='0 1.042vw 0 1.250vw'><LogoIcon /></IconWrapper>}, {name: "OUSD", icon: <IconWrapper margin='0 1.042vw 0 1.250vw'><OUSDIcon /></IconWrapper>}]
      },
    ]
    setSwapPools(obj)
  }


  const getUserInfo = async () => {

    const {OUSD, ORU, USDC} = contracts;

    const oruAllowance = await ORU.allowance(account,CONTRACT_ADDRESSES.ROUTER) > 0;
    const ousdAllowance = await OUSD.allowance(account,CONTRACT_ADDRESSES.ROUTER) > 0;
    const usdcAllowance = await USDC.allowance(account,CONTRACT_ADDRESSES.ROUTER) > 0;

    setAllowances({
      oruAllowance,
      ousdAllowance,
      usdcAllowance
    })

  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setSecondValueIndex(null)
  };

  const handleSecondClick = (event) => {
    setSecondTarget(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSecClose = () => {
    setSecondTarget(null);
  };

  const SwapButton = () => {

    if (account && signer) {
      console.log(!allowances?.oruAllowance)
         //value === "ORU" || secondValueIndex === "ORU" &&
         if (!allowances?.oruAllowance ) {
           return <SwapBtn onClick={() => approve("ORU")} >Approve ORU</SwapBtn>
         }
         //value === "OUSD" || secondValueIndex === "OUSD" &&
         else if (!allowances?.ousdAllowance) {
           return <SwapBtn onClick={() => approve("OUSD")} >Approve OUSD</SwapBtn>
         }
         //value === "USDC" || secondValueIndex === "USDC" &&
         else if (!allowances?.usdcAllowance) {
           return <SwapBtn onClick={() => approve("USDC")} >Approve USDC</SwapBtn>
         }
         else {
           return <SwapBtn onClick={() => swap()} >Swap</SwapBtn>
         }
    }

    else {
      return (
          <SwapBtn onClick={() => connectWallet()} >Unlock Wallet</SwapBtn>
      )
    }
  }

  const approve = async (token) => {

    try {
      const tx = await contracts[token].connect(signer).approve(CONTRACT_ADDRESSES.ROUTER, MAX_INT);
      await tx.wait();
      await getUserInfo();
    }
    catch (e) {
      console.log(e.message);
    }
  }

  const swap = async () => {

    try {

    }
    catch (e) {
      console.log(e.message);
    }
  }

  const handleTokenInput = (num) => {

    console.log(value)
    console.log(secondValueIndex || "USDC")

    let price =



    // const price = reserves

    setToken0Input(num);
    setToken1Input(num * 2);

  }

  return (
    <>
      <SwapBlockWrapper>
        <HDiv>
            <b>SWAP</b>
        </HDiv>
        <HDiv mt='2vw'>
          <Text>From</Text>
        </HDiv>
        <SwapInputWrapper>
          <input type='text' value={token0Input} onChange={({target}) => handleTokenInput(target.value)} />
          {/* <button>Max</button> */}
          {/* <Divider /> */}
          <div>
            <Select
              disableElevation
              onClick={handleClick}
              startIcon={swapPools?.find(item => item.name === value).icon}
              endIcon={<KeyboardArrowDownIcon />}
              disableRipple
              disableFocusRipple
            >
              {value}
            </Select>
            <OptionsWrapper
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              {swapPools?.filter(item => item.name !== value).map((token, idx) => (
                <Option
                  key={idx}
                  onClick={() => {
                    handleClose();
                    setValue(token.name);
                  }}
                  disableRipple
                >
                  {token.icon}
                  {token.name}
                </Option>
              ))}
            </OptionsWrapper>
          </div>
        </SwapInputWrapper>
        <IconWrapper margin='1.667vw 0 0 0'>
        <ArrowDownIcon />
        </IconWrapper>
        <HDiv>
          <Text>To</Text>
          <Text>Select a currency</Text>
        </HDiv>
        <SwapInputWrapper>
          <input disabled={true} type='text' placeholder='0' value={token1Input} />
          <Select
              disableElevation
              onClick={handleSecondClick}
              startIcon={!secondValueIndex ?  swapPools?.find(item => item.name === value).tokensToSwap[0].icon : swapPools?.find(item => item.name === value).tokensToSwap.find(sec => sec.name === secondValueIndex).icon}
              endIcon={<KeyboardArrowDownIcon />}
              disableRipple
              disableFocusRipple
          >
            {!secondValueIndex ?  swapPools?.find(item => item.name === value).tokensToSwap[0].name : swapPools?.find(item => item.name === value).tokensToSwap.find(sec => sec.name === secondValueIndex).name}
          </Select>
          <OptionsWrapper
              anchorEl={secondTarget}
              open={secondOpen}
              onClose={handleSecClose}
          >
            {swapPools?.find(item => item.name === value).tokensToSwap.filter((pat, _ind) =>
                !secondValueIndex ?  pat.name !== swapPools.find(i => i.name === value).tokensToSwap[0].name : pat.name !== secondValueIndex).map((token, idx) => (
                <Option
                    key={idx}
                    onClick={() => {
                      handleSecClose();
                      setSecondValueIndex(token.name);
                    }}
                    disableRipple
                >
                  {token.icon}
                  {token.name}
                </Option>
            ))}
          </OptionsWrapper>
        </SwapInputWrapper>
        <SwapButton/>
      </SwapBlockWrapper>
      
    </>
  );
};

export default Swap;

const tokenList = [
  {
    name: 'USDC',
    icon: (
      <IconWrapper margin='0 1.042vw 0 1.250vw'>
        <USDCIcon />
      </IconWrapper>
    ),
  },
  {
    name: 'ORU',
    icon: (
      <IconWrapper fill='#000' margin='0 1.042vw 0 1.250vw'>
        <OUSDIcon />
      </IconWrapper>
    ),
  },
  {
    name: 'oUSD',
    icon: (
      <IconWrapper fill='#000' margin='0 1.042vw 0 1.250vw'>
        <LogoIcon />
      </IconWrapper>
    ),
  },
];
