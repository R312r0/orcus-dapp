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
import { CustomSpan } from '../Staking/stake/styled';
import axios from "axios";


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

    const QUERY = JSON.stringify({
      query: `
        query mainData {
                oruById(id: "1") {
                    price
                    totalSupply
                }
                bankById(id: "1") {
                  tcr
                }
        }`,
      variables: {}
    });

    const URL = {
      method: 'post',
      url: 'https://app.gc.subsquid.io/beta/orcus-final-squid/v0/graphql',
      headers: {
        'Content-Type': 'application/json'
      },
      data : QUERY
    };

    const {data: {data}} = await axios(URL);

    const {BANK, BANK_SAFE, USDC} = contracts;
    const recollat = await BANK.recollatAvailable();
    const tcr = data.bankById.tcr;
    const collateralBalance = +(await USDC.balanceOf(CONTRACT_ADDRESSES.BANK_SAFE)) / 1e6;
    const aTokenBalance = (+(await BANK_SAFE.balanceOfAToken())) / 1e6;

    const prices = {
      collatPrice: 1,
      sharePrice: data.oruById.price,
    }

    setInfo({
      recollatAvailable: prices.sharePrice * (+recollat / 1e18),
      tcr,
      prices,
      poolBalance: collateralBalance + aTokenBalance,

    })
  }

  const isMobileScreen = ( ) => {
    let query = window.matchMedia('(max-device-width: 480px)')
    return query.matches
  }

  const handleCollatInput = async (value) => {
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
          <Text fS='14px' fontWeight='500'>Recollaterize available</Text>
          <Text>Balance:</Text>
        </HDiv>
        <HDiv mt={isMobileScreen() ? '24px' : '1.094vw'}>
          <Text >{info ? formattedNum(info.recollatAvailable) : 0.000 } USDC</Text>
          <Text >{userInfo ? formattedNum(userInfo.bal) : 0} USDC</Text>
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
         margin={ isMobileScreen() ? '16px 0 0 0' :'1.719vw 0 0 0'}>
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
      <div style={{ display: 'flex', alignItems: 'center' , gap: '4px'}}>
          <ClipboardIcon ratio={ isMobileScreen() ? '5vw' : undefined}  color='#000' />
          <CustomSpan
          >
            Data
          </CustomSpan>
        </div>
        <HDivider margin={'1.875vw 0 0.77vw 0' }/>
        <HDiv h='50px'>
          <RecollateralizeDataText>Bonus Rate</RecollateralizeDataText>
          <RecollateralizeDataText bfw='500'>
            <b>0.005%</b>
          </RecollateralizeDataText>
        </HDiv>
        <HDivider margin='0.938vw 0 0.781vw 0' />
        <HDiv  h='50px'>
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
        <HDiv  h='50px'>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <RecollateralizeDataText mr='0.339vw'>Slippage</RecollateralizeDataText>
          </div>
          <div style={{ display: 'inherit', alignItems: 'inherit' }}>
            <RecollateralizeDataText bfw='500'><b>0.50%</b></RecollateralizeDataText>
          </div>
        </HDiv>
        <HDivider margin='0.781vw 0 0.938vw  0' />
        <HDiv  h='50px'>
          <RecollateralizeDataText>Rates</RecollateralizeDataText>
          <div style={{ display: 'inherit', alignItems: 'inherit' }}>
            <RecollateralizeDataText bfw='500'>
              <b>1&nbsp;</b>
            </RecollateralizeDataText>
            <RecollateralizeDataText>USDC</RecollateralizeDataText>
            <RecollateralizeDataText bfw='500'>
              <b>&nbsp;= {info ? info.prices.collatPrice : 0}&nbsp;</b>
            </RecollateralizeDataText>
            <RecollateralizeDataText>USD</RecollateralizeDataText>
          </div>
        </HDiv>
        <HDivider margin='0.781vw 0 0.938vw  0' />
        <HDiv  h='50px'>
          <RecollateralizeDataText></RecollateralizeDataText>
          <div style={{ display: 'inherit', alignItems: 'inherit' }}>
            <RecollateralizeDataText bfw='500'>
              <b>1&nbsp;</b>
            </RecollateralizeDataText>
            <RecollateralizeDataText>ORU</RecollateralizeDataText>
            <RecollateralizeDataText bfw='500'>
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
