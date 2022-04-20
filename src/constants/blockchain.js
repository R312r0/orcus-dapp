import {InjectedConnector} from "@web3-react/injected-connector";
import USDCIcon from "../assets/icons/USDCIcon";
import LogoIcon from "../assets/icons/LogoIcon";
import OUSDIcon from "../assets/icons/OUSDIcon";



export const MetaMask = new InjectedConnector({
    supportedChainIds: [31337]
});

export const JSON_RPC_URL = "http://127.0.0.1:8545/";
export const MAX_INT = "115792089237316195423570985008687907853269984665640564039457584007913129639935";

export const CONTRACT_ADDRESSES = {
    ORU: "0x26B862f640357268Bd2d9E95bc81553a2Aa81D7E",
    OUSD: "0x70bDA08DBe07363968e9EE53d899dFE48560605B",
    WASTR: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    USDC: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",

    BANK: "0xefAB0Beb0A557E452b398035eA964948c750b2Fd",
    BANK_SAFE: "0x12Bcb546bC60fF39F1Adfc7cE4605d5Bd6a6A876",
    ORU_STAKE: "0xaC9fCBA56E42d5960f813B9D0387F3D3bC003338",
    PRICE_ORACLE: "0xC66AB83418C20A65C3f8e83B3d11c8C3a6097b6F",
    OUSD_USDC_ORACLE: "0x5133BBdfCCa3Eb4F739D599ee4eC45cBCD0E16c5",
    MASTER_CHEF: "0x38A70c040CA5F5439ad52d0e821063b0EC0B52b6",

    ORU_USDC: "0x0D02dFE1E662FbB70255D61b85ABE267D0179ee8",
    OUSD_USDC: "0x8C6d6Ec1B320f38D4cd58Cac30562A35DA0F1EE6",
    OUSD_ORU: "0xFDE778403B6F6f849FaF43Ff71386362bd815fF7",

    ROUTER: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"
}

export const ORU_PER_BLOCK = 0.01;

export const MASTER_CHEF_POOLS = [
    {name: "ORU/USDC", address: "0x0D02dFE1E662FbB70255D61b85ABE267D0179ee8", token0Icon: <LogoIcon/>, token1Icon: <USDCIcon/>},
    {name: "oUSD/USDC", address: "0x8C6d6Ec1B320f38D4cd58Cac30562A35DA0F1EE6", token0Icon: <OUSDIcon/>, token1Icon: <USDCIcon/>},
    {name: "oUSD/ORU", address: "0x318d0540aec0709dDDD67480eFAC0EeF217Dfcf0", token0Icon: <OUSDIcon/>, token1Icon: <LogoIcon/>},
]

//     ===========STARTING DEPLOYMENT===============
// Deployer: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
// Network: test
// ASTR Available: 10000
// ===========================
// Deploying Bank(Not initialised!)...
// Bank deployed: 0xefAB0Beb0A557E452b398035eA964948c750b2Fd
// ===========================
// ===========================
// Deploying Treasury...
// Treasury deployed: 0xaca81583840B1bf2dDF6CDe824ada250C1936B4D
// ===========================
// ===========================
// Deploying oUSD...
// oUSD deployed: 0x70bDA08DBe07363968e9EE53d899dFE48560605B
// Deploying ORU...
// ORU deployed: 0x26B862f640357268Bd2d9E95bc81553a2Aa81D7E
// Adding Bank as a ORU burner...
// Bank was added as one of burners
// ===========================
// ===========================
// Depositing ASTR to get WASTR
// Impersonating account 0x2666dfd146b1d9ab094ad32bb276826bcf15dc30
// Sending 3405805.709009 USDC to 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
// USDC was sent successfully!
//     Approve USDC to ROUTER success!
//     Approve WASTR to ROUTER success!
//     Approve oUSD to ROUTER success!
//     Approve ORU to ROUTER success!
//     Creating pair USDC/oUSD 1 to 1...
// Pair USDC/oUSD was created successfully 0x8C6d6Ec1B320f38D4cd58Cac30562A35DA0F1EE6
// Creating pair USDC/ORU 1 / 4...
// Pair USDC/ORU was created successfully 0x0D02dFE1E662FbB70255D61b85ABE267D0179ee8
// Creating pair WASTR/ORU 1 / 1(low liquidity)...
// Pair WASTR/ORU was created successfully 0x318d0540aec0709dDDD67480eFAC0EeF217Dfcf0
// Creating pair oUSD/ORU 1 / 4...
// Pair oUSD/ORUU was created successfully 0x318d0540aec0709dDDD67480eFAC0EeF217Dfcf0
// ===========================
// ===========================
// Deploying ORU/USDC TWAP Oracle...
// ORU/USDC TWAP Oracle deployed: 0x1780bCf4103D3F501463AD3414c7f4b654bb7aFd
// Deploying oUSD/USDC TWAP Oracle...
// oUSD/USDC TWAP Oracle deployed: 0x5133BBdfCCa3Eb4F739D599ee4eC45cBCD0E16c5
// Updating 2 Oracles...
// Oracles updated!
//     Deploying PriceOracle...
// PriceOracle deployed: 0xC66AB83418C20A65C3f8e83B3d11c8C3a6097b6F
// ===========================
// ===========================
// Deploying ProfitController...
// ProfitController deployed: 0xeF31027350Be2c7439C1b0BE022d49421488b72C
// ===========================
// ===========================
// Deploying BankSafe...
// BankSafe deployed: 0x12Bcb546bC60fF39F1Adfc7cE4605d5Bd6a6A876
// ===========================
// ===========================
// Deploying SwapController...
// SwapController deployed: 0xaC47e91215fb80462139756f43438402998E4A3a
// ===========================
// ===========================
// Deploying Dustbin...
// Dustbin deployed: 0x9BcC604D4381C5b0Ad12Ff3Bf32bEdE063416BC7
// ===========================
// ===========================
// Deploying Arbitrager...
// Arbitrager deployed: 0x63fea6E447F120B8Faf85B53cdaD8348e645D80E
// ===========================
// ===========================
// Init Bank...
// Bank initialised successfully
// ===========================
// ===========================
// Deploying OruStake...
// OruStake deployed: 0xaC9fCBA56E42d5960f813B9D0387F3D3bC003338
// ===========================
// ===========================
// Deploying farm...
// Farm deployed at 0x38A70c040CA5F5439ad52d0e821063b0EC0B52b6
// Adding ORU/USDC lp pool...
// Adding oUSD/USDC lp pool...
// Adding oUSD/ORU lp pool...
// All pools was added!
// ===========================

