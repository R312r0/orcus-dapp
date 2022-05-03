import styled from 'styled-components';


export const ToggleBtn = styled.div`
  background-color: ${(props) => (props.isActive ? '#333' : 'transparent')};
  font-weight: ${(props) => (props.isActive ? 500 : 400)};
  color: ${(props) => (props.isActive ? '#fff' : '#333')};
  transition: 0.3s background-color;
  font-family: 'Poppins';
  cursor: pointer;
  padding: 0 1.25vw;
  font-size: 0.938vw;
  line-height: 1.406vw;
  border-radius: 1.042vw;
  align-items: center;
  height: 2.135vw;
  display: flex;
  
  @media (max-device-width: 480px){
    background-color: ${(props) => (props.isActive ? '#fff' : '#f2f2f2')};
    color: #333;
    font-size: 14px;
    width: 50%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 42px;
    border-radius: 12vw;
    line-height: 16px;
    margin: 0;
    padding: 0;
  }
  
`;



export const ToggleBtnWrapper = styled.div`
  margin-left: 24.792vw;
  margin-top: 2.135vw;
  align-items: center;
  display: flex;
  @media (max-device-width: 480px){
    background-color: #F2F2F2;
    margin: 0;
    border-radius: 12vw;
    padding: 4px;
  }
  
`;
export const DashboardWrapper = styled.div`
  flex-direction: row;
  display: flex;
  @media (max-device-width: 480px){
    flex-direction: column;
    width: 100%;
  }
`;

export const InfoBlockWrapper = styled.div`
  flex-direction: column;
  display: flex;
  @media (max-device-width: 480px){
    width: 100%;
  }
`;

export const BuyBlockWrapper = styled.div`
  flex-direction: column;
  margin-left: 1.667vw;
  margin-top: 2.969vw;
  display: flex;
  @media (max-device-width: 480px){
    width: 100%;
    margin: 0;
  }
`;

export const TableWrapper = styled.div`
  margin-top: 0.729vw;
  flex-direction: row;
  display: flex;
  @media (max-device-width: 480px){
    flex-direction: column;
    width: 100%;
    margin-bottom: 48px;
    margin-top: 16px;
  }
`;

export const HeadingText = styled.span`
  font-family: 'Poppins';
  line-height: 1.875vw;
  margin-left: 1.25vw;
  font-size: 1.25vw;
  font-weight: 500;
  color: #333;
  @media (max-device-width: 480px){
    font-size: 16px;
    line-height: 32px;
    padding-top: 24px !important;
    padding-bottom: 24px !important;
    background-color: white;
    text-align: center;
    width: 100%;
    margin: 0;
  }
`;
