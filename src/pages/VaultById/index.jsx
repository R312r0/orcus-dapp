import { ArrowBack } from "@mui/icons-material";
import LogoIconBlack from "../../assets/icons/LogoIconBlack";
import OUSDIcon from "../../assets/icons/OUSDIcon";
import OutLinkIcon from "../../assets/icons/OutLinkIcon";
import { VidTopBar, GraphMenuContainer,Field,FieldInput,DoubleContainer,ConnectWallet, MaxButton, InputContainer, Input, AddButton, BuyButton, AddBuyContainer, Fieldset,DWContainer,DWButton, GraphMenuItem, LinksRow, VidBlockText, VidBlockHeader, VidBlock, HDivider, VIDLayout, VIDLeftColumn, VidRightColumn, VidWrapper, WhiteBorderItemLarge, Font, WhiteBorderItem, WhiteBorderBar, VDivider } from "./styled";
import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router";
import {JSON_RPC_URL, MAX_INT, VAULT_TOKENS, VAULTS} from "../../constants";
import {useWeb3React} from "@web3-react/core";
import axios from "axios";
import {ethers} from "ethers";
import BigNumber from 'bignumber.js';

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

    const {account} = useWeb3React();
    const {signer, globalVault, setGlobalVault} = useBlockChainContext();
    const {id} = useParams();
    const [vault, setVault] = useState(null);

    const navigate = useNavigate();

    const [error, setError] = useState(null);

    // UX section
    const [ graphActiveItem, setActiveItem ] = useState('TVL')
    const [activeDW, setActiveDW] = useState(ACTIVE_DVS.DEPOSIT);
    const [radioChoice, setRadioChoice] = useState(RADIO_CHOICE.LP_TOKEN)
    const [tokenInput, setTokenInput] = useState("0.00");
    const [buttonLoading, setButtonLoading] = useState(false);


    // User section
    const [allowances, setAllowances] = useState(null);
    const [balances, setBalances] = useState(null);
    const [deposited, setDeposited] = useState({lp: 0, usd: 0})
    //
    // const [vaultLpMultiplier, setVaultLpMultiplier] = useState(null);
    //

    useEffect(() => {

        if (signer) {
            if (!globalVault) {
                axios.get(`http://localhost:3000/vault/${id}`).then(({data}) => {
                    setVault(init(data));
                });
            }
            else {
                setVault(init(globalVault));
            }
        }
    }, [globalVault, signer])

    useEffect(() => {

        if (vault && signer) {
            getUserInfo(vault);
        }

    }, [vault, signer])


    useEffect(() => {
        setTokenInput(0)
    }, [radioChoice])

    const init = (vault) => {
        const interactAssets = vault.Tokens.map(token => ({...token, contract: new ethers.Contract(token.address, ERC20_ABI, signer), beefIn: true}));

        interactAssets.push({name: "VAULT", decimals: 18, address: vault.vaultAddress, contract: new ethers.Contract(vault.vaultAddress, ERC20_ABI, signer)});
        if (vault.Tokens.length > 1) {
            interactAssets.push({name: vault.name, decimals: 18, address: vault.lpAddress, contract: new ethers.Contract(vault.lpAddress, ERC20_ABI, signer)});
        }

        if (vault.Tokens.findIndex(item => item.name === "WASTR") !== -1 && vault.Tokens.length > 1) {
            interactAssets.push({name: "ASTR", beefIn: true})
        }

        const vaultContract = new ethers.Contract(vault.vaultAddress, VAULT_ABI, signer); // TODO: add lending abi
        const routerContract =  vault.Tokens.length > 1 ? new ethers.Contract(vault.Project.routerAddress, ROUTER_ABI, signer) : null;
        setRadioChoice(vault.Tokens[0].name);
        return {...vault, vaultContract, routerContract, interactAssets};
    }

    const getUserInfo = async (vaultLoc) => {
        await getAllowances(vaultLoc);
        await getBalances(vaultLoc);
    }

    const getAllowances = async (vaultLoc) => {

        const {interactAssets} = vaultLoc;
        const allowances = await Promise.all( interactAssets.map(async (token) => {

            let res;
            const statement = token.name === vaultLoc.name || vaultLoc.Tokens.length <= 1;

            if (token.name === "ASTR") {
                res = 1;
            }

            else {
                res = await token.contract.allowance(account, statement ? vault.vaultAddress : vault.Project.routerAddress);
            }

            return {name: token.name, allowance: res > 0};

        }))

        setAllowances(allowances);
    }


    const getBalances = async (vaultLoc) => {

        const {interactAssets} = vaultLoc;

        const balances = await Promise.all(interactAssets.map(async (token) => {

            let bal;

            if (token.name === "ASTR" && vaultLoc.Tokens.length > 1) {
                bal = formatFromDecimal(+(await signer.getBalance()), 18);
            }
            else {
                bal = formatFromDecimal(+(await token.contract.balanceOf(account)), token.decimals);
            }

            return {name: token.name, bal};
        }))

        // FIXME: something wrong here with Lending deposited.

        const depositedLp = balances.find(item => item.name === "VAULT").bal / vaultLoc.vaultPriceMultiplier
        const depositedUsd = depositedLp * vaultLoc.lpPrice;

        setDeposited({lp: depositedLp, usd: depositedUsd})
        setBalances(balances);

    }


    const updateActiveItem = ( event ) => {
        let value = event.currentTarget.dataset.value
        setActiveItem(value);
    }

    const updateActiveDW = ( event ) => {
        let value = event.currentTarget.dataset.value;
        setActiveDW(value);
        setTokenInput(0);
    }

    const handleApprove = async () => {

        let tx;
        const {vaultContract, routerContract, interactAssets, Tokens} = vault;

        if (Tokens.length > 1) {
            const searchedAsset = interactAssets.find(item => item.name === radioChoice);

            if (searchedAsset.beefIn) {
                tx = await searchedAsset.contract.approve(routerContract.address, MAX_INT);
            }
            else {
                tx = await searchedAsset.contract.approve(vaultContract.address, MAX_INT);
            }

        }
        else {
            console.log("Lending!")
        }

        try {
            await tx.wait();
            await getAllowances(vault);
        }
        catch (e) {
            console.log(e.message);
        }
    }
    //
    // const handleApproveForWithdraw = async () => {
    //
    //     const {router, vaultContract} = vault.contracts;
    //
    //     try {
    //         const tx = await vaultContract.connect(signer).approve(router.address, MAX_INT);
    //         await tx.wait();
    //
    //         await getAllowances(vault);
    //     }
    //     catch (e) {
    //         console.log(e.message);
    //     }
    // }
    //
    const handleDeposit = async () => {

        let tx;
        const {vaultContract, routerContract, interactAssets, Tokens} = vault;

        if (Tokens.length > 1) {
            const searchedAsset = interactAssets.find(item => item.name === radioChoice);

            if (searchedAsset.beefIn) {

                tx = searchedAsset.name !== "ASTR"
                    ? await routerContract.beefIn(vault.vaultAddress, 0, searchedAsset.address, formatToDecimal(tokenInput, searchedAsset.decimals))
                    : await routerContract.beefInETH(vault.vaultAddress, 0, {value: formatToDecimal(tokenInput, 18)});
            }
            else {
                // TODO: add logic for lending too (depositASTR).
                tx = await vaultContract.deposit(formatToDecimal(tokenInput, searchedAsset.decimals));
            }
        }
        else {

            // FIXME: add searchedAsset becuase it can be WASTR so we can use native ASTR instead
            // await vaultContract.connect(signer).depositASTR({value: formatToDecimal(tokenInput, 18)})
            // TODO: if radiochoise astr then depositASTR if not than just deposit.

            tx = await vaultContract.deposit(formatToDecimal(tokenInput, Tokens[0].decimals));
        }

        try {
            await tx.wait();
            await getBalances(vault);
        }
        catch (e) {
            console.log(e.message);
        }
    }

    const handleWithdraw = async () => {
        let tx;
        const {vaultContract, routerContract, interactAssets, Tokens} = vault;

        if (Tokens.length > 1) {
            const searchedAsset = interactAssets.find(item => item.name === radioChoice);

            if (searchedAsset.beefIn) {
                 tx = await routerContract.beefOutAndSwap(vault.vaultAddress, formatToDecimal(tokenInput, 18), searchedAsset.address, 0)
            }
            else {
                tx = await routerContract.beefOut(vault.vaultAddress, formatToDecimal(tokenInput, 18));
            }

        }

        else {
            console.log("Lending!")
            // TODO: add lending logic too
            // await vaultContract.connect(signer).withdraw( (+tokenInputFormatted / +vaultLpMultiplier).toFixed(0));
        }

        try {
            await tx.wait();
            await getBalances(vault);
        }
        catch (e) {
            console.log(e.message);
        }

    }

    const handleMaxButton = () => {
        setTokenInput(
            activeDW === ACTIVE_DVS.DEPOSIT ?
                balances.find(item => item.name === radioChoice).bal
                : balances.find(item => item.name === "VAULT").bal
        );
    }

    const MainButton = () => {

        if (!account) {
            return <ConnectWallet >Connect Wallet</ConnectWallet>
        }
        else {
            const allowance = allowances.find(item => item.name === radioChoice).allowance;
            const balance = balances.find(item => item.name === radioChoice).bal >= tokenInput;

            if (activeDW === ACTIVE_DVS.DEPOSIT) {

                if (!allowance) {
                    return <ConnectWallet onClick={() => handleApprove()} >Approve {radioChoice}</ConnectWallet>
                }

                else if (!balance) {
                    return <ConnectWallet disalbed={true} > Insufficient {radioChoice} balance </ConnectWallet>
                }

                else {
                    return( <ConnectWallet disabled={!balance} onClick={() => !allowance ? handleApprove() : handleDeposit()} >
                                {!allowance ? `Approve ${radioChoice}` : !balance ? `Insufficient ${radioChoice} balance` : "Deposit"}
                            </ConnectWallet>
                    )
                }
            }

            else {

                const vaultAllowance = allowances.find(item => item.name === "VAULT").allowance;
                const vaultBalance = balances.find(item => item.name === "VAULT").bal >= (tokenInput || 0);

                return <ConnectWallet disabled={!vaultBalance || !tokenInput} onClick={() => !vaultAllowance ? console.log("Approve") : handleWithdraw()}>
                            {!vaultAllowance ? "Approve vault tokens" : !vaultBalance ? "Insufficient vault-tokens balance" : "Withdraw"}
                        </ConnectWallet>
            }
        }
    }


    const handleVaultPage = () => {
        navigate("/vaults");
        setGlobalVault(null);
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
                <ArrowBack style={{cursor: 'pointer'}} onClick={() => handleVaultPage()}/>
                {vault.Tokens.map(token => {

                    return VAULT_TOKENS[token.name].logo
                })}
                <Font fw='500' fs={ isMobileScreen() ? '16px' : '0.93vw'} color='#333'>{vault.name}</Font>
                <Font fw='500' fs={ isMobileScreen() ? '16px' : '0.93vw'} color='#828282'>vault</Font>
            </div>
            <div>
                <Font fs={ isMobileScreen() ? '12px' : '0.72vw'} fw='300'>Platform:</Font>
                <Font fs={ isMobileScreen() ? '12px' : '0.72vw'} fw='500' color='#4F4F4F'> {vault.Project.name}</Font>
            </div>
            </VidTopBar>
            <div style={{backgroundColor: isMobileScreen() ? '#fff' : ''}}>
                <WhiteBorderBar>
                    <WhiteBorderItem bg='#F5EFD7'>
                        <div>
                            <Font color='#272A30' fs={ isMobileScreen() ? '12px' : '0.72vw'} >TVL</Font>
                            <div><Font fw='500' color='#828282'   fs={isMobileScreen () ? '14px' : '0.83vw'}>$</Font><Font  fs={isMobileScreen () ? '14px' : '0.83vw'}>{formattedNum(vault.vaultTvl)}</Font></div>
                        </div>
                    </WhiteBorderItem>

                    <WhiteBorderItem bg='#E4DDEF'>
                        <div>
                            <Font color='#272A30' fs={ isMobileScreen() ? '12px' : '0.72vw'} >APY</Font>
                            <div><Font fw='500'  fs={isMobileScreen () ? '14px' : '0.83vw'}>{formattedNum(vault.apy.toFixed(2))}%</Font></div>
                        </div>
                    </WhiteBorderItem>

                    <WhiteBorderItem bg='#D5ECD8'>
                        <div>
                            <Font color='#272A30' fs={ isMobileScreen() ? '12px' : '0.72vw'} >Daily</Font>
                            <div><Font fw='500' fs={isMobileScreen () ? '14px' : '0.83vw'}>{formattedNum((vault.apy / 365).toFixed(2))}%</Font></div>
                        </div>
                    </WhiteBorderItem>

                    <WhiteBorderItemLarge>
                        <div style={{width: '100%', paddingLeft: isMobileScreen() ? '20px' : ''}}>
                            <Font fs={ isMobileScreen() ? '12px' : '0.72vw'}>Your deposit</Font>
                            <div><Font fw='500' fs={isMobileScreen () ? '14px' : '0.83vw'}>{deposited.lp}</Font></div>
                            <div style={{marginTop: '-0.36vw'}}><Font fw='300' color="#4F4F4F" fs={isMobileScreen () ? '14px' : '0.62vw'}>${deposited.usd}</Font></div>
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
                        <VidBlockHeader>
                            <Font fw='500'  fs={isMobileScreen () ? '17px' : '0.93vw'}>
                                {vault.Project.name}
                                <Font  fs={isMobileScreen () ? '17px' : '0.93vw'}  color='#828282'/>
                            </Font>
                        </VidBlockHeader>
                        <HDivider/>
                        <LinksRow>
                            <a href={vault.Project.website}>Website<OutLinkIcon ratio={isMobileScreen() ? '4vw' : '0.93vw'}/></a>
                            <a href={vault.Project.telegram}>Telegram<OutLinkIcon ratio={isMobileScreen() ? '4vw' : '0.93vw'}/></a>
                            <a href={vault.Project.twitter}>Twitter<OutLinkIcon ratio={isMobileScreen() ? '4vw' : '0.93vw'}/></a>
                        </LinksRow>
                        <VidBlockText> {vault.Project.description} </VidBlockText>
                    </VidBlock>
                    <VidBlock height={'24.23vw'} style={{borderBottomLeftRadius:  isMobileScreen() ?  '20px' : '', borderBottomRightRadius:   isMobileScreen() ?  '20px' : '',}}>
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

                    {vault.Tokens.map(token => {
                        return (
                            <VidBlock style={{marginTop: isMobileScreen() ? '24px' : '', borderTopLeftRadius:  isMobileScreen() ?  '20px' : '', borderTopRightRadius:   isMobileScreen() ?  '20px' : ''}} height={'13.86vw'}>
                                <VidBlockHeader>
                                    <div><Font  fs={ isMobileScreen() ? '12px' : '0.72vw'}  color='#828282'>ASSET DETAILS</Font></div>
                                    <div style={{marginTop: isMobileScreen() ? '8px' : '', marginBottom: isMobileScreen() ? '8px' : ''}}>
                                        <Font fw='500' fs={isMobileScreen () ? '17px' : '0.93vw'}>{token.name}</Font>
                                    </div>
                                </VidBlockHeader>
                                <HDivider/>
                                <LinksRow>
                                    {token.website ? <a href={token.website}>Website<OutLinkIcon ratio={ isMobileScreen() ? '4vw': '0.93vw'}/></a> : null}
                                    <a href={`https://blockscout.com/astar/aaddress/${token.address}/transactions`}>Token Contract<OutLinkIcon ratio={ isMobileScreen() ? '4vw': '0.93vw'}/></a></LinksRow>
                                <VidBlockText>{token.description}</VidBlockText>
                            </VidBlock>
                        )
                    })}
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
                            {
                                vault.Tokens.length <= 1 ?
                                    `Deposit your ${vault.Tokens[0].name}`
                                :
                                `Deposit your LP or ZAP⚡ in ${vault.Tokens.map(item => item.name).join(vault.Tokens.length <= 2 ? ' or ' : ', ')} `
                            }
                        </>
                    </VidBlockText>
                    <VidBlockText mt='0.83vw'>
                        WALLET:
                    </VidBlockText>
                    <Fieldset>
                        {vault.interactAssets.filter(item => item.name !== "VAULT").map((asset, _ind) => {

                                if (activeDW === ACTIVE_DVS.WITHDRAW && asset.name === "ASTR") {
                                    return
                                }

                                return (
                                    <Field>
                                        <FieldInput type='radio' checked={radioChoice === asset.name} name={asset.name} onChange={() => setRadioChoice(asset.name)} />
                                        <label>{asset.name}</label>
                                    </Field>
                                )
                        })}
                    </Fieldset>
                <AddBuyContainer>
                    <AddButton style={{visibility: vault.Tokens.length <= 1 ? "hidden" : "none"}} href={vault.addLpLink}  target={"_blank"}>Add Liquidity</AddButton>
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
                {/*{ !isMobileScreen() ? <></> : <>*/}
                {/*<VidBlock style={{marginTop: isMobileScreen() ? '24px' : '', borderTopLeftRadius:  isMobileScreen() ?  '20px' : '', borderTopRightRadius:   isMobileScreen() ?  '20px' : ''}} height={'13.86vw'}>*/}
                {/*<VidBlockHeader>*/}
                {/*<div><Font  fs={ isMobileScreen() ? '12px' : '0.72vw'}  color='#828282'>ASSET DETAILS</Font></div>*/}
                {/*<div style={{marginTop: isMobileScreen() ? '8px' : '', marginBottom: isMobileScreen() ? '8px' : ''}}>*/}
                {/*<Font fw='500' fs={isMobileScreen () ? '17px' : '0.93vw'}>{vault.token0.name}</Font>*/}
                {/*</div>*/}
                {/*</VidBlockHeader>*/}
                {/*<HDivider/>*/}
                {/*<LinksRow>*/}
                {/*    {vault.token0.website ? <a href={vault.token0.website}>Website<OutLinkIcon ratio={ isMobileScreen() ? '4vw': '0.93vw'}/></a> : null}*/}
                {/*    <a href={`https://blockscout.com/astar/address/${vault.token0.address}/transactions`}>Token Contract<OutLinkIcon ratio={ isMobileScreen() ? '4vw': '0.93vw'}/></a>*/}
                {/*</LinksRow>*/}
                {/*<VidBlockText>{vault.token0.description}</VidBlockText>*/}
                {/*</VidBlock>*/}

            {/*{!vault.info.isLending ?*/}
            {/*    <VidBlock height={'8.96vw'}>*/}
            {/*        <VidBlockHeader>*/}
            {/*            <div><Font  fs={ isMobileScreen() ? '12px' : '0.72vw'}  color='#828282'>ASSET DETAILS</Font></div>*/}
            {/*            <div style={{marginTop: isMobileScreen() ? '8px' : '', marginBottom: isMobileScreen() ? '8px' : ''}}>*/}
            {/*                <Font fw='500' fs={isMobileScreen () ? '17px' : '0.93vw'}>{vault.token1.name}</Font>*/}
            {/*                <LinksRow>*/}
            {/*                    {vault.token1.website ? <a href={vault.token1.website}>Website<OutLinkIcon ratio={ isMobileScreen() ? '4vw': '0.93vw'}/></a> : null}*/}
            {/*                    <a href={`https://blockscout.com/astar/address/${vault.token0.address}/transactions`}>Token Contract<OutLinkIcon ratio={ isMobileScreen() ? '4vw': '0.93vw'}/></a>*/}
            {/*                </LinksRow>*/}
            {/*            </div>*/}
            {/*        </VidBlockHeader>*/}
            {/*        <HDivider/>*/}
            {/*        <VidBlockText mt='1.25vw'>{vault.token1.description}</VidBlockText>*/}
            {/*    </VidBlock>*/}
            {/*    :*/}
            {/*    null*/}
            {/*}*/}
            {/*</>*/}
            </VidRightColumn>
            </VIDLayout>
            </>
            :
            <h1> Loading... </h1>
        }
    </VidWrapper>)
} 

export default VaultById;