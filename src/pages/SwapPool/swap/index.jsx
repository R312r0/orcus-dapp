/* eslint-disable no-unused-vars */
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import React from 'react';

import ArrowDownIcon from '../../../assets/icons/ArrowDownIcon';
import LogoIcon from '../../../assets/icons/LogoIcon';
import OUSDIcon from '../../../assets/icons/OUSDIcon';
import USDCIcon from '../../../assets/icons/USDCIcon';
import {
  HDiv,
  IconWrapper,
  SwapBlockWrapper,
  SwapBtn,
  SwapInputWrapper,
  Option,
  OptionsWrapper,
  Select,
  Text,
} from './styled';

const Swap = () => {
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
      <SwapBlockWrapper>
        <HDiv>
            <b>SWAP</b>
        </HDiv>
        <HDiv mt='2vw'>
          <Text>From</Text>
        </HDiv>
        <SwapInputWrapper>
          <input type='text' value='1.2123235412' />
          {/* <button>Max</button> */}
          {/* <Divider /> */}
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
        </SwapInputWrapper>
        <IconWrapper margin='1.667vw 0 0 0'>
        <ArrowDownIcon />
        </IconWrapper>
        <HDiv>
          <Text>To</Text>
          <Text>Select a currency</Text>
        </HDiv>
        <SwapInputWrapper>
          <input type='text' placeholder='0' />
          <IconWrapper margin='0 0.833vw' fill='#000'>
            <OUSDIcon />
          </IconWrapper>
          oUSD
        </SwapInputWrapper>
        
        <SwapBtn>Unlock Wallet</SwapBtn>
      </SwapBlockWrapper>
      
    </>
  );
};

export default Swap;

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
