import styled from 'styled-components';

export const ProtocolTableWrapper = styled.div`
  padding: 1.354vw 2.865vw;
  border-radius: 1.042vw;
  background: #f5efd7;
  height: 11.042vw;
  width: 27.813vw;
`;

export const HDiv = styled.div`
  margin-top: ${(props) => props.mt};
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  display: flex;
`;

export const Text = styled.span`
  font-family: 'Poppins';
  line-height: 1.25vw;
  font-size: 0.833vw;
  font-weight: 400;
  color: #828282;

  b {
    line-height: 1.406vw;
    font-size: 0.938vw;
    font-weight: 500;
    color: #333;
  }
`;

export const Divider = styled.div`
  background: #e6dfc7;
  margin: 0.521vw 0;
  width: 21.823vw;
  height: 0.052vw;
`;
