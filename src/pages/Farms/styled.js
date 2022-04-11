import styled from 'styled-components';

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
