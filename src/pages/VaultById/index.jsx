import { ArrowBack } from "@mui/icons-material";
import LogoIconBlack from "../../assets/icons/LogoIconBlack";
import OUSDIcon from "../../assets/icons/OUSDIcon";
import OutLinkIcon from "../../assets/icons/OutLinkIcon";
import { VidTopBar, GraphMenuContainer,Field,FieldInput,DoubleContainer,ConnectWallet, MaxButton, InputContainer, Input, AddButton, BuyButton, AddBuyContainer, Fieldset,DWContainer,DWButton, GraphMenuItem, LinksRow, VidBlockText, VidBlockHeader, VidBlock, HDivider, VIDLayout, VIDLeftColumn, VidRightColumn, VidWrapper, WhiteBorderItemLarge, Font, WhiteBorderItem, WhiteBorderBar, VDivider } from "./styled";
import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router";
import {JSON_RPC_URL, MAX_INT, VAULTS} from "../../constants";
import {useWeb3React} from "@web3-react/core";
import {ethers} from "ethers";

// ABIS
import ROUTER_ABI from '../../abis/Vaults-zap-rotuer.json';
import VAULT_ABI from '../../abis/Vault.json';
import ERC20_ABI from '../../abis/ERC20.json';
import {useBlockChainContext} from "../../context/blockchain-context";
import {formatFromDecimal, formattedNum, formatToDecimal} from "../../utils";
import fromExponential from "from-exponential";

const ACTIVE_DVS = {
    DEPOSIT: "Deposit",
    WITHDRAW: "Withdraw"
}

const RADIO_CHOICE = {
    LP_TOKEN: 1,
    TOKEN0: 2,
    TOKEN1: 3,
    ASTR: 4
}


const VaultById = () => {

    const {id} = useParams();
    const navigate = useNavigate();
    const {account} = useWeb3React();
    const {signer, globalVaults} = useBlockChainContext()

    // Global data
    const [pool, setPool] = useState(null);
    const [contracts, setContracts] = useState(null);

    // UX section
    const [ graphActiveItem, setActiveItem ] = useState('TVL')
    const [activeDW, setActiveDW] = useState(ACTIVE_DVS.DEPOSIT);
    const [radioChoice, setRadioChoice] = useState(RADIO_CHOICE.LP_TOKEN)
    const [tokenInput, setTokenInput] = useState(null);

    // User section
    const [allowances, setAllowances] = useState(null);
    const [balances, setBalances] = useState(null)

    const [vaultLpMultiplier, setVaultLpMultiplier] = useState(null);

    useEffect(() => {
        if (id && globalVaults) {
            const findPool = globalVaults.find(item => item.id === id);
            setPool(findPool);
        }
    }, [id, globalVaults]);

    useEffect(() => {
        if (pool) {
            init()
        }
    }, [pool]);

    useEffect(() => {

        if (contracts) {
            getPoolInfo();
        }

    }, [contracts])


    useEffect(() => {

        if (contracts && account) {
            getUserInfo();
        }

    }, [contracts, account])


    useEffect(() => {
        setTokenInput(0)
    }, [radioChoice])

    const init = async () => {

        const readProvider = new ethers.providers.JsonRpcProvider(JSON_RPC_URL);

        const router = new ethers.Contract(pool.routerAddress, ROUTER_ABI ,readProvider)
        const vault = new ethers.Contract(pool.vaultAddress, VAULT_ABI ,readProvider)

        const token0 = new ethers.Contract(pool.token0.address, ERC20_ABI, readProvider);
        const token1 = new ethers.Contract(pool.token1.address, ERC20_ABI, readProvider);
        const lpToken = new ethers.Contract(pool.lpAddress, ERC20_ABI, readProvider);

        setContracts({router, vault, token0, token1, lpToken});

    }

    const getPoolInfo = async () => {
        // FIXME: blank
    }

    const getUserInfo = async () => {

        // TODO: add some other info stuff like deposited and etc.

        await getAllowances();
        await getBalances()
    }

    const getAllowances = async () => {

        const {token0, token1, lpToken, router, vault} = contracts;

        const token0Allowance = await token0.allowance(account, router.address);
        const token1Allowance = await token1.allowance(account, router.address);
        const lpTokenAllowance = await lpToken.allowance(account, vault.address);
        const vaultAllowance = await vault.allowance(account, router.address);


        setAllowances({
            token0: token0Allowance > 0,
            token1: token1Allowance > 0,
            lpToken: lpTokenAllowance > 0,
            vault: vaultAllowance > 0
        });
    }


    const getBalances = async () => {

        const {token0, token1, lpToken, router, vault} = contracts;
        const readProvider = new ethers.providers.JsonRpcProvider(JSON_RPC_URL);

        const token0Balance = await token0.balanceOf(account);
        const token0Decimals = await token0.decimals();

        const token1Balance = await token1.balanceOf(account);
        const token1Decimals = await token1.decimals();

        const lpTokenBalance = await lpToken.balanceOf(account);
        const lpTokenDecimals = await lpToken.decimals();

        const astrBalance = await readProvider.getBalance(account);

        const vaultBalance = (+(await vault.balanceOf(account)) / 1e18) * (+(await vault.getPricePerFullShare()) / 1e18);

        setBalances({
            token0: formatFromDecimal(+token0Balance, +token0Decimals),
            token1: formatFromDecimal(+token1Balance, +token1Decimals),
            lpToken: formatFromDecimal(+lpTokenBalance, +lpTokenDecimals),
            astr: formatFromDecimal(+astrBalance, 18),
            deposited: vaultBalance
        })
    }

    const updateActiveItem = ( event ) => {
        let value = event.currentTarget.dataset.value
        setActiveItem(value);
    }

    const updateActiveDW = ( event ) => {
        let value = event.currentTarget.dataset.value;
        setActiveDW(value);
    }

    const MainButton = () => {

        if (!account) {
            return <ConnectWallet >Connect Wallet</ConnectWallet>
        }

        else if (activeDW === ACTIVE_DVS.DEPOSIT) {

            switch (radioChoice) {
                case RADIO_CHOICE.TOKEN0:
                    if (!allowances.token0) {
                        return <ConnectWallet onClick={() => handleApprove()} >Approve {pool.token0.name}</ConnectWallet>
                    }
                    else if (+tokenInput > +balances.token0) {
                        return <ConnectWallet disabled={true}> Insufficient {pool.token0.name} balance </ConnectWallet>
                    }
                    else {
                        return <ConnectWallet onClick={() => handleDeposit()}> Deposit </ConnectWallet>
                    }
                case RADIO_CHOICE.TOKEN1:
                    if (!allowances.token1) {
                        return <ConnectWallet onClick={() => handleApprove()} >Approve {pool.token1.name}</ConnectWallet>
                    }
                    else if (+tokenInput > +balances.token1) {
                        return <ConnectWallet disabled={true}> Insufficient {pool.token1.name} balance </ConnectWallet>
                    }
                    else {
                        return <ConnectWallet onClick={() => handleDeposit()}> Deposit </ConnectWallet>
                    }
                case RADIO_CHOICE.LP_TOKEN:
                    if (!allowances.lpToken) {
                        return <ConnectWallet onClick={() => handleApprove()} >Approve {pool.lpName}</ConnectWallet>
                    }
                    else if (+tokenInput > +balances.lpToken) {
                        return <ConnectWallet disabled={true}> Insufficient LP balance </ConnectWallet>
                    }
                    else {
                        return <ConnectWallet onClick={() => handleDeposit()}> Deposit </ConnectWallet>
                    }
                case RADIO_CHOICE.ASTR:
                    if (+tokenInput > +balances.astr) {
                        return <ConnectWallet disabled={true}> Insufficient ASTR balance </ConnectWallet>
                    }
                    else {
                        return <ConnectWallet onClick={() => handleDeposit()}> Deposit </ConnectWallet>
                    }
            }

            return  <ConnectWallet onClick={() => handleDeposit()} >Deposit</ConnectWallet>
        }

        else if (activeDW === ACTIVE_DVS.WITHDRAW) {

            if (!allowances.vault) {
                return <ConnectWallet onClick={() => handleApproveForWithdraw()} >Approve vault tokens</ConnectWallet>
            }
            else {
                return  <ConnectWallet onClick={() => handleWithdraw()} >Withdraw</ConnectWallet>
            }
        }
    }

    const handleApprove = async () => {

        let tx;
        const {token0, token1, lpToken, vault, router} = contracts;

        switch (radioChoice) {
            case RADIO_CHOICE.TOKEN0:
               tx = await token0.connect(signer).approve(router.address, MAX_INT);
               break;
            case RADIO_CHOICE.TOKEN1:
                tx = await token1.connect(signer).approve(router.address, MAX_INT);
                break;
            case RADIO_CHOICE.LP_TOKEN:
                tx = await lpToken.connect(signer).approve(vault.address, MAX_INT);
                break;
        }

        try {
            await tx.wait();
            await getAllowances();
        }
        catch (e) {
            console.log(e.message);
        }
    }

    const handleApproveForWithdraw = async () => {

        const {router, vault} = contracts;

        try {
            const tx = await vault.connect(signer).approve(router.address, MAX_INT);
            await tx.wait();

            await getAllowances();
        }
        catch (e) {
            console.log(e.message);
        }
    }

    const handleDeposit = async () => {

        let tx;
        const {token0, token1, vault, router} = contracts;

        switch (radioChoice) {
            case RADIO_CHOICE.LP_TOKEN:
                tx = await vault.connect(signer).deposit(formatToDecimal(tokenInput, 18));
                break;
            case RADIO_CHOICE.TOKEN0:
                const token0Decimals = await token0.decimals();
                tx = await router.connect(signer).beefIn(pool.vaultAddress, 0, token0.address, formatToDecimal(tokenInput, token0Decimals));
                break;
            case RADIO_CHOICE.TOKEN1:
                const token1Decimals = await token1.decimals();
                tx = await router.connect(signer).beefIn(pool.vaultAddress, 0, token1.address, formatToDecimal(tokenInput, token1Decimals))
                break;
            case RADIO_CHOICE.ASTR:
                tx = await router.connect(signer).beefInETH(pool.vaultAddress, 0, {value: formatToDecimal(tokenInput, 18)});
                break;
            default:
                return
        }

        try {
            await tx.wait();
            await getBalances();
            setTokenInput(0);
        }
        catch (e) {
            console.log(e.message);
        }
    }

    const handleWithdraw = async () => {
        let tx;
        const {token0, token1, vault, router} = contracts;

        const vaultLpMultiplier = formatFromDecimal((await vault.getPricePerFullShare()).toString(), 18)

        switch (radioChoice) {
            case RADIO_CHOICE.LP_TOKEN:
                tx = await router.connect(signer).beefOut(vault.address,  formatToDecimal(tokenInput / +vaultLpMultiplier, 18));
                break;
            case RADIO_CHOICE.TOKEN0:
                tx = await router.connect(signer).beefOutAndSwap(pool.vaultAddress, formatToDecimal(tokenInput / +vaultLpMultiplier, 18), token0.address, 0);
                break;
            case RADIO_CHOICE.TOKEN1:
                tx = await router.connect(signer).beefOutAndSwap(pool.vaultAddress, formatToDecimal(tokenInput / +vaultLpMultiplier, 18), token1.address, 0)
                break;
            default:
                return
        }

        try {
            await tx.wait();
            await getBalances();
        }
        catch (e) {
            console.log(e.message);
        }

    }

    const handleMaxButton = async () => {

        if (activeDW === ACTIVE_DVS.DEPOSIT) {
            switch (radioChoice) {
                case RADIO_CHOICE.LP_TOKEN:
                    setTokenInput(balances.lpToken);
                    break;
                case RADIO_CHOICE.TOKEN0:
                    setTokenInput(balances.token0);
                    break;
                case RADIO_CHOICE.TOKEN1:
                    setTokenInput(balances.token1);
                    break;
                case RADIO_CHOICE.ASTR:
                    setTokenInput(balances.astr);
                    break;
                default:
                    return
            }
        }
        else if (activeDW === ACTIVE_DVS.WITHDRAW) {
            setTokenInput(balances.deposited);
        }
    }


    const isMobileScreen = ( ) => {
        let query = window.matchMedia('(max-device-width: 480px)')
        return query.matches
      }


    return(<VidWrapper>

        {pool ?
            <>
            <VidTopBar>
            <div style={{display: 'flex', gap: '0.8vw', alignItems: 'center'}}>
                <ArrowBack style={{cursor: 'pointer'}} onClick={() => navigate("/vaults")}/>
                {pool.token0.logo}
                {pool.token1.logo}
                <Font fw='500' fs={ isMobileScreen() ? '16px' : '0.93vw'} color='#333'>{pool.name}</Font>
                <Font fw='500' fs={ isMobileScreen() ? '16px' : '0.93vw'} color='#828282'>vault</Font>

            </div>
            <div><Font fs={ isMobileScreen() ? '12px' : '0.72vw'} fw='300'>Platform:</Font><Font fs={ isMobileScreen() ? '12px' : '0.72vw'} fw='500' color='#4F4F4F'> {pool.platform.name}</Font></div>
            </VidTopBar>
            <div style={{backgroundColor: isMobileScreen() ? '#fff' : ''}}>
            <WhiteBorderBar>
                <WhiteBorderItem bg='#F5EFD7'>
                    <div>
                        <Font color='#272A30' fs={ isMobileScreen() ? '12px' : '0.72vw'} >TVL</Font>
                        <div><Font fw='500' color='#828282'   fs={isMobileScreen () ? '14px' : '0.83vw'}>$</Font><Font  fs={isMobileScreen () ? '14px' : '0.83vw'}>{formattedNum(pool.tvlLocal)}</Font></div>
                    </div>
                </WhiteBorderItem>

                <WhiteBorderItem bg='#E4DDEF'>
                    <div>
                        <Font color='#272A30' fs={ isMobileScreen() ? '12px' : '0.72vw'} >APY</Font>
                        <div><Font fw='500'  fs={isMobileScreen () ? '14px' : '0.83vw'}>{formattedNum(pool.apr.toFixed(2))}%</Font></div>
                    </div>
                </WhiteBorderItem>

                <WhiteBorderItem bg='#D5ECD8'>
                    <div>
                        <Font color='#272A30' fs={ isMobileScreen() ? '12px' : '0.72vw'} >Daily</Font>
                        <div><Font fw='500' fs={isMobileScreen () ? '14px' : '0.83vw'}>{formattedNum((pool.apr / 365).toFixed(2))}%</Font></div>
                    </div>
                </WhiteBorderItem>

                <WhiteBorderItemLarge>
                    <div style={{width: '100%', paddingLeft: isMobileScreen() ? '20px' : ''}}>
                        <Font fs={ isMobileScreen() ? '12px' : '0.72vw'}>Your deposit</Font>
                        <div><Font fw='500' fs={isMobileScreen () ? '14px' : '0.83vw'}>{balances ?  fromExponential(+balances.deposited) : null }</Font></div>
                        <div style={{marginTop: '-0.36vw'}}><Font fw='300' color="#4F4F4F" fs={isMobileScreen () ? '14px' : '0.62vw'}>0</Font></div>
                    </div>
                    <VDivider/>
                    <div style={{width: '100%', paddingLeft: isMobileScreen() ? '20px' : '1.71vw'}}>
                        <Font fs={ isMobileScreen() ? '12px' : '0.72vw'}>Harvest</Font>
                        <div><Font fw='500' fs={isMobileScreen () ? '14px' : '0.83vw'}>Every hour</Font></div>
                    </div>
                </WhiteBorderItemLarge>
            </WhiteBorderBar>
            </div>
            <VIDLayout>
            <VIDLeftColumn>
            <VidBlock height={'21.26vw'}>
            <VidBlockHeader><Font fw='500'  fs={isMobileScreen () ? '17px' : '0.93vw'}>{pool.platform.name} <Font  fs={isMobileScreen () ? '17px' : '0.93vw'}  color='#828282'></Font></Font></VidBlockHeader>
            <HDivider/>
            <LinksRow>
            <a href={pool.platform.website}>Website<OutLinkIcon ratio={isMobileScreen() ? '4vw' : '0.93vw'}/></a>
            <a href={pool.platform.telegram}>Telegram<OutLinkIcon ratio={isMobileScreen() ? '4vw' : '0.93vw'}/></a>
            <a href={pool.platform.twitter}>Twitter<OutLinkIcon ratio={isMobileScreen() ? '4vw' : '0.93vw'}/></a>
            </LinksRow>
            <VidBlockText>{pool.platform.description}</VidBlockText>
            </VidBlock>
            <VidBlock height={'24.23vw'} style={{
        borderBottomLeftRadius:  isMobileScreen() ?  '20px' : '',
        borderBottomRightRadius:   isMobileScreen() ?  '20px' : '',}}>

            <VidBlockHeader>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
            <div><Font fw='500' fs={isMobileScreen () ? '17px' : '0.93vw'}>Historical <Font fs={isMobileScreen () ? '17px' : '0.93vw'}  color='#828282'>Rate</Font></Font></div>
            <GraphMenuContainer>
            <GraphMenuItem onClick={updateActiveItem} active={graphActiveItem === 'TVL'} data-value={'TVL'}>TVL</GraphMenuItem>
            <GraphMenuItem onClick={updateActiveItem} active={graphActiveItem === 'Price'} data-value={'Price'}>Price</GraphMenuItem>
            <GraphMenuItem onClick={updateActiveItem} active={graphActiveItem === 'APY'} data-value={'APY'}>APY</GraphMenuItem>
            </GraphMenuContainer>
            </div>
            </VidBlockHeader>
            <div style={{display: "grid", placeItems: "center"}} ><h3> No data yet! </h3></div>
            <HDivider/>
            </VidBlock>
            { isMobileScreen() ? <></> : <>
            <VidBlock style={
                {marginTop: isMobileScreen() ? '24px' : '', 
        borderTopLeftRadius:  isMobileScreen() ?  '20px' : '',
        borderTopRightRadius:   isMobileScreen() ?  '20px' : ''}
        } height={'13.86vw'}>
                <VidBlockHeader>
                <div><Font  fs={ isMobileScreen() ? '12px' : '0.72vw'}  color='#828282'>ASSET DETAILS</Font></div>
                <div style={{marginTop: isMobileScreen() ? '8px' : '', marginBottom: isMobileScreen() ? '8px' : ''}}>
                <Font fw='500' fs={isMobileScreen () ? '17px' : '0.93vw'}>{pool.token0.name}</Font>
                </div>
                </VidBlockHeader>
                <HDivider/>
                <LinksRow>
                <a href={pool.token0.website}>Website<OutLinkIcon ratio={ isMobileScreen() ? '4vw': '0.93vw'}/></a>
                <a href={pool.token0.website}>Token Contract<OutLinkIcon ratio={ isMobileScreen() ? '4vw': '0.93vw'}/></a></LinksRow>
                <VidBlockText>{pool.token0.description}</VidBlockText>
            </VidBlock>

            <VidBlock height={'8.96vw'}>
                <VidBlockHeader>
                <div><Font  fs={ isMobileScreen() ? '12px' : '0.72vw'}  color='#828282'>ASSET DETAILS</Font></div>
                <div style={{marginTop: isMobileScreen() ? '8px' : '', marginBottom: isMobileScreen() ? '8px' : ''}}>
                <Font fw='500' fs={isMobileScreen () ? '17px' : '0.93vw'}>{pool.token1.name}</Font>
                </div>
                </VidBlockHeader>
                <HDivider/>
                <VidBlockText mt='1.25vw'>{pool.token1.description}</VidBlockText>
            </VidBlock> </>}
            </VIDLeftColumn>
            <VidRightColumn>
                <VidBlock style={{marginTop: isMobileScreen() ? '24px' : '', 
        borderBottomLeftRadius:  isMobileScreen() ?  '20px' : '',
        borderBottomRightRadius:   isMobileScreen() ?  '20px' : '',
borderTopLeftRadius:  isMobileScreen() ?  '20px' : '',
borderTopRightRadius:   isMobileScreen() ?  '20px' : ''}} height={'47.31vw'}>
                    <VidBlockHeader>
                    <DWContainer>
                    <DWButton data-value='Deposit' onClick={updateActiveDW} active={activeDW === 'Deposit'}>
                    Deposit
                    </DWButton>
                    <DWButton data-value='Withdraw' onClick={updateActiveDW} active={activeDW === 'Withdraw'}>
                    Withdraw
                    </DWButton>
                    </DWContainer>
                    </VidBlockHeader>
                { isMobileScreen() ? <></> : <HDivider/>}
                <VidBlockText mt='0.83vw'>
                    Deposit your LP orr️ ZAP⚡ in {pool.token0.name} or {pool.token1.name}
                </VidBlockText>
                <VidBlockText mt='0.83vw'>
                WALLET:
                </VidBlockText>
                <Fieldset>
                    <Field>
                        <FieldInput type='radio' checked={radioChoice === RADIO_CHOICE.LP_TOKEN} name={pool.lpName} onClick={() => setRadioChoice(RADIO_CHOICE.LP_TOKEN)} />
                        <label>{pool.lpName}</label>
                    </Field>
                    <Field>
                        <FieldInput type='radio' checked={radioChoice === RADIO_CHOICE.TOKEN0} name={pool.token0.name} onClick={() => setRadioChoice(RADIO_CHOICE.TOKEN0)} />
                        <label>{pool.token0.name}</label>
                    </Field>
                    <Field>
                        <FieldInput type='radio' checked={radioChoice === RADIO_CHOICE.TOKEN1} name={pool.token1.name} onClick={() => setRadioChoice(RADIO_CHOICE.TOKEN1)} />
                        {activeDW === ACTIVE_DVS.WITHDRAW ?
                            <>
                                {pool.token1.name === "WASTR" ? <label> ASTR </label> : <label> {pool.token1.name} </label>}
                            </>
                            :
                            <label>{pool.token1.name}</label>
                        }

                    </Field>
                    {pool.isBeefInETH ?
                        <>
                            {activeDW !== ACTIVE_DVS.WITHDRAW ?
                                <Field>
                                    <FieldInput type='radio' checked={radioChoice === RADIO_CHOICE.ASTR} name={"ASTR"} onClick={() => setRadioChoice(RADIO_CHOICE.ASTR)}/>
                                    <label>ASTR</label>
                                </Field>
                                :
                                null
                            }
                        </>
                        :
                        null
                    }
                </Fieldset>
                <AddBuyContainer>
                <AddButton href={pool.addLpLink} target={"_blank"}>Add Liquidity</AddButton>
                <BuyButton href={pool.buyLink} target={"_blank"}>Buy Token</BuyButton>
                </AddBuyContainer>
                <InputContainer>
                <div style={{display: 'flex', alignItem: 'center', justifyContent: 'center', visibility: 'hidden'}}><LogoIconBlack ratio={isMobileScreen() ? '5vw' : '0.94vw'}/></div>
                <Input placeholder="0.0" value={tokenInput} onChange={(e) => setTokenInput(e.target.value)} />
                <MaxButton onClick={() => handleMaxButton()} >Max</MaxButton>
                </InputContainer>
                <VidBlockText mt={isMobileScreen() ? '24px' : '2.03vw'}>
                <Font  fs={isMobileScreen() ? '14px' : '0.83vw'} fw='500' color='#333'>Orcus Fees</Font>
                <DoubleContainer>
                <div>
                <Font fw='300' color='#4F4F4F'  fs={ isMobileScreen() ? '12px' : '0.72vw'}>Deposit Fee</Font>
                <Font fw='500' color='#333'  fs={isMobileScreen () ? '14px' : '0.83vw'}>0%</Font>
                </div>
                <div>
                <Font fw='300' color='#4F4F4F'  fs={ isMobileScreen() ? '12px' : '0.72vw'}> Withdrawal Fee</Font>
                <Font fw='500' color='#333'  fs={isMobileScreen () ? '14px' : '0.83vw'}>0%</Font>
                </div>
                </DoubleContainer>
                <HDivider mt='0.72vw' mb='0.72vw'/>
                <DoubleContainer>
                <div>
                <Font fw='300' color='#4F4F4F'  fs={ isMobileScreen() ? '12px' : '0.72vw'}>Perfomance Fee</Font>
                <Font fw='500' color='#333'  fs={isMobileScreen () ? '14px' : '0.83vw'}>4.5%</Font>
                </div>
                <div>
                </div>
                </DoubleContainer>

                <Font  fs={ isMobileScreen() ? '10px' :'0.62vw'} color='#828282' fw='400'>Performance fees are already subtracted from the displayed APY.</Font>
                    {contracts && allowances && balances ?
                        <MainButton/>
                        :
                        <h5> Loading... </h5>
                    }
                </VidBlockText>
                </VidBlock>
                { !isMobileScreen() ? <></> : <>
            <VidBlock style={
                {marginTop: isMobileScreen() ? '24px' : '', 
        borderTopLeftRadius:  isMobileScreen() ?  '20px' : '',
        borderTopRightRadius:   isMobileScreen() ?  '20px' : ''}
        } height={'13.86vw'}>
                <VidBlockHeader>
                <div><Font  fs={ isMobileScreen() ? '12px' : '0.72vw'}  color='#828282'>ASSET DETAILS</Font></div>
                <div style={{marginTop: isMobileScreen() ? '8px' : '', marginBottom: isMobileScreen() ? '8px' : ''}}>
                <Font fw='500' fs={isMobileScreen () ? '17px' : '0.93vw'}>{pool.token0.name}</Font>
                </div>
                </VidBlockHeader>
                <HDivider/>
                <LinksRow>
                <a href={pool.token0.website}>Website<OutLinkIcon ratio={ isMobileScreen() ? '4vw': '0.93vw'}/></a>
                <a href={pool.token0.website}>Token Contract<OutLinkIcon ratio={ isMobileScreen() ? '4vw': '0.93vw'}/></a></LinksRow>
                <VidBlockText>{pool.token0.description}</VidBlockText>
            </VidBlock>

            <VidBlock height={'8.96vw'}>
                <VidBlockHeader>
                <div><Font  fs={ isMobileScreen() ? '12px' : '0.72vw'}  color='#828282'>ASSET DETAILS</Font></div>
                <div style={{marginTop: isMobileScreen() ? '8px' : '', marginBottom: isMobileScreen() ? '8px' : ''}}>
                <Font fw='500' fs={isMobileScreen () ? '17px' : '0.93vw'}>{pool.token1.name}</Font>
                </div>
                </VidBlockHeader>
                <HDivider/>
                <VidBlockText mt='1.25vw'>{pool.token1.description}</VidBlockText>
            </VidBlock> </>}
            </VidRightColumn>
            </VIDLayout>
            </>
            :
            <h1> Loading... </h1>
        }
    </VidWrapper>)
} 

export default VaultById;