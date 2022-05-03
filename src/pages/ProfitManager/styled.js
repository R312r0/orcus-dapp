import styled from 'styled-components';



export const ExpandBtn = styled.div`
  border-radius: 0.521vw;
  background: #f2f2f2;
  width: 2.083vw;
  height: 2.083vw;
  align-items: center;
  justify-content: center;
  display: flex;
  cursor: pointer;
  @media (max-device-width: 480px){
    width: 5vw;
    height: 5vw;
    background: inherit;
  }
  svg {
    transition: 0.3s all;
    transform: ${(props) =>
      props.isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'};
    color: #828282;
    width: 1.25vw;
    height: 1.25vw;
    @media (max-device-width: 480px){
      width: 3.5vw;
      height: 3.5vw;
    }
  }

  &:hover {
    transition: 0.3s all;
    background: #e0e0e0;
    @media (max-device-width: 480px){
      background: inherit;
    }
  }
`;

export const ProfitManagerWrapper = styled.div`
  flex-direction: column;
  display: flex;
  width: 100%;
`;
export const GreyText = styled.div`
  font-size: 12px;
  color: #BDBDBD;
`
export const HistoryTableRowMobile = styled.div`
  display:flex;
  margin-top: ${props => props.mt ?? '8px'};
  align-items: center;
  justify-content: space-between;
  width: 100%;
  font-size: 14px;
  color: #4F4F4F;
  border-bottom: 1px solid #F2F2F2;
  height: 50px;
  align-items: center;
`
export const HeadingText = styled.span`
  font-family: 'Poppins';
  line-height: 1.875vw;
  font-size: 1.25vw;
  font-weight: 500;
  color: #333;
  @media (max-device-width: 480px){
    font-size: 16px;
    line-height: 80px;
    // margin-top: 24px !important;
    // margin-bottom: 24p// !important;
    text-align: center;
    width: 100%;
    margin: 0;
  }
`


export const ProfitManagerHeader = styled.div`
  width: 100%;  
  height: 144px;
  display: flex;
  @media (max-device-width: 480px){
    height: auto;
    background-color: white;
  }
`

export const Text = styled.span`
  font-family: ${(props) => props.fontFamily ?? 'Poppins'};
  margin-left: ${(props) => props.ml};
  margin-top: ${(props) => props.mt};
  line-height: 1.094vw;
  font-size: 0.729vw;
  font-weight: 400;
  color: #828282;
  @media (max-device-width: 480px){
    font-size: 12px;
    line-height: 16px;
  }

`
export const HorizontalSpaceBetween = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  @media (max-device-width: 480px){
    justify-content: center;
    text-align: center;
  }
`
export const VerticalSpaceBetween = styled.div`
display: flex;
justify-content: space-between;
height: 100%;
flex-direction: column;
@media (max-device-width: 480px){
  justify-content: center;
}
`
export const TPPLabel = styled.div`
font-family: ${(props) => props.fontFamily ?? 'Poppins'};
  font-size: 1.875vw;
  color: #333333;
  font-weight: 600;
  @media (max-device-width: 480px){
    font-size: 18px;
    line-height: 18px;
    margin-top: 4px;
  }
`

export const THRContainer = styled.div`
  height: 86px;
  width: 297px;
  background-color: #E4DDEF;
  text-align: right;
  border-radius: 20px;
`
export const THRContent = styled.div`
  padding: 13px 25px;
  display: flex;
  justify-content: space-between;
  height: 100%;
  flex-direction: column;
`

export const THRLabel = styled.div`
  font-size:0.729vw;
  color: #4F4F4F;
`

 export const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${props => props.color ?? 'white'};
 `
 export const THRValue = styled.div`
 font-size: 0.937vw;
 color: #333;
 font-weight: 600;
 `

 export const THRButton = styled.button`
  border: none;
  border-radius: 20px;
  font-size: 0.875vw;
  color: white;
  background-color: #333333;
  width :100%;
  height: 46px;
  margin-top: 12px;
 `
 export const HistoryContainer = styled.div`
  width: 100%;
  margin-top: 0.9vw;
  flex-direction: column;
  // height: 320px;
  border-radius: 1.042vw;
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  background-color: white;
  border-radius: 20px;
  &::-webkit-scrollbar {
    display: none;
  }
  @media (max-device-width: 480px){
    height: auto;
    padding-bottom 32px;
    margin-top: 0;
  }
  
`;
export const HistoryContent = styled.div`

padding-top: ${props => props.paddingTop};
padding-left: 72px;
padding-right: 72px;
@media (max-device-width: 480px){
  padding-left: 3%;
  padding-right: 3%;
  height: auto;
}
`
export const HistoryHeader = styled.div`
  font-size: 1.25vw;
  font-family: 'Poppins';
  font-weight: 500;
  color: #333333;
  @media (max-device-width: 480px){
    font-size: 18px;
    line-height: 18px;
    margin-bottom: 16px;
    font-weight: 400;
  }
`
export const HistoryTableHead = styled.div`
  margin-top: 24px;
  font-size: 0.875vw;
  color: #333333;
  font-weight: 500;
  display: grid;
  grid-template-columns: 1fr 2fr 2fr 2fr 1fr 2fr 2fr 1fr;
  padding-bottom: 8px;
  
`
export const HistoryTableRow = styled.div`
  margin-top: 8px;
  font-size: 0.729vw;
  color: #4F4F4F;
  font-weight: 500;
  display: grid;
  grid-template-columns: 1fr 2fr 2fr 2fr 1fr 2fr 2fr 1fr;
  padding-bottom: 8px;
`