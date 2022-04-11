import React, {useContext, useEffect, useState} from "react";
import {ethers} from "ethers";
import {useWeb3React} from "@web3-react/core";
import {MetaMask, JSON_RPC_URL, CONTRACT_ADDRESSES} from "../constants";
import ERC20_ABI from '../abis/ERC20.json';
import OrcusERC20_ABI from '../abis/OrcusERC20.json';
import BANK_ABI from '../abis/Bank.json';

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
            WASTR: new ethers.Contract(CONTRACT_ADDRESSES.WASTR, ERC20_ABI, readProvider)
        }

        const contracts = {
            BANK: new ethers.Contract(CONTRACT_ADDRESSES.BANK, BANK_ABI, readProvider),
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