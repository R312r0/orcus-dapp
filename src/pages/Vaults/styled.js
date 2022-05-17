import styled from 'styled-components'

export const VaultsWrapper = styled.div`
flex-direction: column;
display: flex;
width: 100%;
`;

export const GreyText = styled.span`
  font-family: 'Poppins';
  font-size: ${props => props.fs ?? '0.73vw'};
  color: #828282;
  margin-top: 0.38vw;

`

export const TopIconWrapper = styled.div`
  height: 2.08vw;
  width: 2.08vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.bg ?? 'white'};
  border-radius: 0.41vw;
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

export const TopWrapper = styled.div`
  width: 100%;
  background: none;
  // background-color: black;
  border: 1px solid white;
  border-radius: 1.56vw;
  // border-radius: 26px;
  margin-top: 1.25vw;
  display: flex;
  align-items: center;
  height: 5.44vw;
  padding: 0.68vw;
  gap: 0.83vw;
`
export const LargeTopCard = styled.div`
  width: 47vw;
  background-color: white;
  border-radius: 1.06vw;
  height: 4.07vw;
  margin-left: 0.8vw;
  display: flex;
  align-items: center;
  text-align: center;
  font-size: 0.94vw;
  font-family: 'Poppins';
`

export const SmallTopCard = styled.div`
  width: 10.82vw;
  height: 4.07vw;
  background-color: white;
  border-radius: 1.06vw;
  display: flex;
  align-items: center;
  padding-top: 1vw;
  padding-bottom: 1vw;
  padding-left: 1.19vw;
  padding-right: 1.19vw;
  font-family: 'Poppins';
  font-size: 0.86vw;
  line-height: 0.86vw;
  gap: 0.68vw;

`
export const VaultsTable = styled.div`
  width: 100%;
  background-color: white;
  border-radius: 1.06vw;
  height: 29.48vw;
  margin-top: 1.02vw;
  padding: 1.02vw;
`

export const VaultsTableTopbar = styled.div`
  padding: 1.22vw;
  display: flex;
  height: 2.809vw;
  justify-content: space-between;
  padding: 0;
`

export const TopbarOptions = styled.div`
  display: flex;
  height: 2.809vw;
  background: #FCFCFD;
  width: 36.16vw;
  border-radius: 0.93vw;
  align-items: center;
  border: 1px solid #F2F2F2;
  padding-left: 0.07vw;
  padding-right: 0.07vw;
`

export const TopbarOption = styled.button`
  border: none;
  border-radius: 0.84vw;
  background-color: ${props => props.active ? 'white' : '#FCFCFD'};
  color: ${props => props.active ? '#333' : '#4F4F4F'};
  width: 8.96vw;
  font-family: 'Poppins';
  height: 2.509vw;
  font-size: 0.75vw;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.15s;
  box-shadow: ${props => props.active ? '0px 4px 20px rgba(0, 0, 0, 0.04)' : 'none'};
  
`

export const FilterContainer = styled.div`
  height: 2.809vw;
  width: 7.97vw;
  background-color: #FCFCFD;
  display: flex;
  align-items: center;
  font-size: 0.75vw;
  padding-left: 1.45vw;
  border: 1px solid #F2F2F2;
  padding-right: 1.05vw;
  border-radius: 0.94vw;
  box-sizing: border-box;
  justify-content: space-between;
`
export const SortByContainer = styled.div`
  height: 2.809vw;
  width: 13.28vw;
  background-color: #FCFCFD;
  padding-left: 1.45vw;
  justify-content: space-between;
  font-family: 'Poppins';
  color: #333;
  border: 1px solid #F2F2F2;
  box-sizing: border-box;
  padding-right: 1.45vw;
  display: flex;
  align-items: center;
  font-size: 0.75vw;
  border-radius: 0.94vw;
`

export const SearchRow = styled.div`
  width: 100%;
  margin-top: 1.02vw;
  height: 2.809vw;
  display: flex;
`

export const SearchContainer = styled.div`
  height: 2.809vw;
  width: 16.17vw;
  background: #FCFCFD;
  border-radius: 0.94vw;
  box-shadow: inset 0px 4px 16px rgba(197, 197, 197, 0.25);
  display: grid;
  grid-template-columns: 10fr 2fr;
  font-size: 0.84vw;
  align-items: center;
  font-family: 'Poppins';
  padding-left: 1.42vw;
  & input::placeholder{
    color :#BDBDBD;
  }
`

export const VaultsContainer = styled.div`
  width: 26.68vw;
  height: 2.809vw;
  border: 1px solid #F2F2F2;
  border-radius: 1.25vw;
  background: #FCFCFD;
  margin-left: 2vw;
  padding: 0.26vw;
  display: flex;
  align-items: center;
`

export const VaultItem = styled.button`
  height: 2.1365vw;
  
  width: 8.7vw;
  background: ${ props => props.active ? '#333' : 'none'};
  color: ${ props => props.active ? 'white' : '#4F4F4F'};
  font-size: 0.72vw;
  cursor: pointer;
  transition: all 0.1s;
  border-radius: 1.04vw;
`
export const HDivider = styled.div`
  width: 100%;
  height: 1px;
  margin-top: ${props => props.marginTop ?? '1.14vw'};
  margin-bottom: ${props => props.marginBottom ?? '1.14vw'};
  background-color: #F2F2F2;
`

export const VDivider = styled.div`
  width: 1px;
  height: ${props => props.height ?? '55%'};
  background-color: #F2F2F2;
`

export const VaultTableHeader = styled.div`
  display: flex;
  height: 2.709vw;
  align-items: center;
  width: 100%;
  padding-left: 2.18vw;
`

export const VaultTableContent = styled.div`
  display: grid;
  grid-template-columns: 6fr 3fr 3fr 2fr 2fr 2fr 3fr;
  align-items: center;
  width: 100%;
  font-size: 0.72vw;
  color: #4F4F4F;
`
export const VaultItemContent = styled.div`
display: grid;
  grid-template-columns: 6fr 3fr 3fr 2fr 2fr 2fr 3fr;
  align-items: center;
  width: 100%;
  font-size: 0.93vw;
  font-weight: 500;
  color: #333;
`
export const VaultTableItem = styled.div`
  

  display: flex;
height: 5.36vw;
align-items: center;
width: 100%;
padding-left: 2.18vw;
border-bottom: 
`

export const FontSize = styled.span`
  font-size: ${props => props.fs};
  
`

export const LightText =styled.span`
font-weight: 300;
`


export const GetBtn = styled.button`
  width: 4.53vw;
  height: 2.13vw;
  border-radius: 1.56vw;
  background: none;
  background-color: transparent;
  border: 1px solid #F2F2F2;
  color: #4F4F4F;
  transition: all 0.1s;
  cursor: pointer;
  &:hover{
    background-color: #333;
    color: white;
  }
`