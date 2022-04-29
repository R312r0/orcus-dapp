import styled from 'styled-components';

export const LayoutWrapper = styled.div`
  flex-direction: row;
  display: flex;
  @media (max-device-width: 480px){
    flex-direction: column;
    width: 100%;
    box-sizing: border-box;
  }
`;

export const Content = styled.main`
  padding: 1.198vw 2.031vw 1.198vw 2.448vw;
  margin: 1.302vw 1.042vw 1.302vw 0;
  flex-direction: row;
  border-radius: 3.125vw;
  background: #f6f6f6;
  height: 44.271vw;
  width: 84.323vw;
  display: flex;
  @media (max-device-width: 480px){
    width: auto;
    box-sizing: border-box;
    overflow: hidden;
    height: auto;
    margin-left: 3%;
    margin-right: 3%;
    background-color: #fff;
    margin-top: 5%;
    border-radius: 12vw;
  }
`;
