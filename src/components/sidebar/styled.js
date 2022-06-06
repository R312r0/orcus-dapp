import styled from "styled-components";

export const SidebarMenu = styled.div`
  position: fixed;
  height: 100vh;
  top: 0;

  background-color: #191919;
  z-index: 10;
  width: 100%;
  left: 0;
`;

export const NavigationWrapper = styled.div``;

export const TopBarWrapper = styled.div`
  width: 100%;
  display: none;
  align-items: top;
  padding-left: 5%;
  margin-top: 32px;
  padding-right: 5%;
  justify-content: space-between;
  @media (max-device-width: 480px) {
    display: flex;
  }
`;

export const SidebarWrapper = styled.div`
  flex-direction: column;
  width: 10.156vw;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  @media (max-device-width: 480px) {
    display: none;
  }
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

  line-height: ${(props) => props.fS ?? "0.573vw"};
  font-size: ${(props) => props.fS ?? "0.469vw"};
  font-weight: 400;
  color: #fff;
  display: flex;

  b {
    line-height: ${(props) => props.fS ?? " 1.25vw"};
    font-size: ${(props) => props.fS ?? "1.042vw"};
    font-weight: 600;
  }
  @media (max-device-width: 480px) {
    text-align: center;
    justify-content: center;
  }
`;

export const TabLabel = styled.div`
  position: absolute;
  color: white;
  margin-left: 7.24vw;
  white-space: nowrap;
  padding: 0.31vw 0.52vw;
  z-index: 22;
  font-size: 0.8vw;
  border-radius: 0.3vw;
  // display: flex;
  background-color: #333;
  align-items: center;
  display: none;
  opacity: 0;
`;
export const TabArrow = styled.div`
  z-index: -1;
  width: 0.8vw;
  height: 0.8vw;
  transform: rotate(45deg);
  margin-left: -0.64vw;
  background-color: #333;
`;

export const PageTab = styled.div`
  // margin-top: 3.125vw;
  margin-top: 2.4vw;
  justify-content: space-between;
  position: relative;
  align-items: center;
  flex-direction: row;
  display: flex;
  width: 100%;
  &:hover ${TabLabel} {
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
    @media (max-device-width: 480px) {
      // height: 5vw;
      // height: 5vw;
    }
    stroke: ${(props) => (props.isActive ? "#fff" : "#4F4F4F")};
    transition: 0.3s all;
    &:hover {
      stroke: ${(props) => (props.isActive ? "#fff" : "#828282")};
    }
  }
`;

export const ActivePageIndicator = styled.div`
  opacity: ${(props) => (props.isActive ? "1" : "0")};
  border-radius: 0.156vw 0 0 0.156vw;
  transition: 0.3s all;
  background: #fff;
  height: 2.604vw;
  width: 0.26vw;
`;

export const WalletBtn = styled.button`
  border: 0.052vw solid #4f4f4f;
  border-radius: 1.042vw;
  font-family: "Poppins";
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
