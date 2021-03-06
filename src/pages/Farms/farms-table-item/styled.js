import { Slider } from '@mui/material';
import { styled as styledMUI } from '@mui/material/styles';
import styled from 'styled-components';

export const Locked = styled.div`
  width: 100%;
  font-size: 0.75vw;
  text-align: center;
  margin-top: 0.4vw;
  color: #333;
`
export const ColorfulBlock = styled.div`
  border-radius: 99px;
  width: ${props => props.width ?? '0px' };
  height: 3.2vw;
  
  transition: 0.3s all;
  margin-left: ${props => props.ml ?? '0px'};
  background-color: ${props => props.bgColor ?? 'white'};
  
  cursor: pointer;
`
export const ColorfulBtnContainer = styled.div`
  position: relative;
  height: 2.7vw;
  width: 8vw;
  margin-left: 2.2vw;
  // margin-right: 1.75vw;
  display: flex;
  cursor: pointer;
  transition: 0.3s all;
  &:hover ${ColorfulBlock}{
    background-color: #333;
  }
`


export const ColorfulBtn = styled.div`
  padding: 0.8vw 1.2vw;
  background-color: #333;
  border-radius: 99px;
  color: #fff;
  font-size: 0.8vw;
  position: absolute;
  margin-top: 0.3vw;
  margin-left: 0.25vw;
  white-space: nowrap;
  
  cursor: pointer;
`

export const OutlineBtn = styled.div`
font-family: 'Poppins';
background: transparent;
margin-top: ${props => props.mt ?? '0px'};
border: 1px solid #333;
border-radius: 0.625vw;
height: 3.542vw;
gap: ${props => props.gap ?? '0px'};
width: ${props => props.width ?? '100%'};
display: flex;
align-items: center;
justify-content: center;
font-weight: 500;
font-size: 0.833vw;
// color: #fff;
cursor: pointer;
&:hover {
  transition: all 0.3s;
  background: #F4BD50;
}

`
export const HelpText = styled.div`
  position: absolute;
  display: none;
  background-color: white;
  border: 1px solid #EAEAEA;
  border-radius: 0.25vw;
  font-size: 0.8vw;
  width: 12vw;
  cursor: default;
  margin-left: -5vw;
  padding: 0.8vw;
  z-index: 10;
`

export const HelpCircleContainer = styled.div`
  &:hover ${HelpText}{
    display: block;
  }
  position: relative;
  cursor: pointer;
`
export const FarmsColumn = styled.div`
  display: flex;
  align-items: center;
  // justify-content: center;
  ${props => props.center ? ' justify-content: center;' : ''}
`

export const FarmsRow = styled.div`
  display: grid;
  grid-template-columns: 4fr 4fr 3fr 2fr 4fr 2fr;
`


export const FarmsTableItem = styled.div`
  transition: 0.3s all;
  flex-direction: column;
  height: ${(props) => (props.isExpanded ? '30.781vw' : '7.083vw')};
  width: 81.302vw;
  background: #e4ddef;
  display: flex;
`;

export const MainData = styled.div`
  padding: 2.188vw 2.708vw 2.396vw 2.344vw;
  background: #fff;
`;

export const HeadingText = styled.span`
  font-family: 'Poppins';
  line-height: 1.875vw;
  font-size: 1.25vw;
  font-weight: 500;
  color: #333;
  @media (max-device-width: 480px){
    font-size: 16px;
    line-height: 32px;
    margin-top: 24px !important;
    margin-bottom: 24px !important;
    text-align: center;
    width: 100%;
    margin: 0;
  }
`;

export const IconWrapper = styled.div`
  margin-left: ${(props) => props.ml};
  justify-content: center;
  align-items: center;
  display: flex;
  height: ${(props) => props.h ?? '2.292vw'};
  width: ${(props) => props.w ?? '3.021vw'};

  svg {
    fill: #000;
  }
`;

export const ExpandBtn = styled.div`
  border-radius: 0.521vw;
  background: #f2f2f2;
  width: 2.083vw;
  height: 2.083vw;
  align-items: center;
  justify-content: center;
  display: flex;
  cursor: pointer;

  svg {
    transition: 0.3s all;
    transform: ${(props) =>
      props.isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'};
    color: #828282;
    width: 1.25vw;
    height: 1.25vw;
  }

  &:hover {
    transition: 0.3s all;
    background: #e0e0e0;
  }
`;

export const HDiv = styled.div`
  justify-content: ${(props) => props.justifyContent};
  padding: ${(props) => props.padding};
  margin-top: ${(props) => props.mt};
  align-items: ${(props) => props.alignItems};
  flex-direction: row;
  display: flex;
`;

export const VDiv = styled.div`
  margin-left: ${(props) => props.ml};
  width: ${(props) => props.w};
  flex-direction: column;
  display: flex;
`;

export const Text = styled.span`
  margin-right: ${(props) => props.mr};
  margin-left: ${(props) => props.ml};
  min-width: ${(props) => props.minW};
  font-family: 'Poppins';
  font-weight: 300;
  font-size: ${(props) => props.fontSize ?? '0.938vw'};
  line-height: ${(props) => props.lineHeight ?? '1.406vw'};
  color: #4f4f4f;

  b {
    font-weight: 500;
    font-size: 0.938vw;
    line-height: 1.406vw;
    color: #333;
  }
`;

export const ExpandedDataWrapper = styled.div`
  transition: 0.3s all;
  height: 23.698vw;
  width: 100%;
`;

export const ExpandedData = styled.div`
  animation: 0.2s show ease-in-out;
  animation-delay: 0.2s;
  animation-fill-mode: backwards;
  display: flex;

  @keyframes show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  padding: 0.885vw 3.229vw 1.615vw 2.344vw;
`;

export const FarmsInputContainer = styled.div`
  box-shadow: inset 0 0.208vw 0.833vw rgba(197, 197, 197, 0.25);
  margin-top: 0.417vw;
  padding: 0 1.406vw;
  border-radius: 0.625vw;
  background: #fcfcfd;
  width: 32.448vw;
  height: 3.542vw;
  display: flex;
  align-items: center;
  justify-content: space-between;

  input {
    font-family: 'Poppins';
    font-style: normal;
    font-size: 0.833vw;
    font-weight: 500;
    color: #272a30;
    ::placeholder {
      color: #bdbdbd;
    }
  }
`;

export const VestingBtn = styled.button`
  font-family: 'Poppins';
  background: #333;
  margin-top: 2.083vw;
  border-radius: 0.625vw;
  height: 3.542vw;
  width: 32.448vw;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  font-size: 0.833vw;
  color: #fff;
  cursor: pointer;
  &:hover {
    transition: all 0.3s;
    background: #000;
  }
`;

export const WithdrawBtn = styled.button`
  font-family: 'Poppins';
  border: 0.052vw solid #333333;
  background: transparent;
  margin-top: 2.083vw;
  border-radius: 0.625vw;
  height: 3.542vw;
  width: 32.448vw;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  font-size: 0.833vw;
  color: #333;
  cursor: pointer;
  &:hover {
    transition: all 0.3s;
    background: #f4bd50;
  }
`;

export const VestRewardsBtn = styled.button`
  margin-left: 1.302vw;
  border-radius: 1.042vw;
  font-family: 'Poppins';
  background: #333;
  height: 2.396vw;
  width: 15.469vw;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  display: flex;
  font-size: 0.833vw;
  color: #fff;

  &:hover {
    transition: 0.3s all;
    background: #000;
  }
`;

export const FarmsSlider = styledMUI(Slider)(() => ({
  width: '31.5vw',
  maxHeight: '0.260vw',
  minHeight: '0.260vw',
  height: '0.260vw',
  color: '#333',
  marginTop: '2.552vw',
  padding: '0',

  '.Mui-disabled': {
    color: '#F6F6F6',
    backgroundcolor: '#F6F6F6',

    '& .MuiSlider-valueLabel': {
      color: '#F6F6F6',
    },
  },

  '&.MuiSlider-root.Mui-disabled': {
    color: '#F6F6F6',
    backgroundcolor: '#F6F6F6',

    '& .MuiSlider-track': {
      backgroundColor: '#F6F6F6',
    },

    '& .MuiSlider-markActive': {
      backgroundColor: '#F6F6F6',
    },
  },

  '& .MuiSlider-thumb': {
    display: 'none',
  },

  '& .MuiSlider-mark': {
    width: '1.094vw',
    height: '1.094vw',
    borderRadius: '50%',
    backgroundColor: '#F6F6F6',
  },

  '& .MuiSlider-markActive': {
    backgroundColor: '#333',
    opacity: 1,
  },

  '& .MuiSlider-rail ': {
    backgroundColor: '#F6F6F6 !important',
    opacity: '1',
  },
}));
