/* eslint-disable no-unused-vars */
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import React, {useEffect, useState} from 'react';
import ArrowLeftIcon from '../../../assets/icons/ArrowLeftIcon';
import BoldPlusIcon from '../../../assets/icons/BoldPlusIcon';
import LogoIcon from '../../../assets/icons/LogoIcon';
import OUSDIcon from '../../../assets/icons/OUSDIcon';
import USDCIcon from '../../../assets/icons/USDCIcon';
import {
  HDiv,
  HDivider,
  IconWrapper,
  PoolBlockWrapper,
  OrangeBlock,
  PoolBtn,
  OrangeRow,
  PseudoOption,
  PseudoPoolSelect,
  PseudoSelectContainer,
  PoolInputWrapper,
  RemoveLiqBtn,
  Option,
  OptionsWrapper,
  Select,
  Text,
} from './styled';
import {useWeb3React} from "@web3-react/core";
import {useBlockChainContext} from "../../../context/blockchain-context";
import {CONTRACT_ADDRESSES} from "../../../constants";
import {formattedNum, formatToDecimal} from "../../../utils";

const Pool = () => {
    const {account} = useWeb3React();
    const {contracts, signer, liquidity} = useBlockChainContext();

    const [ isAddLiquidity, setAddLiquidity ] = useState(false);
    const [ isRemoveLiquidity, setRemoveLiquidity ] = useState(false);
    const [isDropdownOpen , setDropdownopen] = useState(false)

    const [token0Input, setToken0Input] = useState(0);
    const [token1Input, setToken1Input] = useState(0);

    const [userBal, setUserBal] = useState(0);
    const [userLiq, setUserLiq] = useState(null);

    const subpageHandler = () => {
        setAddLiquidity(!isAddLiquidity);
    }

    const toggleDropdown = () => {
      setDropdownopen(!isDropdownOpen);
    }

    const removeLiquidityWindowHandler = () => {
        setRemoveLiquidity(!isRemoveLiquidity)
    }

    const [value, setValue] = React.useState('ORU');
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const [pools, setPools] = useState(null);
    const [selectedPool, setSelectedPool] = useState(null);

    useEffect(() => {

        if (contracts) {
            getPrices();
        }

    }, [contracts])


    useEffect(() => {

        if (account && signer) {
            getUserLiquidity();
            getUserLPBalance();
        }

    }, [selectedPool, account, signer])

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
            {name: "USDC/OUSD", price0: reserves.ousdUsdc.token0 / reserves.ousdUsdc.token0, token0: {name: "USDC", icon: <IconWrapper margin='0 1.042vw 0 1.250vw'><USDCIcon/> </IconWrapper> }, token1: {name: "OUSD", icon: <OUSDIcon color={"black"}/>},  price1: reserves.ousdUsdc.token1 / reserves.ousdUsdc.token0 },
            {name: "ORU/USDC", price0: reserves.oruUSsdc.token0 / reserves.oruUSsdc.token0, token0: {name: "ORU", icon: <LogoIcon color={"black"}/>}, token1: {name: "USDC", icon: <USDCIcon/>}, price1: reserves.oruUSsdc.token1 / reserves.oruUSsdc.token0 },
            {name: "OUSD/ORU", price0: reserves.ousdOru.token0 / reserves.ousdOru.token0, token0: {name: "OUSD", icon: <OUSDIcon color={"black"}/>}, token1: {name: "ORU", icon: <LogoIcon width={"15"} height={"15"} color={"black"}/>}, price1: reserves.ousdOru.token1 / reserves.ousdOru.token0 },
        ]

        setPools(pools);
        setSelectedPool(pools[0]);
    }

    const getUserLiquidity = async () => {

        const {ORU_USDC, OUSD_USDC, OUSD_ORU} = contracts;
        const { oruUsdcLiq, ousdUsdcLiq, oruOusdLiq } = liquidity;

        const ORU_USDC_USER = (oruUsdcLiq /  (+(await ORU_USDC.totalSupply()) / 1e18)) * (+(await ORU_USDC.balanceOf(account)) / 1e18);

        const OUSD_USDC_USER = (ousdUsdcLiq /  (+(await OUSD_USDC.totalSupply()) / 1e18)) * (+(await OUSD_USDC.balanceOf(account)) / 1e18);
        const ORU_OUSD_USER = (oruOusdLiq /  (+(await OUSD_ORU.totalSupply()) / 1e18)) * (+(await OUSD_ORU.balanceOf(account)) / 1e18);

        setUserLiq({
            ORU_USDC_USER,
            OUSD_USDC_USER,
            ORU_OUSD_USER
        })


    }

    const getUserLPBalance = async () => {
        const pool = contracts[selectedPool.token0.name + "_" + selectedPool.token1.name] || contracts[selectedPool.token1.name + "_" + selectedPool.token0.name];
        const bal = await pool.balanceOf(account);

        setUserBal(+bal);
    }



    const handleTokenInput = (num) => {
        setToken0Input(num)
        setToken1Input(num * selectedPool.price1);
    }

    const addLiquidity = async () => {

        const {ROUTER} = contracts;

        try {
            const tx = await ROUTER.connect(signer).addLiquidity(
                CONTRACT_ADDRESSES[selectedPool.token0.name],
                CONTRACT_ADDRESSES[selectedPool.token1.name],
                formatToDecimal(token0Input, selectedPool.token0.name === "USDC" ? 6 : 18),
                formatToDecimal(token1Input, selectedPool.token1.name === "USDC" ? 6 : 18),
                0,
                0,
                account,
                99999999999
            )
            await tx.wait();
        }
        catch (e) {
            console.log(e.message);
        }
    }

    const removeLiquidity = async () => {

        const {ROUTER} = contracts;

        try {
            const tx = await ROUTER.connect(signer).removeLiquidity(
                CONTRACT_ADDRESSES[selectedPool.token0.name],
                CONTRACT_ADDRESSES[selectedPool.token1.name],
                token0Input,
                0,
                0,
                account,
                99999999999
            )
            await tx.wait();
        }
        catch (e) {
            console.log(e.message);
        }
    }
// THIS IS TO COMMIT

    return (
    <>
      <PoolBlockWrapper height={ isRemoveLiquidity ? '20vw' : ''}>
          { isAddLiquidity || isRemoveLiquidity ? <>
            <div style={{display: 'flex', alignItems:'center', justifyContent:'space-between'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '0.875vw'}}> 
                <a onClick={() => isRemoveLiquidity ? removeLiquidityWindowHandler() : subpageHandler()}><ArrowLeftIcon/></a>
            <b>{isRemoveLiquidity ? "Remove Liquidity" : "Add Liquidity"}</b>
            </div>
            {pools && selectedPool ?
              <PseudoPoolSelect onClick={toggleDropdown} onChange={(e) => setSelectedPool(pools.find(item => item.name === e.target.value))}>
                {selectedPool?.name}
                <div > 
                  <svg style={ isDropdownOpen ? {} : { transform: 'rotate(180deg)'}} width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M0.69133 5.41949C0.984222 5.71238 1.4591 5.71238 1.75199 5.41949L4.99956 2.17193L8.24701 5.41948C8.53989 5.71238 9.01477 5.71239 9.30767 5.4195C9.60056 5.12661 9.60057 4.65174 9.30768 4.35884L5.5299 0.580941C5.38925 0.440286 5.19849 0.361265 4.99957 0.361263C4.80066 0.361262 4.60989 0.440279 4.46924 0.580932L0.691331 4.35883C0.398438 4.65172 0.398437 5.12659 0.69133 5.41949Z" fill="#6D859E"/>
                  </svg>
                </div>
                { isDropdownOpen ? <PseudoSelectContainer>
                {pools && pools.map(pool => {
                  return <PseudoOption value={pool.name} onClick={( ) => setSelectedPool(pool)}>{pool.name}</PseudoOption>
                })}
                </PseudoSelectContainer> : <></>}
              </PseudoPoolSelect>
              :
              null
          }
            </div>
            <HDiv mt='2vw'>
                
          
        </HDiv>
        <HDiv>
            

            <Text>Balance: {userBal ? userBal : null} </Text>
        </HDiv>
        <PoolInputWrapper>
          <input type='number' value={token0Input} onChange={(e) => handleTokenInput(e.target.value)}/>
          <IconWrapper margin='0 0.833vw' fill='#000'>
                {isRemoveLiquidity ?
                    selectedPool && selectedPool.name
                    :
                    selectedPool && <> {selectedPool.token0.icon }{selectedPool.token0.name}</>
                }
          </IconWrapper>
        </PoolInputWrapper>
                  {!isRemoveLiquidity ?
                    <>
                        <IconWrapper margin='1.667vw 0 0 0'>
                            <BoldPlusIcon />
                        </IconWrapper>
                        <HDiv>
                        <Text>Input</Text>
                            
                        </HDiv>
                        <PoolInputWrapper>
                            <input type='number' value={token1Input} disabled={true} placeholder='0' />
                            <IconWrapper margin='0 0.833vw' fill='#000'>
                                {selectedPool && selectedPool.token1.icon}
                            </IconWrapper>
                            {selectedPool && selectedPool.token1.name}
                        </PoolInputWrapper>
                    </>
                      :
                      null
                  }
        <PoolBtn onClick={() => isRemoveLiquidity ? removeLiquidity() :  addLiquidity()}>{isRemoveLiquidity ? "Remove liquidity" : "Add liquidity"}</PoolBtn>
        </>
              : <>
        <HDiv>
            <b>Liquidity</b>
        </HDiv>
        <HDiv mt='0.784vw'>
          <Text>Add liquidity to receive LP tokens</Text>
        </HDiv>
        <PoolBtn onClick={subpageHandler}>Add Liquidity</PoolBtn>
        <RemoveLiqBtn onClick={removeLiquidityWindowHandler}>Remove Liquidity</RemoveLiqBtn>

          <HDivider margin={'0.6vw 0 0 0 '}></HDivider>
        <HDiv mt='1.125vw'>
          <Text>Your Liquidity</Text>
        </HDiv>
        <OrangeBlock>
            {userLiq ?
                <>
                    <OrangeRow>
                      <div>ORU/USDC</div>
                      <div>{formattedNum(userLiq.ORU_USDC_USER)}</div> </OrangeRow>
                    <OrangeRow>
                      <div>
                       OUSD/USDC</div><div>{formattedNum(userLiq.OUSD_USDC_USER)} </div></OrangeRow>
                    <OrangeRow>
                      <div> ORU/OUSD</div>
                    {/* <LogoIcon color={"black"}/><OUSDIcon color={"black"}/> */}
                     <div> {formattedNum(userLiq.ORU_OUSD_USER)} </div></OrangeRow>
                </>
                :
                "Connect wallet to see your liquidity"
            }
        </OrangeBlock></> }

      {/*  REMOVE LIQUIDITY  */}

      </PoolBlockWrapper>
    </>
  );
};

export default Pool;

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
