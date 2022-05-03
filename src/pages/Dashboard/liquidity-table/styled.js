import styled from 'styled-components';

export const LiquidityTableWrapper = styled.div`
  padding: 1.51vw 2.552vw 1.979vw 1.042vw;
  border-radius: 1.042vw;
  margin-left: 1.042vw;
  background: #e4ddef;
  height: 11.042vw;
  width: 16.094vw;
  @media (max-device-width: 480px){
    width: 100%;
    box-sizing: border-box;
    margin-top: 16px;
    padding-left: 5%;
    padding-right: 5%;
    height: auto;
    padding-top: 8px;
    padding-bottom: 8px;
    border-radius: 20px;
    margin-left: 0;
  }
`;

export const IconWrapper = styled.div`
  justify-content: center;
  border-radius: 0.833vw;
  margin-right: 0.833vw;
  background: #bb6bd9;
  align-items: center;
  height: 2.708vw;
  width: 2.708vw;
  display: flex;
  @media (max-device-width: 480px){
    height: 12.708vw;
    width: 12.708vw;
    border-radius: 16px;
  }

  svg {
    fill: ${(props) => props.fill};
    height: 1.563vw;
    width: 1.563vw;
    stroke: #fff;
    @media (max-device-width: 480px){
      height: 6.408vw;
      width: 6.408vw;
    }
  }
`;

export const HDiv = styled.div`
  margin-top: ${(props) => props.mt};
  align-items: center;
  flex-direction: row;
  display: flex;
  @media (max-device-width: 480px){
    width: min-content;
    white-space: nowrap;
    margin-top: 24px;
    margin-bottom: 24px;
    gap: 16px;
  }
`;

export const VDiv = styled.div`
  flex-direction: column;
  display: flex;
`;

export const Text = styled.span`
  margin-top: ${(props) => props.mt};
  font-family: 'Poppins';
  line-height: 1.094vw;
  font-size: 0.729vw;
  font-weight: 400;
  color: #828282;
  @media (max-device-width: 480px){
    font-size: 14px;
    line-height: 16px;
  }

  b {
    line-height: 1.25vw;
    font-size: 0.833vw;
    font-weight: 500;
    color: #333;
    @media (max-device-width: 480px){
      font-size: 18px;
      line-height: 18px;
    }
  }
`;
