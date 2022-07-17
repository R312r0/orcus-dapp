import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import React, {useEffect} from 'react';

import ArrowDownIcon from '../../../assets/icons/ArrowDownIcon';
import BoldPlusIcon from '../../../assets/icons/BoldPlusIcon';
import ClipboardIcon from '../../../assets/icons/ClipboardIcon';
import CollectRedemtionIcon from '../../../assets/icons/CollectRedemtionIcon';
import HelpCircleIcon from '../../../assets/icons/HelpCircleIcon';
import LogoIconBlack from '../../../assets/icons/LogoIconBlack';
import OUSDIcon from '../../../assets/icons/OUSDIcon';
import USDCIcon from '../../../assets/icons/USDCIcon';
import {
  Divider,
  HDiv,
  HDivider,
  IconWrapper,
  Option,
  OptionsWrapper,
  RedeemBlockWrapper,
  RedeemBtn,
  RedeemDataText,
  RedeemDataWrapper,
  RedeemInputWrapper,
  RedemtionBtn,
  RedemtionWrapper,
  CustomSpan,
  Select,
  Text,
} from './styled';
import {useWeb3React} from "@web3-react/core";
import {useBlockChainContext} from "../../../context/blockchain-context";
import {formattedNum, formatToDecimal} from "../../../utils";
import {CONTRACT_ADDRESSES, MAX_INT} from "../../../constants";

const Redeem = ({bankData}) => {

  const {account} = useWeb3React();
  const {contracts, connectWallet, signer} = useBlockChainContext();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [redeemInfo, setRedeemInfo] = React.useState(null);
  const [userInfo, setUserInfo] = React.useState(null);

  const [collateralBalance, setCollateralBalance] = React.useState(null);

  const [stalbeInput, setStableInput] = React.useState('');
  const [collatOutput, setCollatOutput] = React.useState(0);
  const [shareOutput, setShareOutput] = React.useState(0);

  useEffect(() => {

    if (contracts) {
      getCollateralBalance();
    }

  }, [contracts])

  useEffect(() => {

    if (bankData) {
      setRedeemInfo({collatPrice: 1, sharePrice: bankData.oruPrice, stablePrice: bankData.ousdPrice, tcr: bankData.tcr, ecr: bankData.ecr})
    }
  }, [bankData]);

  useEffect(() => {

    if (account) {
      getUserInfo();
    }

  }, [account])


  const getCollateralBalance = async () => {
    const {USDC, IUSDC, BANK_SAFE} = contracts;

    const bal = (+(await USDC.balanceOf(BANK_SAFE.address)) / 1e6) + (+(await IUSDC.balanceOf(BANK_SAFE.address)) / 1e6);

    setCollateralBalance(bal);
  }

  const getUserInfo = async () => {

      const {BANK, OUSD, ORU, USDC} = contracts;


      const balances = {
        ousdBalance : +(await OUSD.balanceOf(account)) / 1e18,
        usdcBalance : +(await USDC.balanceOf(account)) / 1e6,
        oruBalance : +(await ORU.balanceOf(account)) / 1e18
      }

      const ousdAllowance = await OUSD.allowance(account, CONTRACT_ADDRESSES.BANK) > 0;

      const claims = {
        collat: +(await BANK.redeemCollatBal(account)) / 1e6,
        share: +(await BANK.redeemOruBal(account)) / 1e18
      }

      setUserInfo({
        balances,
        ousdAllowance,
        claims
      })
  }

  const handleStableInput = (value) => {

      const ousdToRedeem = +value - (+value * 0.004);
      let collatOut = ousdToRedeem / redeemInfo.collatPrice;
      const shareOut = (ousdToRedeem - (ousdToRedeem * (redeemInfo.ecr))) / redeemInfo.sharePrice
      collatOut *= redeemInfo.ecr

      setStableInput(+value);
      setCollatOutput(collatOut);
      setShareOutput(shareOut);

  }

  const redeem = async () => {
      try {
        const tx = await contracts.BANK.connect(signer).redeem(formatToDecimal(stalbeInput, 18), 0, 0);
        await tx.wait();
        await getUserInfo();
      }
      catch (e) {
        console.error(e.message);
      }
  }

  const collect = async () => {
    try {
      const tx = await contracts.BANK.connect(signer).collect();
      await tx.wait();
      await getUserInfo();
    }
    catch (e) {
      console.error(e.message);
    }
  }

  const approve = async () => {
      try {
        const tx = await contracts.OUSD.connect(signer).approve(CONTRACT_ADDRESSES.BANK, MAX_INT)
        await tx.wait()
        await getUserInfo();
      }
      catch (e) {
        console.error(e.message);
      }
  };

  const RedeemButton = () => {

      if (account && userInfo) {
          if (!userInfo.ousdAllowance) {
              return <RedeemBtn onClick={() => approve()}> Approve oUSD</RedeemBtn>
          }
          else if (userInfo.balances.ousdBalance < stalbeInput) {
            return <RedeemBtn disabled={true}> Insufficient oUSD balance</RedeemBtn>
          }

          else {
            return <RedeemBtn onClick={() => redeem()} > Redeem </RedeemBtn>
          }

      }
      else {
        return <RedeemBtn onClick={() => connectWallet()}>Connect Wallet</RedeemBtn>

      }

  }

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const isMobileScreen = ( ) => {
    let query = window.matchMedia('(max-device-width: 480px)')
    return query.matches
  }
  return (
    <>
      <RedeemBlockWrapper>
        <HDiv>
          <Text>Input</Text>
          <Text>Balance: {userInfo ? formattedNum(userInfo.balances.ousdBalance) : 0}</Text>
        </HDiv>
        <RedeemInputWrapper withSelect>
          <input type='text' placeholder='0.0' value={stalbeInput} onChange={(e) => handleStableInput(e.target.value)} disabled={!userInfo?.ousdAllowance} />
          <button onClick={() => handleStableInput(userInfo?.balances.ousdBalance)} >Max</button>
          <Divider />
          <IconWrapper margin='0 0.833vw' fill='#000'>
            <OUSDIcon />
          </IconWrapper>
          oUSD
        </RedeemInputWrapper>
        <IconWrapper margin={ isMobileScreen() ? '16px 0 0 0' :'1.667vw 0 0 0'}>
          <BoldPlusIcon />
        </IconWrapper>
        <HDiv>
          <Text>ECR {redeemInfo ? bankData.ecr * 100 : 0}% </Text>
          <Text>Balance: {userInfo ? formattedNum(userInfo.balances.usdcBalance) : 0}</Text>
        </HDiv>
        <RedeemInputWrapper>
          <input type='text' placeholder='0' value={collatOutput} disabled={true}/>
          <IconWrapper margin='0 0.833vw' fill='#000'>
            <USDCIcon />
          </IconWrapper>
          USDC
        </RedeemInputWrapper>
        <IconWrapper margin={ isMobileScreen() ? '16px 0 0 0' :'1.667vw 0 0 0'} stroke='none'>
          <ArrowDownIcon />
        </IconWrapper>
        <HDiv>
          <Text>Output ORU {redeemInfo ? 100 - (bankData.ecr * 100) : 0}%</Text>
          <Text>Balance: {userInfo ? formattedNum(userInfo.balances.oruBalance) : 0}</Text>
        </HDiv>
        <RedeemInputWrapper>
          <input type='text' placeholder='0' value={shareOutput} disabled={true} />
          <IconWrapper margin='0 0.833vw' fill='#000'>
            <LogoIconBlack />
          </IconWrapper>
          ORU
        </RedeemInputWrapper>
        <RedeemButton/>
      </RedeemBlockWrapper>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <RedeemDataWrapper>
          <div style={{ display: 'flex', alignItems: 'center' ,gap: '4px'}}>
          <ClipboardIcon ratio={ isMobileScreen() ? '5vw' : undefined} color='#000' />
            <CustomSpan
              
            >
              Data
            </CustomSpan>
          </div>
          <HDivider margin='1.875vw 0 0.77vw 0' />
          <HDiv h='50px'>
            <RedeemDataText>Redemtion fee</RedeemDataText>
            <RedeemDataText bfw='500'>
              <b>0.4%</b>
            </RedeemDataText>
          </HDiv>
          <HDivider margin='0.938vw 0 0.781vw 0' />
          <HDiv h='50px'>
            <RedeemDataText>Slippage</RedeemDataText>
            <RedeemDataText bfw='500'>
              <b>0.50%</b>
            </RedeemDataText>
          </HDiv>
          <HDivider margin='0.781vw 0 0.938vw  0' />
          <HDiv h='50px'>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <RedeemDataText mr='0.339vw'>Collateral balance</RedeemDataText>
              <HelpCircleIcon />
            </div>
            <div style={{ display: 'inherit', alignItems: 'inherit' }}>
              <RedeemDataText bfw='500'>
                <b>{redeemInfo ? formattedNum(collateralBalance) : 0}</b>
              </RedeemDataText>
              <RedeemDataText ml='0.677vw'>USD</RedeemDataText>
            </div>
          </HDiv>
          <HDivider margin='0.781vw 0 0.938vw  0' />
          <HDiv h='50px'>
            <RedeemDataText>Rates</RedeemDataText>
            <div style={{ display: 'inherit', alignItems: 'inherit' }}>
              <RedeemDataText bfw='500'>
                <b>1&nbsp;</b>
              </RedeemDataText>
              <RedeemDataText>oUSD</RedeemDataText>
              <RedeemDataText bfw='500'>
                <b>&nbsp; = {redeemInfo ? redeemInfo.stablePrice : 0} </b>
              </RedeemDataText>
              <RedeemDataText>&nbsp;USDC</RedeemDataText>
            </div>
          </HDiv>
          <HDivider margin='0.781vw 0 0.938vw  0' />
          <HDiv h='50px'>
            <div />
            <div style={{ display: 'inherit', alignItems: 'inherit' }}>
              <RedeemDataText bfw='500'>
                <b>1&nbsp;</b>
              </RedeemDataText>
              <RedeemDataText>USDC</RedeemDataText>
              <RedeemDataText bfw='500'>
                <b>&nbsp; = {redeemInfo ? (redeemInfo.collatPrice / redeemInfo.stablePrice).toFixed(6) : 0} </b>
              </RedeemDataText>
              <RedeemDataText>&nbsp;oUSD</RedeemDataText>
            </div>
          </HDiv>
        </RedeemDataWrapper>
        <RedemtionWrapper>
          <HDiv >
            <div style={{ display: 'flex', alignItems: 'center' , gap: '4px'}}>
              <CollectRedemtionIcon ratio={ isMobileScreen() ? '5vw' : undefined}/>
              <CustomSpan>
                Collect redemtion
              </CustomSpan>
            </div>
            <RedemtionBtn disabled={userInfo?.claims.collat <= 0 || userInfo?.claims.share <= 0} onClick={() => collect()}>Collect</RedemtionBtn>
          </HDiv>
          <HDivider margin='1.87vw 0 0.781vw 0' />
          <HDiv>
            <RedeemDataText>
              <b>{userInfo ? userInfo.claims.collat : 0} USDC</b>
            </RedeemDataText>
            <RedeemDataText>
              <b>{userInfo ? userInfo.claims.share : 0} ORU</b>
            </RedeemDataText>
          </HDiv>
        </RedemtionWrapper>
      </div>
    </>
  );
};

export default Redeem;

const tokenList = [
  {
    name: 'USDC',
    icon: (
      <IconWrapper margin='0 1.042vw 0 1.250vw'>
        <USDCIcon />
      </IconWrapper>
    ),
  },
  {
    name: 'ORU',
    icon: (
      <IconWrapper fill='#000' margin='0 1.042vw 0 1.250vw'>
        <OUSDIcon />
      </IconWrapper>
    ),
  },
  {
    name: 'oUSD',
    icon: (
      <IconWrapper fill='#000' margin='0 1.042vw 0 1.250vw'>
        <LogoIconBlack />
      </IconWrapper>
    ),
  },
];
