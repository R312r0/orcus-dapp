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
import MASTER_CHEF_ABI from '../abis/MasterChef.json';
import UNISWAP_PAIR_ABI  from '../abis/UniswapPair.json';
import UNISWAP_ROUTER_ABI from '../abis/UniswapRouter.json';
import OUSD_METAPOOL_ABI from '../abis/oUSDmetapool.json';
import {formatFromDecimal} from "../utils";

const BlockchainContext  = React.createContext();
export const useBlockChainContext = () => useContext(BlockchainContext);


export const BlockchainContextProvider = ({children}) => {

    const {account, active, activate, library} = useWeb3React();

    const [contracts, setContracts] = useState(null);
    const [signer, setSigner] = useState(null);
    const [liquidity, setLiquidity] = useState(null);

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


    useEffect(() => {

        if (contracts) {
            getLiquidityPrices();
        }


    }, [contracts])

    const getLiquidityPrices = async () => {

        const {ORU_USDC, OUSD_USDC, OUSD_ORU} = contracts;

        // ORU-USDC liquidity
        const oruUsdcRes = await ORU_USDC.getReserves();

        const oruPrice =  (formatFromDecimal(+oruUsdcRes[0], 6)) / (formatFromDecimal(+oruUsdcRes[1], 18));
        const oruUsdcLiq = ((+oruUsdcRes[0] / 1e6)) + ((+oruUsdcRes[1] / 1e18) * oruPrice);

        // ORU-USDC liquidity
        const ousdUsdcRes = await OUSD_USDC.getReserves();

        const ousdPrice = (+ousdUsdcRes[1] / 1e6) / (+ousdUsdcRes[0] / 1e18);
        const ousdUsdcLiq = (ousdPrice * (+ousdUsdcRes[0] / 1e18)) + (+ousdUsdcRes[1] / 1e6);

        // OUSD-ORU liquidity
        // TODO: Add liquidity for this pair.
        const oruOusdRes = await OUSD_ORU.getReserves();
        const oruOusdLiq = (ousdPrice * (+oruOusdRes[0] / 1e18)) + (oruPrice * (+oruOusdRes[1] / 1e18))

        setLiquidity({
            oruPrice,
            ousdPrice,
            oruUsdcLiq,
            ousdUsdcLiq,
            oruOusdLiq
        })

    }

    const init = async () => {

        const readProvider = new ethers.providers.JsonRpcProvider(JSON_RPC_URL);

        const tokens = {
            ORU: new ethers.Contract(CONTRACT_ADDRESSES.ORU, OrcusERC20_ABI, readProvider),
            OUSD: new ethers.Contract(CONTRACT_ADDRESSES.OUSD, OrcusERC20_ABI, readProvider),
            USDC: new ethers.Contract(CONTRACT_ADDRESSES.USDC, ERC20_ABI, readProvider),
            WASTR: new ethers.Contract(CONTRACT_ADDRESSES.WASTR, ERC20_ABI, readProvider),
            XORU: new ethers.Contract(CONTRACT_ADDRESSES.ORU_STAKE, ERC20_ABI, readProvider),
        }

        const pairs = {
            ORU_USDC: new ethers.Contract(CONTRACT_ADDRESSES.ORU_USDC, UNISWAP_PAIR_ABI, readProvider),
            OUSD_USDC: new ethers.Contract(CONTRACT_ADDRESSES.OUSD_USDC, UNISWAP_PAIR_ABI, readProvider),
            OUSD_ORU: new ethers.Contract(CONTRACT_ADDRESSES.OUSD_ORU, UNISWAP_PAIR_ABI, readProvider)
        }

        const contracts = {
            BANK: new ethers.Contract(CONTRACT_ADDRESSES.BANK, BANK_ABI, readProvider),
            BANK_SAFE: new ethers.Contract(CONTRACT_ADDRESSES.BANK_SAFE, BANK_SAFE_ABI, readProvider),
            ORU_STAKE: new ethers.Contract(CONTRACT_ADDRESSES.ORU_STAKE, ORU_STAKE_ABI, readProvider),
            PRICE_ORACLE: new ethers.Contract(CONTRACT_ADDRESSES.PRICE_ORACLE, PRICE_ORACLE_ABI, readProvider),
            OUSD_USDC_ORACLE: new ethers.Contract(CONTRACT_ADDRESSES.OUSD_USDC_ORACLE, TWAP_ORACLE_ABI, readProvider),
            MASTER_CHEF: new ethers.Contract(CONTRACT_ADDRESSES.MASTER_CHEF, MASTER_CHEF_ABI, readProvider),
            ROUTER: new ethers.Contract(CONTRACT_ADDRESSES.ROUTER, UNISWAP_ROUTER_ABI, readProvider),
            OUSD_METAPOOL: new ethers.Contract(CONTRACT_ADDRESSES.OUSD_METAPOOL, OUSD_METAPOOL_ABI, readProvider)

            // TODO: add more.
        }

        setContracts({...tokens, ...pairs, ...contracts})

    }

    const connectWallet = async () => {

        try {
            await window.ethereum.request({
                method: "wallet_switchEthereumChain",
                params: [{chainId: `0x250`}]
            })
        }
        catch (switchErrorCode) {

            if (switchErrorCode.code === 4902) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [
                            {
                                chainId: `0x250`,
                                chainName: 'Astar',
                                rpcUrls: ['https://astar.api.onfinality.io/public'] /* ... */,
                            },
                        ],
                    });
                }
                catch (e) {
                    console.log(e.message);
                }
            }

        }
        activate(MetaMask)
    }

    const createSigner = async () => await library.getSigner();

    const value = {
        connectWallet,
        contracts,
        signer,
        liquidity
    }

    return (
        <BlockchainContext.Provider value={value}>
            {children}
        </BlockchainContext.Provider>
    )

}