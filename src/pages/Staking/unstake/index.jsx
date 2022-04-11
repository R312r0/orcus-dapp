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
  Text,
  UnstakeBlockWrapper,
  UnstakeBtn,
  UnstakeDataText,
  UnstakeDataWrapper,
  UnstakeInputWrapper,
} from './styled';

const Unstake = () => {
  return (
    <>
      <UnstakeBlockWrapper>
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
        <UnstakeInputWrapper withBtn>
          <input type='text' placeholder='0.0' />
          <button>Max</button>
          <Divider />
          <IconWrapper fill='#000' margin='0 0.833vw 0 0'>
            <LogoIcon />
          </IconWrapper>
          ORU
        </UnstakeInputWrapper>
        <IconWrapper margin='1.719vw 0 0 0'>
          <ArrowDownIcon />
        </IconWrapper>
        <HDiv>
          <Text>Receiving xORU</Text>
          <Text>Balance: 0</Text>
        </HDiv>
        <UnstakeInputWrapper>
          <input type='text' value='0' />
          <IconWrapper fill='#000' margin='0 0.833vw 0 0'>
            <LogoIcon />
          </IconWrapper>
          xORU
        </UnstakeInputWrapper>
        <UnstakeBtn>Approve ORU</UnstakeBtn>
      </UnstakeBlockWrapper>

      <UnstakeDataWrapper>
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
          <UnstakeDataText>Stake TVL</UnstakeDataText>
          <UnstakeDataText>
            <b>$55,288.11</b>
          </UnstakeDataText>
        </HDiv>
        <HDivider margin='0.938vw 0 0.781vw 0' />
        <HDiv>
          <UnstakeDataText mr='0.339vw'>Rate</UnstakeDataText>
          <div style={{ display: 'inherit', alignItems: 'inherit' }}>
            <UnstakeDataText>
              <b>1&nbsp;</b>
            </UnstakeDataText>
            <UnstakeDataText>xORU</UnstakeDataText>
            <UnstakeDataText>
              <b>&nbsp;= 1.4813&nbsp;</b>
            </UnstakeDataText>
            <UnstakeDataText>ORU</UnstakeDataText>
          </div>
        </HDiv>
        <HDivider margin='0.781vw 0 0.938vw  0' />
        <HDiv>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <UnstakeDataText mr='0.339vw'>Lock Duration</UnstakeDataText>
            <CalendarIcon />
          </div>
          <div style={{ display: 'inherit', alignItems: 'inherit' }}>
            <UnstakeDataText>
              <b>7&nbsp;</b>
            </UnstakeDataText>
            <UnstakeDataText>Days</UnstakeDataText>
          </div>
        </HDiv>
        <HDivider margin='0.781vw 0 0.938vw  0' />
        <HDiv>
          <UnstakeDataText>Rates</UnstakeDataText>
          <div style={{ display: 'inherit', alignItems: 'inherit' }}>
            <UnstakeDataText>
              <b>1&nbsp;</b>
            </UnstakeDataText>
            <UnstakeDataText>USDC</UnstakeDataText>
            <UnstakeDataText>
              <b>&nbsp;= 1.000201&nbsp;</b>
            </UnstakeDataText>
            <UnstakeDataText>USD</UnstakeDataText>
          </div>
        </HDiv>
      </UnstakeDataWrapper>
    </>
  );
};

export default Unstake;
