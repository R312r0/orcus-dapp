import styled from 'styled-components';

export const SwapPoolWrapper = styled.div`
  flex-direction: column;
  display: flex;
  width: 100%;
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
    margin-top: 24px !important;
    margin-bottom: 24px !important;
    text-align: center;
    width: 100%;
    margin: 0;
  }
`;

export const ToggleBtnWrapper = styled.div`
  margin-left: 35.792vw;
  margin-top: 2.135vw;
  align-items: center;
  display: flex;
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
`;

export const TabWrapper = styled.div`
  flex-direction: row;
  margin-left: 20.573vw;
  margin-top: 1.354vw;
  display: flex;
`;
