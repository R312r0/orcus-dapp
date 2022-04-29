/* eslint-disable no-unused-vars */
import { Menu, MenuItem } from '@mui/material';
import Button from '@mui/material/Button';
import { styled as styledMUI } from '@mui/system';
import styled from 'styled-components';

export const RedeemBlockWrapper = styled.div`
  padding: 2.76vw 2.969vw 3.333vw 2.969vw;
  height: 32.865vw;
  width: 38.385vw;
  flex-direction: column;
  display: flex;
  background: #fff;
  border-radius: 1.042vw;
  @media (max-device-width: 480px){
    padding: 0;
    width: 100%;
    margin: 0;
    height: auto;
  }
`;

export const HDiv = styled.div`
  margin-top: ${(props) => props.mt};
  margin-right: 0.833vw;
  margin-left: 0.833vw;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  display: flex;
`;

export const Text = styled.span`
  font-family: 'Poppins';
  line-height: 1.406vw;
  font-size: 0.938vw;
  font-weight: 300;
  color: #4f4f4f;
  @media (max-device-width: 480px){
    font-size: 12px;
    line-height: 16px;
  }
`;

export const RedeemInputWrapper = styled.div`
  /* margin-top: ${(props) => props.mt}; */
  background: ${(props) => (props.withSelect ? '#FCFCFD' : '#D5ECD8')};
  box-shadow: ${(props) =>
    props.withSelect
      ? 'inset 0 0.208vw 0.833vw rgba(197, 197, 197, 0.25)'
      : 'none'};
  padding: 0 0.833vw 0 1.406vw;
  flex-direction: row;
  /* justify-content: space-between; */
  border-radius: 0.625vw;
  margin-top: 0.417vw;
  height: 3.542vw;
  width: 32.448vw;
  align-items: center;
  font-family: 'Poppins';
  font-size: 0.833vw;
  font-weight: 500;
  color: #272a30;
  display: flex;
  @media (max-device-width: 480px){
    width: 100%;
    height: 32px;
    font-size: 12px;
  }

  input {
    width: ${(props) => (props.withSelect ? '18.906vw' : '24.3vw')};
    font-family: 'Poppins';
    font-size: 0.833vw;
    font-weight: 500;
    color: #272a30;
    height: inherit;
    ::placeholder {
      color: #272a30;
    }
    @media (max-device-width: 480px){
      width: 90%;
      height: 32px;
      font-size: 14px;
    }
  }

  button {
    @media (max-device-width: 480px){
      font-size: 8px;
      height: auto;
      padding: 4px 8px;
      width: auto;
    }
    border-radius: 0.521vw;
    background: #333;
    height: 1.875vw;
    width: 4.219vw;
    color: #fff;
    display: flex;
    font-size: 0.729vw;
    align-items: center;
    padding: 0 1.354vw;
    cursor: pointer;

    &:hover {
      transition: all 0.3s;
      background: #000;
    }
  }
`;

export const IconWrapper = styled.div`
  margin: ${(props) => props.margin};
  height: ${(props) => props.h ?? '1.250vw'};
  width: ${(props) => props.w ?? '1.250vw'};
  justify-content: center;
  align-items: center;
  align-self: center;
  display: flex;
  @media (max-device-width: 480px){
    height: 5vw !important;
    width: 5vw !important;
  }
  svg {
    fill: ${(props) => props.fill ?? '#BDBDBD'};
    /* stroke: ${(props) => props.stroke ?? '#BDBDBD'}; */
    height: inherit;
    width: inherit;
  }

  img {
    height: inherit;
    width: inherit;
  }
`;

export const Divider = styled.div`
  margin-right: 0.833vw;
  margin-left: 0.521vw;
  background: #eaebeb;
  height: 2.083vw;
  width: 0.052vw;
`;

export const HDivider = styled.div`
  background: #f2f2f2;
  margin: ${(props) => props.margin};
  height: 0.052vw;
  width: 21.146vw;
`;

export const RedeemBtn = styled.button`
  background: #333;
  margin-top: 2.031vw;
  border-radius: 0.625vw;
  height: 3.542vw;
  width: 32.448vw;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  font-size: 0.833vw;
  color: #fff;
  align-self: center;
  cursor: pointer;
  &:hover {
    transition: all 0.3s;
    background: #000;
  }
  @media (max-device-width: 480px){
    width: 100%;
    font-size: 14px;
    line-height: 14px;
    height: 48px;
  }
  
`;

export const CustomSpan = styled.span`
  fontFamily: 'Poppins',
  fontWeight: 500,
  color: #333,
  font-size: 1.250vw,
  margin-left: 1.094vw,
  @media (max-device-width: 480px){
    font-size: 16px;
  }
`

export const RedeemDataWrapper = styled.div`
  padding: 2.604vw 2.188vw 2.396vw 2.188vw;
  border-radius: 1.042vw;
  flex-direction: column;
  margin-left: 3.75vw;
  background: #fff;
  height: 22.188vw;
  width: 25.573vw;
  display: flex;
  @media (max-device-width: 480px){
    margin: 0;
    width: 100%;
    padding-top: 16px;
    padding-bottom: 16px;
    height: auto;
    margin-top: 16px;
    margin-bottom: 32px;
  }
`;

export const RedeemDataText = styled.span`
  margin-right: ${(props) => props.mr};
  margin-left: ${(props) => props.ml};
  font-family: 'Poppins';
  line-height: 1.094vw;
  font-size: 0.729vw;
  font-weight: 400;
  color: #828282;
  @media (max-device-width: 480px){
    font-size: 14px; 
    line-height: 14px;
  }


  b {
    line-height: 1.094vw;
    font-size: 0.729vw;
    font-weight: 500;
    color: #333;
    @media (max-device-width: 480px){
      font-size: 14px; 
      line-height: 14px;
    }
  }
`;

export const RedemtionWrapper = styled.div`
  padding: 2.604vw 2.135vw 1.354vw 2.24vw;
  margin-top: 1.042vw;
  border-radius: 1.042vw;
  flex-direction: column;
  margin-left: 3.75vw;
  background: #fff;
  height: 9.896vw;
  width: 25.573vw;
  display: flex;
  @media (max-device-width: 480px){
    margin: 0;
    width: 100%;
    padding-top: 16px;
    padding-bottom: 16px;
    height: auto;
    margin-top: 16px;
    margin-bottom: 32px;
  }
`;

export const RedemtionBtn = styled.button`
  border: 0.052vw solid #333333;
  border-radius: 1.042vw;
  background: transparent;
  height: 2.135vw;
  cursor: pointer;
  width: 6.406vw;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Poppins';
  line-height: 1.094vw;
  font-size: 0.729vw;
  font-weight: 400;
  @media (max-device-width: 480px){

    font-size: 14px;
    line-height: 14px;
    padding: 4px 8px;
    width: auto;
    height: auto;
  }
  &:hover {
    transition: 0.3s all;
    background: #333;
    color: #fff;
  }
`;

export const Select = styledMUI(Button)(() => ({
  '&.MuiButton-root': {
    borderRadius: 0,
    padding: 0,
    margin: 0,
    maxWidth: '5.5vw',
    minWidth: '5.5vw',
    height: '2.083vw',
    width: '5.5vw',
    background: 'transparent',
    color: '#272A30',
    fontFamily: 'Poppins',
    fontWeight: 500,
    fontSize: '0.833vw',
    lineHeight: '1.250vw',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '&:hover': {
      background: 'transparent',
    },
    '.MuiButton-endIcon': {
      color: '#6D859E',
      width: '0.833vw',
      height: '0.833vw',
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex',
      padding: 0,
      margin: 0,
      svg: {
        width: '1.250vw',
        height: '1.250vw',
      },
    },
    '.MuiButton-startIcon': {
      width: '1.250vw',
      height: '1.250vw',
      padding: 0,
      margin: 0,
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex',
    },
  },
}));

export const Option = styledMUI(MenuItem)(() => ({
  '&.MuiMenuItem-root': {
    background: '#fff',
    fontFamily: 'Poppins',
    fontWeight: 500,
    fontSize: '0.833vw',
    lineHeight: '1.250vw',
    padding: 0,
    height: '1.927vw',
    minHeight: '1.927vw',
    '&:hover': {
      background: '#E4DDEF',
    },
  },
}));

export const OptionsWrapper = styledMUI((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: '0.938vw',
    border: 'none',
    boxShadow: '0 0.417vw 1.615vw rgba(214, 214, 214, 0.25)',
    '& .MuiMenu-list': {
      padding: '1.042vw 0',
      width: '9.427vw',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        // fontSize: 18,
      },
      '&:active': {
        backgroundColor: '#E4DDEF',
      },
    },
  },
}));
