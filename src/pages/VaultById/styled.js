import styled from 'styled-components'





export const DoubleContainer = styled.div`
    gap: 8.02vw;
    display: flex;
    align-items: space-between;
    margin-top: 0.65vw;
    & div{
        display: flex;
        // align-items: flex-start;
        flex-direction: column;
        gap: 0.5vw;
    }
`

export const MaxButton = styled.button`
    width: 4.22vw;
    height: 2vw;
    background-color: #333;
    border-radius: 0.52vw;
    color: #fff;
`
export const Input = styled.input`
    font-weight: 500;
    font-size: 0.83vw;
    font-family: 'Poppins';
    &:placeholder{
        color: #BDBDBD;
    }
`

export const InputContainer = styled.div`
    margin-top: 1.82vw;
    height: 3.38vw;
    border-radius: 0.62vw;
    background: #FCFCFD;
    box-shadow: inset 0px 4px 16px rgba(197, 197, 197, 0.25);
    display: grid;
    grid-template-columns: 2fr 8fr 4fr;
    align-items: center; 
    box-sizing: border-box;
    margin-left: 2.34vw;
    margin-right: 2.34vw;
`

export const ConnectWallet = styled.button`
margin-top: 1.14vw;
border-radius: 0.64vw;
font-weight: 500;
font-family: 'Poppins';
cursor: pointer;
width: 100%;
height: 3.54vw;
background-color: #333;
color: #fff;
`

export const AddBuyContainer = styled.div`
    display: flex;
    align-items: space-between;
    height: 2.13vw;
    font-family: 'Poppins';
    width: 100%;
    padding-left: 2.34vw;
    padding-right: 2.34vw;
    gap: 0.27vw;
    margin-top: 2.07vw;

`

export const AddButton = styled.a`
    width :11.0vw;
    height: 2.13vw;
    padding-left: 2.08vw;
    padding-right: 2.08vw;
  text-decoration: none;
  display: flex;
    gap: 0.47vw;
    align-items: center;
    justify-content: center;
    border: 1px solid #E0E0E0;
    border-radius: 1.56vw;
    background-color: #fff;
    color: #333;
    cursor: pointer;
`
export const BuyButton = styled.a`
    width :11.1vw;
    height: 2.13vw;
  text-decoration: none;
    padding-left: 2.08vw;
    padding-right: 2.08vw;
      display: flex;
      gap: 0.47vw;
    align-items: center;
    justify-content: center;
    border-radius: 1.56vw;
    color: #fff;
    background-color: #333;
    cursor: pointer;
`

export const Field = styled.div`
    width: 100%;
    font-size: 0.84vw;
    color: #333;
    display: flex;
    align-items: center;
    gap: 1.4vw;
`
export const FieldInput = styled.input`

`
export const Fieldset = styled.fieldset`
    background-color: white;
    display: flex;
    flex-direction: column;
    border: none;
    padding-left: 1.84vw;
    padding-right: 1.84vw;
    gap: 0.76vw;
`
export const DWButton = styled.button`
    width: 49%;
    height: 2.39vw;
    color: ${props => props.active ? '#333' : '#828282'};
    background-color: ${props => props.active ? '#fff' : '#FCFCFD'};
    cursor: pointer;
    border-radius: 0.83vw;
    box-shadow: ${props => props.active ? '0px 4px 20px rgba(0, 0, 0, 0.04)' : ''};

`

export const DWContainer = styled.div`
    width: 100%;
    background: #FCFCFD;
    border-radius: 0.94vw;
    border: 1px solid #F2F2F2;
    height: 2.709vw;
    display: flex;
    gap: 0;
    align-items: center;
    justify-content: space-around;
`

export const VidWrapper = styled.div`
flex-direction: column;
display: flex;
width: 100%;
overflow: scroll;
`;

export const VidTopBar = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
`

export const WhiteBorderBar = styled.div`
    display: flex;
    width: 100%;
    margin-top: 1.45vw;
    height: 5.31vw;
    align-items: center;
    padding-left: 0.67vw;
    padding-right: 0.67vw;
    border-radius: 1.35vw;
    border: 1px solid white;
    gap: 1.19vw;
`

export const Font = styled.span`

    margin: 0;
    padding: 0;
    font-size: ${props => props.fs ?? '1vw'};
    line-height: ${props => props.fs ?? '1.04vw'};
    color: ${props => props.color ?? '#333'};
    font-weight: ${props => props.fw ?? '400'};
`

export const WhiteBorderItem = styled.div`
    background-color: ${props => props.bg ?? 'white'};
    width: 18.675vw;
    // max-height: 2.06vw;
    border-radius: 1.04vw;
    padding: 0.83vw 1.71vw;
    margin-top: 0.67vw;
    margin-bottom: 0.67vw;
    font-family: 'Poppins';
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    line-height: 1.04vw;
    justify-content: center;
`

export const WhiteBorderItemLarge = styled.div`
    background-color: ${props => props.bg ?? 'white'};
    width: 26.2115vw;
    height: 4.06vw;
    border-radius: 1.04vw;
    padding: 0.83vw 1.71vw;
    font-family: 'Poppins';
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    line-height: 1.04vw;
    justify-content: space-between;
    align-items: center;
`

export const VDivider = styled.div`
    width :1px;
    height:80%;
    background-color: #F2F2F2;
`


export const HDivider = styled.div`
    width :100%;
    height: 1px;
    background-color: #F2F2F2;
    margin-top: ${props => props.mt ?? '0'};
    margin-bottom: ${props => props.mb ?? '0'};
`

// VIDLayout, VIDLeftColumn, VidRightColumn


export const VIDLayout = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 1.25vw;
`

export const VIDLeftColumn = styled.div`
    display: flex;
    width: 57.1615vw;
    flex-direction: column;
    gap: 1.45vw;

`
export const VidRightColumn = styled.div`
    width: 26.0115vw;
    display: flex;
    flex-direction: column;
`

export const VidBlock = styled.div`
    width: 100%;
    border-radius: 1.04vw;
    background-color: white;
    height: ${props => props.height};
    display: flex;
    flex-direction: column;
`
export const VidBlockContent = styled.div`
`
export const VidBlockHeader = styled.div`
    height: 4.74vw;
    display: flex;
    justify-content: center;
    padding-left: 2.34vw;
    padding-right: 2.34vw;
    flex-direction: column;
`

// LinksRow, VidRowText,
export const LinksRow = styled.div`
    margin-top: ${props => props.mt};
    padding-left: 2.34vw;
    display: flex;
    gap: 2.6vw;
    color: #333;
    font-size: 0.72vw;
    align-items: center;
    font-weight: 300;
    padding-top: 1.25vw;
    padding-bottom: 1.25vw;
    & a{
        display: flex;
        align-items: center;
        color: #333;
        text-decoration: none;
        gap: 0.2vw;
    }
    & a:hover{
        text-decoration: underline;
    }
`



export const VidBlockText = styled.div`
    margin-top: ${props => props.mt};
    padding-left: 2.34vw;
    padding-right: 3.34vw;
    font-size: 0.83vw;
    line-height: 1.5vw;
    font-family: 'Poppins';
`



export const GraphMenuContainer = styled.div`
    width: 15vw;
    height: 2.7vw;
    border-radius: 0.94vw;
    border: 1px solid #F2F2F2;
    background: #FCFCFD;
    align-items: center;
    display: flex;
    padding-left: 0.09vw;

    padding-right: 0.09vw;

`

export const GraphMenuItem = styled.button`
    width: 15vw;
    height: 2.39vw;
    border-radius: 0.84vw;
    border: none;
    background: ${props => props.active ? 'white' : 'transparent'};
    font-family: 'Poppins';
    color: ${props => props.active ? '#333' : '#4F4F4F'};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.72vw;
    cursor: pointer;
    box-shadow: ${props => props.active ? '0px 4px 20px rgba(0, 0, 0, 0.04)' : 'none'};
`