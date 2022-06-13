
import { HeadingText,TopIconWrapper, Overflow, FilterOverlaySelect,TopCardMobile, SortByOverlay, SortByOverlayOption, FilterOverlay, LightText,GetBtn, VaultItemContent,FontSize, VaultTableItem,GreyText,VaultTableContent, VaultTableHeader, SearchContainer, HDivider, VaultsContainer, VaultsWrapper, SearchRow, SortByContainer, FilterContainer, TopbarOptions, VaultsTable, VaultsTableTopbar, TopWrapper, SmallTopCard, LargeTopCard, TopbarOption, VaultItem, VDivider } from "./styled";
import FilterIcon from '../../assets/icons/FilterIcon';
import React, {useEffect, useState} from 'react';
import { KeyboardArrowDown, Light } from "@mui/icons-material";
import SearchIcon from "../../assets/icons/SearchIcon";
import SliderIcon from "../../assets/icons/SliderIcon";
import CardIcon from "./assets/CardIcon";
import CalendarIcon from "./assets/CalendarIcon";
import CalendarVertical from "./assets/CalendarVertical";
import {
    CONTRACT_ADDRESSES,
    JSON_RPC_URL,
    MASTER_CHEF_ABIS,
    TEST_VAULT,
    VAULT_CATEGORIES,
    VAULTS
} from "../../constants";
import {useNavigate} from "react-router";
import {useBlockChainContext} from "../../context/blockchain-context";
import {useWeb3React} from "@web3-react/core";
import {ethers} from "ethers";

import VAULT_ABI from '../../abis/Vault.json';
import VAULT_NATIVE_ABI from '../../abis/VaultNative.json';
import UNISWAP_PAIR from '../../abis/UniswapPair.json';
import ROUTER_ABI from '../../abis/Vaults-zap-rotuer.json';
import ERC20_ABI from '../../abis/ERC20.json';

import {formattedNum} from "../../utils";
import axios from "axios";
import FarmsTableItem from './mobile-item/index'
import VaultById from "../VaultById";
import fromExponential from "from-exponential";

const TOP_BAR_CATEGORIES = {
    ALL: "All",
    STABLE: "Stablecoins",
    BLUE_CHIPS: "Blue Chips",
    ORCUS: "Orcus Vaults",
}

const SECOND_BAR_CATEGORIES = {
    ALL: "All Vaults",
    ELIGIBLE: "Eligible Vaults",
    MY: "My Vaults"
}

const Vaults = () => {

    const {account} = useWeb3React();

    const [selectedTopbarCategory, setTopbarCategory] = useState(TOP_BAR_CATEGORIES.ALL);
    const [vaultsValue, setVaultsValue] = useState('All Vaults')

    const [isFilterOverlay, setFilterOverlay] = useState(false)
    const [isSortByOverlay, setSortByOverlay] = useState(false);

    const [searchVaultInput, setSearchVaultInput] = useState("");

    // FIXME: when will be tested take it off.
    const [clearVaults, setClearVaults] = useState(null);
    const [filteredVaults, setFilteredVaults] = useState(null);
    const [selectedVault, setSelectedVault] = useState(null);
    const [userData, setUserData] = useState(null);
    const [selectedUserData, setSelectedUserData] = useState(null);
    const [overallTVL, setOverallTVL] = useState(0);
    const [topInfo, setTopInfo] = useState({deposited: 0, monthYield: 0, dailyYield: 0})

    useEffect(() => {

        convertVaultsData();

    }, [])

    useEffect(() => {

        if (clearVaults && account) {
            getUserInfo(clearVaults);
        }

    }, [account, clearVaults]);

    const convertVaultsData = async () => {

        const readProvider = new ethers.providers.JsonRpcProvider(JSON_RPC_URL);

        let overallTvl = 0;

        let vaultsArr = await Promise.all(
            TEST_VAULT.map(async project => {

                const tokenData = await axios.get(`https://api.dexscreener.io/latest/dex/tokens/${project.rewardTokenAddress}`); // Pass
                const rewardTokenPrice = parseFloat(tokenData.data.pairs[0].priceUsd); // Pass

                const router = !project.lending ? new ethers.Contract(project.routerAddress, ROUTER_ABI, readProvider) : null; // Check if single pool we don't need router-zapper.

                return await Promise.all(project.vaults.map(async vault => {

                    const lpContract = new ethers.Contract(vault.lpAddress, ERC20_ABI, readProvider); // Lp - ERC20 contract in case of single pool lp is just token, like USDC or DAI
                    const masterChief = !project.lending ? new ethers.Contract(project.masterChiefAddress, MASTER_CHEF_ABIS[project.name], readProvider) : null; // Check if lending we don't have master-chief.
                    const vaultContract = new ethers.Contract(vault.vaultAddress, !project.lending ? VAULT_ABI : VAULT_NATIVE_ABI, readProvider); // Pass
                    const token0Contract = new ethers.Contract(vault.token0.address,ERC20_ABI,readProvider);
                    const token1Contract = !project.lending ? new ethers.Contract(vault.token1.address,ERC20_ABI,readProvider) : null; // If lending we don't have second token

                    const {poolTvl, vaultTvl, lpPrice} = !project.lending ? await getPoolTVL(lpContract, masterChief, vaultContract) : await getLendingPoolTVL(lpContract, token0Contract, vaultContract); // If lending use new function instead default.
                    const {apy} = !project.lending ? await getPoolApy(poolTvl, masterChief, project.name, vault.poolIndex, rewardTokenPrice) : await getLendingApy(poolTvl); // TODO: calculate lending pool APY

                    const isBeefInEth = vault.lpAddress === "0xAeaaf0e2c81Af264101B9129C00F4440cCF0F720" || vault.token0.name === "WASTR" || vault?.token1?.name === "WASTR";

                    overallTvl += vaultTvl;

                    return {
                        projectData: {
                            name: project.name,
                            logo: project.logo,
                            description: project.description,
                            twitter: project.twitter,
                            website: project.website,
                            telegram: project.telegram,
                        },
                        data: {
                          rewardTokenPrice,
                          poolTvl,
                          vaultTvl,
                          lpPrice,
                          apy,
                        },
                        contracts: {
                            lpContract,
                            masterChief,
                            vaultContract,
                            router
                        },
                        info: {
                            buyLink: project.buyLink,
                            isBeefInEth,
                            isLending: project.lending
                        },
                        ...vault,
                        token0: {
                            contract: token0Contract,
                            ...vault.token0
                        },
                        token1: !project.lending ? {
                            contract: token1Contract,
                            ...vault.token1
                        } : null, // If project is lending than we don't need token1 tho.
                    }
                }))
            })
        )

        let arr = []

        vaultsArr.forEach(proj => {
            proj.forEach(vault => {
                arr.push(vault)
            })
        })

        //** Adding extra index for secondTopBar filtering.
        arr = arr.map((item, _ind) => {
            return {
                baseIndex: _ind,
                ...item
            }
        })

        setClearVaults(arr);
        setFilteredVaults(arr);
        setOverallTVL(overallTvl);
    }

    const getPoolTVL = async (lpContract, masterChief, vaultContract) => {

        const {data: {pair: {liquidity: {usd}}}} = await axios.get(`https://api.dexscreener.com/latest/dex/pairs/astar/${lpContract.address}`)

        const supply = +(await lpContract.totalSupply()) / 1e18;
        const masterChiefBalance = +(await lpContract.balanceOf(masterChief.address)) / 1e18;

        const lpPrice = usd / supply;

        const poolTvl = masterChiefBalance * lpPrice;
        const vaultTvl = ((+(await vaultContract.totalSupply()) / 1e18) * (+(await vaultContract.getPricePerFullShare()) / 1e18)) * lpPrice;

        return {poolTvl, vaultTvl, lpPrice}

    }

    const getLendingPoolTVL = async (lpContract, tokenContract, vaultContract) => {

        const tokenData = await axios.get(`https://api.dexscreener.io/latest/dex/tokens/${tokenContract.address}`); // Pass
        const usd = parseFloat(tokenData.data.pairs[0].priceUsd);

        const aTokenSupply = await lpContract.totalSupply();
        const aTokenDecimals = await lpContract.decimals();

        const poolTvl = (+aTokenSupply / 10**(+aTokenDecimals)) * usd;
        const vaultTvl = ((+(await vaultContract.totalSupply()) / 10**aTokenDecimals)) * (+(await vaultContract.getPricePerFullShare()) / 1e18) * usd;
        return {poolTvl, vaultTvl, lpPrice: usd};
    }

    const getPoolApy = async (tvl, contract, projName, poolIndex, mainTokenPrice) => {
        const astarBlockPerYear = 2502857.1428571427;

        let rewardPerBlock;

        switch (projName) {

            case "Pandora-Swap":
                rewardPerBlock = +(await contract.pandoraPerBlock()) / 1e18;
                break;
            case "Astar-Exchange":
                rewardPerBlock = +(await contract.solarPerBlock()) / 1e18;
                break;

        }

        const rewardPerYear = rewardPerBlock * astarBlockPerYear;

        const totalAllocationPoints = await contract.totalAllocPoint();
        const poolInfo = await contract.poolInfo(poolIndex);
        const poolWeight = +poolInfo.allocPoint / +totalAllocationPoints;

        const a = poolWeight * rewardPerYear;
        const aprBase = ((a * mainTokenPrice) / tvl) * 100;
        const apy = ((1 + (aprBase / 100) / 8760)**8760-1) * 100;

        return {apy}
    }

    const getLendingApy = async (liquidity) => {

        const secondYear = 3153600;
        const RAY = 10**27;
        const depositApr = (liquidity/RAY) * 100;
        // const apy = ((1 + (depositApr / 100) / 8760)**8760-1) * 100;
        const depositAPY = ((1 + (depositApr / secondYear)) ^ secondYear) - 1;
        const apy = depositAPY;

        return {apy};
    }

    const getUserInfo = async (vaults) => {

        let deposited = 0;
        let overallYield = 0;

        const newVaults = await Promise.all(vaults.map(async val => {

            const {vaultContract} = val.contracts;

            const lpDecimals = +(await val.contracts.lpContract.decimals());

            const balance = !val.info.isLending ? +(await vaultContract.balanceOf(account)) / 1e18 : +(await vaultContract.balanceOf(account)) / 10**lpDecimals;
            const multiplier = +(await vaultContract.getPricePerFullShare()) / 1e18;

            const lpBalance = balance * multiplier;
            const usdBalance = lpBalance * val.data.lpPrice;

            deposited += usdBalance;
            overallYield += (usdBalance * 2) * (val.data.apy / 100);

            return {
                depositedLp: lpBalance,
                depositedUsd: usdBalance
            }

        }))

        setUserData(newVaults);
        setTopInfo({deposited, dailyYield: overallYield / 365, monthYield: overallYield / 12})

    }

    const handleVaultPage = (vault, user) => {

        setSelectedVault(vault);
        setSelectedUserData(user);

    }

    // ** Search logic effects
    useEffect(() => {

        if (searchVaultInput.length > 0 && filteredVaults) {

            const topBarFilteredArr = selectedTopbarCategory === TOP_BAR_CATEGORIES.ALL ? clearVaults : clearVaults.filter(item => item.category === selectedTopbarCategory);
            const secondaryFilteredArr = vaultsValue === SECOND_BAR_CATEGORIES.ALL ? topBarFilteredArr : filterSecondCategoryArr(topBarFilteredArr, vaultsValue);

            const newArr = secondaryFilteredArr.filter(item => item.name.startsWith(searchVaultInput));
            setFilteredVaults(newArr);
        }
        else {
            const topBarFilteredArr = selectedTopbarCategory === TOP_BAR_CATEGORIES.ALL ? clearVaults : clearVaults.filter(item => item.category === selectedTopbarCategory);
            const secondaryFilteredArr = vaultsValue === SECOND_BAR_CATEGORIES.ALL ? topBarFilteredArr : filterSecondCategoryArr(topBarFilteredArr, vaultsValue);

            setFilteredVaults(secondaryFilteredArr);
        }
    }, [searchVaultInput]);

    useEffect(() => {

        if (selectedTopbarCategory && filteredVaults) {
            const newArr = selectedTopbarCategory === TOP_BAR_CATEGORIES.ALL ? clearVaults : clearVaults.filter(item => item.category === selectedTopbarCategory);
            setFilteredVaults(newArr);
            setSearchVaultInput("");
            setVaultsValue(SECOND_BAR_CATEGORIES.ALL)
        }

    }, [selectedTopbarCategory])

    useEffect(() => {

        if (vaultsValue && filteredVaults) {
            const topBarFilteredArr = selectedTopbarCategory === TOP_BAR_CATEGORIES.ALL ? clearVaults : clearVaults.filter(item => item.category === selectedTopbarCategory);
            const newArr = filterSecondCategoryArr(topBarFilteredArr, vaultsValue);

            setFilteredVaults(newArr);
            setSearchVaultInput("");
        }

    }, [vaultsValue])

    const filterSecondCategoryArr = (firstArr, filterPattern) => {
        let newArr;

        switch (filterPattern) {
            case SECOND_BAR_CATEGORIES.ALL:
                newArr = firstArr;
                break;
            case SECOND_BAR_CATEGORIES.ELIGIBLE:
                newArr = firstArr;
                break;
            case SECOND_BAR_CATEGORIES.MY:
                newArr = firstArr.filter(item => userData[item.baseIndex].depositedLp > 0);
                break;
            default:
                newArr = firstArr;
                break;
        }

        return newArr;
    }

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

    return (
        <>
        {selectedVault && selectedUserData ?
            <VaultById vault={selectedVault} userData={selectedUserData} handleVaultPage={handleVaultPage}/>
                :
                <VaultsWrapper>
                    <HeadingText>Vaults</HeadingText>
                    <TopWrapper>
                        <SmallTopCard>
                            <TopIconWrapper bg='#F5EFD7'>
                                <CardIcon ratio={isMobileScreen() ? '20px' : '1.25vw'}/>
                            </TopIconWrapper>
                            <div style={{display: 'flex', flexDirection:'column', gap: isMobileScreen() ? '12px' : '0.21vw'}}>Deposited<GreyText fs={isMobileScreen() ? '14px' : ''}>${formattedNum(topInfo.deposited)}</GreyText></div>
                        </SmallTopCard>
                        <SmallTopCard>
                            <TopIconWrapper bg='#E4DDEF'>
                                <CalendarVertical ratio={isMobileScreen() ? '20px' : '1.25vw'}/>
                            </TopIconWrapper>
                            <div style={{display: 'flex', flexDirection:'column', gap: isMobileScreen() ? '12px' : '0.21vw'}}>Monthly Yield<GreyText fs={isMobileScreen() ? '14px' : ''}>${formattedNum(topInfo.monthYield)}</GreyText></div>
                        </SmallTopCard>
                        <SmallTopCard>
                            <TopIconWrapper bg='#D5ECD8'>
                                <CalendarIcon ratio={isMobileScreen() ? '20px' : '1.25vw'}/>
                            </TopIconWrapper>
                            <div style={{display: 'flex', flexDirection:'column', gap: isMobileScreen() ? '12px' : '0.21vw'}}>Daily Yield<GreyText fs={isMobileScreen() ? '14px' : ''}>${formattedNum(topInfo.dailyYield)}</GreyText></div>
                        </SmallTopCard>
                        { isMobileScreen() ? <>

                                <TopCardMobile>
                                    <div style={{width: '100%', borderBottom: '1px solid #F2F2F2'}}>
                                        TVL: <GreyText fs='0.94vw'>$</GreyText>{formattedNum(overallTVL)}
                                    </div>
                                    <div style={{width: '100%', display: 'flex'}}>
                                        <div style={{width: '50%', borderRight: '1px solid #F2F2F2'}}>Vaults: {clearVaults ? clearVaults.length : "Calculating..."}</div>
                                        <div style={{width: '50%'}}> Daily Buyback: <GreyText fs='0.94vw'>$</GreyText> Not calculated yet!</div>
                                    </div>
                                </TopCardMobile>
                            </> :
                            <LargeTopCard>
                                <div style={{width: '12.05vw', display: 'flex', gap: '0.6vw', alignItems: 'center', justifyContent:'center'}}>
                                    TVL: <div><GreyText mt='0vw' fs='0.94vw'>$</GreyText>{formattedNum(overallTVL)}</div>
                                </div>
                                <VDivider/>
                                <div style={{width: '14.65vw'}}>
                                    Vaults: {clearVaults ? clearVaults.length : "Calculating..."}
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
                                <TopbarOption onClick={handleTopbarClick} active={selectedTopbarCategory === TOP_BAR_CATEGORIES.ALL} data-value={TOP_BAR_CATEGORIES.ALL}>All</TopbarOption>
                                <TopbarOption onClick={handleTopbarClick} active={selectedTopbarCategory === TOP_BAR_CATEGORIES.STABLE} data-value={TOP_BAR_CATEGORIES.STABLE}>Stablecoins</TopbarOption>
                                <TopbarOption onClick={handleTopbarClick} active={selectedTopbarCategory === TOP_BAR_CATEGORIES.BLUE_CHIPS} data-value={TOP_BAR_CATEGORIES.BLUE_CHIPS}>Blue Chips</TopbarOption>
                                <TopbarOption onClick={handleTopbarClick} active={selectedTopbarCategory === TOP_BAR_CATEGORIES.ORCUS} data-value={TOP_BAR_CATEGORIES.ORCUS}>Orcus Vaults</TopbarOption>
                            </TopbarOptions>
                            { isMobileScreen() ? <></> :
                                <div style={{display: "flex", gap: '0.94vw'}}>
                                    <SortByContainer style={{visibility: "hidden"}} active={isSortByOverlay} onClick={() => setSortByOverlay(!isSortByOverlay)}>
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
                                    <FilterContainer style={{visibility: "hidden"}} active={isFilterOverlay} onClick={()=> setFilterOverlay(!isFilterOverlay)}>
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
                                <input type='text' placeholder='Seach' value={searchVaultInput} onChange={(e) => setSearchVaultInput(e.target.value)}/>
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
                                <VaultItem onClick={handleVaultsClick} data-value={SECOND_BAR_CATEGORIES.ALL} active={vaultsValue === SECOND_BAR_CATEGORIES.ALL}>All Vaults</VaultItem>
                                <VaultItem onClick={handleVaultsClick} data-value={SECOND_BAR_CATEGORIES.ELIGIBLE} active={vaultsValue === SECOND_BAR_CATEGORIES.ELIGIBLE}>Eligible Vaults</VaultItem>
                                <VaultItem onClick={handleVaultsClick} data-value={SECOND_BAR_CATEGORIES.MY} active={vaultsValue === SECOND_BAR_CATEGORIES.MY}>My Vaults</VaultItem>
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
                        <Overflow>
                            {filteredVaults && filteredVaults.map((vault) => {


                                if(isMobileScreen()){
                                    return <FarmsTableItem item={vault} userData={userData ? userData[vault.baseIndex] : null} handleVaultPage={handleVaultPage}/>
                                }else{

                                    return(
                                        <>
                                            <HDivider marginTop='0' marginBottom='0'/>
                                            <VaultTableItem>
                                                <VaultItemContent>
                                                    <div style={{display: 'flex', gap: '1.2vw'}}>
                                                        <div style={{display: 'flex', gap: '0.87vw'}}>
                                                            {vault.token0.logo}
                                                            {vault?.token1?.logo}
                                                        </div>
                                                        <div>
                                                            <div>{vault.name}</div>
                                                            <FontSize fs='0.72vw'><LightText>Platform:</LightText> {vault.projectData.logo}  {vault.projectData.name}</FontSize>
                                                        </div>
                                                    </div>
                                                    <div>0</div>
                                                    <div style={{display: 'flex', flexDirection: 'column'}}><div>{userData ? formattedNum(userData[vault.baseIndex].depositedLp) : null}</div><FontSize fs='0.64vw'><LightText>${userData ? formattedNum(userData[vault.baseIndex].depositedUsd) : null}</LightText></FontSize></div>
                                                    <div>{!vault.old ? formattedNum(vault.data.apy.toFixed(2)) + "%" : "Paused"}</div>
                                                    <div>{!vault.old ? formattedNum((vault.data.apy / 365).toFixed(2)) + "%" : "Paused"}</div>
                                                    <div><GreyText fs='0.93vw'>$</GreyText>{formattedNum(vault.data.vaultTvl.toFixed(2))}</div>
                                                    <div style={{display: 'flex', justifyContent: 'center'}}>
                                                        <GetBtn disabled={!userData} onClick={() => handleVaultPage(vault, userData[vault.baseIndex])} > Get </GetBtn>
                                                    </div>
                                                </VaultItemContent>
                                            </VaultTableItem>
                                        </>
                                    )}
                            })}
                        </Overflow>
                    </VaultsTable>
                </VaultsWrapper>
        }
        </>

    )
}

export default Vaults;