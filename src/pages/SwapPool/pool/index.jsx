/* eslint-disable no-unused-vars */
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import React, {useState} from 'react';
import ArrowLeftIcon from '../../../assets/icons/ArrowLeftIcon';
import BoldPlusIcon from '../../../assets/icons/BoldPlusIcon';
import LogoIcon from '../../../assets/icons/LogoIcon';
import OUSDIcon from '../../../assets/icons/OUSDIcon';
import USDCIcon from '../../../assets/icons/USDCIcon';
import {
  HDiv,
  HDivider,
  IconWrapper,
  PoolBlockWrapper,
  OrangeBlock,
  PoolBtn,
  PoolInputWrapper,
  Option,
  OptionsWrapper,
  Select,
  Text,
} from './styled';

const Pool = () => {
  
    const [ isAddLiquidity, setAddLiquidity ] = useState(false);

    const subpageHandler = () => {
        setAddLiquidity(!isAddLiquidity);
    }
    const [value, setValue] = React.useState('ORU');
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    }

  return (
    <>
      <PoolBlockWrapper>
          { isAddLiquidity ? <>
            <div style={{display: 'flex', alignItems: 'center', gap: '0.875vw'}}> 
                <ArrowLeftIcon></ArrowLeftIcon>
            <b>Add Liquidity</b>
            </div>
            <HDiv mt='2vw'>
          <Text>Input</Text>
        </HDiv>
        <PoolInputWrapper>
          <input type='text' value='1.2123235412' />
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
        </PoolInputWrapper>
        <IconWrapper margin='1.667vw 0 0 0'>
        <BoldPlusIcon />
        </IconWrapper>
        <HDiv>
          <Text>Input</Text>
          <Text>Select a currency</Text>
        </HDiv>
        <PoolInputWrapper>
          <input type='text' placeholder='0' />
          <IconWrapper margin='0 0.833vw' fill='#000'>
            <OUSDIcon />
          </IconWrapper>
          oUSD
          
        </PoolInputWrapper>

        <PoolBtn>Unlock Wallet</PoolBtn>
        </> : <>
        <HDiv>
            <b>Liquidity</b>
        </HDiv>
        <HDiv mt='0.784vw'>
          <Text>Add liquidity to receive LP tokens</Text>
        </HDiv>
        <PoolBtn onClick={subpageHandler}>Add Liquidity</PoolBtn>
        <HDivider margin={'2.6vw 0 0 0 '}></HDivider>
        <HDiv mt='1.125vw'>
          <Text>Your Liquidity</Text>
        </HDiv>
        <OrangeBlock>Connect to a wallet to view your liquidity.</OrangeBlock></> } 
        {/* <PoolInputWrapper>
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
        </PoolInputWrapper> */}
        {/* <IconWrapper margin='1.667vw 0 0 0'>
        <ArrowDownIcon />
        </IconWrapper>
        <HDiv>
          <Text>To</Text>
          <Text>Select a currency</Text>
        </HDiv>
        <PoolInputWrapper>
          <input type='text' placeholder='0' />
          <IconWrapper margin='0 0.833vw' fill='#000'>
            <OUSDIcon />
          </IconWrapper>
          oUSD
        </PoolInputWrapper> */}
        {/* <IconWrapper margin='1.667vw 0 0 0' stroke='none'>
          <ArrowDownIcon />
        </IconWrapper>
        <HDiv>
          <Text>Output (estimated)</Text>
          <Text>Balance: 0</Text>
        </HDiv>
        <PoolInputWrapper>
          <input type='text' placeholder='0' />
          <IconWrapper margin='0 0.833vw' fill='#000'>
            <LogoIcon />
          </IconWrapper>
          ORU
        </PoolInputWrapper> */}
      </PoolBlockWrapper>
      {/* <PoolDataWrapper>
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
          <PoolDataText>Pooling fee</PoolDataText>
          <div style={{ display: 'inherit', alignItems: 'inherit' }}>
            <PoolDataText>
              <b>0.3% = 0.000000</b>
            </PoolDataText>
            <PoolDataText ml='0.677vw'>ORU</PoolDataText>
          </div>
        </HDiv>
        <HDivider margin='0.938vw 0 0.781vw 0' />
        <HDiv>
          <div style={{ display: 'inherit', alignItems: 'inherit' }}>
            <PoolDataText mr='0.339vw'>Collateral balance</PoolDataText>
            <HelpCircleIcon />
          </div>
          <div style={{ display: 'inherit', alignItems: 'inherit' }}>
            <PoolDataText>
              <b>948,264.523483</b>
            </PoolDataText>
            <PoolDataText ml='0.677vw'>USD</PoolDataText>
          </div>
        </HDiv>
        <HDivider margin='0.781vw 0 0.938vw  0' />
        <HDiv>
          <PoolDataText>Slippage</PoolDataText>
          <PoolDataText>
            <b>0.50%</b>
          </PoolDataText>
        </HDiv>
        <HDivider margin='0.781vw 0 0.938vw  0' />
        <HDiv>
          <PoolDataText>Rates</PoolDataText>
          <div style={{ display: 'inherit', alignItems: 'inherit' }}>
            <PoolDataText>
              <b>1 </b>
            </PoolDataText>
            <PoolDataText>ORU</PoolDataText>
            <PoolDataText>
              <b> = 1.000201 </b>
            </PoolDataText>
            <PoolDataText>USD</PoolDataText>
          </div>
        </HDiv>
        <HDivider margin='0.781vw 0 0.938vw  0' />
        <HDiv>
          <div />
          <div style={{ display: 'inherit', alignItems: 'inherit' }}>
            <PoolDataText>
              <b>1 </b>
            </PoolDataText>
            <PoolDataText>ORU</PoolDataText>
            <PoolDataText>
              <b> = 0.088199 </b>
            </PoolDataText>
            <PoolDataText>USD</PoolDataText>
          </div>
        </HDiv>
      </PoolDataWrapper> */}
    </>
  );
};

export default Pool;

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
