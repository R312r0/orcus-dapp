import styled from 'styled-components';

export const AddLiquidityBtn = styled.a`
  padding: 0.65vw 0.8vw;
  border: 1px solid #595959;
  display: flex;
  text-decoration: none;
  gap: 0.4vw;
  align-items: center;
  font-size: 1vw;
  box-sizing: border-box;
  border-radius: 0.6vw;
  white-space: nowrap;
  background: transparent;
  cursor: pointer;
  color: #595959;
  transition: 0.1s;
  & svg{
    fill: #595959 !important;
    transition: 0.1s;
    color: #595959 !important;
  }
  & path{
    fill: #595959 !important;
    color: #595959 !important;
    transition: 0.1s;
  }
  &:hover{
    color: #333;
    border: 1px solid #333;
  }
  &:hover svg{
    fill: #333 !important;
    color: #333 !important;
  }
  &:hover path{
    fill: #333 !important;
    color: #333 !important;
  }
`
export const FarmsColumn = styled.div`
  display: flex;
  align-items: center;
  // justify-content: center;
  ${props => props.center ? ' justify-content: center;' : ''}
`

export const Scroll = styled.div`
  overflow: scroll;
`



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
export const Text2 = styled.span`
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

export const FarmsRow = styled.div`
  display: grid;
  grid-template-columns: 5fr 4fr 3fr 2fr 4fr 2fr;
  overflow: hidden;
`
export const FarmsTableItem = styled.div`
  transition: 0.3s all;
  flex-direction: column;
  height: ${(props) => (props.isExpanded ? '30.781vw' : '7.083vw')};
  width: 81.302vw;
  // background: #e4ddef;
  
  display: flex;
`;
export const MainData = styled.div`
  padding: 2.188vw 2.708vw 2.396vw 2.344vw;
  overflow: hidden;
  background: linear-gradient(90.51deg, rgba(129, 137, 253, 0.22) -1.37%, rgba(206, 152, 249, 0.55) 98.98%);
  transition: background 1000ms linear;
  &:hover{
    background-color: rgba(206, 152, 249, 0.55);
  }
`;

export const ClaimsHead = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 4fr 2fr 4fr;
  color: #828282;
  font-size: 1vw;
  margin-top: 1.24vw;
  font-family: 'Poppins';
  padding-left: 1.12vw;
  @media (max-device-width: 480px){
    font-size: 12px;
  }
`


export const VestedContaner = styled.div`
  width: 32vw;  
`
export const OverlayClaim = styled.button`
  font-size: 1vw;
  white-space: nowrap;
  padding-top: 0.78vw;
  padding-bottom: 0.78vw;
  padding-right: 1vw;
  padding-left: 1vw;
  width: 7vw;
  border-radius: 0.825vw;
  background-color: ${props => props.disabled ? "#969696" : "#333"};
  border: 1px solid ${props => props.disabled ? "#969696" : "#333"};
  display: flex;
  align-items: center;
  justify-content: space-around;
  pointer-events: ${props => props.disabled ? "none" : "all"};
  color: ${props => props.disabled ? "#666666;" : "white"};
  cursor: pointer;
  transition: 0.1s;
  &:hover{
    background-color: black;
  }
`
export const OverlayOutline = styled.button`
color: #333;
background-color: white;
border: 1px solid #333;
border-radius: 0.825vw;
font-size: 1vw;
white-space: nowrap;
padding: 0.78vw;
display: flex;
align-items: center;
justify-content: space-around;
cursor: pointer;
&:hover {
  transition: all 0.1s;
  background: #F4BD50;
}
`
export const ClaimsRow = styled.div`
  display: grid;
  font-family: 'Poppins';
  margin-top: 0.44vw;
  grid-template-columns: 4fr 2fr 4fr;
  color: #333;
  font-size: 1vw;
  align-items: center;
  gap: 0.25vw;
  padding: 0.75vw;
  
  ${props => props.last ?? 'border-bottom: 1px solid #F2F2F2'};
  & div{
    padding-left: 0.61vw;
    text-align: left;
  }
`
export const ClaimsContainer = styled.div`
  width: 100%;
  height: min-content;
  border: 1px solid #F2F2F2;
box-sizing: border-box;
filter: drop-shadow(0px 4px 40px rgba(124, 122, 122, 0.16));
border-radius: 1.024vw;
  margin-top: 0.64vw;
  @media (max-device-width: 480px){
font-size: 12px;
  }
  
`


export const OverlayText = styled.div`


font-family: 'Poppins';
font-weight: 500;
font-size: 16px;

`

export const OverlayGreyText = styled.div`
font-family: Poppins;
font-size: ${props => props.fs ?? '14px'};
font-weight: 400;
color: #828282;
& b{
  font-weight: 500;
  color: #333;
}

`


export const HDivider = styled.div`
  margin: ${(props) => props.margin};
  height: 0.052vw;
  width: 100%;
  background: #f2f2f2;
`;

export const OverlayValue = styled.div`
font-family: Poppins;
font-size: 24px;
font-weight: 500;
`

export const BlackBtn = styled.button`
  font-family: 'Poppins';
  background: #333;
  margin-top: 2.083vw;
  border-radius: 0.625vw;
  height: 3.542vw;
  width: 100%;
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

`;
export const FarmsOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 10;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-device-width: 480px){
    background: none; 
  }
`
export const PagesRow = styled.div`
  padding-left: 35.5%;
  padding-right: 35.5%;
  margin-top: 1.24vw;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const FarmsOverlayContent = styled.div`
  width: 65vw;
  height: min-content;
  background-color: white;
  border-radius: 1.042vw;
  box-shadow: 0px 4px 40px rgba(124, 122, 122, 0.16);
  padding: 2vw;
  display: flex;
  flex-direction: column;
  
  @media (max-device-width: 480px){
    width: 100%;
    padding-top: 24px;
    padding-bottom :48px;
  }
  
`

export const RewardsHead = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 9fr 1fr;
  align-items: center;
  height: 5vw;
  @media (max-device-width: 480px){
    height: auto;

  }
`

export const RewardsValues=  styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  
  @media (max-device-width: 480px){
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
`

export const ManageButton = styled.button`
  border: none;
  width: 100%;
  border-radius: 1.042vw;
  background-color: #FEEFB5;
  color: #333;
  margin-top: 1vw;
  cursor: pointer;
  padding: 0.7vw;
  transition: 0.25s;
  &:hover{
    background-color: #F4BD50;
  }
  
  @media (max-device-width: 480px){
    font-size: 14px;
    min-height: 35px;
  }
`
export const RewardsBlock = styled.div`
  background-color: white;
  border-radius: 1.042vw;
  @media (max-device-width: 480px){
    margin-top: 16px;
    border: 1px solid #F2F2F2;
    border-radius: 20px;
    padding: 16px;

  }

`
export const RewardsBlockContent = styled.div`
  padding: 0.8vw;
  display: grid;
  height: auto;
  grid-direction: column;
  align-items: center;
`
export const RewardsCoinname = styled.div`
font-family: 'Poppins';
font-weight: 500;
color: #272A30;
`

export const RewardsPercentage = styled.div`

font-family: 'Poppins';
font-style: normal;
font-weight: 400;
font-size: 12px;
color: #828282;

`
export const MobileRewardsContainer = styled.div`
  display: flex;
  width: 94%;
  font-size: 16px;
  flex-direction: column;
  gap: 8px;
  border-radius:26px;
  border: 1px solid #F2F2F2;;
  padding: 3%;
  box-sizing: border-box;
  margin: 3%;
`
export const RewardsContainer = styled.div`
  padding: 0.7vw;
  height: min-content;
  width: 57.75vw;
  margin-right: 2.8vw;
  border-radius: 1.042vw;
  border: 1px solid white;
  display: grid;
  grid-template-columns: 1fr 2fr 3fr 3fr 3fr;
  font-size: 1vw;
  gap: 0.75vw;
`

export const PurpleRewards = styled.div`
  background-color: #DEC9FF;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1.042vw;
  height: 100%;
  
  @media (max-device-width: 480px){
    width: 50px;
    height: 50px;
  }
  & svg {
    @media (max-device-width: 480px){
      width: 5vw;
      height: 5vw;
    }
  }
`

export const RewardsContent = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;

`


export const FarmsWrapper = styled.div`
  flex-direction: column;
  margin-top: 0.365vw;
  display: flex;
  width: 100%;
  @media (max-device-width: 480px){
    background-color: white;
    box-sizing: border-box;
    padding-bottom: 64px;

  }
  
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

export const Balance = styled.span`
  margin-top: 1.615vw;
  font-family: 'Poppins';
  line-height: 2.813vw;
  font-size: 1.875vw;
  font-weight: 600;
  color: #333;
  
  @media (max-device-width: 480px){
    font-size: 16px;
    text-align: center;
    width: 100%;
    margin-bottom: 12px;
  }
`;

export const HDiv = styled.div`
  justify-content: ${(props) => props.justifyContent};
  margin-top: ${(props) => props.mt};
  align-items: ${(props) => props.alignItems};
  flex-direction: row;
  display: flex;
  
  @media (max-device-width: 480px){
    flex-direction: column;
  }
`;

export const VDiv = styled.div`
  flex-direction: column;
  display: flex;
  
  @media (max-device-width: 480px){
    width: 100%;

  }
`;

export const Text = styled.span`
  margin-left: ${(props) => props.ml};
  min-width: ${(props) => props.minW};
  font-family: 'Poppins';
  font-weight: 300;
  font-size: 0.938vw;
  line-height: 1.406vw;
  color: #4f4f4f;
  @media (max-device-width: 480px){
    font-size: 14px;

  }
`;

export const TotalHarvestedInfo = styled.div`
  padding: 0.677vw 1.302vw 0.469vw 1.25vw;
  flex-direction: column;
  border-radius: 1.042vw;
  font-family: 'Poppins';
  background: #e4ddef;
  height: 4.479vw;
  width: 15.469vw;
  display: flex;

  span {
    color: #4f4f4f;
    text-align: right;
    line-height: 1.094vw;
    font-size: 0.729vw;
  }

  div {
    background: #fff;
    margin: 0.415vw 0;
    height: 0.052vw;
    width: 12.917vw;
  }

  b {
    line-height: 1.406vw;
    text-align: right;
    font-size: 0.938vw;
    font-weight: 500;
    color: #333;
  }
`;

export const RewardBtn = styled.button`
  margin-top: 0.625vw;
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

export const FarmsTableWrapper = styled.div`
  width: 81.302vw;
  margin-top: 0.365vw;
  flex-direction: column;

  border-radius: 1.042vw;
  overflow-x: hidden;
  overflow-y: ${props => props.overflow ?? 'auto'};
  display: flex;

  &::-webkit-scrollbar {
    display: none;
  }
  @media (max-device-width: 480px){
    width: 100%;
}
`;
