import React from 'react';

import ArrowDownIcon from '../../../assets/icons/ArrowDownIcon';
import CalendarIcon from '../../../assets/icons/CalendarIcon';
import ClipboardIcon from '../../../assets/icons/ClipboardIcon';
import LogoIcon from '../../../assets/icons/LogoIcon';
import {
  Divider,
  HDiv,
  HDivider,
  IconWrapper,
  PercentageContainer,
  StakeBlockWrapper,
  StakeBtn,
  StakeDataText,
  StakeDataWrapper,
  StakeInputWrapper,
  Text,
} from './styled';

const Stake = () => {
  return (
    <>
      <StakeBlockWrapper>
        <HDiv>
          <Text>
            <b>Staking APR</b>
          </Text>
          <PercentageContainer>
            <Text>
              <b>3004.14%</b>
            </Text>
          </PercentageContainer>
        </HDiv>
        <HDiv mt='1.094vw'>
          <Text>Depositing ORU</Text>
          <Text>Balance: 0</Text>
        </HDiv>
        <StakeInputWrapper withBtn>
          <input type='text' placeholder='0.0' />
          <button>Max</button>
          <Divider />
          <IconWrapper fill='#000' margin='0 0.833vw 0 0'>
            <LogoIcon />
          </IconWrapper>
          ORU
        </StakeInputWrapper>
        <IconWrapper margin='1.719vw 0 0 0'>
          <ArrowDownIcon />
        </IconWrapper>
        <HDiv>
          <Text>Receiving xORU</Text>
          <Text>Balance: 0</Text>
        </HDiv>
        <StakeInputWrapper>
          <input type='text' value='0' />
          <IconWrapper fill='#000' margin='0 0.833vw 0 0'>
            <LogoIcon />
          </IconWrapper>
          xORU
        </StakeInputWrapper>
        <StakeBtn>Approve ORU</StakeBtn>
      </StakeBlockWrapper>

      <StakeDataWrapper>
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
          <StakeDataText>Stake TVL</StakeDataText>
          <StakeDataText>
            <b>$55,288.11</b>
          </StakeDataText>
        </HDiv>
        <HDivider margin='0.938vw 0 0.781vw 0' />
        <HDiv>
          <StakeDataText mr='0.339vw'>Rate</StakeDataText>
          <div style={{ display: 'inherit', alignItems: 'inherit' }}>
            <StakeDataText>
              <b>1&nbsp;</b>
            </StakeDataText>
            <StakeDataText>xORU</StakeDataText>
            <StakeDataText>
              <b>&nbsp;= 1.4813&nbsp;</b>
            </StakeDataText>
            <StakeDataText>ORU</StakeDataText>
          </div>
        </HDiv>
        <HDivider margin='0.781vw 0 0.938vw  0' />
        <HDiv>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <StakeDataText mr='0.339vw'>Lock Duration</StakeDataText>
            <CalendarIcon />
          </div>
          <div style={{ display: 'inherit', alignItems: 'inherit' }}>
            <StakeDataText>
              <b>7&nbsp;</b>
            </StakeDataText>
            <StakeDataText>Days</StakeDataText>
          </div>
        </HDiv>
        <HDivider margin='0.781vw 0 0.938vw  0' />
        <HDiv>
          <StakeDataText>Rates</StakeDataText>
          <div style={{ display: 'inherit', alignItems: 'inherit' }}>
            <StakeDataText>
              <b>1&nbsp;</b>
            </StakeDataText>
            <StakeDataText>USDC</StakeDataText>
            <StakeDataText>
              <b>&nbsp;= 1.000201&nbsp;</b>
            </StakeDataText>
            <StakeDataText>USD</StakeDataText>
          </div>
        </HDiv>
      </StakeDataWrapper>
    </>
  );
};

export default Stake;
