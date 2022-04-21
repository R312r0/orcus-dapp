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
import {formatToDecimal} from "../../../utils";

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

  const [pools, setPools] = React.useState(null);
  const [selectedPool, setSelectedPool] = React.useState(null);

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
      ousdUsdc: {token0: +resOusdUsdc[0] / 1e6, token1: +resOusdUsdc[1] / 1e18},
      oruUSsdc: {token0: +resOruUsdc[0] / 1e18, token1: +resOruUsdc[1] / 1e6},
      ousdOru: {token0: +resOusdOru[0] / 1e18, token1: +resOusdOru[1] / 1e18}

    }

    const pools = [
        {name: "USDC/OUSD", price0: reserves.ousdUsdc.token0 / reserves.ousdUsdc.token1, token0: {name: "USDC", icon: <IconWrapper margin='0 1.042vw 0 1.250vw'><USDCIcon/> </IconWrapper> }, token1: {name: "OUSD", icon: <OUSDIcon color={"black"}/>},  price1: reserves.ousdUsdc.token1 / reserves.ousdUsdc.token0 },
        {name: "ORU/USDC", price0: reserves.oruUSsdc.token0 / reserves.oruUSsdc.token1, token0: {name: "ORU", icon: <LogoIcon color={"black"}/>}, token1: {name: "USDC", icon: <USDCIcon/>}, price1: reserves.oruUSsdc.token1 / reserves.oruUSsdc.token0 },
        {name: "OUSD/ORU", price0: reserves.ousdOru.token0 / reserves.ousdOru.token1, token0: {name: "OUSD", icon: <OUSDIcon color={"black"}/>}, token1: {name: "ORU", icon: <LogoIcon width={"15"} height={"15"} color={"black"}/>}, price1: reserves.ousdOru.token1 / reserves.ousdOru.token0 },
    ]

    setPools(pools);
    setSelectedPool(pools[0]);
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

    const {ROUTER} = contracts;

    try {
        const tx = await ROUTER.connect(signer).swapExactTokensForTokens(
            formatToDecimal(token0Input, selectedPool.token0.name === "USDC" ? 6 : 18) ,
            0,
            [CONTRACT_ADDRESSES[selectedPool.token0.name], CONTRACT_ADDRESSES[selectedPool.token1.name]],
            account,
            9999999999999
        )
        await tx.wait();
    }
    catch (e) {
      console.log(e.message);
    }
  }

  const handleTokenInput = (num) => {

    setToken0Input(num);

    console.log(selectedPool.price0);

    setToken1Input(num * selectedPool.price1);

  }

  const changeTokenPlaces = () => {
    setSelectedPool(prevState => {
      return {
        ...prevState,
        price0: prevState.price1,
        price1: prevState.price0,
        token0: {
          name: prevState.token1.name,
          icon: prevState.token1.icon
        },
        token1: {
          name: prevState.token0.name,
          icon: prevState.token0.icon
        }
      }
    })

  }

  return (
    <>
      <SwapBlockWrapper>
        <HDiv>
            <b>SWAP</b>
        </HDiv>
        <HDiv>
          {pools && selectedPool ?
              <select value={selectedPool?.name} onChange={(e) => setSelectedPool(pools.find(item => item.name === e.target.value))}>
                {pools && pools.map(pool => {
                  return <option value={pool.name} onClick={( ) => setSelectedPool(pool)}>{pool.token0.icon}{pool.token1.icon}{pool.name}</option>
                })}
              </select>
              :
              null
          }

          {/*<Select*/}
          {/*    disableElevation*/}
          {/*    onClick={handleClick}*/}
          {/*    startIcon={() => (<>{selectedPool?.token0.icon}{selectedPool?.token1.icon}</>) }*/}
          {/*    endIcon={<KeyboardArrowDownIcon />}*/}
          {/*    disableRipple*/}
          {/*    disableFocusRipple*/}
          {/*>*/}
          {/*  <OptionsWrapper*/}
          {/*      anchorEl={selectedPool}*/}
          {/*      open={open}*/}
          {/*      onClose={handleClose}*/}
          {/*  >*/}
          {/*    {pools?.filter(item => item.name !== selectedPool?.name).map((pool, idx) => (*/}
          {/*        <Option*/}
          {/*            key={idx}*/}
          {/*            onClick={() => {*/}
          {/*              handleClose();*/}
          {/*              setSelectedPool(pool);*/}
          {/*            }}*/}
          {/*            disableRipple*/}
          {/*        >*/}
          {/*          {pool.token0.icon}*/}
          {/*          {pool.token1.icon}*/}
          {/*          {pool.name}*/}

          {/*        </Option>*/}
          {/*    ))}*/}
          {/*  </OptionsWrapper>*/}
          {/*</Select>*/}
        </HDiv>
        <HDiv mt='2vw'>
          <Text>From</Text>
        </HDiv>
        <SwapInputWrapper>
          <input type='text' value={token0Input} onChange={({target}) => handleTokenInput(target.value)} />
            {selectedPool && selectedPool.token0.icon}
            {selectedPool && selectedPool.token0.name}
        </SwapInputWrapper>
        <IconWrapper margin='1.667vw 0 0 0'>
          <a onClick={() => changeTokenPlaces()}><ArrowDownIcon/></a>

        </IconWrapper>
        <HDiv>
          <Text>To</Text>
          <Text>Select a currency</Text>
        </HDiv>
        <SwapInputWrapper>
          <input disabled={true} type='text' placeholder='0' value={token1Input} />
          {selectedPool && selectedPool.token1.icon}
          {selectedPool && selectedPool.token1.name}
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
