import styled from 'styled-components';

export const LiquidityTableWrapper = styled.div`
  padding: 1.51vw 2.552vw 1.979vw 1.042vw;
  border-radius: 1.042vw;
  margin-left: 1.042vw;
  background: #e4ddef;
  height: 11.042vw;
  width: 16.094vw;
`;

export const IconWrapper = styled.div`
  justify-content: center;
  border-radius: 0.833vw;
  margin-right: 0.833vw;
  background: #bb6bd9;
  align-items: center;
  height: 2.708vw;
  width: 2.708vw;
  display: flex;

  svg {
    fill: ${(props) => props.fill};
    height: 1.563vw;
    width: 1.563vw;
    stroke: #fff;
  }
`;

export const HDiv = styled.div`
  margin-top: ${(props) => props.mt};
  align-items: center;
  flex-direction: row;
  display: flex;
`;

export const VDiv = styled.div`
  flex-direction: column;
  display: flex;
`;

export const Text = styled.span`
  margin-top: ${(props) => props.mt};
  font-family: 'Poppins';
  line-height: 1.094vw;
  font-size: 0.729vw;
  font-weight: 400;
  color: #828282;

  b {
    line-height: 1.25vw;
    font-size: 0.833vw;
    font-weight: 500;
    color: #333;
  }
`;
