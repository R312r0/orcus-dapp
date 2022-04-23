import styled from 'styled-components';


export const RewardsValues=  styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`

export const ManageButton = styled.button`
  border: none;
  width: 100%;
  border-radius: 1.042vw;
  background-color: #FEEFB5;
  color: #333;
  margin-top: 1.8vw;
  cursor: pointer;
  padding: 0.7vw;
  transition: 0.25s;
  &:hover{
    background-color: #F4BD50;
  }
`
export const RewardsBlock = styled.div`
  background-color: white;
  border-radius: 1.042vw;
`
export const RewardsBlockContent = styled.div`
  padding: 0.8vw;
  display: grid;
  grid-direction: column;
  align-items: center;
`

export const RewardsContainer = styled.div`
  padding: 0.7vw;
  height: 10vw;
  width: 200px;
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
`;

export const HeadingText = styled.span`
  font-family: 'Poppins';
  line-height: 1.875vw;
  font-size: 1.25vw;
  font-weight: 500;
  color: #333;
`;

export const Balance = styled.span`
  margin-top: 1.615vw;
  font-family: 'Poppins';
  line-height: 2.813vw;
  font-size: 1.875vw;
  font-weight: 600;
  color: #333;
`;

export const HDiv = styled.div`
  justify-content: ${(props) => props.justifyContent};
  margin-top: ${(props) => props.mt};
  align-items: ${(props) => props.alignItems};
  flex-direction: row;
  display: flex;
`;

export const VDiv = styled.div`
  flex-direction: column;
  display: flex;
`;

export const Text = styled.span`
  margin-left: ${(props) => props.ml};
  min-width: ${(props) => props.minW};
  font-family: 'Poppins';
  font-weight: 300;
  font-size: 0.938vw;
  line-height: 1.406vw;
  color: #4f4f4f;
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
  overflow-y: auto;
  display: flex;

  &::-webkit-scrollbar {
    display: none;
  }
`;
