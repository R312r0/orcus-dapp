import React from 'react';

import ArrowDownIcon from '../../assets/icons/ArrowDownIcon';
import HelpCircleIcon from '../../assets/icons/HelpCircleIcon'
import ClipboardIcon from '../../assets/icons/ClipboardIcon';
import LogoIcon from '../../assets/icons/LogoIcon';
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


const Recollateralize = () => {
  return <RecollateralizeWrapper>
    <StakingWrapper>
      <HeadingText>Recollateralize</HeadingText>
      <TabWrapper>
      <RecollateralizeBlockWrapper>
        <HDiv mt='1.094vw'>
          <Text>Recollat available</Text>
          <Text>Balance:</Text>
        </HDiv>
        <HDiv mt='1.094vw'>
          <Text fontWeight='500'>0.0000 USDC</Text>
          <Text fontWeight='500'>0 USDC</Text>
        </HDiv>
        <RecollateralizeInputWrapper withBtn>
          <input type='text' placeholder='0.0' />
          <button>Max</button>
          <Divider />
          <IconWrapper fill='#000' margin='0 0.833vw 0 0'>
            <USDCIcon />
          </IconWrapper>
          USDC
        </RecollateralizeInputWrapper>
        <IconWrapper margin='1.719vw 0 0 0'>
          <ArrowDownIcon />
        </IconWrapper>
        <HDiv>
          <Text>Receiving ORU</Text>
          <Text>Balance: 0</Text>
        </HDiv>
        <RecollateralizeInputWrapper>
          <input type='text' value='0' />
          <IconWrapper fill='#000' margin='0 0.833vw 0 0'>
            <LogoIcon />
          </IconWrapper>
          xORU
        </RecollateralizeInputWrapper>
        <RecollateralizeBtn>Connect Wallet</RecollateralizeBtn>
      </RecollateralizeBlockWrapper>

      <RecollateralizeDataWrapper>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <ClipboardIcon color='#000' />
          <span
            style={{
              fontFamily: 'Poppins',
              fontWeight: '500',
              color: '#333',
              fontSize: '1.250vw',
              marginLeft: '1.094vw',
            }}
          >
            Data
          </span>
        </div>
        <HDivider margin='1.875vw 0 0.77vw 0' />
        <HDiv>
          <RecollateralizeDataText>Bonus Rate</RecollateralizeDataText>
          <RecollateralizeDataText>
            <b>0%</b>
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
              <b>&nbsp;948,264.523483&nbsp;</b>
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
              <b>&nbsp;= 1.000201&nbsp;</b>
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
              <b>&nbsp;= 0.088199&nbsp;</b>
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
