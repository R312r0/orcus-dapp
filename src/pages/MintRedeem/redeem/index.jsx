import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import React from 'react';

import ArrowDownIcon from '../../../assets/icons/ArrowDownIcon';
import BoldPlusIcon from '../../../assets/icons/BoldPlusIcon';
import ClipboardIcon from '../../../assets/icons/ClipboardIcon';
import CollectRedemtionIcon from '../../../assets/icons/CollectRedemtionIcon';
import HelpCircleIcon from '../../../assets/icons/HelpCircleIcon';
import LogoIcon from '../../../assets/icons/LogoIcon';
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
  Select,
  Text,
} from './styled';

const Redeem = () => {
  const [value, setValue] = React.useState('ORU');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <RedeemBlockWrapper>
        <HDiv>
          <Text>Input</Text>
          <Text>Balance: 0</Text>
        </HDiv>
        <RedeemInputWrapper withSelect>
          <input type='text' value='1.2123235412' />
          <button>Max</button>
          <Divider />
          <div>
            <Select
              disableElevation
              onClick={handleClick}
              startIcon={<OUSDIcon color='#000' />}
              endIcon={<KeyboardArrowDownIcon />}
              disableRipple
              disableFocusRipple
            >
              {value}
            </Select>
            <OptionsWrapper
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              {tokenList.map((token, idx) => (
                <Option
                  key={idx}
                  onClick={() => {
                    handleClose();
                    setValue(token.name);
                  }}
                  disableRipple
                >
                  {token.icon}
                  {token.name}
                </Option>
              ))}
            </OptionsWrapper>
          </div>
        </RedeemInputWrapper>
        <IconWrapper margin='1.667vw 0 0 0'>
          <BoldPlusIcon />
        </IconWrapper>
        <HDiv>
          <Text>ECR 92.01 </Text>
          <Text>Balance: 0</Text>
        </HDiv>
        <RedeemInputWrapper>
          <input type='text' placeholder='0' />
          <IconWrapper margin='0 0.833vw' fill='#000'>
            <OUSDIcon />
          </IconWrapper>
          oUSD
        </RedeemInputWrapper>
        <IconWrapper margin='1.667vw 0 0 0' stroke='none'>
          <ArrowDownIcon />
        </IconWrapper>
        <HDiv>
          <Text>Output ORU 7.99%</Text>
          <Text>Balance: 0</Text>
        </HDiv>
        <RedeemInputWrapper>
          <input type='text' placeholder='0' />
          <IconWrapper margin='0 0.833vw' fill='#000'>
            <LogoIcon />
          </IconWrapper>
          ORU
        </RedeemInputWrapper>
        <RedeemBtn>Connect Wallet</RedeemBtn>
      </RedeemBlockWrapper>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <RedeemDataWrapper>
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
            <RedeemDataText>Redemtion fee</RedeemDataText>
            <RedeemDataText>
              <b>0.4%</b>
            </RedeemDataText>
          </HDiv>
          <HDivider margin='0.938vw 0 0.781vw 0' />
          <HDiv>
            <RedeemDataText>Slippage</RedeemDataText>
            <RedeemDataText>
              <b>0.50%</b>
            </RedeemDataText>
          </HDiv>
          <HDivider margin='0.781vw 0 0.938vw  0' />
          <HDiv>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <RedeemDataText mr='0.339vw'>Collateral balance</RedeemDataText>
              <HelpCircleIcon />
            </div>
            <div style={{ display: 'inherit', alignItems: 'inherit' }}>
              <RedeemDataText>
                <b>948,264.523483</b>
              </RedeemDataText>
              <RedeemDataText ml='0.677vw'>USD</RedeemDataText>
            </div>
          </HDiv>
          <HDivider margin='0.781vw 0 0.938vw  0' />
          <HDiv>
            <RedeemDataText>Rates</RedeemDataText>
            <div style={{ display: 'inherit', alignItems: 'inherit' }}>
              <RedeemDataText>
                <b>1 </b>
              </RedeemDataText>
              <RedeemDataText>ORU</RedeemDataText>
              <RedeemDataText>
                <b> = 1.000201 </b>
              </RedeemDataText>
              <RedeemDataText>USD</RedeemDataText>
            </div>
          </HDiv>
          <HDivider margin='0.781vw 0 0.938vw  0' />
          <HDiv>
            <div />
            <div style={{ display: 'inherit', alignItems: 'inherit' }}>
              <RedeemDataText>
                <b>1 </b>
              </RedeemDataText>
              <RedeemDataText>ORU</RedeemDataText>
              <RedeemDataText>
                <b> = 0.088199 </b>
              </RedeemDataText>
              <RedeemDataText>USD</RedeemDataText>
            </div>
          </HDiv>
        </RedeemDataWrapper>
        <RedemtionWrapper>
          <HDiv>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <CollectRedemtionIcon />
              <span
                style={{
                  fontFamily: 'Poppins',
                  fontSize: '0.938vw',
                  color: '#333',
                  fontWeight: '500',
                  marginLeft: '1.042vw',
                }}
              >
                Collect redemtion
              </span>
            </div>
            <RedemtionBtn>Collect</RedemtionBtn>
          </HDiv>
          <HDivider margin='1.87vw 0 0.781vw 0' />
          <HDiv>
            <RedeemDataText>
              <b>0 USDC</b>
            </RedeemDataText>
            <RedeemDataText>
              <b>0 ORU</b>
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
        <LogoIcon />
      </IconWrapper>
    ),
  },
];
