import styled from 'styled-components';
// 
export const ORUTableWrapper = styled.div`
  padding: 1.302vw 2.031vw 1.042vw 2.083vw;
  flex-direction: column;
  border-radius: 1.042vw;
  background: #fff;
  height: 18.854vw;
  width: 20.521vw;
  display: flex;
  @media (max-device-width: 480px){
    height: auto;
    padding: 8%;
    margin: 0;
    width: 100%;
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    padding-bottom: 32px;
  }
`;

export const HDiv = styled.div`
  margin-top: ${(props) => props.mt};
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  display: flex;
  @media (max-device-width: 480px){
    gap: 8px;
    height: 40px;
  }
`;

export const IconWrapper = styled.div`
  height: 2.24vw;
  width: 3.021vw;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    height: 2.344vw;
    width: 2.344vw;
    stroke: #000;
    fill: #000;
    @media (max-device-width: 480px){
      height: 6.344vw;
      width: 6.344vw;
    }
  }
  @media (max-device-width: 480px){
    width: 6vw;
    height: 4vw;
  }
`;

export const TokenPrice = styled.span`
  font-family: 'Poppins';
  line-height: 1.875vw;
  font-size: 1.25vw;
  font-weight: 500;
  @media (max-device-width: 480px){
    font-size: 18px;
    line-height: 16px;
  }
`;

export const VDiv = styled.div`
  flex-direction: column;
  display: flex;
`;

export const Text = styled.span`
  font-family: ${(props) => props.fontFamily ?? 'Poppins'};
  margin-left: ${(props) => props.ml};
  margin-top: ${(props) => props.mt};
  line-height: 1.094vw;
  font-size: 0.729vw;
  font-weight: 400;
  color: #828282;
  

  @media (max-device-width: 480px){
    font-size: 14px;
    font-weight: 400;
  }
  b {
    line-height: 1.094vw;
    font-size: 0.729vw;
    @media (max-device-width: 480px){
      font-size: 14px;
      font-weight: 500;
    }
    font-weight: ${(props) => props.fontWeight ?? 500};
    color: #333;
  }
`;

export const Divider = styled.div`
  margin: ${(props) => props.margin};
  background: #f2f2f2;
  width: 16.406vw;
  height: 0.052vw;
  
`;

export const AddBtn = styled.button`
  padding-left: 1.042vw;
  border: 0.052vw solid;
  border-color: #e0e0e0;
  border-radius: 1.563vw;
  align-items: center;
  font-size: 0.833vw;
  background: #fff;
  cursor: pointer;
  height: 2.135vw;
  width: 8.073vw;
  color: #4f4f4f;
  display: flex;
  @media (max-device-width: 480px){
    width: 100%;
    height: 40px;
    padding: 6px 10px;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 30px;
    gap: 6px;
  }

  &:hover {
    transition: 0.3s all;
    border-color: #4f4f4f;
  }

  svg {
    @media (max-device-width: 480px){
      height: 3vw;
      width: 3vw;
      margin: 0;
    }
    margin-left: 1.042vw;
    margin-right: 0.885vw;
    height: 1.25vw;
    width: 1.25vw;
    stroke: #4f4f4f;
  }
`;

export const BuyBtn = styled.button`
  padding-left: 1.667vw;
  border-radius: 1.563vw;
  align-items: center;
  font-size: 0.833vw;
  background: #333;
  cursor: pointer;
  height: 2.135vw;
  width: 8.073vw;
  display: flex;
  border: none;
  color: #fff;
  @media (max-device-width: 480px){
    width: 100%;
    height: 40px;
    padding: 6px 10px;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 30px;
    gap: 6px;
  }

  &:hover {
    transition: 0.3s all;
    background: black;
  }

  svg {
    @media (max-device-width: 480px){
      height: 3vw;
      width: 3vw;
      margin: 0;
    }
    margin-left: 1.042vw;
    margin-right: 0.885vw;
    height: 1.25vw;
    width: 1.25vw;
    fill: #fff;
  }
`;

export const LastUpdatedData = styled.span`
  line-height: 0.938vw;
  margin-top: 1.979vw;
  font-size: 0.625vw;
  align-self: center;
  color: #828282;
`;
