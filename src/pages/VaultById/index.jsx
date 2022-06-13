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


const VaultById = ({vault, userData, handleVaultPage}) => {

    const {account} = useWeb3React();
    const {signer} = useBlockChainContext()

    // UX section
    const [ graphActiveItem, setActiveItem ] = useState('TVL')
    const [activeDW, setActiveDW] = useState(!vault.old ?  ACTIVE_DVS.DEPOSIT: ACTIVE_DVS.WITHDRAW);
    const [radioChoice, setRadioChoice] = useState(vault.info.isLending ? RADIO_CHOICE.TOKEN0 : RADIO_CHOICE.LP_TOKEN)
    const [tokenInput, setTokenInput] = useState(null);

    // User section
    const [allowances, setAllowances] = useState(null);
    const [balances, setBalances] = useState(null)

    const [vaultLpMultiplier, setVaultLpMultiplier] = useState(null);

    useEffect(() => {

        if (vault && account) {
            getUserInfo(vault);
        }

    }, [vault, account])


    useEffect(() => {
        setTokenInput(0)
    }, [radioChoice])

    const getUserInfo = async (vaultLoc) => {
        await getAllowances(vaultLoc);
        await getBalances(vaultLoc);
    }

    const getAllowances = async (vaultLoc) => {

        const {lpContract, router, vaultContract} = vaultLoc.contracts;

        const token0 = vaultLoc.token0.contract
        const token1 = vaultLoc?.token1?.contract;

        const token0Allowance = !vaultLoc.info.isLending ? await token0.allowance(account, router.address) : await token0.allowance(account, vaultContract.address);
        const token1Allowance = token1 ? await token1.allowance(account, router.address) : 0;
        const lpTokenAllowance = !vaultLoc.info.isLending ? await lpContract.allowance(account, vaultLoc.vaultAddress) : 0;
        const vaultAllowance = !vaultLoc.info.isLending ? await vaultContract.allowance(account, router.address) : 1;

        setAllowances({
            token0: token0Allowance > 0,
            token1: token1Allowance > 0,
            lpToken: lpTokenAllowance > 0,
            vault: vaultAllowance > 0
        });
    }


    const getBalances = async (vaultLoc) => {

        const {lpContract, vaultContract} = vaultLoc.contracts;
        const token0 = vaultLoc.token0.contract
        const token1 = vaultLoc?.token1?.contract
        const readProvider = new ethers.providers.JsonRpcProvider(JSON_RPC_URL);

        const token0Balance = await token0.balanceOf(account);
        const token0Decimals = await token0.decimals();

        const token1Balance = token1 ? await token1.balanceOf(account) : 0;
        const token1Decimals = token1 ? await token1.decimals() : 0;

        const lpTokenBalance = !vaultLoc.info.isLending ? await lpContract.balanceOf(account) : 0;
        const lpTokenDecimals = !vaultLoc.info.isLending ?  await lpContract.decimals() : 0;

        const astrBalance = await readProvider.getBalance(account);

        const vaultBalance = (+(await vaultContract.balanceOf(account)) / (!vault.info.isLending ? 1e18 : 10**lpTokenDecimals)) * (+(await vaultContract.getPricePerFullShare()) / 1e18);

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

    const handleApprove = async () => {

        let tx;
        const {lpContract, vaultContract, router} = vault.contracts;
        const token0 = vault.token0.contract;
        const token1 = vault?.token1?.contract;

        switch (radioChoice) {
            case RADIO_CHOICE.TOKEN0:
               tx = vault.info.isLending ? await token0.connect(signer).approve(vaultContract.address, MAX_INT) : await token0.connect(signer).approve(router.address, MAX_INT);
               break;
            case RADIO_CHOICE.TOKEN1:
                tx = await token1.connect(signer).approve(router.address, MAX_INT);
                break;
            case RADIO_CHOICE.LP_TOKEN:
                tx = await lpContract.connect(signer).approve(vaultContract.address, MAX_INT);
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

        const {router, vaultContract} = vault.contracts;

        try {
            const tx = await vaultContract.connect(signer).approve(router.address, MAX_INT);
            await tx.wait();

            await getAllowances();
        }
        catch (e) {
            console.log(e.message);
        }
    }

    const handleDeposit = async () => {

        let tx;
        const {vaultContract, router} = vault.contracts;
        const token0 = vault.token0.contract;
        const token1 = vault?.token1?.contract;

        switch (radioChoice) {
            case RADIO_CHOICE.LP_TOKEN:
                tx = await vaultContract.connect(signer).deposit(formatToDecimal(tokenInput, 18));
                break;
            case RADIO_CHOICE.TOKEN0:
                const token0Decimals = await token0.decimals();
                tx = vault.info.isLending ?
                    await vaultContract.connect(signer).deposit(formatToDecimal(tokenInput, token0Decimals))
                    : await router.connect(signer).beefIn(vault.vaultAddress, 0, token0.address, formatToDecimal(tokenInput, token0Decimals));
                break;
            case RADIO_CHOICE.TOKEN1:
                const token1Decimals = await token1.decimals();
                tx = await router?.connect(signer).beefIn(vault.vaultAddress, 0, token1.address, formatToDecimal(tokenInput, token1Decimals))
                break;
            case RADIO_CHOICE.ASTR:
                tx = vault.info.isLending ?
                    await vaultContract.connect(signer).depositASTR({value: formatToDecimal(tokenInput, 18)})
                    :
                    await router.connect(signer).beefInETH(vault.vaultAddress, 0, {value: formatToDecimal(tokenInput, 18)});
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
        const {vaultContract, router} = vault.contracts;
        const token0 = vault.token0.contract;
        const token1 = vault?.token1?.contract;

        const vaultLpMultiplier = formatFromDecimal((await vaultContract.getPricePerFullShare()).toString(), 18)

        switch (radioChoice) {
            case RADIO_CHOICE.LP_TOKEN:
                tx = await router.connect(signer).beefOut(vault.vaultAddress,  formatToDecimal(tokenInput / +vaultLpMultiplier, 18))
                break;
            case RADIO_CHOICE.TOKEN0:
                tx = !vault.info.isLending ? await router.connect(signer).beefOutAndSwap(vault.vaultAddress, formatToDecimal(tokenInput / +vaultLpMultiplier, 18), token0.address, 0)
                :
                await vaultContract.connect(signer).withdraw( (tokenInput / vaultLpMultiplier).toFixed(0));
                break;
            case RADIO_CHOICE.TOKEN1:
                tx = await router.connect(signer).beefOutAndSwap(vault.vaultAddress, formatToDecimal(tokenInput / +vaultLpMultiplier, 18), token1.address, 0)
                break;
            case RADIO_CHOICE.ASTR:
                tx = await vaultContract.connect(signer).withdrawASTR((tokenInput / vaultLpMultiplier).toFixed(0));
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

    console.log(allowances);

    const MainButton = () => {

        if (!account) {
            return <ConnectWallet >Connect Wallet</ConnectWallet>
        }

        else if (activeDW === ACTIVE_DVS.DEPOSIT) {

            switch (radioChoice) {
                case RADIO_CHOICE.TOKEN0:
                    if (!allowances.token0) {
                        return <ConnectWallet onClick={() => handleApprove()} >Approve {vault.token0.name}</ConnectWallet>
                    }
                    else if (+tokenInput > +balances.token0) {
                        return <ConnectWallet disabled={true}> Insufficient {vault.token0.name} balance </ConnectWallet>
                    }
                    else {
                        return <ConnectWallet onClick={() => handleDeposit()}> Deposit </ConnectWallet>
                    }
                case RADIO_CHOICE.TOKEN1:
                    if (!allowances.token1) {
                        return <ConnectWallet onClick={() => handleApprove()} >Approve {vault.token1.name}</ConnectWallet>
                    }
                    else if (+tokenInput > +balances.token1) {
                        return <ConnectWallet disabled={true}> Insufficient {vault.token1.name} balance </ConnectWallet>
                    }
                    else {
                        return <ConnectWallet onClick={() => handleDeposit()}> Deposit </ConnectWallet>
                    }
                case RADIO_CHOICE.LP_TOKEN:
                    if (!allowances.lpToken) {
                        return <ConnectWallet onClick={() => handleApprove()} >Approve {vault.name}</ConnectWallet>
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


    const isMobileScreen = ( ) => {
        let query = window.matchMedia('(max-device-width: 480px)')
        return query.matches
      }

    return(<VidWrapper>
        {vault ?
            <>
            <VidTopBar>
            <div style={{display: 'flex', gap: '0.8vw', alignItems: 'center'}}>
                <ArrowBack style={{cursor: 'pointer'}} onClick={() => handleVaultPage(null, null)}/>
                {vault.token0.logo}
                {vault?.token1?.logo}
                <Font fw='500' fs={ isMobileScreen() ? '16px' : '0.93vw'} color='#333'>{vault.name}</Font>
                <Font fw='500' fs={ isMobileScreen() ? '16px' : '0.93vw'} color='#828282'>vault</Font>

            </div>
            <div><Font fs={ isMobileScreen() ? '12px' : '0.72vw'} fw='300'>Platform:</Font><Font fs={ isMobileScreen() ? '12px' : '0.72vw'} fw='500' color='#4F4F4F'> {vault.projectData.name}</Font></div>
            </VidTopBar>
            <div style={{backgroundColor: isMobileScreen() ? '#fff' : ''}}>
            <WhiteBorderBar>
                <WhiteBorderItem bg='#F5EFD7'>
                    <div>
                        <Font color='#272A30' fs={ isMobileScreen() ? '12px' : '0.72vw'} >TVL</Font>
                        <div><Font fw='500' color='#828282'   fs={isMobileScreen () ? '14px' : '0.83vw'}>$</Font><Font  fs={isMobileScreen () ? '14px' : '0.83vw'}>{formattedNum(vault.data.vaultTvl)}</Font></div>
                    </div>
                </WhiteBorderItem>

                <WhiteBorderItem bg='#E4DDEF'>
                    <div>
                        <Font color='#272A30' fs={ isMobileScreen() ? '12px' : '0.72vw'} >APY</Font>
                        <div><Font fw='500'  fs={isMobileScreen () ? '14px' : '0.83vw'}>{formattedNum(vault.data.apy.toFixed(2))}%</Font></div>
                    </div>
                </WhiteBorderItem>

                <WhiteBorderItem bg='#D5ECD8'>
                    <div>
                        <Font color='#272A30' fs={ isMobileScreen() ? '12px' : '0.72vw'} >Daily</Font>
                        <div><Font fw='500' fs={isMobileScreen () ? '14px' : '0.83vw'}>{formattedNum((vault.data.apy / 365).toFixed(2))}%</Font></div>
                    </div>
                </WhiteBorderItem>

                <WhiteBorderItemLarge>
                    <div style={{width: '100%', paddingLeft: isMobileScreen() ? '20px' : ''}}>
                        <Font fs={ isMobileScreen() ? '12px' : '0.72vw'}>Your deposit</Font>
                        <div><Font fw='500' fs={isMobileScreen () ? '14px' : '0.83vw'}>{balances ?  fromExponential(+balances.deposited) : null }</Font></div>
                        <div style={{marginTop: '-0.36vw'}}><Font fw='300' color="#4F4F4F" fs={isMobileScreen () ? '14px' : '0.62vw'}>${balances ? fromExponential(+userData.depositedUsd): null}</Font></div>
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
            <VidBlockHeader><Font fw='500'  fs={isMobileScreen () ? '17px' : '0.93vw'}>{vault.projectData.name} <Font  fs={isMobileScreen () ? '17px' : '0.93vw'}  color='#828282'></Font></Font></VidBlockHeader>
            <HDivider/>
            <LinksRow>
            <a href={vault.projectData.website}>Website<OutLinkIcon ratio={isMobileScreen() ? '4vw' : '0.93vw'}/></a>
            <a href={vault.projectData.telegram}>Telegram<OutLinkIcon ratio={isMobileScreen() ? '4vw' : '0.93vw'}/></a>
            <a href={vault.projectData.twitter}>Twitter<OutLinkIcon ratio={isMobileScreen() ? '4vw' : '0.93vw'}/></a>
            </LinksRow>
            <VidBlockText>{vault.projectData.description}</VidBlockText>
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
                <Font fw='500' fs={isMobileScreen () ? '17px' : '0.93vw'}>{vault.token0.name}</Font>
                </div>
                </VidBlockHeader>
                <HDivider/>
                <LinksRow>
                    {vault.token0.website ? <a href={vault.token0.website}>Website<OutLinkIcon ratio={ isMobileScreen() ? '4vw': '0.93vw'}/></a> : null}
                    <a href={`https://blockscout.com/astar/address/${vault.token0.address}/transactions`}>Token Contract<OutLinkIcon ratio={ isMobileScreen() ? '4vw': '0.93vw'}/></a></LinksRow>
                <VidBlockText>{vault.token0.description}</VidBlockText>
            </VidBlock>

            {!vault.info.isLending ?
                <VidBlock height={'8.96vw'}>
                <VidBlockHeader>
                    <div><Font  fs={ isMobileScreen() ? '12px' : '0.72vw'}  color='#828282'>ASSET DETAILS</Font></div>
                    <div style={{marginTop: isMobileScreen() ? '8px' : '', marginBottom: isMobileScreen() ? '8px' : ''}}>
                        <Font fw='500' fs={isMobileScreen () ? '17px' : '0.93vw'}>{vault.token1.name}</Font>
                    </div>
                </VidBlockHeader>
                <HDivider/>
                <LinksRow>
                    {vault.token1.website ? <a href={vault.token1.website}>Website<OutLinkIcon ratio={ isMobileScreen() ? '4vw': '0.93vw'}/></a> : null}
                    <a href={`https://blockscout.com/astar/address/${vault.token1.address}/transactions`}>Token Contract<OutLinkIcon ratio={ isMobileScreen() ? '4vw': '0.93vw'}/></a></LinksRow>
                <VidBlockText mt='1.25vw'>{vault.token1.description}</VidBlockText>
                </VidBlock>
                :
                null
            }

            </>}
            </VIDLeftColumn>
            <VidRightColumn>
                <VidBlock style={{marginTop: isMobileScreen() ? '24px' : '',
        borderBottomLeftRadius:  isMobileScreen() ?  '20px' : '',
        borderBottomRightRadius:   isMobileScreen() ?  '20px' : '',
borderTopLeftRadius:  isMobileScreen() ?  '20px' : '',
borderTopRightRadius:   isMobileScreen() ?  '20px' : ''}} height={'47.31vw'}>
                    <VidBlockHeader>
                    <DWContainer>
                    <DWButton style={{visibility: vault.old ? "hidden" : "none"}}  data-value='Deposit' onClick={updateActiveDW} active={activeDW === 'Deposit'}>
                    Deposit
                    </DWButton>
                    <DWButton data-value='Withdraw' onClick={updateActiveDW} active={activeDW === 'Withdraw'}>
                    Withdraw
                    </DWButton>
                    </DWContainer>
                    </VidBlockHeader>
                { isMobileScreen() ? <></> : <HDivider/>}
                <VidBlockText mt='0.83vw'>
                    <>
                        {vault.info.isLending ?
                            `Deposit your ${vault.token0.name}`
                            :
                            `Deposit your LP or ZAP⚡ in ${vault.token0.name} or ${vault.token1.name}`
                        }
                    </>
                </VidBlockText>
                <VidBlockText mt='0.83vw'>
                WALLET:
                </VidBlockText>
                <Fieldset>
                    {!vault.info.isLending ?
                        <Field>
                            <FieldInput type='radio' checked={radioChoice === RADIO_CHOICE.LP_TOKEN} name={vault.name} onClick={() => setRadioChoice(RADIO_CHOICE.LP_TOKEN)} />
                            <label>{vault.name}</label>
                        </Field>
                        :
                        null
                    }
                    <Field>
                        <FieldInput type='radio' checked={radioChoice === RADIO_CHOICE.TOKEN0} name={vault.name} onClick={() => setRadioChoice(RADIO_CHOICE.TOKEN0)} />
                        <label>{vault.token0.name}</label>
                    </Field>
                    {!vault.info.isLending ?
                        <Field>
                            <FieldInput type='radio' checked={radioChoice === RADIO_CHOICE.TOKEN1} name={vault.name} onClick={() => setRadioChoice(RADIO_CHOICE.TOKEN1)} />
                            {activeDW === ACTIVE_DVS.WITHDRAW ?
                                <>
                                    {vault.token1.name === "WASTR" ? <label> ASTR </label> : <label> {vault.token1.name} </label>}
                                </>
                                :
                                <label>{vault.token1.name}</label>
                            }

                        </Field>
                        :
                        null
                    }
                    {vault.info.isBeefInEth ?
                        <>
                            {activeDW !== ACTIVE_DVS.WITHDRAW ?
                                <Field>
                                    <FieldInput type='radio' checked={radioChoice === RADIO_CHOICE.ASTR} name={"ASTR"} onClick={() => setRadioChoice(RADIO_CHOICE.ASTR)}/>
                                    <label>ASTR</label>
                                </Field>
                                :
                                null
                            }
                            {activeDW === ACTIVE_DVS.WITHDRAW && vault.info.isLending ?
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
                <AddButton style={{visibility: vault.info.isLending ? "hidden" : "none"}} href={vault.info.addLpLink} target={"_blank"}>Add Liquidity</AddButton>
                <BuyButton href={vault.buyLink} target={"_blank"}>Buy Token</BuyButton>
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
                    {allowances && balances ?
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
                <Font fw='500' fs={isMobileScreen () ? '17px' : '0.93vw'}>{vault.token0.name}</Font>
                </div>
                </VidBlockHeader>
                <HDivider/>
                <LinksRow>
                    {vault.token0.website ? <a href={vault.token0.website}>Website<OutLinkIcon ratio={ isMobileScreen() ? '4vw': '0.93vw'}/></a> : null}
                    <a href={`https://blockscout.com/astar/address/${vault.token0.address}/transactions`}>Token Contract<OutLinkIcon ratio={ isMobileScreen() ? '4vw': '0.93vw'}/></a>
                </LinksRow>
                <VidBlockText>{vault.token0.description}</VidBlockText>
            </VidBlock>

            {!vault.info.isLending ?
                <VidBlock height={'8.96vw'}>
                    <VidBlockHeader>
                        <div><Font  fs={ isMobileScreen() ? '12px' : '0.72vw'}  color='#828282'>ASSET DETAILS</Font></div>
                        <div style={{marginTop: isMobileScreen() ? '8px' : '', marginBottom: isMobileScreen() ? '8px' : ''}}>
                            <Font fw='500' fs={isMobileScreen () ? '17px' : '0.93vw'}>{vault.token1.name}</Font>
                            <LinksRow>
                                {vault.token1.website ? <a href={vault.token1.website}>Website<OutLinkIcon ratio={ isMobileScreen() ? '4vw': '0.93vw'}/></a> : null}
                                <a href={`https://blockscout.com/astar/address/${vault.token0.address}/transactions`}>Token Contract<OutLinkIcon ratio={ isMobileScreen() ? '4vw': '0.93vw'}/></a>
                            </LinksRow>
                        </div>
                    </VidBlockHeader>
                    <HDivider/>
                    <VidBlockText mt='1.25vw'>{vault.token1.description}</VidBlockText>
                </VidBlock>
                :
                null
            }
            </>}
            </VidRightColumn>
            </VIDLayout>
            </>
            :
            <h1> Loading... </h1>
        }
    </VidWrapper>)
} 

export default VaultById;