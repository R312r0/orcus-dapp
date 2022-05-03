import styled from 'styled-components';

export const RecollateralizeWrapper = styled.div`
  flex-direction: row;
  display: flex;
  @media (max-device-width: 480px){
    
    width: 100%;
    background-color: #F6F6F6;
  }
`;
export const RecollateralizeContent = styled.div`
  display: flex;
`
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
    width: 100%;
    margin: 0;
    background-color: white;
  }
`;


export const StakingWrapper = styled.div`
  flex-direction: column;
  display: flex;
  @media (max-device-width: 480px){
    width: 100%;

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

export const TabWrapper = styled.div`
  flex-direction: row;
  margin-left: 10.573vw;
  display: flex;
  margin-top: 5.537vw ;
  @media (max-device-width: 480px){
    width: 100%;
    flex-direction: column;
    margin-left: 0;
    margin-top: 0;
    // padding-top: 24px;
    // background-color: white;

  }
`;


export const RecollateralizeBlockWrapper = styled.div`
  padding: 1.615vw 2.969vw 3.333vw 2.969vw;
  height: 32.865vw;
  width: 38.385vw;
  flex-direction: column;
  display: flex;
  background: #fff;
  border-radius: 1.042vw;
  @media (max-device-width: 480px){
    width: 100%;
    height: auto;
    padding-top: 48px;
    padding-bottom: 24px;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;

  }
  
`;

export const HDiv = styled.div`
  margin-top: ${(props) => props.mt};
  margin-right: 0.833vw;
  margin-left: 0.833vw;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  display: flex;
  @media (max-device-width: 480px){
    height: ${props => props.h ?? 'auto'};
  }
`;

export const Text = styled.span`
  font-family: 'Poppins';
  line-height: 1.406vw;
  font-size: 0.938vw;
  font-weight: ${props => props.fontWeight ?? '300'};
  color: #4f4f4f;
  @media (max-device-width: 480px){
    font-size: ${props => props.fS ?? '12px'};
    line-height: 16px;
  }
  b {
    @media (max-device-width: 480px){
      font-size: 16px;
      line-height: 16px;
    }
    font-weight: 600;
    font-size: 1.25vw;
    line-height: 1.875vw;
    color: #333;
  }
`;

export const PercentageContainer = styled.div`
  padding: 0.729vw 1.563vw 0.521vw 0;
  background: #e4ddef;
  border-radius: 1.042vw;
  height: 3.125vw;
  width: 12.135vw;
  display: flex;
  justify-content: flex-end;
`;

export const RecollateralizeInputWrapper = styled.div`
  /* margin-top: ${(props) => props.mt}; */
  background: ${(props) => (props.withBtn ? '#FCFCFD' : '#F5EFD7')};
  box-shadow: ${(props) =>
    props.withBtn
      ? 'inset 0 0.208vw 0.833vw rgba(197, 197, 197, 0.25)'
      : 'none'};
  padding: 0 0.833vw 0 1.406vw;
  flex-direction: row;
  /* justify-content: space-between; */
  border-radius: 0.625vw;
  margin-top: 0.417vw;
  height: 3.542vw;
  width: 32.448vw;
  align-items: center;
  font-family: 'Poppins';
  font-size: 0.833vw;
  font-weight: 500;
  color: #272a30;
  display: flex;
  @media (max-device-width: 480px){
    width: 100%;
    height: 44px;
    font-size: 12px;
    border-radius: 8px;
  }}

  input {
    width: ${(props) => (props.withBtn ? '18.8vw' : '24.7vw')};
    font-family: 'Poppins';
    font-size: 0.833vw;
    font-weight: 500;
    color: #272a30;
    height: inherit;
    ::placeholder {
      color: #bdbdbd;
    }
    @media (max-device-width: 480px){
      width: 90%;
      height: 32px;
      font-size: 14px;
    }
  }

  button {
    @media (max-device-width: 480px){
      height: auto;
      padding: 4px 8px;
      width: auto;
      background-color: none;
      background: none;
      color: #333;
      font-size: 14px;
    }
    border-radius: 0.521vw;
    background: #333;
    height: 1.875vw;
    width: 4.219vw;
    color: #fff;
    display: flex;
    font-size: 0.729vw;
    align-items: center;
    padding: 0 1.354vw;
    cursor: pointer;

    &:hover {
      transition: all 0.3s;
      background: #000;
      @media (max-device-width: 480px){
        background: inherit;
      }
    }
  }
`;

export const IconWrapper = styled.div`
  margin: ${(props) => props.margin};
  height: ${(props) => props.h ?? '1.250vw'};
  width: ${(props) => props.w ?? '1.250vw'};
  justify-content: center;
  align-items: center;
  align-self: center;
  display: flex;

  svg {
    fill: ${(props) => props.fill ?? '#BDBDBD'};
    /* stroke: ${(props) => props.stroke ?? '#BDBDBD'}; */
    height: inherit;
    width: inherit;
  }

  img {
    height: inherit;
    width: inherit;
  }
`;

export const Divider = styled.div`
  margin-right: 0.833vw;
  margin-left: 1.094vw;
  background: #eaebeb;
  height: 2.083vw;
  width: 0.052vw;
`;

export const HDivider = styled.div`
  background: #f2f2f2;
  margin: ${(props) => props.margin};
  height: 0.052vw;
  width: 21.146vw;
  @media (max-device-width: 480px){
    width: 100%;
    height: 1px;
  }
`;

export const RecollateralizeBtn = styled.button`
  background: #333;
  margin-top: 7.344vw;
  border-radius: 0.625vw;
  height: 3.542vw;
  width: 32.448vw;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  font-size: 0.833vw;
  color: #fff;
  align-self: center;
  cursor: pointer;
  @media (max-device-width: 480px){
    width: 100%;
    font-size: 14px;
    line-height: 14px;
    height: 48px;
    border-radius: 8px;
    margin-top: 47px;
  }
  &:hover {
    transition: all 0.3s;
    background: #000;
  }
`;

export const RecollateralizeDataWrapper = styled.div`
  padding: 2.604vw 2.188vw 2.396vw 2.188vw;
  border-radius: 1.042vw;
  flex-direction: column;
  margin-left: 3.75vw;
  background: #fff;
  height: 22.188vw;
  width: 25.573vw;
  display: flex;
  @media (max-device-width: 480px){
    margin: 0;
    width: 100%;
    padding-top: 32px;
    padding-bottom: 32px;
    height: auto;
    margin-top: 16px;
    margin-bottom: 32px;
    border-radius: 20px;
  }
`;

export const RecollateralizeDataText = styled.span`
  margin-right: ${(props) => props.mr};
  margin-left: ${(props) => props.ml};
  font-family: 'Poppins';
  line-height: 1.094vw;
  font-size: 0.729vw;
  font-weight: 400;
  color: #828282;
  @media (max-device-width: 480px){
    font-size: 14px; 
    line-height: 14px;
    
    margin-top: 8px;
    margin-bottom: 8px;
  }


  b {
    line-height: 1.094vw;
    font-size: 0.729vw;
    font-weight: 500;
    color: #333;
    @media (max-device-width: 480px){
      font-size: 14px; 
      line-height: 14px;
    }
  }
`;
