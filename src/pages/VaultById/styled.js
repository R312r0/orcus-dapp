import styled from 'styled-components'


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