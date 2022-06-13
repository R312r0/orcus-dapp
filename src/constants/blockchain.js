import {InjectedConnector} from "@web3-react/injected-connector";
import USDCIcon from "../assets/icons/USDCIcon";
import LogoIcon from "../assets/icons/LogoIcon";
import OUSDIcon from "../assets/icons/OUSDIcon";
import ORUIcon from "../assets/icons/ORUIcon";
import BUSDIcon from '../assets/icons/BUSDIcon';
import pandora from '../assets/icons/Pandora.svg';
import wastr from '../assets/icons/WASTR.svg';
import usdt from '../assets/icons/Tether.svg';
import dai from '../assets/icons/DAI.svg';
import weth from '../assets/icons/ETH.svg';
import matic from '../assets/icons/MATIC.svg';
import bnb from '../assets/icons/BNB.svg';
import asx from '../assets/icons/ASX.svg'
import jpyc from '../assets/icons/JPYC.svg';
import bai from '../assets/icons/BAI.svg';
import sdn from '../assets/icons/SDN.svg';
import wbtc from '../assets/icons/wbtc.svg';
import astarexchange from '../assets/icons/astarexchange.svg';

// Project logos
import pandoraProject from '../assets/icons/Pandora.png'

// MasterChef ABIs
import PANDORA_MASTER_CHIEF_ABI from '../abis/PandoraChef.json';
import ASTAR_EXCHANGE_MASTER_CHIEF_ABI from '../abis/AstarExchangeChef.json';

export const MetaMask = new InjectedConnector({
    supportedChainIds: [31337, 592]
});

export const JSON_RPC_URL = "https://astar.blastapi.io/71e41a50-cd2f-4809-a292-6582e1ae292c";
export const MAX_INT = "115792089237316195423570985008687907853269984665640564039457584007913129639935";

export const CONTRACT_ADDRESSES = {
    ORU: "0xCdB32eEd99AA19D39e5d6EC45ba74dC4afeC549F", // Check +
    OUSD: "0x29F6e49c6E3397C3A84F715885F9F233A441165C", // Check +
    WASTR: "0xAeaaf0e2c81Af264101B9129C00F4440cCF0F720", // Check +
    USDC: "0x6a2d262D56735DbA19Dd70682B39F6bE9a931D98", // Check +

    BANK: "0x9F1629D7e349b8aa379DD09eC161E7d8242C2102", // Check +
    BANK_SAFE: "0xd89dEa2daC8Fb73F4107C2cbeA5Eb36dab511F64", // Check +
    ORU_STAKE: "0x243e038685209B9B68e0521bD5838C6C937d666A", // Check +
    PRICE_ORACLE: "0xD3f407b4c61b90ABFDD55A6099327EB30C358e71", // Check +
    OUSD_USDC_ORACLE: "0xc701FF0eF3a134c1b9455e0c456b23d51E792A50", // Check +
    MASTER_CHEF: "0xfa1Cfa75bFae8303A9Fe8aF711AacD59015eE6d4", // Check +

    ORU_USDC: "0x43783EcE7b46BB026D4CeBfd3e29f539Ff1914fB", // Check +
    OUSD_USDC: "0xCf83a3d83c1265780d9374e8a7c838fE22BD3DC6", // Check +
    OUSD_ORU: "0xE5A11AfBed6a0fC59e69493F7142ef7e454e809f", // Check +

    OUSD_METAPOOL: "0xD18AbE9bcedeb5A9a65439e604b0BE8db0bdB176", // Check +
    SRS: "0x9448610696659de8F72e1831d392214aE1ca4838", // Check +
    GAGUE_CONTROLLER: "0x9464c206e0BF6310a130e690209dbFf1a7D4Dc65", // Check +
    SRS_LP_TOKEN: "0x2425947FD79cbf4C2C2deeD0246b0C9EdC65EB7D", // Check +
    GAGUE_OUSD: "0x5FF4735274b0C7ADf7de52768645aA08AE4bcB20", // Check +

    ROUTER: "0xE915D2393a08a00c5A463053edD31bAe2199b9e7", // Check +

    DUSTBIN: "0x91F62d51a0Eb14e7671473C5D5f1528aDF8EdE49", // Check
    TREASURY: "0x9F02Aa523342c45874986F8Cd48397778201FA09" // Check
}
export const ORU_PER_BLOCK = 4.466;

export const MASTER_CHEF_POOLS = [
    {name: "ORU/USDC", address: "0x0D02dFE1E662FbB70255D61b85ABE267D0179ee8", mobileToken0Icon: <ORUIcon ratio={'5vw'}/>, token0Icon: <ORUIcon ratio={'1.192vw'}/>,mobileToken1Icon: <USDCIcon ratio={'5vw'}/>, token1Icon: <USDCIcon ratio={'1.192vw'}/>, token0: "ORU", token1: "USDC"},
    {name: "oUSD/USDC", address: "0x8C6d6Ec1B320f38D4cd58Cac30562A35DA0F1EE6",mobileToken0Icon: <OUSDIcon ratio={'5vw'}/>,  token0Icon: <OUSDIcon ratio={'1.192vw'}/>,mobileToken1Icon: <USDCIcon ratio={'5vw'}/>, token1Icon: <USDCIcon ratio={'1.192vw'}/>, token0: "OUSD", token1: "USDC"},
    {name: "oUSD/ORU", address: "0x318d0540aec0709dDDD67480eFAC0EeF217Dfcf0", mobileToken0Icon: <OUSDIcon ratio={'5vw'}/>, token0Icon: <OUSDIcon ratio={'1.192vw'}/>,mobileToken1Icon: <ORUIcon ratio={'5vw'}/>, token1Icon: <ORUIcon ratio={'1.192vw'}/>, token0: "OUSD", token1: "ORU"},
]

//0xf9784e15229E08cb417f4609B02d18081D7d2a7F

const TOKEN_VAULT_ADDRESSES = {
    PANDORA: "0x8ea356004327E598729b4CE590eDC90428Dc6A89",
    WASTR: "0xAeaaf0e2c81Af264101B9129C00F4440cCF0F720",
    USDC: "0x6a2d262D56735DbA19Dd70682B39F6bE9a931D98",
    USDT: "0x3795C36e7D12A8c252A20C5a7B455f7c57b60283",
    DAI: "0x6De33698e9e9b787e09d3Bd7771ef63557E148bb"
}

const TOKEN_VAULT_LP_ADDRESSES = {
    WASTR_PANDORA: "0x5e8a60839dC6F9C7595E0d9519d4bdB947cEb7A6",
    PANDORA_USDC: "0x3ED26D25d047B0d01E181c1a0E955e00aac9A707",
    WASTR_USDC: "0x3683d79a8Af26A56822C48a4eD1af80d51eB8399",
    USDT_USDC: "0xcECbf254c22a5d5e5d75a215A4403A5B4dC1dA5A",
    DAI_USDC: "0x148dF5088b74f511C8458b9d7c0f45c3F6971FAd"
}

const VAULT_ADDRESSES = {
    ROUTER: "0x22E1f7Ed1A9118805a40d90aA61DB1312D96BE58",
    PANDORA_WASTR_VAULT: "0x8317099f69ca210C18835fefB6dED806491B1768",
    USDC_PANDORA_VAULT: "0x7b5F472e466f94642c4260e5E205d34DB15718A9",
    USDC_WASTR_VAULT: "0xf1b4384808eb559Cbfc5855EdD96B79c54186B01",
    USDT_USDC_VAULT: "0xEb1648a7FA68e566EFc4f96532Be1b92991abcaE",
    DAI_USDC: "0xD00FEeF0FCA5DA1a4E62d0C3D4CC14D899233Ac6",
    PANDORA_MASTER_CHEF: "0x894d03D77b42bBeC83CEe221596ba17a83b995eC"
}

export const VAULT_CATEGORIES = {
    STABLE: "Stablecoins",
    BLUE_CHIPS: "Blue Chips",
    ORCUS: "Orcus Vaults",
    NONE: "none",
}

export const MASTER_CHEF_ABIS = {
    "Pandora-Swap": PANDORA_MASTER_CHIEF_ABI,
    "Astar-Exchange": ASTAR_EXCHANGE_MASTER_CHIEF_ABI
}

export const VAULT_TOKENS = {
    WASTR_PANDORA: {
        name: "WASTR",
        address: "0xAeaaf0e2c81Af264101B9129C00F4440cCF0F720",
        description: "ASTAR network main token",
        website: "https://astar.network/",
        logo: <img src={wastr} style={{width: "2.344vw", height: "2.344vw"}}/>,
        mobileLogo:  <img src={wastr} style={{width: "5.344vw", height: "5.344vw"}}/>,
    },
    WASTR_ASTAR_EXCHANGE: {
        name: "WASTR",
        address: "0xEcC867DE9F5090F55908Aaa1352950b9eed390cD",
        description: "ASTAR network main token",
        website: "https://astar.network/",
        logo: <img src={wastr} style={{width: "2.344vw", height: "2.344vw"}}/>,
        mobileLogo:  <img src={wastr} style={{width: "5.344vw", height: "5.344vw"}}/>,
    },
    WETH: {
        name: "WETH",
        address: "0x81ECac0D6Be0550A00FF064a4f9dd2400585FE9c",
        description: "Wrapped Ethereum ERC20 token",
        website: "https://astar.network/",
        logo: <img src={weth} style={{width: "2.344vw", height: "2.344vw"}}/>,
        mobileLogo:  <img src={weth} style={{width: "5.344vw", height: "5.344vw"}}/>,
    },
    MATIC: {
        name: "MATIC",
        address: "0xdd90E5E87A2081Dcf0391920868eBc2FFB81a1aF",
        description: "Wrapped Matic ERC20 token",
        website: "https://astar.network/",
        logo: <img src={matic} style={{width: "2.344vw", height: "2.344vw"}}/>,
        mobileLogo:  <img src={matic} style={{width: "5.344vw", height: "5.344vw"}}/>,
    },
    BNB: {
        name: "BNB",
        address: "0x7f27352D5F83Db87a5A3E00f4B07Cc2138D8ee52",
        description: "Binance main coin",
        website: "https://astar.network/",
        logo: <img src={bnb} style={{width: "2.344vw", height: "2.344vw"}}/>,
        mobileLogo:  <img src={bnb} style={{width: "5.344vw", height: "5.344vw"}}/>,
    },
    WBTC: {
        name: "WBTC",
        address: "0xad543f18cFf85c77E140E3E5E3c3392f6Ba9d5CA",
        description: "Wrapped Bitcoin",
        website: "https://astar.network/",
        logo: <img src={wbtc} style={{width: "2.344vw", height: "2.344vw"}}/>,
        mobileLogo:  <img src={wbtc} style={{width: "5.344vw", height: "5.344vw"}}/>,
    },
    WSDN: {
        name: "WSDN",
        address: "0x75364D4F779d0Bd0facD9a218c67f87dD9Aff3b4",
        description: "Shiden Network main token",
        website: "https://astar.network/",
        logo: <img src={sdn} style={{width: "2.344vw", height: "2.344vw"}}/>,
        mobileLogo:  <img src={sdn} style={{width: "5.344vw", height: "5.344vw"}}/>,
    },
    USDC: {
        name: "USDC",
        address: "0x6a2d262D56735DbA19Dd70682B39F6bE9a931D98",
        description: "None",
        website: null,
        logo: <USDCIcon/>,
        mobileLogo: <USDCIcon ratio='5vw'/>
    },
    USDT: {
        name: "USDT",
        address: "0x3795C36e7D12A8c252A20C5a7B455f7c57b60283",
        description: "None",
        website: null,
        logo: <img src={usdt} style={{width: "2.344vw", height: "2.344vw"}}/>,
        mobileLogo: <img src={usdt} style={{width: "5.344vw", height: "5.344vw"}}/>
    },
    DAI: {
        name: "DAI",
        address: "0x6De33698e9e9b787e09d3Bd7771ef63557E148bb",
        description: "DAI",
        website: null,
        logo: <img src={dai} style={{width: "2.344vw", height: "2.344vw"}}/>,
        mobileLogo:  <img src={dai} style={{width: "5.344vw", height: "5.344vw"}}/>,
    },
    BUSD: {
        name: "BUSD",
        address: "0x4Bf769b05E832FCdc9053fFFBC78Ca889aCb5E1E",
        description: "Binance Smart Chain USD Coin",
        website: null,
        logo: <BUSDIcon/>,
        mobileLogo:  <BUSDIcon ratio={"5vw"}/>,
    },
    JPYC: {
        name: "JPYC",
        address: "0x431D5dfF03120AFA4bDf332c61A6e1766eF37BDB",
        description: "JPYC",
        website: null,
        logo: <img src={jpyc} style={{width: "2.344vw", height: "2.344vw"}}/>,
        mobileLogo:  <img src={jpyc} style={{width: "5.344vw", height: "5.344vw"}}/>,
    },
    BAI: {
        name: "BAI",
        address: "0x733ebcC6DF85f8266349DEFD0980f8Ced9B45f35",
        description: "BAI",
        website: null,
        logo: <img src={bai} style={{width: "2.344vw", height: "2.344vw"}}/>,
        mobileLogo:  <img src={bai} style={{width: "5.344vw", height: "5.344vw"}}/>,
    },
    DOT: {
        name: "DOT",
        address: "0xFFfFfFffFFfffFFfFFfFFFFFffFFFffffFfFFFfF",
        description: "Polkadot chain main token",
        website: null,
        logo: <img src={jpyc} style={{width: "2.344vw", height: "2.344vw"}}/>,
        mobileLogo:  <img src={jpyc} style={{width: "5.344vw", height: "5.344vw"}}/>,
    },
    // Projects token
    PANDORA: {
        name: "PANDORA",
        address: "0x8ea356004327E598729b4CE590eDC90428Dc6A89",
        description: "PANDORA is the native token with an outstanding utility to empowers the whole Pandora Swap ecosystem.",
        website: "https://pandoraswapxyz.org/",
        logo: <img src={pandora} style={{width: "2.344vw", height: "2.344vw"}}/>,
        mobileLogo:  <img src={pandora} style={{width: "5.344vw", height: "5.344vw"}}/>,
    },
    ASX: {
        name: "ASX",
        address: "0x5D1af739FD538D363Fd61a59d3CBb7B70784A3AC",
        description: "Astar Exchange main token.",
        website: "https://astar.exchange/exchange/swap",
        logo: <img src={asx} style={{width: "2.344vw", height: "2.344vw"}}/>,
        mobileLogo: <img src={asx} style={{width: "5.344vw", height: "5.344vw"}}/>
    }

}

export const TEST_VAULT = [
    {
        name: "Pandora-Swap",
        logo: <img src={pandoraProject} width='12'/>,
        description: "Pandora Swap is a One-Stop DeFi Hub with the most complete ecosystem within Astar Network focused on offering an accessible, transparent and secure experience for everyone.",
        website: "https://pandoraswapxyz.org/",
        telegram: "http://t.me/pandoraswap",
        twitter: "https://twitter.com/pandora_swap",
        buyLink: "https://pandoraswapxyz.org/swap",

        rewardTokenAddress: "0x8ea356004327E598729b4CE590eDC90428Dc6A89",
        routerAddress: "0x22E1f7Ed1A9118805a40d90aA61DB1312D96BE58",
        masterChiefAddress: "0x894d03D77b42bBeC83CEe221596ba17a83b995eC",

        vaults: [
            {
                name: "PANDORA-WASTR",
                lpAddress: "0x5e8a60839dC6F9C7595E0d9519d4bdB947cEb7A6",
                vaultAddress: "0x8317099f69ca210C18835fefB6dED806491B1768",
                poolIndex: 1,
                addLpLink: "https://pandoraswapxyz.org/add/0x8ea356004327E598729b4CE590eDC90428Dc6A89/0xAeaaf0e2c81Af264101B9129C00F4440cCF0F720",
                token0: VAULT_TOKENS.PANDORA,
                token1: VAULT_TOKENS.WASTR_PANDORA,
                category: VAULT_CATEGORIES.NONE
            },
            {
                name: "USDC-PANDORA",
                lpAddress: "0x3ED26D25d047B0d01E181c1a0E955e00aac9A707",
                vaultAddress: "0x7b5F472e466f94642c4260e5E205d34DB15718A9",
                poolIndex: 4,
                addLpLink: "https://pandoraswapxyz.org/add/0x8ea356004327E598729b4CE590eDC90428Dc6A89/0xAeaaf0e2c81Af264101B9129C00F4440cCF0F720",
                token0: VAULT_TOKENS.PANDORA,
                token1: VAULT_TOKENS.USDC,
                category: VAULT_CATEGORIES.NONE
            },
            {
                name: "WASTR-USDC",
                lpAddress: "0x3683d79a8Af26A56822C48a4eD1af80d51eB8399",
                vaultAddress: "0xf1b4384808eb559Cbfc5855EdD96B79c54186B01",
                poolIndex: 3,
                addLpLink: "https://pandoraswapxyz.org/add/0x8ea356004327E598729b4CE590eDC90428Dc6A89/0xAeaaf0e2c81Af264101B9129C00F4440cCF0F720",
                token0: VAULT_TOKENS.WASTR_PANDORA,
                token1: VAULT_TOKENS.USDC,
                category: VAULT_CATEGORIES.NONE
            },
            {
                name: "USDT-USDC",
                lpAddress: "0xcECbf254c22a5d5e5d75a215A4403A5B4dC1dA5A",
                vaultAddress: "0xEb1648a7FA68e566EFc4f96532Be1b92991abcaE",
                poolIndex: 2,
                addLpLink: "https://pandoraswapxyz.org/add/0x8ea356004327E598729b4CE590eDC90428Dc6A89/0xAeaaf0e2c81Af264101B9129C00F4440cCF0F720",
                token0: VAULT_TOKENS.USDT,
                token1: VAULT_TOKENS.USDC,
                category: VAULT_CATEGORIES.STABLE
            },
            {
                name: "USDC-DAI",
                lpAddress: "0x148dF5088b74f511C8458b9d7c0f45c3F6971FAd",
                vaultAddress: "0xD00FEeF0FCA5DA1a4E62d0C3D4CC14D899233Ac6",
                poolIndex: 5,
                addLpLink: "https://pandoraswapxyz.org/add/0x8ea356004327E598729b4CE590eDC90428Dc6A89/0xAeaaf0e2c81Af264101B9129C00F4440cCF0F720",
                token0: VAULT_TOKENS.USDC,
                token1: VAULT_TOKENS.DAI,
                category: VAULT_CATEGORIES.STABLE
            },
        ]
    },
    {

        name: "Astar-Exchange",
        logo: <img src={astarexchange} width='12'/>,

        description: "Uniswap v2 fork on Astar Network, the most optimized contracts for P2P trading. Yield farm without lock-up.",
        website: "https://astar.exchange/exchange/swap",
        telegram: null,
        twitter: "https://twitter.com/AstarExchange",
        buyLink: "https://astar.exchange/exchange/swap",

        rewardTokenAddress: "0x5D1af739FD538D363Fd61a59d3CBb7B70784A3AC",
        routerAddress: "0xCC1c76C4ee74E7Bc5370FC9Ed9E31ed9054cc199",
        masterChiefAddress: "0xC8E6b94B121dF6afa3f698df2c51F8B779A02170",

        vaults: [
            {
                name: "ASX-ASTR",
                lpAddress: "0x8a00655Da9D32537650fd885aDe7e550d4047e8A",
                vaultAddress: "0xccBef9a10bA330C9fbfA553bbB36dBC01ce3e525",
                poolIndex: 0,
                addLpLink: "https://astar.exchange/exchange/add/ETH/0x5D1af739FD538D363Fd61a59d3CBb7B70784A3AC",
                token0: VAULT_TOKENS.ASX,
                token1: VAULT_TOKENS.WASTR_ASTAR_EXCHANGE,
                category: VAULT_CATEGORIES.NONE
            },
            {
                name: "ASTR-USDC",
                lpAddress: "0xA6E7448463dF706862E424208838047D8Aa0ED11",
                vaultAddress: "0x93FFb578A9Da5900f439eE171F07A72aCf55ec09",
                poolIndex: 2,
                addLpLink: "https://astar.exchange/exchange/add/ETH/0x5D1af739FD538D363Fd61a59d3CBb7B70784A3AC",
                token0: VAULT_TOKENS.WASTR_ASTAR_EXCHANGE,
                token1: VAULT_TOKENS.USDC,
                category: VAULT_CATEGORIES.NONE
            },
            {
                name: "USDT-USDC",
                lpAddress: "0x8c82b3F5b14fcFA60B5D10CB0551B7C81FBc97e6",
                vaultAddress: "0x28D9D1d2eaa6763279758697c6b57300403559dB",
                poolIndex: 3,
                addLpLink: "https://astar.exchange/exchange/add/ETH/0x5D1af739FD538D363Fd61a59d3CBb7B70784A3AC",
                token0: VAULT_TOKENS.USDT,
                token1: VAULT_TOKENS.USDC,
                category: VAULT_CATEGORIES.STABLE
            },
            {
                name: "BUSD-USDC",
                lpAddress: "0x1e82d43Cad0F487f6b5ae5BA9Ce5ee64Ff762319",
                vaultAddress: "0x0E50Ca9a884AAB747c8Bd69ccad981F1cA3b5AFb",
                poolIndex: 4,
                addLpLink: "https://astar.exchange/exchange/add/ETH/0x5D1af739FD538D363Fd61a59d3CBb7B70784A3AC",
                token0: VAULT_TOKENS.BUSD,
                token1: VAULT_TOKENS.USDC,
                category: VAULT_CATEGORIES.STABLE
            },
            {
                name: "DAI-USDC",
                lpAddress: "0xfAfDB9e0Bb8516C18451583f7107C083eaC0D645",
                vaultAddress: "0x1BEC05413c41d67F7de1AF61Cfb4CC86d3eFf42C",
                poolIndex: 5,
                addLpLink: "https://astar.exchange/exchange/add/ETH/0x5D1af739FD538D363Fd61a59d3CBb7B70784A3AC",
                token0: VAULT_TOKENS.DAI,
                token1: VAULT_TOKENS.USDC,
                category: VAULT_CATEGORIES.STABLE
            },
            {
                name: "WSDN-ASTR",
                lpAddress: "0x7C248996BE5502A64d55374c31bd1a164B95bf46",
                vaultAddress: "0xBd08Cc5b5991DfcEAC16fA4a00Fb67eAd565f501",
                poolIndex: 6,
                addLpLink: "https://astar.exchange/exchange/add/ETH/0x5D1af739FD538D363Fd61a59d3CBb7B70784A3AC",
                token0: VAULT_TOKENS.WSDN,
                token1: VAULT_TOKENS.WASTR_ASTAR_EXCHANGE,
                category: VAULT_CATEGORIES.NONE
            },
            {
                name: "WETH-ASTR",
                lpAddress: "0x7f5F1200678e07D7Bbaee18a224F1231a1b1dae2",
                vaultAddress: "0xcCa7227d024b71616597ad84714C80Ba24f6B458",
                poolIndex: 7,
                addLpLink: "https://astar.exchange/exchange/add/ETH/0x5D1af739FD538D363Fd61a59d3CBb7B70784A3AC",
                token0: VAULT_TOKENS.WETH,
                token1: VAULT_TOKENS.WASTR_ASTAR_EXCHANGE,
                category: VAULT_CATEGORIES.NONE
            },
            {
                name: "MATIC-ASTR",
                lpAddress: "0x66Aa03C32ABcdCc498B77BC540BBBa4371887CAd",
                vaultAddress: "0x114c82d70b706846A23a4DB7A5dE79bb9bD112E8",
                poolIndex: 8,
                addLpLink: "https://astar.exchange/exchange/add/ETH/0x5D1af739FD538D363Fd61a59d3CBb7B70784A3AC",
                token0: VAULT_TOKENS.MATIC,
                token1: VAULT_TOKENS.WASTR_ASTAR_EXCHANGE,
                category: VAULT_CATEGORIES.NONE
            },
            {
                name: "BNB-ASTR",
                lpAddress: "0xD74F3e08b702556f6f43B08102c0171B3D879248",
                vaultAddress: "0x63f7Fc2Cb312977ED8394935882D93e87f8CAf28",
                poolIndex: 9,
                addLpLink: "https://astar.exchange/exchange/add/ETH/0x5D1af739FD538D363Fd61a59d3CBb7B70784A3AC",
                token0: VAULT_TOKENS.BNB,
                token1: VAULT_TOKENS.WASTR_ASTAR_EXCHANGE,
                category: VAULT_CATEGORIES.NONE
            },
            {
                name: "JPYC-USDC",
                lpAddress: "0x7b1E118Dff374994D483758Dac72178eE239f786",
                vaultAddress: "0xbA59047a04d5886A45A186DE21d29471790a4A41",
                poolIndex: 10,
                addLpLink: "https://astar.exchange/exchange/add/ETH/0x5D1af739FD538D363Fd61a59d3CBb7B70784A3AC",
                token0: VAULT_TOKENS.JPYC,
                token1: VAULT_TOKENS.USDC,
                category: VAULT_CATEGORIES.NONE
            },
            {
                name: "BAI-USDC",
                lpAddress: "0xc6526305D08AfA882b497C9c660b778770b80e78",
                vaultAddress: "0x3eB2969891389b729eb8E658742f3AbeaC633b99",
                poolIndex: 11,
                addLpLink: "https://astar.exchange/exchange/add/ETH/0x5D1af739FD538D363Fd61a59d3CBb7B70784A3AC",
                token0: VAULT_TOKENS.BAI,
                token1: VAULT_TOKENS.USDC,
                category: VAULT_CATEGORIES.NONE
            },
        ]
    },
    {
        name: "Starlay Finance",
        logo: <img src={astarexchange} width='12'/>,

        description: "Starlay.",
        website: "https://astar.exchange/exchange/swap",
        telegram: null,
        twitter: "https://twitter.com/AstarExchange",
        buyLink: "https://astar.exchange/exchange/swap",

        lending: true,

        rewardTokenAddress: "0xc4335B1b76fA6d52877b3046ECA68F6E708a27dd",
        vaults: [
            {
                name: "USDC",
                lpAddress: "0xC404E12D3466acCB625c67dbAb2E1a8a457DEf3c",
                vaultAddress: "0x67958bD44f5CD42F3d388141fCBC50b852cAb2f1",
                token0: VAULT_TOKENS.USDC,
                category: VAULT_CATEGORIES.BLUE_CHIPS
            },
            {
                name: "WASTR",
                lpAddress: "0xAeaaf0e2c81Af264101B9129C00F4440cCF0F720",
                vaultAddress: "0x182F356e4Be1268083Fc8edBA4AE11dDDEd96213",
                token0: VAULT_TOKENS.WASTR_PANDORA,
                category: VAULT_CATEGORIES.BLUE_CHIPS
            },
            {
                name: "DOT",
                lpAddress: "0xFFfFfFffFFfffFFfFFfFFFFFffFFFffffFfFFFfF",
                vaultAddress: "0x84e3B5eB278818631f3B932892818d9B5a4ef29B",
                token0: VAULT_TOKENS.DOT,
                category: VAULT_CATEGORIES.BLUE_CHIPS
            },

            {
                name: "DAI",
                lpAddress: "0x6De33698e9e9b787e09d3Bd7771ef63557E148bb",
                vaultAddress: "0x9fbc1563ccBe71fE2d06F4e4609dCe6F46CAC4f2",
                token0: VAULT_TOKENS.DAI,
                category: VAULT_CATEGORIES.BLUE_CHIPS
            },

            {
                name: "USDT",
                lpAddress: "0x3795C36e7D12A8c252A20C5a7B455f7c57b60283",
                vaultAddress: "0x0B7812442b25Fef8A203425866b10B29CD2cdA24",
                token0: VAULT_TOKENS.USDT,
                category: VAULT_CATEGORIES.BLUE_CHIPS
            },

            {
                name: "BUSD",
                lpAddress: "0x4Bf769b05E832FCdc9053fFFBC78Ca889aCb5E1E",
                vaultAddress: "0x66d71AcB10bd46d50ef999872c40954aD67f53A5",
                token0: VAULT_TOKENS.BUSD,
                category: VAULT_CATEGORIES.BLUE_CHIPS
            },

            {
                name: "WETH",
                lpAddress: "0x81ECac0D6Be0550A00FF064a4f9dd2400585FE9c",
                vaultAddress: "0x368Aa418674980e1A2abB9AC339A6bB213c8b70a",
                token0: VAULT_TOKENS.WETH,
                category: VAULT_CATEGORIES.BLUE_CHIPS
            },
            {
                name: "WBTC",
                lpAddress: "0xad543f18cFf85c77E140E3E5E3c3392f6Ba9d5CA",
                vaultAddress: "0x28a80eADCE6BDd87E80c9d4cdCA6CBe2E61aa9b4",
                token0: VAULT_TOKENS.WBTC,
                category: VAULT_CATEGORIES.BLUE_CHIPS
            },

            {
                name: "MATIC",
                lpAddress: "0xdd90E5E87A2081Dcf0391920868eBc2FFB81a1aF",
                vaultAddress: "0x72F6217959210E7bBf983a2ac81D39082D69CC45",
                token0: VAULT_TOKENS.MATIC,
                category: VAULT_CATEGORIES.BLUE_CHIPS
            },

            {
                name: "BNB",
                lpAddress: "0x7f27352D5F83Db87a5A3E00f4B07Cc2138D8ee52",
                vaultAddress: "0x24722435Bc98da4fa93Bb3D1622354dB31156FFD",
                token0: VAULT_TOKENS.BNB,
                category: VAULT_CATEGORIES.BLUE_CHIPS
            },

            {
                name: "SDN",
                lpAddress: "0x75364D4F779d0Bd0facD9a218c67f87dD9Aff3b4",
                vaultAddress: "0xBf211cc71EEBcE46117B25b47A0C30c7aE855fbC",
                token0: VAULT_TOKENS.WSDN,
                category: VAULT_CATEGORIES.BLUE_CHIPS
            },

        ]
    }

    // TODO: new vaults coming soon.
]