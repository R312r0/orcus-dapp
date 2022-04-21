import {InjectedConnector} from "@web3-react/injected-connector";
import USDCIcon from "../assets/icons/USDCIcon";
import LogoIcon from "../assets/icons/LogoIcon";
import OUSDIcon from "../assets/icons/OUSDIcon";



export const MetaMask = new InjectedConnector({
    supportedChainIds: [31337, 592]
});

export const JSON_RPC_URL = "https://astar-api.bwarelabs.com/a43f0389-2bf7-44bc-905a-6922bfa3d87b";
export const MAX_INT = "115792089237316195423570985008687907853269984665640564039457584007913129639935";

export const CONTRACT_ADDRESSES = {
    ORU: "0x3d252F7D17BE50ad1f1Cc15797c4E9C91B4ad898",
    OUSD: "0xdCB9C0D98749103808341465919cDa5Ba3BE885C",
    WASTR: "0xAeaaf0e2c81Af264101B9129C00F4440cCF0F720",
    USDC: "0x6a2d262D56735DbA19Dd70682B39F6bE9a931D98",

    BANK: "0x96F75edB7c0d9b74283aAd5E9810c19C09fCF8C0",
    BANK_SAFE: "0xd411363A8114259990b8b4214ACd6466Fa085B9F",
    ORU_STAKE: "0x2D1BC391081BB8E81764f871C07D93cbfc0b3e09",
    PRICE_ORACLE: "0x9A5f1Ac9Cee4208c2cfFCc15F9E46B26AD385376",
    OUSD_USDC_ORACLE: "0x1cF0a17A0E8b2f1740DF5213Bbd100d46d56C461",
    MASTER_CHEF: "0x4E102af2791d134a6A564FEC34DEef8C4E914457",

    ORU_USDC: "0x50284A5569D9598a4a1c6f2047a6aC71082B8F86",
    OUSD_USDC: "0xCC7a22e7BfcC8b828597d1992c17f89726B3eEFd",
    OUSD_ORU: "0xcDb90d01BF0C8A95f88aacB8ad24A0445AEc0488",

    ROUTER: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"
}

// Pair USDC/oUSD was created successfully 0xCC7a22e7BfcC8b828597d1992c17f89726B3eEFd
// Creating pair USDC/ORU 1 / 4...
// Pair USDC/ORU was created successfully 0x50284A5569D9598a4a1c6f2047a6aC71082B8F86
// Creating pair WASTR/ORU 1 / 1(low liquidity)...
// Pair WASTR/ORU was created successfully 0xe2e37a3968d8A4cb55c285786061b401054dA7D5
// Creating pair oUSD/ORU 1 / 4...
// Pair oUSD/ORUU was created successfully 0xcDb90d01BF0C8A95f88aacB8ad24A0445AEc0488

//
//     ===========STARTING DEPLOYMENT===============
// Deployer: 0xeB5C8F43D5969E14df37B69fCb1139a08b393Cbd
// Network: astar
// ASTR Available: 7.912268584999
// ===========================
// Deploying Bank(Not initialised!)...
// Bank deployed: 0x96F75edB7c0d9b74283aAd5E9810c19C09fCF8C0
// ===========================
// ===========================
// Deploying Treasury...
// Treasury deployed: 0xD84db96c19AA9823C79fD7770d1923933F180C2b
// ===========================
// ===========================
// Deploying oUSD...
// oUSD deployed: 0xdCB9C0D98749103808341465919cDa5Ba3BE885C
// Deploying ORU...
// ORU deployed: 0x3d252F7D17BE50ad1f1Cc15797c4E9C91B4ad898
// Adding Bank as a ORU burner...
// Bank was added as one of burners
// ===========================
// ===========================
// Depositing ASTR to get WASTR
// Approve oUSD to ROUTER success!
//     Approve ORU to ROUTER success!
//     Approve USDC to ROUTER success!
//     Approve WASTR to ROUTER success!
//     Creating pair USDC/oUSD 1 to 1...
// Pair USDC/oUSD was created successfully 0xCC7a22e7BfcC8b828597d1992c17f89726B3eEFd
// Creating pair USDC/ORU 1 / 4...
// Pair USDC/ORU was created successfully 0x50284A5569D9598a4a1c6f2047a6aC71082B8F86
// Creating pair WASTR/ORU 1 / 1(low liquidity)...
// Pair WASTR/ORU was created successfully 0xe2e37a3968d8A4cb55c285786061b401054dA7D5
// Creating pair oUSD/ORU 1 / 4...
// Pair oUSD/ORUU was created successfully 0xcDb90d01BF0C8A95f88aacB8ad24A0445AEc0488
// ===========================
// ===========================
// Deploying ORU/USDC TWAP Oracle...
// ORU/USDC TWAP Oracle deployed: 0x282cE8664afcb8a07AB07e316457B2a181015062
// Deploying oUSD/USDC TWAP Oracle...
// oUSD/USDC TWAP Oracle deployed: 0x1cF0a17A0E8b2f1740DF5213Bbd100d46d56C461
// Updating 2 Oracles...
// Oracles updated!
//     Deploying PriceOracle...
// PriceOracle deployed: 0x9A5f1Ac9Cee4208c2cfFCc15F9E46B26AD385376
// ===========================
// ===========================
// Deploying ProfitController...
// ProfitController deployed: 0xd2F8Ca8EA79e503db5D4041A974DF1fd790E2eDc
// ===========================
// ===========================
// Deploying BankSafe...
// BankSafe deployed: 0xd411363A8114259990b8b4214ACd6466Fa085B9F
// ===========================
// ===========================
// Deploying SwapController...
// SwapController deployed: 0xBddAd88Dfd360c2C95918a56B486c06F9b0765E9
// ===========================
// ===========================
// Deploying Dustbin...
// Dustbin deployed: 0xfa03A5AaD6a6f3E809Df182b3E94FdfD09450746
// ===========================
// ===========================
// Deploying Arbitrager...
// Arbitrager deployed: 0x076b26458f57C89acaFF63674D7196f71b3BeBc8
// ===========================
// ===========================
// Init Bank...
// Bank initialised successfully
// ===========================
// ===========================
// Deploying OruStake...
// OruStake deployed: 0x2D1BC391081BB8E81764f871C07D93cbfc0b3e09
// ===========================
// ===========================
// Deploying farm...
// Farm deployed at 0x4E102af2791d134a6A564FEC34DEef8C4E914457
// Adding ORU/USDC lp pool...
// Adding oUSD/USDC lp pool...
// Adding oUSD/ORU lp pool...
// All pools was added!
//     Setting ORU per second (0.01)...
// Oru per second set!
//     Updating all pools...
// ===========================

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

