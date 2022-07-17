import {InjectedConnector} from "@web3-react/injected-connector";
import USDCIcon from "../assets/icons/USDCIcon";
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
import starlay from '../assets/icons/starlay.webp';
import arsw from '../assets/icons/arsw.png';
import kgl from '../assets/icons/kgl.svg';
import muuu from '../assets/icons/muuu.svg';
import nika from '../assets/icons/nika.png';

// Project logos
import pandoraProject from '../assets/icons/Pandora.png'
import arthswapLogo from '../assets/icons/ArthIcon.png';

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
    IUSDC: "0xc404e12d3466accb625c67dbab2e1a8a457def3c", // Check +

    BANK: "0x9F1629D7e349b8aa379DD09eC161E7d8242C2102", // Check +
    BANK_SAFE: "0xd89dEa2daC8Fb73F4107C2cbeA5Eb36dab511F64", // Check +
    ORU_STAKE: "0x243e038685209B9B68e0521bD5838C6C937d666A", // Check +
    PRICE_ORACLE: "0xd3f407b4c61b90abfdd55a6099327eb30c358e71", // Check +
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

export const PROJECT_LOGOS = {
    PANDORA: <img src={pandoraProject} width='12'/>,
    ASTAR_EXCHANGE: <img src={astarexchange} width='12'/>,
    STARLAY: <img src={starlay} width='12'/>,
    ARTHSWAP: <img src={arthswapLogo} width='12'/>
}

export const VAULT_TOKENS = {
    WASTR: {
        name: "WASTR",
        logo: <img src={wastr} style={{width: "2.344vw", height: "2.344vw"}}/>,
        mobileLogo:  <img src={wastr} style={{width: "5.344vw", height: "5.344vw"}}/>,
    },
    WETH: {
        name: "WETH",
        logo: <img src={weth} style={{width: "2.344vw", height: "2.344vw"}}/>,
        mobileLogo:  <img src={weth} style={{width: "5.344vw", height: "5.344vw"}}/>,
    },
    MATIC: {
        name: "MATIC",
        logo: <img src={matic} style={{width: "2.344vw", height: "2.344vw"}}/>,
        mobileLogo:  <img src={matic} style={{width: "5.344vw", height: "5.344vw"}}/>,
    },
    BNB: {
        name: "BNB",
        logo: <img src={bnb} style={{width: "2.344vw", height: "2.344vw"}}/>,
        mobileLogo:  <img src={bnb} style={{width: "5.344vw", height: "5.344vw"}}/>,
    },
    WBTC: {
        name: "WBTC",
        logo: <img src={wbtc} style={{width: "2.344vw", height: "2.344vw"}}/>,
        mobileLogo:  <img src={wbtc} style={{width: "5.344vw", height: "5.344vw"}}/>,
    },
    WSDN: {
        name: "WSDN",
        logo: <img src={sdn} style={{width: "2.344vw", height: "2.344vw"}}/>,
        mobileLogo:  <img src={sdn} style={{width: "5.344vw", height: "5.344vw"}}/>,
    },
    USDC: {
        name: "USDC",
        logo: <USDCIcon/>,
        mobileLogo: <USDCIcon ratio='5vw'/>
    },
    USDT: {
        name: "USDT",
        logo: <img src={usdt} style={{width: "2.344vw", height: "2.344vw"}}/>,
        mobileLogo: <img src={usdt} style={{width: "5.344vw", height: "5.344vw"}}/>
    },
    DAI: {
        name: "DAI",
        logo: <img src={dai} style={{width: "2.344vw", height: "2.344vw"}}/>,
        mobileLogo:  <img src={dai} style={{width: "5.344vw", height: "5.344vw"}}/>,
    },
    BUSD: {
        name: "BUSD",
        logo: <BUSDIcon/>,
        mobileLogo:  <BUSDIcon ratio={"5vw"}/>,
    },
    JPYC: {
        name: "JPYC",
        logo: <img src={jpyc} style={{width: "2.344vw", height: "2.344vw"}}/>,
        mobileLogo:  <img src={jpyc} style={{width: "5.344vw", height: "5.344vw"}}/>,
    },
    BAI: {
        name: "BAI",
        logo: <img src={bai} style={{width: "2.344vw", height: "2.344vw"}}/>,
        mobileLogo:  <img src={bai} style={{width: "5.344vw", height: "5.344vw"}}/>,
    },
    DOT: {
        name: "DOT",
        logo: <img src={jpyc} style={{width: "2.344vw", height: "2.344vw"}}/>,
        mobileLogo:  <img src={jpyc} style={{width: "5.344vw", height: "5.344vw"}}/>,
    },
    // Projects token
    PANDORA: {
        name: "PANDORA",
        logo: <img src={pandora} style={{width: "2.344vw", height: "2.344vw"}}/>,
        mobileLogo:  <img src={pandora} style={{width: "5.344vw", height: "5.344vw"}}/>,
    },
    ASX: {
        name: "ASX",
        logo: <img src={asx} style={{width: "2.344vw", height: "2.344vw"}}/>,
        mobileLogo: <img src={asx} style={{width: "5.344vw", height: "5.344vw"}}/>
    },
    ARSW: {
        name: "ARSW",
        logo: <img src={arsw} style={{width: "2.344vw", height: "2.344vw"}}/>,
        mobileLogo: <img src={arsw} style={{width: "5.344vw", height: "5.344vw"}}/>
    },
    NIKA: {
        name: "NIKA",
        logo: <img src={nika} style={{width: "2.344vw", height: "2.344vw"}}/>,
        mobileLogo: <img src={nika} style={{width: "5.344vw", height: "5.344vw"}}/>
    },
    MUUU: {
        name: "MUUU",
        logo: <img src={muuu} style={{width: "2.344vw", height: "2.344vw"}}/>,
        mobileLogo: <img src={muuu} style={{width: "5.344vw", height: "5.344vw"}}/>
    },
    ORU: {
        name: "ORU",
        logo: <ORUIcon/>,
        mobileLogo: <ORUIcon ratio={"5vw"}/>
    },
    oUSD: {
        name: "OUSD",
        logo: <OUSDIcon/>,
        mobileLogo: <OUSDIcon ratio={"5vw"}/>
    },
    KGL: {
        name: "KGL",
        logo: <img src={kgl} style={{width: "2.344vw", height: "2.344vw"}}/>,
        mobileLogo: <img src={kgl} style={{width: "5.344vw", height: "5.344vw"}}/>
    },
    LAY: {
        name: "LAY",
        logo: <img src={starlay} style={{width: "2.344vw", height: "2.344vw"}}/>,
        mobileLogo: <img src={starlay} style={{width: "5.344vw", height: "5.344vw"}}/>
    }
}