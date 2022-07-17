import React, {useEffect, useState} from 'react';
import FarmsTableItm from './farms-table-item';
import MobileTableItm from './mobile-table-item';
import { MASTER_CHEF_POOLS} from '../../constants'
import {
  Balance,
  FarmsTableWrapper,
  FarmsWrapper,
  HDiv,
  HeadingText,
  Text,
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
  ClaimsContainer,
  OverlayClaim,
  OverlayOutline,
  ClaimsRow,
  ClaimsHead,
  VDiv,
} from './styled';
import {ethers} from "ethers";
import UNISWAP_PAIR_ABI from "../../abis/UniswapPair.json";
import {useBlockChainContext} from "../../context/blockchain-context";
import LogoIconBlack from "../../assets/icons/LogoIconBlack";
import USDCIcon from "../../assets/icons/USDCIcon";
import OUSDIcon from "../../assets/icons/OUSDIcon";
import BriefcaseIcon from '../../assets/icons/BriefcaseIcon';
import CrosshairsIcon from '../../assets/icons/CrosshairsIcon';
import {formattedNum, getDateDiff} from "../../utils";
import RewardsIcon from '../../assets/icons/RewardsIcon';
import PlusIcon from '../../assets/icons/PlusIcon';

import CloseIcon from '../../assets/icons/CloseIcon';
import {useWeb3React} from "@web3-react/core";
import ArrowLeftIcon from '../../assets/icons/ArrowLeftIcon';
import axios from "axios";

const PAIRS = {
    "0x43783EcE7b46BB026D4CeBfd3e29f539Ff1914fB" : {
        name: "oru-usdc",
        addURL: "https://app.arthswap.org/#/add/0xCdB32eEd99AA19D39e5d6EC45ba74dC4afeC549F/0x6a2d262D56735DbA19Dd70682B39F6bE9a931D98",
        removeURL: "https://app.arthswap.org/#/remove/0x6a2d262D56735DbA19Dd70682B39F6bE9a931D98/0xCdB32eEd99AA19D39e5d6EC45ba74dC4afeC549F",
        token0Icon: <LogoIconBlack/>,
        token1Icon: <USDCIcon/>,

    },
    "0xCf83a3d83c1265780d9374e8a7c838fE22BD3DC6" : {
        name: "ousd-usdc",
        addURL: "https://app.arthswap.org/#/add/0x29F6e49c6E3397C3A84F715885F9F233A441165C/0x6a2d262D56735DbA19Dd70682B39F6bE9a931D98",
        removeURL: "https://app.arthswap.org/#/remove/0x29F6e49c6E3397C3A84F715885F9F233A441165C/0x6a2d262D56735DbA19Dd70682B39F6bE9a931D98",
        token0Icon: <OUSDIcon/>,
        token1Icon: <USDCIcon/>,
    },
    "0xE5A11AfBed6a0fC59e69493F7142ef7e454e809f" : {
        name: "ousd-oru",
        addURL: "https://app.arthswap.org/#/add/0x29F6e49c6E3397C3A84F715885F9F233A441165C/0xCdB32eEd99AA19D39e5d6EC45ba74dC4afeC549F",
        removeURL: "https://app.arthswap.org/#/remove/0x29F6e49c6E3397C3A84F715885F9F233A441165C/0xCdB32eEd99AA19D39e5d6EC45ba74dC4afeC549F",
        token0Icon: <OUSDIcon/>,
        token1Icon: <LogoIconBlack/>,
    }
}

const Farms = () => {

  const {account} = useWeb3React();
  const {contracts, signer} = useBlockChainContext();
  const [masterChefPools, setMasterChefPools] = useState(null);
  const [farmsTVL, setFarmsTVL] = useState(null);
  const [userRewards, setUserRewards] = useState(null);
  const [ isRewardsOverlay, setRewardsOverlay ] = useState(false);

  const [poolId, setPoolId] = useState(0);
  const [vestedAmt, setVestedAmt] = useState(0);

  useEffect(() => {
        init();
  }, []);

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

    const QUERY = JSON.stringify({
      query: `
        query mainData {
              oruById(id: "1") {
                  price
              }
              farms(orderBy: id_ASC) {
                id
                tvl
                allocPoint
                oruPerSec
                lpToken
              }
              pairs(orderBy: id_ASC) {
                  id
                  lpSupply
                  liquidity
              }
        }`,
      variables: {}
    });

    const URL = {
      method: 'post',
      url: 'http://localhost:4350/graphql',
      headers: {
        'Content-Type': 'application/json'
      },
      data : QUERY
    };

    const {data: {data}} = await axios(URL);

    let farmTVL = 0;

    const pairs = data.pairs;

    const totalAllocationPoint = data.farms.map(item => item.allocPoint).reduce((itemPrev, itemCurr) => itemPrev +  itemCurr);
    const pools = data.farms.map(item => {

      const pair = pairs.find(pair => pair.id === PAIRS[item.lpToken].name);
      const lpPrice = pair.liquidity / pair.lpSupply;
      const tvl = item.tvl * lpPrice;

      farmTVL += tvl;

      const oruPerBlock = item.oruPerSec * ((100 / (totalAllocationPoint / item.allocPoint)) / 100);
      const apr = ((data.oruById.price) * oruPerBlock * 86400 * 30 * 12) / tvl;

      return {
        name: PAIRS[item.lpToken].name,
        addURL: PAIRS[item.lpToken].addURL,
        removeURL: PAIRS[item.lpToken].removeURL,
        token0Icon: PAIRS[item.lpToken].token0Icon,
        token1Icon: PAIRS[item.lpToken].token1Icon,
        lpToken: new ethers.Contract(item.lpToken, UNISWAP_PAIR_ABI) ,
        lpPrice,
        tvl,
        apr
      }
    })

    setFarmsTVL(farmTVL);
    setMasterChefPools(pools)
  }

  const getVestedAmt = () => {
    let reward = 0;
    userRewards[poolId].vestings.forEach(item => {
      reward += +(item.amount) / 1e18
    })

    setVestedAmt(reward);
  }

  const getUserRewardInfo = async () => {

    const {MASTER_CHEF} = contracts;
    const info = await MASTER_CHEF.getUserInfo(account);

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
        { !isMobileScreen() ?
            <RewardsContainer>
              <PurpleRewards>
                <RewardsIcon/>
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
      { !isMobileScreen() ?
          <>
            <HDiv mt='2.083vw'>
              <Text ml='3.802vw'>Asset</Text>
              <Text ml='18.177vw'>Rewards</Text>
              <Text ml='9.427vw'>Deposited</Text>
              <Text ml='7.813vw'>TVL</Text>
              <Text ml='10.469vw'>Rates</Text>
            </HDiv>
            <FarmsTableWrapper>
              {masterChefPools && masterChefPools.map((item, idx) => (
                <>
                  <FarmsTableItm key={idx} index={idx} item={item} />
                  <HDivider/>
                </>
              ))}
            </FarmsTableWrapper></> : <>

            <FarmsTableWrapper>
              {masterChefPools && masterChefPools.map((item, idx) => (
                <MobileTableItm key={idx} index={idx} item={item} />
              ))}
            </FarmsTableWrapper>
          </>
      }
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

                                        <OverlayClaim disabled={(currentTime.getTime() < endTime.getTime())}  onClick={() => claimReward(_ind)}><BriefcaseIcon ratio='3vw'></BriefcaseIcon>Claim</OverlayClaim>
                                        <OverlayOutline disabled={currentTime.getTime() > endTime.getTime()} onClick={() => claimWithPenalty(_ind)} ><CrosshairsIcon ratio='3vw'></CrosshairsIcon>Claim with Penalty</OverlayOutline>

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
