import styled from 'styled-components';

export const SidebarWrapper = styled.div`
  flex-direction: column;
  width: 10.156vw;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const LogoWrapper = styled.div`
  height: 2.344vw;
  width: 3.125vw;
  display: flex;
  margin-top: 2.552vw;
  margin-left: 1vw;
  cursor: pointer;
  svg {
    fill: #fff;
  }
`;

export const LogoText = styled.div`
  margin-top: ${(props) => props.mt};
  line-height: 0.573vw;
  font-size: 0.469vw;
  font-weight: 400;
  color: #fff;
  display: flex;

  b {
    line-height: 1.25vw;
    font-size: 1.042vw;
    font-weight: 600;
  }
`;

export const TabLabel = styled.div`
  position: absolute;
  color: white;
  margin-left: 7.24vw;
  white-space: nowrap;
  padding: 6px 10px;
  z-index: 22;
  font-size: 0.8vw;
  border-radius: 0.3vw;
  // display: flex;
  background-color: #333;
  align-items: center;
  display: none;
  opacity: 0;
`
export const TabArrow = styled.div`

  z-index: -1;
  width: 0.8vw;
  transform: rotate(45deg);
  margin-left: -1.05vw;
  background-color: #333;
  height: 0.8vw;
`

export const PageTab = styled.div`
  // margin-top: 3.125vw;
  margin-top: 2.400vw;
  justify-content: space-between;
  position: relative;
  align-items: center;
  flex-direction: row;
  display: flex;
  width: 100%;
  &:hover ${TabLabel}{
    display: flex;
    opacity: 1;
  }
  
`;

export const IconWrapper = styled.div`
  cursor: pointer;
  // height: 1.979vw;
  // width: 1.979vw;
  height: 1.484wv;
  width: 1.484wv;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    stroke: ${(props) => (props.isActive ? '#fff' : '#4F4F4F')};
    transition: 0.3s all;
    &:hover {
      stroke: ${(props) => (props.isActive ? '#fff' : '#828282')};
    }
  }
`;

export const ActivePageIndicator = styled.div`
  opacity: ${(props) => (props.isActive ? '1' : '0')};
  border-radius: 0.156vw 0 0 0.156vw;
  transition: 0.3s all;
  background: #fff;
  height: 2.604vw;
  width: 0.26vw;
`;

export const WalletBtn = styled.button`
  border: 0.052vw solid #4f4f4f;
  border-radius: 1.042vw;
  font-family: 'Poppins';
  padding: 0 1.042vw;
  align-items: center;
  margin-top: 3.125vw;
  font-size: 0.729vw;
  background: #fff;
  height: 3.021vw;
  width: 7.76vw;
  display: flex;
  color: #333;

  svg {
    margin-right: 0.469vw;
  }

  &:hover {
    transition: 0.3s all;
    opacity: 0.8;
  }
`;
