import styled from 'styled-components';

export const ProtocolTableWrapper = styled.div`
  padding: 1.354vw 2.865vw;
  border-radius: 1.042vw;
  background: #f5efd7;
  height: 11.042vw;
  width: 27.813vw;
  @media (max-device-width: 480px){
    width: 100%;
    height: auto;
    margin-top: 16px;
    padding-top: 16px;
    padding-bottom: 16px;
  }
`;

export const HDiv = styled.div`
  margin-top: ${(props) => props.mt};
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  display: flex;
  
`;

export const Text = styled.span`
  font-family: 'Poppins';
  line-height: 1.25vw;
  font-size: 0.833vw;
  font-weight: 400;
  color: #828282;
  @media (max-device-width: 480px){
    font-size: 14px;
    line-height: 16px;
  }

  b {
    @media (max-device-width: 480px){
      font-size: 18px;
      line-height: 19px;
    }
    line-height: 1.406vw;
    font-size: 0.938vw;
    font-weight: 500;
    color: #333;
  }
`;

export const Divider = styled.div`
  background: #e6dfc7;
  margin: 0.521vw 0;
  width: 21.823vw;
  height: 0.052vw;
  @media (max-device-width: 480px){
    width: 100%;
    height: 1px;
  }
`;
