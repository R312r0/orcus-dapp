
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
    MASTER_CHEF_ABIS, PROJECT_LOGOS,
    TEST_VAULT,
    VAULT_CATEGORIES, VAULT_TOKENS,
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

import {formatFromDecimal, formattedNum} from "../../utils";
import axios from "axios";
import FarmsTableItem from './mobile-item/index'
import VaultById from "../VaultById";
import fromExponential from "from-exponential";
import {CircularProgress} from "@mui/material";
import StarlayABI from '../../abis/StarLayLendingPool.json';

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
    const {signer, connectWallet, setGlobalVault} = useBlockChainContext();
    const navigate = useNavigate();

    const [selectedTopbarCategory, setTopbarCategory] = useState(TOP_BAR_CATEGORIES.ALL);
    const [vaultsValue, setVaultsValue] = useState('All Vaults')

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const [isFilterOverlay, setFilterOverlay] = useState(false)
    const [isSortByOverlay, setSortByOverlay] = useState(false);

    const [searchVaultInput, setSearchVaultInput] = useState("");

    const [clearVaults, setClearVaults] = useState([]);

    const [filteredVaults, setFilteredVaults] = useState(null);
    const [selectedVault, setSelectedVault] = useState(null);
    const [selectedUserData, setSelectedUserData] = useState(null);
    const [overallTVL, setOverallTVL] = useState(0);

    const [topInfo, setTopInfo] = useState({deposited: 0, monthYield: 0, dailyYield: 0})
    const [backEndVaults, setBackEndVaults] = useState([]);
    const [userData, setUserData] = useState([]);


    useEffect(() => {

        getBackVault()
            .then(res => {
                setClearVaults(res);
                setFilteredVaults(res);
                setLoading(false);
            })
            .catch(e => {
                setLoading(false);
                setError({message: "Somethings went wrong please reload page!", type: 1})
            })
    }, [])

    useEffect(() => {

        if (signer && clearVaults.length > 0 && userData.length === 0) {
            addUserData(clearVaults)
                .then(({user, yieldInfo}) => {
                    setTopInfo({deposited: yieldInfo.deposited, dailyYield: yieldInfo.overallYield / 365, monthYield: yieldInfo.overallYield / 12})
                    setUserData(user);
                })
        }

    }, [signer, clearVaults]);

    useEffect(() => {

        if (userData.length > 0) {

            setClearVaults(prevState => prevState.map((item, _ind) => {
                    return {
                        ...item,
                        user: {...userData[_ind]}
                    }
            }))

            setFilteredVaults(prevState => prevState.map((item, _ind) => {
                    return {
                        ...item,
                        user: {...userData[_ind]}
                    }
                })
            )
        }

    }, [userData])

    const getBackVault = async () => {
        const {data: {vaults}} = await axios.get("https://api.orcusfinance.io/vaults");
        setOverallTVL(vaults.map(item => item.vaultTvl).reduce((partialSum, a) => partialSum + a, 0))
        return vaults;
    }

    const addUserData = async (vaults) => {

        let deposited = 0;
        let overallYield = 0;

        const {data: {tokens}} = await axios.get("https://api.orcusfinance.io/tokens")

        const balances = tokens.map(async (token) => {

            const contract = new ethers.Contract(token.address, ERC20_ABI, signer);
            const balance = +(await contract.balanceOf(account)) / 10**token.decimals;

            return {
                name: token.name,
                address: token.address,
                userBalance: balance
            }
        })

        const userTokenBalances = await Promise.all(balances);
        const userAstrBalance = await signer.getBalance();

        const formattedVaults = vaults.map(async (item) => {
            const vaultContract = new ethers.Contract(item.vaultAddress, ERC20_ABI, signer);

            const lpDecimals = await (new ethers.Contract(item.lpAddress, ERC20_ABI, signer)).decimals()

            const balance = formatFromDecimal(+(await vaultContract.balanceOf(account)), +lpDecimals);
            const lpBalance = balance * item.vaultPriceMultiplier;
            const usdBalance = lpBalance * item.lpPrice;
            deposited += usdBalance;
            overallYield += (usdBalance * 2) * (item.apy / 100);

            let eligible = item.Tokens.map(token => userTokenBalances.find(bal => bal.name === token.name).userBalance > 0).includes(true);
            eligible = balance > 0 || eligible;
            eligible = item.Tokens.find(token => token.name === "WASTR") ? userAstrBalance > 0 || eligible : eligible;

            return {
                lpBalance,
                usdBalance,
                eligible
            }

        })

        return {user: await Promise.all(formattedVaults), yieldInfo: {deposited, overallYield}} ;
    }

    // const getLendingApy = async (lendingPool, lpContract, assetAddress, rewardtokenPrice, name, emissionRate) => {
    //
    //     const RAY = 10**27;
    //     const tokenData = await axios.get(`https://api.dexscreener.io/latest/dex/tokens/${assetAddress}`); // Pass
    //     const depositTokenPrice = parseFloat(tokenData.data.pairs[0].priceUsd); // Pass
    //
    //     const liquidityRate = await lendingPool.getReserveData(assetAddress);
    //     const lendapr = ((+liquidityRate.currentLiquidityRate)/RAY) * 100;
    //     const lendapy = ((1 + (lendapr / 100) / 8760)**8760-1) * 100;
    //
    //     const lEmissionPerYear = (emissionRate * 12);
    //
    //     const decimals = +(await lpContract.decimals());
    //     const total = +(await lpContract.totalSupply()) / 10**decimals;
    //     const incentivesApr = 100 * (lEmissionPerYear * rewardtokenPrice) / (total * depositTokenPrice);
    //     const incentivesApy = ((1 + (incentivesApr / 100) / 8760)**8760-1) * 100;
    //
    //     const apy = lendapy + incentivesApy;
    //
    //     return {apy};
    // }
    //

    const handleVaultPage = (vault) => {
        setGlobalVault(vault);
        navigate(`/vaults/${vault.id}`)
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
                newArr = firstArr.filter(item => item.user.eligible);
                break;
            case SECOND_BAR_CATEGORIES.MY:
                newArr = firstArr.filter(item => item.user.lpBalance > 0);
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
                                        TVL: <GreyText fs='0.94vw'>$</GreyText>{overallTVL.toFixed(2)}
                                    </div>
                                    <div style={{width: '100%', display: 'flex'}}>
                                        <div style={{width: '50%', borderRight: '1px solid #F2F2F2'}}>Vaults: {clearVaults.length}</div>
                                        <div style={{width: '50%'}}> Daily Buyback: <GreyText fs='0.94vw'>$</GreyText> Not calculated yet!</div>
                                    </div>
                                </TopCardMobile>
                            </> :
                            <LargeTopCard>
                                <div style={{width: '12.05vw', display: 'flex', gap: '0.6vw', alignItems: 'center', justifyContent:'center'}}>
                                    TVL: <div><GreyText mt='0vw' fs='0.94vw'>$</GreyText>{overallTVL.toFixed(2)}</div>
                                </div>
                                <VDivider/>
                                <div style={{width: '14.65vw'}}>
                                    Vaults: {clearVaults.length}
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
                                <VaultItem disabled={!account || !userData} style={{visibility: !account || !userData ? "hidden" : "visible"}} onClick={handleVaultsClick} data-value={SECOND_BAR_CATEGORIES.ELIGIBLE} active={vaultsValue === SECOND_BAR_CATEGORIES.ELIGIBLE}>Eligible Vaults</VaultItem>
                                <VaultItem disabled={!account || !userData} style={{visibility: !account || !userData ? "hidden" : "visible"}} onClick={handleVaultsClick} data-value={SECOND_BAR_CATEGORIES.MY} active={vaultsValue === SECOND_BAR_CATEGORIES.MY}>My Vaults</VaultItem>
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
                                    return <h1> Mobile </h1>
                                    // return <FarmsTableItem item={vault} userData={userData ? userData[vault.baseIndex] : null} handleVaultPage={handleVaultPage}/>
                                }else{

                                    return(
                                        <>
                                            <HDivider marginTop='0' marginBottom='0'/>
                                            <VaultTableItem>
                                                <VaultItemContent>
                                                    <div style={{display: 'flex', gap: '1.2vw'}}>
                                                        <div style={{display: 'flex', gap: '0.87vw'}}>
                                                            {vault.Tokens.map(token => {
                                                                return VAULT_TOKENS[token.name].logo;
                                                            })}
                                                        </div>
                                                        <div>
                                                            <div>{vault.name}</div>
                                                            <FontSize fs='0.72vw'><LightText>Platform:</LightText> {PROJECT_LOGOS[vault.Project.id.toUpperCase()]} {vault.Project.name}</FontSize>
                                                        </div>
                                                    </div>
                                                    <div>0</div>
                                                    <div style={{display: 'flex', flexDirection: 'column'}}>
                                                        <div>{vault?.user ? formattedNum(vault.user.lpBalance) : "0.00"}</div>
                                                        <FontSize fs='0.64vw'><LightText>${vault?.user ? formattedNum(vault.user.usdBalance) : "0.00"}</LightText></FontSize></div>
                                                    <div>{!vault.old ? isNaN(formattedNum(vault.apy.toFixed(2))) ? "0.00%" : formattedNum(vault.apy.toFixed(2)) + "%" : "Paused"}</div>
                                                    <div>{!vault.old ? isNaN(formattedNum((vault.apy / 365).toFixed(3))) ? "0.00%" : formattedNum((vault.apy / 365).toFixed(3))  + "%" : "Paused"}</div>
                                                    <div><GreyText fs='0.93vw'>$</GreyText>{formattedNum(vault.vaultTvl.toFixed(2))}</div>
                                                    <div style={{display: 'flex', justifyContent: 'center'}}>
                                                        <GetBtn onClick={() => handleVaultPage(vault)} > Get </GetBtn>
                                                    </div>
                                                </VaultItemContent>
                                            </VaultTableItem>
                                        </>
                                    )}
                            })}
                            {!filteredVaults && error ?
                                <div className={"hyi"} style={{height: "20vh", display: "grid"}}>
                                    <h1 style={{display: "grid", placeSelf: "center", fontWeight: 500}} > {error.message} </h1>
                                    <button
                                        onClick={() => error.type === 0 ? connectWallet() : navigate("/vaults")}
                                        style={{
                                            display: "grid",
                                            background: "black",
                                            color: "white",
                                            placeSelf: "center",
                                            width: "30%",
                                            height: "70%",
                                            placeItems: "center",
                                            borderRadius: "20px"
                                    }}> {error.type === 0 ? "Connect wallet" : "Reload page"} </button>
                                </div>
                                :
                                null
                            }
                            {
                                loading ? <div style={{display: "grid", placeSelf: "center", placeItems: "center"}}><CircularProgress style={{color: "black"}}/></div> : null
                            }
                        </Overflow>
                    </VaultsTable>
                </VaultsWrapper>
        }
        </>

    )
}

export default Vaults;