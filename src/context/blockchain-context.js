import React, {useContext, useEffect, useState} from "react";
import {ethers} from "ethers";
import {useWeb3React} from "@web3-react/core";
import {MetaMask, JSON_RPC_URL, CONTRACT_ADDRESSES} from "../constants";
import ERC20_ABI from '../abis/ERC20.json';
import OrcusERC20_ABI from '../abis/OrcusERC20.json';
import BANK_ABI from '../abis/Bank.json';
import BANK_SAFE_ABI from '../abis/BankSafe.json';
import ORU_STAKE_ABI from '../abis/ORUStake.json';
import PRICE_ORACLE_ABI from '../abis/PriceOracle.json';
import TWAP_ORACLE_ABI from '../abis/TwapOracle.json';

const BlockchainContext  = React.createContext();
export const useBlockChainContext = () => useContext(BlockchainContext);


export const BlockchainContextProvider = ({children}) => {

    const {account, active, activate, library} = useWeb3React();

    const [contracts, setContracts] = useState(null);
    const [signer, setSigner] = useState(null);

    useEffect(() => {

        init();
        MetaMask.isAuthorized()
            .then(res => res && connectWallet())
            .catch(e => console.log(e.message));

    }, []);

    useEffect(() => {

        if (account) {
            createSigner()
                .then(res => setSigner(res));
        }

    }, [active, account])

    const init = async () => {

        const readProvider = new ethers.providers.JsonRpcProvider(JSON_RPC_URL);

        const tokens = {
            ORU: new ethers.Contract(CONTRACT_ADDRESSES.ORU, OrcusERC20_ABI, readProvider),
            OUSD: new ethers.Contract(CONTRACT_ADDRESSES.OUSD, OrcusERC20_ABI, readProvider),
            USDC: new ethers.Contract(CONTRACT_ADDRESSES.USDC, ERC20_ABI, readProvider),
            WASTR: new ethers.Contract(CONTRACT_ADDRESSES.WASTR, ERC20_ABI, readProvider),
            XORU: new ethers.Contract(CONTRACT_ADDRESSES.ORU_STAKE, ERC20_ABI, readProvider)
        }

        const contracts = {
            BANK: new ethers.Contract(CONTRACT_ADDRESSES.BANK, BANK_ABI, readProvider),
            BANK_SAFE: new ethers.Contract(CONTRACT_ADDRESSES.BANK_SAFE, BANK_SAFE_ABI, readProvider),
            ORU_STAKE: new ethers.Contract(CONTRACT_ADDRESSES.ORU_STAKE, ORU_STAKE_ABI, readProvider),
            PRICE_ORACLE: new ethers.Contract(CONTRACT_ADDRESSES.PRICE_ORACLE, PRICE_ORACLE_ABI, readProvider),
            OUSD_USDC_ORACLE: new ethers.Contract(CONTRACT_ADDRESSES.OUSD_USDC_ORACLE, TWAP_ORACLE_ABI, readProvider)
            // TODO: add more.
        }

        setContracts({...tokens, ...contracts})

    }

    const connectWallet = async () => {

        // TODO: Add more wallets if needed.
        try {
            await activate(MetaMask);
        }
        catch (e) {
            console.error(e.message);
        }
    }

    const createSigner = async () => await library.getSigner();

    const value = {
        connectWallet,
        contracts,
        signer,
    }

    return (
        <BlockchainContext.Provider value={value}>
            {children}
        </BlockchainContext.Provider>
    )

}