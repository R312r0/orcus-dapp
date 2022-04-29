import React, {useEffect, useState} from 'react';

import ArrowDownIcon from '../../assets/icons/ArrowDownIcon';
import HelpCircleIcon from '../../assets/icons/HelpCircleIcon'
import ClipboardIcon from '../../assets/icons/ClipboardIcon';
import LogoIconBlack from '../../assets/icons/LogoIconBlack';
import USDCIcon from '../../assets/icons/USDCIcon';
import { RecollateralizeWrapper,
  HeadingText, StakingWrapper,Divider, TabWrapper,
  HDiv,
  HDivider,
  IconWrapper,
  Text,
  RecollateralizeBlockWrapper,
  RecollateralizeBtn,
  RecollateralizeDataText,
  RecollateralizeDataWrapper,
  RecollateralizeInputWrapper,
}  from './styled';
import {useWeb3React} from "@web3-react/core";
import {useBlockChainContext} from "../../context/blockchain-context";
import {CONTRACT_ADDRESSES, MAX_INT} from "../../constants";
import {formattedNum, formatToDecimal} from "../../utils";
import {ethers} from "ethers";
import { CustomSpan } from '../Staking/stake/styled';


const Recollateralize = () => {

  const {account} = useWeb3React()
  const {contracts, signer, connectWallet} = useBlockChainContext();
  const [info, setInfo] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const [collatInput, setCollatInput] = useState(null);
  const [shareOutput, setShareOutput] = useState(null);

  useEffect(() => {

    if (contracts) {
      getInfo();
    }

  }, [contracts])

  useEffect(() => {

    if (signer) {
      getUserInfo();
    }

  }, [signer])

  const getInfo = async () => {

    const {BANK, BANK_SAFE, PRICE_ORACLE, USDC} = contracts;

    const recollat = await BANK.recollatAvailable();
    const tcr = +(await BANK.tcr()) / 1e6;
    const collateralBalance = +(await USDC.balanceOf(CONTRACT_ADDRESSES.BANK_SAFE)) / 1e6;
    const aTokenBalance = (+(await BANK_SAFE.balanceOfAToken())) / 1e6;

    const prices = {
      collatPrice: +(await PRICE_ORACLE.collatPrice()) / 1e6,
      sharePrice: +(await PRICE_ORACLE.oruPrice()) / 1e6,
    }

    setInfo({
      recollatAvailable: prices.sharePrice * (+recollat / 1e18),
      tcr,
      prices,
      poolBalance: collateralBalance + aTokenBalance,

    })

    console.log(+recollat / 1e18)
  }

  const isMobileScreen = ( ) => {
    let query = window.matchMedia('(max-device-width: 480px)')
    return query.matches
  }

  const handleCollatInput = async (value) => {
    // 0.005 bonus rate.

    // uint256 _oruOut = (_collatInE18 *
    //         _collatPrice *
    //         (RATIO_PRECISION + bonusRate)) /
    //     RATIO_PRECISION /
    //     _oruPrice;
    setCollatInput(value);
    setShareOutput((value * info.prices.collatPrice) / info.prices.sharePrice);

  }

  const getUserInfo = async () => {

    const {USDC, ORU} = contracts;
    const bal = +(await USDC.balanceOf(account)) / 1e6;
    const oruBal = +(await ORU.balanceOf(account)) / 1e18;
    const allowance = await USDC.allowance(account, CONTRACT_ADDRESSES.BANK) > 0;

    setUserInfo({
      bal,
      oruBal,
      allowance
    })

  }

  const handleRecollat = async () => {

      const {BANK} = contracts;

      try {
          const tx = await BANK.connect(signer).recollateralize(formatToDecimal(collatInput, 6), 0);
          // const tx = await BANK.connect(signer).update();
          await tx.wait()
          await getInfo();
          await getUserInfo();
      }
      catch (e) {
        console.log(e.message)
      }
  }

  const handleApprove = async () => {

    const {USDC} = contracts;

    try {
      const tx = await USDC.connect(signer).approve(CONTRACT_ADDRESSES.BANK, MAX_INT);
      await tx.wait();
      await getUserInfo();
    }

    catch (e) {
      console.log(e.message)
    }

  }

  const RecollatButton = () => {

    if (account && signer) {
      if (info?.recollatAvailable === 0) {
        return <RecollateralizeBtn disabled={true}>Recollaterize unavailable</RecollateralizeBtn>
      }
      else if (!userInfo?.allowance) {
        return <RecollateralizeBtn onClick={() => handleApprove()}>Approve USDC</RecollateralizeBtn>
      }

      else if (userInfo?.bal < collatInput) {
        return <RecollateralizeBtn disabled={true}>Insufficient USDC balance</RecollateralizeBtn>
      }

      else if (collatInput > info?.recollatAvailable) {
        return <RecollateralizeBtn onClick={() => handleRecollat()} disabled={false}>Insufficient recollat amount</RecollateralizeBtn>
      }

      else {
        return <RecollateralizeBtn onClick={() => handleRecollat()}>Recolaterize</RecollateralizeBtn>
      }
    }
    else {
      return <RecollateralizeBtn onClick={() => connectWallet()}>Connect Wallet</RecollateralizeBtn>

    }

  }

  

  return <RecollateralizeWrapper>
    <StakingWrapper>
      <HeadingText>Recollateralize</HeadingText>
      <TabWrapper>
      <RecollateralizeBlockWrapper>
        <HDiv mt='1.094vw'>
          <Text>Recollaterize available</Text>
          <Text>Balance:</Text>
        </HDiv>
        <HDiv mt='1.094vw'>
          <Text fontWeight='500'>{info ? formattedNum(info.recollatAvailable) : 0.000 } USDC</Text>
          <Text fontWeight='500'>{userInfo ? formattedNum(userInfo.bal) : 0} USDC</Text>
        </HDiv>
        <RecollateralizeInputWrapper withBtn>
          <input type='text' placeholder='0.0' value={collatInput} onChange={({target}) => handleCollatInput(target.value)}/>
          <button onClick={() => userInfo ? handleCollatInput(userInfo.bal) : null}>Max</button>
          <Divider />
          <IconWrapper 
          
          w={ isMobileScreen() ? '5vw' : undefined}
          h={ isMobileScreen() ? '5vw' : undefined} fill='#000' margin='0 0.833vw 0 0'>
            <USDCIcon  />
          </IconWrapper>
          USDC
        </RecollateralizeInputWrapper>
        <IconWrapper 
         w={ isMobileScreen() ? '5vw' : undefined}
         h={ isMobileScreen() ? '5vw' : undefined}
        margin='1.719vw 0 0 0'>
          <ArrowDownIcon />
        </IconWrapper>
        <HDiv>
          <Text>Receiving ORU</Text>
          <Text>Balance: {userInfo ? formattedNum(userInfo.oruBal) : 0}</Text>
        </HDiv>
        <RecollateralizeInputWrapper>
          <input type='text' value={shareOutput} disabled={true} />
          <IconWrapper  w={ isMobileScreen() ? '5vw' : undefined}
        h={ isMobileScreen() ? '5vw' : undefined} fill='#000' margin='0 0.833vw 0 0'>
            <LogoIconBlack />
          </IconWrapper>
          ORU
        </RecollateralizeInputWrapper>
        <RecollatButton/>
      </RecollateralizeBlockWrapper>

      <RecollateralizeDataWrapper>
        <div style={{ display: 'flex', alignItems: 'center' , gap: isMobileScreen() ? '4px' : ''}}>
          <ClipboardIcon ratio={ isMobileScreen() ? '5vw' : undefined}  color='#000' />
          <CustomSpan
          >
            Data
          </CustomSpan>
        </div>
        <HDivider margin='1.875vw 0 0.77vw 0' />
        <HDiv>
          <RecollateralizeDataText>Bonus Rate</RecollateralizeDataText>
          <RecollateralizeDataText>
            <b>0.005%</b>
          </RecollateralizeDataText>
        </HDiv>
        <HDivider margin='0.938vw 0 0.781vw 0' />
        <HDiv>
          <div style={{display: 'flex', alignItems: 'center'}}>
          <RecollateralizeDataText mr='0.339vw'>Collateral balance</RecollateralizeDataText>
          <HelpCircleIcon></HelpCircleIcon>
          </div>
          <div style={{ display: 'inherit', alignItems: 'inherit' }}>
            <RecollateralizeDataText>
              <b>&nbsp;{info ? formattedNum(info.poolBalance) : 0}&nbsp;</b>
            </RecollateralizeDataText>
            <RecollateralizeDataText>USD</RecollateralizeDataText>
          </div>
        </HDiv>
        <HDivider margin='0.781vw 0 0.938vw  0' />
        <HDiv>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <RecollateralizeDataText mr='0.339vw'>Slippage</RecollateralizeDataText>
          </div>
          <div style={{ display: 'inherit', alignItems: 'inherit' }}>
            <RecollateralizeDataText><b>0.50%</b></RecollateralizeDataText>
          </div>
        </HDiv>
        <HDivider margin='0.781vw 0 0.938vw  0' />
        <HDiv>
          <RecollateralizeDataText>Rates</RecollateralizeDataText>
          <div style={{ display: 'inherit', alignItems: 'inherit' }}>
            <RecollateralizeDataText>
              <b>1&nbsp;</b>
            </RecollateralizeDataText>
            <RecollateralizeDataText>USDC</RecollateralizeDataText>
            <RecollateralizeDataText>
              <b>&nbsp;= {info ? info.prices.collatPrice : 0}&nbsp;</b>
            </RecollateralizeDataText>
            <RecollateralizeDataText>USD</RecollateralizeDataText>
          </div>
        </HDiv>
        <HDivider margin='0.781vw 0 0.938vw  0' />
        <HDiv>
          <RecollateralizeDataText></RecollateralizeDataText>
          <div style={{ display: 'inherit', alignItems: 'inherit' }}>
            <RecollateralizeDataText>
              <b>1&nbsp;</b>
            </RecollateralizeDataText>
            <RecollateralizeDataText>ORU</RecollateralizeDataText>
            <RecollateralizeDataText>
              <b>&nbsp;= {info ? info.prices.sharePrice : 0}&nbsp;</b>
            </RecollateralizeDataText>
            <RecollateralizeDataText>USD</RecollateralizeDataText>
          </div>
        </HDiv>
      </RecollateralizeDataWrapper>
      </TabWrapper>

    </StakingWrapper>

  </RecollateralizeWrapper>;
};

export default Recollateralize;
