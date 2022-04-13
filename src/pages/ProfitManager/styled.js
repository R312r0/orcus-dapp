import styled from 'styled-components';

export const ProfitManagerWrapper = styled.div`
  flex-direction: column;
  display: flex;
  width: 100%;
`;

export const HeadingText = styled.span`
  font-family: 'Poppins';
  line-height: 1.875vw;

  font-size: 1.25vw;
  font-weight: 500;
  color: #333;
`


export const ProfitManagerHeader = styled.div`
  width: 100%;  
  height: 144px;
  display: flex
`

export const Text = styled.span`
  font-family: ${(props) => props.fontFamily ?? 'Poppins'};
  margin-left: ${(props) => props.ml};
  margin-top: ${(props) => props.mt};
  line-height: 1.094vw;
  font-size: 0.729vw;
  font-weight: 400;
  color: #828282;
`
export const HorizontalSpaceBetween = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`
export const VerticalSpaceBetween = styled.div`
display: flex;
justify-content: space-between;
height: 100%;
flex-direction: column;
`
export const TPPLabel = styled.div`
font-family: ${(props) => props.fontFamily ?? 'Poppins'};
  font-size: 1.875vw;
  color: #333333;
  font-weight: 600;
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
  height: 320px;
  border-radius: 1.042vw;
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  background-color: white;
  border-radius: 20px;
  &::-webkit-scrollbar {
    display: none;
  }
`;
export const HistoryContent = styled.div`

padding-top: ${props => props.paddingTop};
padding-left: 72px;
padding-right: 72px;
`
export const HistoryHeader = styled.div`
  font-size: 1.25vw;
  font-family: 'Poppins';
  font-weight: 500;
  color: #333333;
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