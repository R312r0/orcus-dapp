
import { HeadingText,TopIconWrapper, FilterOverlaySelect,TopCardMobile, SortByOverlay, SortByOverlayOption, FilterOverlay, LightText,GetBtn, VaultItemContent,FontSize, VaultTableItem,GreyText,VaultTableContent, VaultTableHeader, SearchContainer, HDivider, VaultsContainer, VaultsWrapper, SearchRow, SortByContainer, FilterContainer, TopbarOptions, VaultsTable, VaultsTableTopbar, TopWrapper, SmallTopCard, LargeTopCard, TopbarOption, VaultItem, VDivider } from "./styled";
import FilterIcon from '../../assets/icons/FilterIcon';
import React, {useEffect, useState} from 'react';

import { KeyboardArrowDown, Light } from "@mui/icons-material";
import SearchIcon from "../../assets/icons/SearchIcon";
import SliderIcon from "../../assets/icons/SliderIcon";
import CardIcon from "./assets/CardIcon";
import CalendarIcon from "./assets/CalendarIcon";
import CalendarVertical from "./assets/CalendarVertical";
import {CONTRACT_ADDRESSES, JSON_RPC_URL, VAULTS} from "../../constants";
import {useNavigate} from "react-router";
import {useBlockChainContext} from "../../context/blockchain-context";
import {useWeb3React} from "@web3-react/core";
import {ethers} from "ethers";

import VAULT_ABI from '../../abis/Vault.json';
import UNISWAP_PAIR from '../../abis/UniswapPair.json';
import PANDORA_CHEF_ABI from '../../abis/PandoraChef.json';
import {formattedNum} from "../../utils";

import Pandora from '../../assets/icons/Pandora.png';

import axios from "axios";
import FarmsTableItem from './mobile-item/index'


const Vaults = () => {

    const {signer, setGlobalVaults} = useBlockChainContext()
    const {account} = useWeb3React();
    const navigate = useNavigate();

    const [selectedTopbarCategory, setTopbarCategory] = React.useState('Stake');
    const [vaultsValue, setVaultsValue] = React.useState('All Vaults')


    const [isFilterOverlay, setFilterOverlay ] = React.useState(false)
    const [isSortByOverlay, setSortByOverlay] = React.useState(false);

    const [vaultsFormatted, setVaultsFormatted] = useState(null);
    const [overallTVL, setOverallTVL] = useState(0);

    const [overallDeposited, setOverallDeposited] = useState(0);
    const [overallYearlyYield, setOverallYearlyYield] = useState(0);

    useEffect(() => {

        if (account && signer) {
            getPoolsInfo();
        }

    }, [account, signer])


    const isMobileScreen = ( ) => {
        let query = window.matchMedia('(max-device-width: 480px)')
        return query.matches
      }

    const handleTopbarClick = (event) => {
        let value = event.currentTarget.dataset.value
        setTopbarCategory(value);
    }
    const handleVaultsClick = (event) => {
        let value = event.currentTarget.dataset.value
        setVaultsValue(value);
    }

    const getPoolsInfo = async () => {

        const readProvider = new ethers.providers.JsonRpcProvider(JSON_RPC_URL);

        const {data: {market_data: {current_price}}} = await axios.get("https://api.coingecko.com/api/v3/coins/astar");
        const astrPrice = current_price.usd;
        // TODO: make main project token price calculations.

        const astarBlockPerYear = 2502857.1428571427;
        const pandoraPerBlock = 4

        let overallTVL = 0;
        let userOverallDeposited = 0;
        let overallYield = 0;

        const newVaults = VAULTS.map(async (item,_ind) => {

            const pair = new ethers.Contract(item.lpAddress, UNISWAP_PAIR, readProvider);
            const vault = new ethers.Contract(item.vaultAddress, VAULT_ABI, readProvider);
            const masterChef = new ethers.Contract(item.masterChefAddress, PANDORA_CHEF_ABI, readProvider);

            const userDepo = +(await vault.balanceOf(account)) / 1e18;
            const vaultTotalSupply = +(await vault.totalSupply()) / 1e18;

            const vaultPerShare = +(await vault.getPricePerFullShare()) / 1e18;

            // MasterChefData
            const masterBal = +(await pair.balanceOf(item.masterChefAddress)) / 1e18;
            const mainTokenPrice = await getMainTokenPrice(new ethers.Contract(item.mainTokenPair, UNISWAP_PAIR, readProvider));

            const lpSupply = +(await pair.totalSupply()) / 1e18
            const reserves = await pair.getReserves();

            let lpPrice;
            let tvl;
            let tvlLocal;

            // APR
            const pandoraPerYear = astarBlockPerYear * pandoraPerBlock;
            const poolWeight = await getPoolWeight(masterChef, item.poolIndex);

            if (item.id === "pandora-wastr") {
                const astrTvl = (+reserves[1] / 1e18) * astrPrice;
                const ercTvl = mainTokenPrice * (+reserves[0] / 1e18);

                lpPrice = (astrTvl + ercTvl)  / lpSupply;
                tvlLocal = (vaultTotalSupply * vaultPerShare) * lpPrice;
                tvl = lpPrice * masterBal;
                overallTVL += tvlLocal;
                userOverallDeposited += lpPrice * (userDepo * vaultPerShare)
            }

            else if (item.id === "usdc-pandora") {
                const usdcTvl = (+reserves[0] / 1e6);
                const pandoraTvl = mainTokenPrice * (reserves[1] / 1e18);

                lpPrice = (usdcTvl + pandoraTvl) / lpSupply;
                tvlLocal = (vaultTotalSupply * vaultPerShare) * lpPrice;
                tvl = lpPrice * masterBal;
                overallTVL += tvlLocal;
                userOverallDeposited += lpPrice * (userDepo * vaultPerShare);

            }

            else if (item.id === "usdt-usdc") {
                lpPrice = ((+reserves[0] / 1e6) + (+reserves[1]/ 1e6)) / lpSupply;
                tvlLocal = (vaultTotalSupply * vaultPerShare) * lpPrice;
                tvl = lpPrice * masterBal;
                overallTVL += tvlLocal;
                userOverallDeposited += lpPrice * (userDepo * vaultPerShare);
            }

            const a = poolWeight * pandoraPerYear;
            const aprBase = ((a * mainTokenPrice) / tvl) * 100;
            const apr = ((1 + (aprBase / 100) / 8760)**8760-1) * 100;


            overallYield += (lpPrice * (vaultTotalSupply * vaultPerShare)) + ((lpPrice * (vaultTotalSupply * vaultPerShare)) * (apr / 100));

            return {
                ...item,
                deposited: {
                    lp: userDepo * vaultPerShare,
                    usd: lpPrice * (userDepo * vaultPerShare)
                },
                tvl,
                tvlLocal,
                apr
            }
        })



        const val = await Promise.all(newVaults);
        setVaultsFormatted(val);
        setGlobalVaults(val);
        setOverallTVL(overallTVL);
        setOverallDeposited(userOverallDeposited);
        setOverallYearlyYield(overallYield);
    }

    const getPoolWeight = async (masterChef, poolIndex) => {

        const totalAllocationPoints = await masterChef.totalAllocPoint();
        const poolInfo = await masterChef.poolInfo(poolIndex);
        const poolWeight = +poolInfo.allocPoint / +totalAllocationPoints;

        return poolWeight

    }

    const getMainTokenPrice = async (contract) => {

        const reserves = await contract.getReserves();
        const token0 = await contract.token0();
        const token1 = await contract.token1();

        let price;

        if (token0 === CONTRACT_ADDRESSES.USDC) {
            price = (+reserves[0] / 1e6) / (+reserves[1] / 1e18);
        }

        else if (token1 === CONTRACT_ADDRESSES.USDC) {
            price = (+reserves[1] / 1e6) / (+reserves[0] / 1e18);
        }

        return price;

    }

    return (
        <VaultsWrapper>
            <HeadingText>Vaults</HeadingText>
            <TopWrapper>
                <SmallTopCard>
                    <TopIconWrapper bg='#F5EFD7'>
                        <CardIcon ratio={isMobileScreen() ? '20px' : '1.25vw'}/>
                    </TopIconWrapper>
                    <div style={{display: 'flex', flexDirection:'column'}}>Deposited<GreyText fs={isMobileScreen() ? '14px' : ''}>${formattedNum(overallDeposited)}</GreyText></div>
                </SmallTopCard>
                <SmallTopCard>
                <TopIconWrapper bg='#E4DDEF'>
                <CalendarVertical ratio={isMobileScreen() ? '20px' : '1.25vw'}/>
                </TopIconWrapper>
                <div style={{display: 'flex', flexDirection:'column'}}>Monthly Yield<GreyText fs={isMobileScreen() ? '14px' : ''}>${formattedNum(overallYearlyYield / 12)}</GreyText></div>
                </SmallTopCard>
                <SmallTopCard>
                    <TopIconWrapper bg='#D5ECD8'>
                        <CalendarIcon ratio={isMobileScreen() ? '20px' : '1.25vw'}/>
                    </TopIconWrapper>
                    <div style={{display: 'flex', flexDirection:'column'}}>Daily Yield<GreyText fs={isMobileScreen() ? '14px' : ''}>${formattedNum(overallYearlyYield / 365)}</GreyText></div>
                </SmallTopCard>
                { isMobileScreen() ? <>

                <TopCardMobile>
                    <div style={{width: '100%', borderBottom: '1px solid #F2F2F2'}}>
                        TVL: <GreyText fs='0.94vw'>$</GreyText>{formattedNum(overallTVL)}
                    </div>
                    <div style={{width: '100%', display: 'flex'}}>
                        <div style={{width: '50%', borderRight: '1px solid #F2F2F2'}}>Vaults: {VAULTS.length}</div>
                        <div style={{width: '50%'}}> Daily Buyback: <GreyText fs='0.94vw'>$</GreyText> Not calculated yet!</div>
                    </div>
                </TopCardMobile>
                </> :
                <LargeTopCard>
                    <div style={{width: '12.05vw'}}>
                    TVL: <GreyText fs='0.94vw'>$</GreyText>{formattedNum(overallTVL)}
                    </div>
                    <VDivider/>
                    <div style={{width: '14.65vw'}}>
                        Vaults: {VAULTS.length}
                    </div>
                    <VDivider/>
                    <div style={{width: '20vw'}}>
                    Daily Buyback: <GreyText fs='0.94vw'>$</GreyText> Not calculated yet!
                    </div>
                </LargeTopCard>}
            </TopWrapper>
            <VaultsTable>
                <VaultsTableTopbar>
                    <TopbarOptions>
                            <TopbarOption onClick={handleTopbarClick} active={selectedTopbarCategory === 'Stake'} data-value={'Stake'}>Stake</TopbarOption>
                            <TopbarOption onClick={handleTopbarClick} active={selectedTopbarCategory === 'Stablecoins'} data-value={'Stablecoins'}>Stablecoins</TopbarOption>
                            <TopbarOption onClick={handleTopbarClick} active={selectedTopbarCategory === 'Blue Chips'} data-value={'Blue Chips'}>Blue Chips</TopbarOption>
                            <TopbarOption onClick={handleTopbarClick} active={selectedTopbarCategory === 'Orcus Vaults'} data-value={'Orcus Vaults'}>Orcus Vaults</TopbarOption>
                    </TopbarOptions>
                    { isMobileScreen() ? <></> :
                    <div style={{display: "flex", gap: '0.94vw'}}>
                        <SortByContainer active={isSortByOverlay} onClick={() => setSortByOverlay(!isSortByOverlay)}>
                            <div style={{display: 'flex', alignItems: 'center', gap: '0.5vw'}}>
                            <FilterIcon color='#333' ratio='0.79vw'/>
                                Sort by:
                            </div>
                            <div style={{transition: '0.1s', transform: isSortByOverlay ? 'rotate(180deg)' : ''}}>
                                <KeyboardArrowDown color={'#828282'}/>
                            </div>
                            { isSortByOverlay ?
                            <SortByOverlay>
                                <SortByOverlayOption>Date</SortByOverlayOption>
                                <SortByOverlayOption>APY</SortByOverlayOption>
                                <SortByOverlayOption>Deposit</SortByOverlayOption>
                                <SortByOverlayOption>TVL</SortByOverlayOption>
                            </SortByOverlay> : <></> }
                        </SortByContainer>
                        <FilterContainer active={isFilterOverlay} onClick={()=> setFilterOverlay(!isFilterOverlay)}>
                            <div style={{display: 'flex', alignItems: 'center', gap: '0.5vw'}}>

                                <SliderIcon ratio='0.79vw'/>
                                Filter
                            </div>
                            <div style={{transition: '0.1s', transform: isFilterOverlay ? 'rotate(180deg)' : ''}}>
                                <KeyboardArrowDown color={'#828282'}/>
                            </div>
                            { isFilterOverlay ?
                            <FilterOverlay>
                                Showing 753/1691
                                <FilterOverlaySelect >
                                    <option>Platform: All</option>
                                </FilterOverlaySelect>
                                <FilterOverlaySelect mt={'0.52vw'}>
                                    <option>Vault Type: All</option>
                                </FilterOverlaySelect>
                            </FilterOverlay> : <></> }

                        </FilterContainer>
                    </div> }
                </VaultsTableTopbar>
                <SearchRow>
                    <SearchContainer>
                        <input type='text' placeholder='Seach'/>
                        <div>
                            <SearchIcon ratio='0.85vw'/>
                        </div>
                    </SearchContainer>
                    { isMobileScreen() ? <>
                        <SortByContainer active={isSortByOverlay} onClick={() => setSortByOverlay(!isSortByOverlay)}>
                            <div style={{display: 'flex', alignItems: 'center', gap: '0.5vw'}}>
                            <FilterIcon color='#333' ratio='5vw'/>
                            </div>
                            <div style={{transition: '0.1s', transform: isSortByOverlay ? 'rotate(180deg)' : ''}}>
                                <KeyboardArrowDown color={'#828282'}/>
                            </div>
                            { isSortByOverlay ?
                            <SortByOverlay>
                                <SortByOverlayOption>Date</SortByOverlayOption>
                                <SortByOverlayOption>APY</SortByOverlayOption>
                                <SortByOverlayOption>Deposit</SortByOverlayOption>
                                <SortByOverlayOption>TVL</SortByOverlayOption>
                            </SortByOverlay> : <></> }
                        </SortByContainer>
                        <FilterContainer active={isFilterOverlay} onClick={()=> setFilterOverlay(!isFilterOverlay)}>
                            <div style={{display: 'flex', alignItems: 'center', gap: '0.5vw'}}>
                                <SliderIcon ratio='5vw'/>
                            </div>
                            <div style={{transition: '0.1s', transform: isFilterOverlay ? 'rotate(180deg)' : ''}}>
                                <KeyboardArrowDown color={'#828282'}/>
                            </div>
                            { isFilterOverlay ?
                            <FilterOverlay>
                                Showing 753/1691
                                <FilterOverlaySelect >
                                    <option>Platform: All</option>
                                </FilterOverlaySelect>
                                <FilterOverlaySelect mt={'0.52vw'}>
                                    <option>Vault Type: All</option>
                                </FilterOverlaySelect>
                            </FilterOverlay> : <></> }

                        </FilterContainer>
                    </> : <></>}
                    <VaultsContainer>
                        <VaultItem onClick={handleVaultsClick} data-value='All Vaults' active={vaultsValue === 'All Vaults'}>All Vaults</VaultItem>
                        <VaultItem onClick={handleVaultsClick} data-value='Eligible Vaults' active={vaultsValue === 'Eligible Vaults'}>Eligible Vaults</VaultItem>
                        <VaultItem onClick={handleVaultsClick} data-value='My Vaults' active={vaultsValue === 'My Vaults'}>My Vaults</VaultItem>
                    </VaultsContainer>
                </SearchRow>
                <HDivider marginBottom='0'/>
                { isMobileScreen() ? <></> : <VaultTableHeader>
                    <VaultTableContent>
                        <div>Asset</div>
                        <div>Wallet</div>
                        <div>Deposited</div>
                        <div>APY</div>
                        <div>Daily</div>
                        <div>TVL</div>
                        <div></div>
                    </VaultTableContent>
                </VaultTableHeader> }
                {vaultsFormatted && vaultsFormatted.map(item => {

                    if(isMobileScreen()){
                        return <FarmsTableItem item={item}></FarmsTableItem>
                    }else{


                    return(
                        <>
                            <HDivider marginTop='0' marginBottom='0'/>
                            <VaultTableItem>
                                <VaultItemContent>
                                    <div style={{display: 'flex', gap: '1.2vw'}}>
                                        <div style={{display: 'flex', gap: '0.87vw'}}>
                                            {item.token0.logo}
                                            {item.token1.logo}
                                        </div>
                                        <div>
                                            <div>{item.name}</div>
                                            <FontSize fs='0.72vw'><LightText>Platform:</LightText><img src={Pandora} width='12' /> {item.platform.name}</FontSize>
                                        </div>
                                    </div>
                                    <div>0</div>
                                    <div style={{display: 'flex', flexDirection: 'column'}}><div>{formattedNum(item.deposited.lp)}</div><FontSize fs='0.64vw'><LightText>(${formattedNum(item.deposited.usd)})</LightText></FontSize></div>
                                    <div>{formattedNum(item.apr)}%</div>
                                    <div>{formattedNum(item.apr / 365)}%</div>
                                    <div><GreyText fs='0.93vw'>$</GreyText>{formattedNum(item.tvlLocal)}</div>
                                    <div style={{display: 'flex', justifyContent: 'center'}}>
                                        <GetBtn onClick={() => navigate(`/vaults/${item.id}`)} > Get </GetBtn>
                                    </div>
                                </VaultItemContent>
                            </VaultTableItem>
                        </>
                    )}
                })}
            </VaultsTable>
        </VaultsWrapper>
    )
}

export default Vaults;