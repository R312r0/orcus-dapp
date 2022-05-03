import styled from 'styled-components';

export const TVLChartWrapper = styled.div`
  padding: 1.563vw 3.542vw 1.302vw 3.542vw;
  flex-direction: column;
  border-radius: 1.042vw;
  margin-top: 1.042vw;
  background: #fff;
  height: 26.667vw;
  width: 62.135vw;
  display: flex;
  @media (max-device-width: 480px){
    width: 100%;
    height: auto;
    // background: #f6f6f6;
    margin-top: 0;
    border: none;
    border-radius: 0;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    overflow: hidden;
    padding-left: 3%;
    padding-right: 3%;
    margin-bottom: 16px;
    background-color: white;
  }
`;

export const HDiv = styled.div`
  margin-top: ${(props) => props.mt};
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  display: flex;
`;

export const IconWrapper = styled.div`
  svg {
    height: 2.344vw;
    width: 2.344vw;
    stroke: #000;
    fill: #000;
  }
`;

export const TokenPrice = styled.span`
  font-family: 'Poppins';
  line-height: 1.875vw;
  font-size: 1.25vw;
  font-weight: 500;
`;

export const VDiv = styled.div`
  flex-direction: column;
  display: flex;
`;

export const Text = styled.span`
  font-family: ${(props) => props.fontFamily ?? 'Poppins'};
  margin-left: ${(props) => props.ml};
  margin-top: ${(props) => props.mt};
  line-height: 1.875vw;
  font-size: 1.25vw;
  font-weight: 600;
  color: #333;
  @media (max-device-width: 480px){
    font-size: 14px;
    line-height: 17px;
  }

  b {
    @media (max-device-width: 480px){
      font-size: 18px;
      line-height: 21px;
    }
    line-height: 2.813vw;
    font-size: 1.875vw;
    font-weight: 500;
    color: #333;
  }
`;

export const DateData = styled.span`
  line-height: 1.406vw;
  font-size: 0.938vw;
  color: #828282;
`;

export const AreaChartWrapper = styled.div`
  margin-top: 0.26vw;
  /* padding: 2vw; */
  /* background: teal; */
  height: 17.448vw;
  width: 55.052vw;
  @media (max-device-width: 480px){
    width: 100%;
    
    // background: #f6f6f6;
    background-color: white;
    height: 300px;
  }
`;

// export const AddBtn = styled.button`
//   border: 0.052vw solid;
//   border-color: #e0e0e0;
//   border-radius: 1.563vw;
//   align-items: center;
//   font-size: 0.833vw;
//   background: #fff;
//   cursor: pointer;
//   height: 2.135vw;
//   width: 8.073vw;
//   color: #4f4f4f;
//   display: flex;

//   &:hover {
//     transition: 0.3s all;
//     border-color: #4f4f4f;
//   }

//   svg {
//     margin-left: 1.042vw;
//     margin-right: 0.885vw;
//     height: 1.25vw;
//     width: 1.25vw;
//     stroke: #4f4f4f;
//   }
// `;

// export const BuyBtn = styled.button`
//   border-radius: 1.563vw;
//   align-items: center;
//   font-size: 0.833vw;
//   background: #000;
//   cursor: pointer;
//   height: 2.135vw;
//   width: 8.073vw;
//   display: flex;
//   border: none;
//   color: #fff;

//   &:hover {
//     transition: 0.3s all;
//     background: #333;
//   }

//   svg {
//     margin-left: 1.042vw;
//     margin-right: 0.885vw;
//     height: 1.25vw;
//     width: 1.25vw;
//     fill: #fff;
//   }
// `;

// export const LastUpdatedData = styled.span`
//   line-height: 0.938vw;
//   margin-top: 1.979vw;
//   font-size: 0.625vw;
//   align-self: center;
//   color: #828282;
// `;
