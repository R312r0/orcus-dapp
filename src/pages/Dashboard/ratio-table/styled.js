import styled from 'styled-components';

export const RatioTableWrapper = styled.div`
  padding: 1.51vw 2.552vw 1.979vw 1.042vw;
  border-radius: 1.042vw;
  margin-left: 1.042vw;
  background: #d5ecd8;
  height: 11.042vw;
  width: 16.094vw;
  @media (max-device-width: 480px){
    width: 100%;
    height: auto;
    margin-top: 16px;
    box-sizing: border-box;
    padding-right: 0;
    padding-top: 16px;
    padding-bottom: 16px;
    margin-left: 0;
  }
`;

export const IconWrapper = styled.div`
  justify-content: center;
  border-radius: 0.833vw;
  margin-right: 0.833vw;
  background: #6fcf97;
  align-items: center;
  height: 2.708vw;
  width: 2.708vw;
  display: flex;
  @media (max-device-width: 480px){
    height: 8.708vw;
  width: 8.708vw;
  }

  svg {
    stroke: ${(props) => props.stroke};
    fill: ${(props) => props.fill};
    height: 1.563vw;
    width: 1.563vw;
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
    line-height: 15px;
  }

  b {
    @media (max-device-width: 480px){
      font-size: 18px;
      line-height: 18px;
    }
    line-height: 1.25vw;
    font-size: 0.833vw;
    font-weight: 500;
    color: #333;
  }
`;
