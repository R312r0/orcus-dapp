import styled from 'styled-components';

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
    display: none;
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
    margin-top: 24px !important;
    margin-bottom: 24px !important;
    text-align: center;
    width: 100%;
    margin: 0;
  }
`;
