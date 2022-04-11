/* eslint-disable no-unused-vars */
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import React from 'react';

import ArrowDownIcon from '../../../assets/icons/ArrowDownIcon';
import BoldPlusIcon from '../../../assets/icons/BoldPlusIcon';
import ClipboardIcon from '../../../assets/icons/ClipboardIcon';
import HelpCircleIcon from '../../../assets/icons/HelpCircleIcon';
import LogoIcon from '../../../assets/icons/LogoIcon';
import OUSDIcon from '../../../assets/icons/OUSDIcon';
import USDCIcon from '../../../assets/icons/USDCIcon';
import {
  Divider,
  HDiv,
  HDivider,
  IconWrapper,
  MintBlockWrapper,
  MintBtn,
  MintDataText,
  MintDataWrapper,
  MintInputWrapper,
  Option,
  OptionsWrapper,
  Select,
  Text,
} from './styled';

const Mint = () => {
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
      <MintBlockWrapper>
        <HDiv>
          <Text>TCR 84.75%</Text>
          <Text>Balance: 0</Text>
        </HDiv>
        <MintInputWrapper withSelect>
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
        </MintInputWrapper>
        <IconWrapper margin='1.667vw 0 0 0'>
          <BoldPlusIcon />
        </IconWrapper>
        <HDiv>
          <Text>Required ORU 25.75%</Text>
          <Text>Balance: 0</Text>
        </HDiv>
        <MintInputWrapper>
          <input type='text' placeholder='0' />
          <IconWrapper margin='0 0.833vw' fill='#000'>
            <OUSDIcon />
          </IconWrapper>
          oUSD
        </MintInputWrapper>
        <IconWrapper margin='1.667vw 0 0 0' stroke='none'>
          <ArrowDownIcon />
        </IconWrapper>
        <HDiv>
          <Text>Output (estimated)</Text>
          <Text>Balance: 0</Text>
        </HDiv>
        <MintInputWrapper>
          <input type='text' placeholder='0' />
          <IconWrapper margin='0 0.833vw' fill='#000'>
            <LogoIcon />
          </IconWrapper>
          ORU
        </MintInputWrapper>
        <MintBtn>Connect Wallet</MintBtn>
      </MintBlockWrapper>
      <MintDataWrapper>
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
          <MintDataText>Minting fee</MintDataText>
          <div style={{ display: 'inherit', alignItems: 'inherit' }}>
            <MintDataText>
              <b>0.3% = 0.000000</b>
            </MintDataText>
            <MintDataText ml='0.677vw'>ORU</MintDataText>
          </div>
        </HDiv>
        <HDivider margin='0.938vw 0 0.781vw 0' />
        <HDiv>
          <div style={{ display: 'inherit', alignItems: 'inherit' }}>
            <MintDataText mr='0.339vw'>Collateral balance</MintDataText>
            <HelpCircleIcon />
          </div>
          <div style={{ display: 'inherit', alignItems: 'inherit' }}>
            <MintDataText>
              <b>948,264.523483</b>
            </MintDataText>
            <MintDataText ml='0.677vw'>USD</MintDataText>
          </div>
        </HDiv>
        <HDivider margin='0.781vw 0 0.938vw  0' />
        <HDiv>
          <MintDataText>Slippage</MintDataText>
          <MintDataText>
            <b>0.50%</b>
          </MintDataText>
        </HDiv>
        <HDivider margin='0.781vw 0 0.938vw  0' />
        <HDiv>
          <MintDataText>Rates</MintDataText>
          <div style={{ display: 'inherit', alignItems: 'inherit' }}>
            <MintDataText>
              <b>1 </b>
            </MintDataText>
            <MintDataText>ORU</MintDataText>
            <MintDataText>
              <b> = 1.000201 </b>
            </MintDataText>
            <MintDataText>USD</MintDataText>
          </div>
        </HDiv>
        <HDivider margin='0.781vw 0 0.938vw  0' />
        <HDiv>
          <div />
          <div style={{ display: 'inherit', alignItems: 'inherit' }}>
            <MintDataText>
              <b>1 </b>
            </MintDataText>
            <MintDataText>ORU</MintDataText>
            <MintDataText>
              <b> = 0.088199 </b>
            </MintDataText>
            <MintDataText>USD</MintDataText>
          </div>
        </HDiv>
      </MintDataWrapper>
    </>
  );
};

export default Mint;

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
