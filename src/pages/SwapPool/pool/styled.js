/* eslint-disable no-unused-vars */
import { Menu, MenuItem } from '@mui/material';
import Button from '@mui/material/Button';
import { styled as styledMUI } from '@mui/system';
import styled from 'styled-components';

export const OrangeRow = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
@media (max-device-width: 480px){
  font-size: 14px;
  line-height: 14px;
}
`

export const PseudoSelectContainer = styled.div`
  position: absolute;
  width: 8.5vw;
  // background-color: red;
  margin-left: -1vw;

  border-radius: 0.8vw;
  border: none;
  overflow: hidden;

  margin-top: 8.5vw;
`
export const PseudoOption = styled.div`

  width: 100%;
  height: 2vw;
  padding: 5px 1vw;
  background-color: white;
  z-index: 5;
  color: #333;
  display: flex;
  align-items: center;

cursor: pointer;
&:hover{
  background-color: #E4DDEF;
}
  
`
export const PseudoPoolSelect = styled.div`
border: 1px solid #F2F2F2;
padding: 8px 12px;
font-size: 0.8vw;
border-radius: 0.8vw;
font-weight: 500;
display: flex;
align-items: center;
justify-content: space-between;
width: 8.5vw;
cursor: pointer;
color: #333;
`

export const PoolSelect = styled.select`
border: 1px solid #F2F2F2;
padding: 8px 12px;
font-size: 0.8vw;
border-radius: 0.8vw;

font-weight: 500;
color: #333;
`

export const PoolOption = styled.option`
  background-color: white;
  padding: 8px 12px;
  position: absolute;
  background-color: DodgerBlue;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 99;
`

export const PoolBlockWrapper = styled.div`
  padding: 2.76vw 2.969vw 3.333vw 2.969vw;
  height: ${ props => props.height ?? '28.865vw'};

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

export const OrangeBlock = styled.div`
    width: 100%;
    font-size: 0.96vw;
    margin-top: 0.825vw;
    background-color: #F5EFD7;
    height: 9.25vw;
    border-radius: 0.625vw;
    padding: 0.76vw 0.969vw 0.333vw 0.969vw;
    color: #333;
    & div {
      display: flex;
      align-items: center;
    }
    @media (max-device-width: 480px){
      width: 100%;
      font-size: 14px;
      line-height: 14px;
      padding: 8px;
      text-align: center;
      margin-bottom: 32px;
    }
`
export const HDivider = styled.div`
  margin: ${(props) => props.margin};
  height: 0.052vw;
  width: 100%;
  background: #f2f2f2;
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
  
`;

export const PoolInputWrapper = styled.div`
  /* margin-top: ${(props) => props.mt}; */
  background: ${(props) => (!props.withSelect ? '#FCFCFD' : '#D5ECD8')};
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
  }

  button {
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

export const RemoveLiqBtn = styled.button`
background: white;
  margin-top: 0.431vw;
  margin-bottom: 0.731vw;
  border-radius: 0.625vw;
  height: 3.542vw;
  min-height: 3.5vw;
  width: 32.448vw;
  display: flex;
  color: #333;
  border: 1px solid #333;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  font-size: 0.833vw;

  align-self: center;
  cursor: pointer;
  &:hover {
    transition: all 0.3s;
    background: #F4BD50;
  }
  @media (max-device-width: 480px){
    width: 100%;
    font-size: 14px;
    line-height: 14px;
    height: 48px;
    margin-bottom: 12px;
  }
`

export const PoolBtn = styled.button`
  background: #333;
  margin-top: 1.431vw;
  margin-bottom: 0.431vw;
  border-radius: 0.625vw;
  height: 3.542vw;
  min-height: 3.5vw;
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
    margin-bottom: 8px;
  }
`;

export const PoolDataWrapper = styled.div`
  padding: 2.604vw 2.188vw 2.396vw 2.188vw;
  border-radius: 1.042vw;
  flex-direction: column;
  margin-left: 3.75vw;
  background: #fff;
  height: 22.188vw;
  width: 25.573vw;
  display: flex;
`;

export const PoolDataText = styled.span`
  margin-right: ${(props) => props.mr};
  margin-left: ${(props) => props.ml};
  font-family: 'Poppins';
  line-height: 1.094vw;
  font-size: 0.729vw;
  font-weight: 400;
  color: #828282;

  b {
    line-height: 1.094vw;
    font-size: 0.729vw;
    font-weight: 500;
    color: #333;
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
