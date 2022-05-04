import styled from 'styled-components';

export const MintRedeemWrapper = styled.div`
  flex-direction: column;
  display: flex;
  @media (max-device-width: 480px){
    width: 100%;
    background-color: #F6F6F6;
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
    text-align: center;
    background-color: white;
    width: 100%;
    margin: 0;
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
    border-radius: 16px;
    padding: 4px;
  }
`;

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
  &:hover{
    background-color: ${props => props.isActive ? '#333' : '#c4c4c4'}
  }
  
  @media (max-device-width: 480px){
    background-color: ${(props) => (props.isActive ? '#fff' : '#f2f2f2')} !important;
    color: #333;
    font-size: 14px;
    width: 50%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 42px;
    border-radius: 16px;
    line-height: 16px;
    margin: 0;
    padding: 0;
  }
  
`;

export const TabWrapper = styled.div`
  flex-direction: row;
  margin-left: 10.573vw;
  margin-top: 1.354vw;
  display: flex;
  @media (max-device-width: 480px){
    flex-direction: column;
    background-color: #f6f6f6;
    margin: 0;
  }
`;
