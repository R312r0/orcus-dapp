import React, {useEffect, useState} from 'react';

import FarmsTableItm from './farms-table-item';
import MobileTableItm from './mobile-table-item';
import {CONTRACT_ADDRESSES, MASTER_CHEF_POOLS} from '../../constants'
import {
  Balance,
  FarmsTableWrapper,
  FarmsWrapper,
  HDiv,
  HeadingText,
  RewardBtn,
  Text,
  BlackBtn,
  OverlayGreyText,
  OverlayText,
  OverlayValue,
  HDivider,
  MobileRewardsContainer,
  RewardsHead,
  RewardsContainer,
  Scroll,
  PurpleRewards,
  RewardsBlock,
  RewardsBlockContent,
  FarmsOverlay,
  FarmsOverlayContent,
  RewardsPercentage,
  RewardsValues,
  ManageButton,
  RewardsCoinname,
  RewardsContent,
  ClaimsContainer,
  OverlayClaim,
  OverlayOutline,
  ClaimsRow,
  ClaimsHead,
  PagesRow,
  FarmsTableItem,
  MainData,
  FarmsRow, 
  FarmsColumn,
  IconWrapper,
  Text2,
  AddLiquidityBtn,
  VDiv,
} from './styled';
import {ethers} from "ethers";
import UNISWAP_PAIR_ABI from "../../abis/UniswapPair.json";
import {useBlockChainContext} from "../../context/blockchain-context";
import LogoIconBlack from "../../assets/icons/LogoIconBlack";
import USDCIcon from "../../assets/icons/USDCIcon";
import ArrowTopRightIcon from '../../assets/icons/ArrowTopRightIcon'
import USDTIcon from "../../assets/icons/USDTIcon";
import BUSDIcon from "../../assets/icons/BUSDIcon";
import OUSDIcon from "../../assets/icons/OUSDIcon";
import BCoinIcon from '../../assets/icons/BCoinIcon'
import BriefcaseIcon from '../../assets/icons/BriefcaseIcon';
import CrosshairsIcon from '../../assets/icons/CrosshairsIcon';
import CalendarIcon from "../../assets/icons/CalendarIcon";
import {formattedNum, getDateDiff} from "../../utils";
import RewardsIcon from '../../assets/icons/RewardsIcon';
import PlusIcon from '../../assets/icons/PlusIcon';
import { OutlineBtn } from './farms-table-item/styled';
import ORUIcon from '../../assets/icons/ORUIcon';

import CloseIcon from '../../assets/icons/CloseIcon';
import PageRightIcon from '../../assets/icons/PageRightIcon';
import PageLeftIcon from '../../assets/icons/PageLeftIcon';
import {useWeb3React} from "@web3-react/core";
import SiriusIcon from '../../assets/icons/SiriusIcon';
import fromExponential from "from-exponential";
import ArrowLeftIcon from '../../assets/icons/ArrowLeftIcon';

const Array = [1, 2, 3];

const Farms = () => {

  const {account} = useWeb3React();
  const {contracts, liquidity, signer} = useBlockChainContext();
  const [masterChefPools, setMasterChefPools] = useState(null);
  const [farmsTVL, setFarmsTVL] = useState(null);
  const [userRewards, setUserRewards] = useState(null);
  const [ isRewardsOverlay, setRewardsOverlay ] = useState(false);
  const [metaPool, setMetaPool] = useState(null);
  const [depositedInMeta, setDepositedInMeta] = useState(null);


  const [poolId, setPoolId] = useState(0);
  const [vestedAmt, setVestedAmt] = useState(0);

  useEffect(() => {

    if (contracts && liquidity) {
        init();
    }
  }, [contracts, liquidity]);

  useEffect(() => {

    if (contracts && signer) {
      getUserRewardInfo();
    }

  }, [signer, contracts])

  useEffect(() => {

    if (userRewards && isRewardsOverlay) {
      getVestedAmt();
    }

  }, [userRewards, isRewardsOverlay])

  const init = async () => {

    const {ORU_USDC, OUSD_USDC, OUSD_ORU, OUSD_METAPOOL, OUSD_METAPOOL_ERC20, SRS, GAGUE_CONTROLLER, SRS_LP_TOKEN, GAGUE_OUSD} = contracts;

    const srsRate = await SRS.rate();
    const relativeWeight = await GAGUE_CONTROLLER.gaugeRelativeWeight("0x5FF4735274b0C7ADf7de52768645aA08AE4bcB20", 1651104000);
    const farmTvl = await SRS_LP_TOKEN.balanceOf("0x5FF4735274b0C7ADf7de52768645aA08AE4bcB20");
    const rewardTokenPerSecondSRS = await GAGUE_OUSD.rewardData("0x9448610696659de8F72e1831d392214aE1ca4838");
    const rewardTokenPerSecondORU = await GAGUE_OUSD.rewardData(CONTRACT_ADDRESSES.ORU);

    const baseApr = (+srsRate / 1e18) * 86400 * 365 * 0.1 * (+relativeWeight / 1e18) * 100 / (farmTvl / 1e18);
    const extraApr =  (+rewardTokenPerSecondORU.rate / 1e18 + (+rewardTokenPerSecondSRS.rate / 1e18) ) * 86400 * 365 * liquidity.oruPrice * 100 / (farmTvl / 1e18);

    const metaApr = baseApr + extraApr;

    try{
      const data = JSON.parse(await( await fetch("https://graph.sirius.finance/static/volume.json")).text());
      setMetaPool({
        tvl: data["0xd18abe9bcedeb5a9a65439e604b0be8db0bdb176"].TVL,
        metaApr
      })
    }
    catch (e) {
      console.log(e.message);
      setMetaPool({
        tvl: 0,
        metaApr
      })
    }



    const oruUSDCTVL =
        (+(await ORU_USDC.balanceOf(CONTRACT_ADDRESSES.MASTER_CHEF)) / 1e18) *
        (liquidity.oruUsdcLiq / (+(await ORU_USDC.totalSupply()) / 1e18 ));

    const ousdUSDCTVL =
        (+(await OUSD_USDC.balanceOf(CONTRACT_ADDRESSES.MASTER_CHEF)) / 1e18) *
        (liquidity.ousdUsdcLiq / (+(await OUSD_USDC.totalSupply()) / 1e18 ));

    const ousdOruTVL =
        (+(await OUSD_ORU.balanceOf(CONTRACT_ADDRESSES.MASTER_CHEF)) / 1e18) *
        (liquidity.oruOusdLiq / (+(await OUSD_ORU.totalSupply()) / 1e18 ));

    setFarmsTVL(oruUSDCTVL + ousdUSDCTVL + ousdOruTVL);



    setMasterChefPools([
        {name: "ORU/USDC", addURL: 'https://app.arthswap.org/#/add/0xCdB32eEd99AA19D39e5d6EC45ba74dC4afeC549F/0x6a2d262D56735DbA19Dd70682B39F6bE9a931D98', removeURL:'https://app.arthswap.org/#/remove/0x6a2d262D56735DbA19Dd70682B39F6bE9a931D98/0xCdB32eEd99AA19D39e5d6EC45ba74dC4afeC549F', lpToken: ORU_USDC, liquidity:  liquidity.oruUsdcLiq, token0Icon: <LogoIconBlack/>, token1Icon: <USDCIcon/>},
        {name: "oUSD/USDC", addURL: 'https://app.arthswap.org/#/add/0x29F6e49c6E3397C3A84F715885F9F233A441165C/0x6a2d262D56735DbA19Dd70682B39F6bE9a931D98', removeURL:'https://app.arthswap.org/#/remove/0x29F6e49c6E3397C3A84F715885F9F233A441165C/0x6a2d262D56735DbA19Dd70682B39F6bE9a931D98', lpToken: OUSD_USDC, liquidity: liquidity.ousdUsdcLiq,token0Icon: <OUSDIcon/>, token1Icon: <USDCIcon/>},
        {name: "oUSD/ORU", addURL: 'https://app.arthswap.org/#/add/0x29F6e49c6E3397C3A84F715885F9F233A441165C/0xCdB32eEd99AA19D39e5d6EC45ba74dC4afeC549F', removeURL:'https://app.arthswap.org/#/remove/0x29F6e49c6E3397C3A84F715885F9F233A441165C/0xCdB32eEd99AA19D39e5d6EC45ba74dC4afeC549F', lpToken: OUSD_ORU, liquidity:  liquidity.oruOusdLiq,token0Icon: <OUSDIcon/>, token1Icon: <LogoIconBlack/>},
    ])
  }

  const getVestedAmt = () => {
    let reward = 0;
    userRewards[poolId].vestings.forEach(item => {
      reward += +(item.amount) / 1e18
    })

    setVestedAmt(reward);
  }

  const getUserRewardInfo = async () => {

    const {MASTER_CHEF, OUSD_METAPOOL, SRS_LP_TOKEN} = contracts;
    const info = await MASTER_CHEF.getUserInfo(account);

    const depositedInMeta = await SRS_LP_TOKEN.balanceOf(account);
    setDepositedInMeta(+depositedInMeta / 1e18)
    setUserRewards(info)

  }

  const openOverlay = ( id) => {
    setPoolId(id);
    setRewardsOverlay(true)
  }

  const closeOverlay = ( ) => {

    setRewardsOverlay(false)
  }

  const claimReward = async (vid) => {

    const {MASTER_CHEF} = contracts;

    try {
      const tx = await MASTER_CHEF.connect(signer).claim(poolId, vid)
      await tx.wait();

    }
    catch (e) {
      console.log(e.message);
    }

  }

  const claimWithPenalty = async (vid) => {
    const {MASTER_CHEF} = contracts;

    try {
        const tx = await MASTER_CHEF.connect(signer).claimWithPenalty(poolId, vid)
        await tx.wait();
    }
    catch (e) {
      console.log(e.message);
    }

  }

  const isMobileScreen = ( ) => {
    let query = window.matchMedia('(max-device-width: 480px)')
    return query.matches
  }

  return (
    <>
    {(isRewardsOverlay && !isMobileScreen()) ? <>
      <FarmsOverlay>
        <FarmsOverlayContent>
            <RewardsHead>
              <PurpleRewards>
                <RewardsIcon></RewardsIcon>
              </PurpleRewards>
              <div style={{display: 'block', paddingLeft: '0.8vw'}}>
                <Text>Vested Rewards</Text><br/>
                <OverlayValue> {formattedNum(vestedAmt)} ORU</OverlayValue>
                </div>
                <div style={{display: 'flex', alignItems: 'top', height: '100%', cursor: 'pointer', justifyContent: 'flex-end'}}>
                  <div  onClick={closeOverlay}>
                  <CloseIcon></CloseIcon>
                    </div>
                </div>
            </RewardsHead>
            <div style={{display: 'flex', marginTop: '2vw', alignItems: 'center', justifyContent: 'space-between'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '0.8vw'}}>
                {MASTER_CHEF_POOLS[poolId].token0Icon}
                <div style={{flexDirection:'column'}}>
                <OverlayText>{MASTER_CHEF_POOLS[poolId].token0}</OverlayText>
                
                <OverlayGreyText fs='12px'>50%</OverlayGreyText>
                </div>
              </div>
              <PlusIcon color='#C4C4C4'></PlusIcon>
              <div style={{display: 'flex', alignItems: 'center', gap: '0.8vw'}}>
                {MASTER_CHEF_POOLS[poolId].token1Icon}
                <div style={{flexDirection:'column'}}>
                <OverlayText>{MASTER_CHEF_POOLS[poolId].token1}</OverlayText>
                
                <OverlayGreyText fs='12px'>50%</OverlayGreyText>
                </div>
              </div>
            </div>
            <HDivider style={{marginTop: '0.8vw'}}></HDivider>
            <ClaimsHead>
              <div>Time left</div>
              <div>Amount</div>
            </ClaimsHead>
            <ClaimsContainer>
              {userRewards && userRewards[poolId].vestings.length > 0 ?
                  <>
                    {

                      userRewards[poolId]?.vestings.map((item, _ind) => {

                        const amt = item.amount
                        
                        const currentTime = new Date()
                        const endTime = new Date((+item.startTime + (604800 * (4 - 1))) * 1000);

                        const diff = getDateDiff(currentTime,endTime);

                        return (
                            <>
                              {amt > 0 ?
                                    <ClaimsRow>
                                      <div> {currentTime.getTime() > endTime.getTime()  ? "Vesting complete!" : diff.day + " days " + diff.hour +  " hours " + diff.minute + " minutes"}  </div>
                                      <div>{formattedNum(+item.amount / 1e18)} ORU</div>
                                      <div style={{display: 'flex', justifyContent: 'space-around', gap: '0.4vw'}}>
                                        <OverlayClaim disabled={(currentTime.getTime() < endTime.getTime())}  onClick={() => claimReward(_ind)}><BriefcaseIcon></BriefcaseIcon>Claim</OverlayClaim>
                                        <OverlayOutline disabled={currentTime.getTime() > endTime.getTime()} onClick={() => claimWithPenalty(_ind)} ><CrosshairsIcon></CrosshairsIcon>Claim with Penalty</OverlayOutline>
                                      </div>
                                    </ClaimsRow>
                                    :
                                    null
                              }
                            </>

                        )
                      })
                    }
                  </>
                  :
                  <h3 style={{marginLeft: "1vw"}}> You have no vestings on this pool! </h3>
              }
            </ClaimsContainer>
        </FarmsOverlayContent>
      </FarmsOverlay>
    
    </> : <></>}
    <FarmsWrapper>
      { !(isRewardsOverlay && isMobileScreen()) ? 
      <>
      <HDiv justifyContent='space-between' alignItems='flex-start'>
        <VDiv>
          <HeadingText>Farms TVL</HeadingText>
          <Balance>$ {farmsTVL ? formattedNum(farmsTVL) : 0}</Balance>
        </VDiv>
        { !isMobileScreen() ? <RewardsContainer>
          <PurpleRewards>
            <RewardsIcon></RewardsIcon>
          </PurpleRewards>
          <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
            <b>Rewards</b>
            Management
          </div>

          {userRewards ?
            userRewards.map((item, _ind) => {

              return (
                  <RewardsBlock>
                    <RewardsBlockContent>
                      <RewardsValues>
                        <div style={{display: 'flex', alignItems: 'center', gap: '0.4vw'}}>
                          {MASTER_CHEF_POOLS[_ind].token0Icon}
                          <div style={{flexDirection: 'column'}}>
                            <RewardsCoinname>{MASTER_CHEF_POOLS[_ind].token0}</RewardsCoinname>
                            <RewardsPercentage>50%</RewardsPercentage>
                          </div>
                        </div>
                        <PlusIcon color="#C4C4C4"></PlusIcon>
                        <div style={{display: 'flex', alignItems: 'center', gap: '0.4vw'}}>
                          {MASTER_CHEF_POOLS[_ind].token1Icon}
                          <div style={{flexDirection: 'column'}}>
                            <RewardsCoinname>{MASTER_CHEF_POOLS[_ind].token1}</RewardsCoinname>

                            <RewardsPercentage>50%</RewardsPercentage>
                          </div>
                        </div>

                      </RewardsValues>

                      <ManageButton onClick={() => openOverlay(_ind)}>Manage</ManageButton>
                    </RewardsBlockContent>
                  </RewardsBlock>
              )

            })
              :
              null
          }
        </RewardsContainer> : <>
        <MobileRewardsContainer>
          <div>
            <div style={{display: 'flex', gap: '8px'}}>
          <PurpleRewards>
              <RewardsIcon></RewardsIcon>
          </PurpleRewards>
          <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
            <b>Rewards</b>
            Management
          </div>
          </div>
          <div>
          </div>
          {userRewards ?
            userRewards.map((item, _ind) => {
              return (
                  <RewardsBlock>
                    <RewardsBlockContent>
                      <RewardsValues>
                        <div style={{display: 'flex', alignItems: 'center', justifyContent:'flex-start', gap: '4px'}}>
                          {MASTER_CHEF_POOLS[_ind].mobileToken0Icon}
                          <div style={{flexDirection: 'column'}}>
                            <RewardsCoinname>{MASTER_CHEF_POOLS[_ind].token0}</RewardsCoinname>
                            <RewardsPercentage>50%</RewardsPercentage>
                          </div>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center', justifyContent:'center', gap: '4px'}}>
                        <PlusIcon ratio='5vw' color="#C4C4C4"></PlusIcon>
                        </div>
                        
                        <div style={{display: 'flex', alignItems: 'center', justifyContent:'flex-end', gap: '4px'}}>
                          {MASTER_CHEF_POOLS[_ind].mobileToken1Icon}
                          <div style={{flexDirection: 'column'}}>
                            <RewardsCoinname>{MASTER_CHEF_POOLS[_ind].token1}</RewardsCoinname>
                            <RewardsPercentage>50%</RewardsPercentage>
                          </div>
                        </div>
                      </RewardsValues>

                      <ManageButton onClick={() => openOverlay(_ind)}>Manage</ManageButton>
                    </RewardsBlockContent>
                  </RewardsBlock>
              )
            })
              :
              null
          }
          </div>
          </MobileRewardsContainer></>}
        
      </HDiv>
      
      <Scroll>
      { !isMobileScreen() ? <>
      <HDiv mt='2.083vw'>
        <Text ml='3.802vw'>Asset</Text>
        <Text ml='18.177vw'>Rewards</Text>
        <Text ml='9.427vw'>Deposited</Text>
        <Text ml='7.813vw'>TVL</Text>
        <Text ml='10.469vw'>Rates</Text>
      </HDiv>
      <FarmsTableWrapper>
        {masterChefPools && masterChefPools.map((item, idx) => (
          <FarmsTableItm key={idx} index={idx} item={item} />
        ))}
      </FarmsTableWrapper></> : <>
      
      <FarmsTableWrapper>
        {masterChefPools && masterChefPools.map((item, idx) => (
          <MobileTableItm key={idx} index={idx} item={item} />
        ))}
      </FarmsTableWrapper>
      
      </>  }
      { !isMobileScreen() ? <>
    <VDiv>
          <HeadingText style={{marginTop: '2.24vw'}}>Orcus Metapool</HeadingText>
    </VDiv>
     <FarmsTableWrapper >
    <FarmsTableItem>
      <MainData>
        <FarmsRow>
          <FarmsColumn>
            <div style={{display: 'flex', marginRight: '0.98vw'}}>
              <div >
            <BUSDIcon></BUSDIcon>
            </div>
            <div style={{marginLeft: '-1vw'}}>
            <USDTIcon></USDTIcon>
            </div>
            <div style={{marginLeft: '-1vw'}}>
            <USDCIcon></USDCIcon>
            </div>
            <div style={{marginLeft: '-1vw'}}>
            <BCoinIcon></BCoinIcon>
            </div>
            <div style={{marginLeft: '-1vw'}}>
            <OUSDIcon></OUSDIcon>
            </div>
            </div>
          <VDiv ml='2.481vw'>
            <Text2>
              <b>4SRS/oUSD</b>
            </Text2>
            <div style={{ display: 'flex', alignItems: 'center' }}>
            <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="10" cy="8" r="8" fill="#140846"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M12.1039 6.22754C13.1511 6.22754 14 7.07692 14 8.12467V10.1028C14 11.1506 13.1511 12 12.1039 12H7.66949C6.83986 12 6.16575 11.3338 6.15235 10.5069L6.15214 10.4818H11.423C12.1781 10.4818 12.7903 9.86932 12.7903 9.11377C12.7903 8.35822 12.1781 7.74572 11.423 7.74572H8.9394C8.5624 7.74572 8.2568 7.43995 8.2568 7.06275V6.22754H12.1039ZM12.3116 4C13.1412 4 13.8153 4.66619 13.8287 5.49309L13.8289 5.51819H8.577C7.82188 5.51819 7.20973 6.13068 7.20973 6.88622C7.20973 7.64178 7.82188 8.25427 8.577 8.25427H10.9279C11.3782 8.25427 11.7432 8.6195 11.7432 9.07005V9.77245H7.89609C6.84891 9.77245 6 8.92307 6 7.87532V5.89714C6 4.84938 6.84891 4 7.89609 4H12.3116Z" fill="url(#paint0_linear_802_2036)"/>
              <defs>
              <linearGradient id="paint0_linear_802_2036" x1="10" y1="4.12911" x2="10" y2="11.8703" gradientUnits="userSpaceOnUse">
              <stop stop-color="#FFCDEC"/>
              <stop offset="1" stop-color="#6C7DFF"/>
              </linearGradient>
              </defs>
                </svg>

              <Text fontSize='0.729vw' lineHeight='1.094vw' ml='0.313vw'>
               Sirius Finance
              </Text>
            </div>
          </VDiv>
          </FarmsColumn>
          <FarmsColumn center>
          <div style={{display: 'flex'}}>
            <div >
           <SiriusIcon></SiriusIcon>
</div>
          <div style={{marginLeft: '-1vw', paddingTop: '0.1vw'}}>
            <LogoIconBlack /></div>
            </div>
          <Text2 ml='0.7vw'>
            <b>SRS & ORU</b>
          </Text2>
          </FarmsColumn>
          <FarmsColumn center>
          <Text2
           >
             <b>${depositedInMeta ? formattedNum(depositedInMeta) : 0}</b>
          </Text2>
          </FarmsColumn>
          <FarmsColumn center>
          <Text2

          >

            <b>${metaPool ? formattedNum(metaPool.tvl) : 0}</b>
          </Text2>
          </FarmsColumn>
          <FarmsColumn center>
          <Text> APR </Text>
          <Text ml='0.885vw'

          >
            <b> {metaPool ? formattedNum(metaPool.metaApr) : 0 }%</b>
          </Text>
          </FarmsColumn>
          <FarmsColumn center>
            <AddLiquidityBtn target={"_blank"} href={"https://app.sirius.finance/#/pools/ousd/deposit"}>Add Liquidity<ArrowTopRightIcon></ArrowTopRightIcon>
            </AddLiquidityBtn>
          </FarmsColumn>

        </FarmsRow>
      </MainData>
      </FarmsTableItem>
      </FarmsTableWrapper> </> : <></> }
      </Scroll>
      </>
      :<>

        <FarmsOverlayContent>
        <div style={{display: 'flex', alignItems: 'top',  cursor: 'pointer', justifyContent: 'flex-start'}}>
                  <div  onClick={closeOverlay}>
                    <ArrowLeftIcon ratio='5vw'></ArrowLeftIcon>
                  </div>
                </div>
            <RewardsHead style={{marginTop: '16px'}}>
              <PurpleRewards>
                <RewardsIcon></RewardsIcon>
              </PurpleRewards>
              <div style={{display: 'block', paddingLeft: '0.8vw', gap: '8px'}}>
                <Text>Vested Rewards</Text><br/>
                <OverlayValue> {formattedNum(vestedAmt)} ORU</OverlayValue>
                </div>
                
            </RewardsHead>
            <div style={{display: 'flex', marginTop: '20px', alignItems: 'center', justifyContent: 'space-between'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '0.8vw'}}>
                {MASTER_CHEF_POOLS[poolId].mobileToken0Icon}
                <div style={{flexDirection:'column'}}>
                <OverlayText>{MASTER_CHEF_POOLS[poolId].token0}</OverlayText>
                <OverlayGreyText fs='12px'>50%</OverlayGreyText>
                </div>
              </div>
              <PlusIcon color='#C4C4C4' ratio='5vw'></PlusIcon>
              <div style={{display: 'flex', alignItems: 'center', gap: '0.8vw'}}>
                {MASTER_CHEF_POOLS[poolId].mobileToken1Icon}
                <div style={{flexDirection:'column'}}>
                <OverlayText>{MASTER_CHEF_POOLS[poolId].token1}</OverlayText>
                
                <OverlayGreyText fs='12px'>50%</OverlayGreyText>
                </div>
              </div>
            </div>
            <HDivider style={{marginTop: isMobileScreen() ? '16px' : '0.8vw'}}></HDivider>
            <ClaimsHead>
              <div>Time left</div>
              <div>Amount</div>
            </ClaimsHead>
            <ClaimsContainer>
              {userRewards && userRewards[poolId].vestings.length > 0 ?
                  <>
                    {

                      userRewards[poolId]?.vestings.map((item, _ind) => {

                        const amt = item.amount

                        const currentTime = new Date()
                        const endTime = new Date((+item.startTime + (604800 * (4 - 1))) * 1000);

                        const diff = getDateDiff(currentTime,endTime);

                        return (
                            <>
                              {amt > 0 ?
                                    <ClaimsRow>
                                      <div> {currentTime.getTime() > endTime.getTime()  ? "Vesting complete!" : diff.day + " days " + diff.hour +  " hours " + diff.minute + " minutes"}  </div>
                                      <div>{formattedNum(+item.amount / 1e18)} ORU</div>
                                      <div style={{display: 'flex', justifyContent: 'space-around', gap: '0.4vw'}}>
                                        <OverlayClaim disabled={(currentTime.getTime() < endTime.getTime())}  onClick={() => claimReward(_ind)}><BriefcaseIcon ratio='3vw'></BriefcaseIcon>Claim</OverlayClaim>
                                        <OverlayOutline disabled={currentTime.getTime() > endTime.getTime()} onClick={() => claimWithPenalty(_ind)} ><CrosshairsIcon ratio='3vw'></CrosshairsIcon>Claim with Penalty</OverlayOutline>
                                      </div>
                                    </ClaimsRow>
                                    :
                                    null
                              }
                            </>

                        )
                      })
                    }
                  </>
                  :
                  <h3 style={{marginLeft: "1vw"}}> You have no vestings on this pool! </h3>
              }
            </ClaimsContainer>
        </FarmsOverlayContent>

      </>}
    </FarmsWrapper>
    
    
    </>
  );
};

export default Farms;
