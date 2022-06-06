import styled from "styled-components";

export const Overflow = styled.div`
  overflow: scroll;
  @media (max-device-width: 480px) {
    height: auto;
  }
`;
export const TopCardMobile = styled.div`
  padding-left: 23px;
  padding-right: 23px;
  margin-left: 12px;
  margin-right: 12px;
  margin-bottom: 12px;
  padding-top: 11px;
  padding-bottom: 11px;
  font-size: 14px;
  border: 1px solid #f2f2f2;
  border-radius: 20px;
  & div {
    padding: 4px;
  }
`;

export const SortByOverlay = styled.div`
  position: absolute;
  z-index: 5;
  width: 13.28vw;
  margin-top: 2.67vw;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  border-radius: 0.62vw;
  box-shadow: 0px 8px 50px rgba(10, 17, 105, 0.08);
  overflow: hidden;
  @media (max-device-width: 480px) {
    left: 0;
    width: 87vw;
    font-size: 14px;
    z-index: 9999;
    margin-top: 52px;
    border-radius: 12px;
    background-color: #fff;
    gap: 0;
    border-radius: 12px;
    margin-left: -48vw;
    padding: 8px;
  }
`;

export const SortByOverlayOption = styled.div`
  height: 1.98vw;
  background-color: white;
  width: 13.28vw;
  padding: 0.78vw 1.09vw 0.78vw 1.09vw;
  display: flex;
  font-family: "Poppins";
  align-items: center;
  line-height: 1;
  &:hover {
    background-color: #e4ddef;
  }
  @media (max-device-width: 480px) {
    width: 80vw;
    height: auto;
    padding: 8px 13px;
  }
`;

export const FilterOverlaySelect = styled.select`
  width: 100%;
  box-sizing: border-box;
  background: #fcfcfd;
  box-shadow: inset 0px 4px 16px rgba(197, 197, 197, 0.25);
  border-radius: 0.41vw;
  border: none;
  padding-top: 0.41vw;
  padding-bottom: 0.41vw;
  padding-left: 0.82vw;
  margin-top: ${(props) => props.mt ?? "1.04vw"};
  @media (max-device-width: 480px) {
    margin-top: 8px;
    font-size: 14px;
    padding: 8px 16px;
    border-radius: 8px;
  }
`;
export const FilterOverlay = styled.div`
  position: absolute;
  z-index: 5;
  // height: 8.85vw;
  top: 0;
  right: 0;
  margin-top: 2.67vw;
  width: 17.56vw;
  background-color: white;
  box-shadow: 0px 8px 50px rgba(10, 17, 105, 0.08);
  border-radius: 0.62vw;
  padding-left: 1.09vw;
  padding-right: 1.09vw;
  padding-top: 1.04vw;
  padding-bottom: 1.04vw;

  @media (max-device-width: 480px) {
    width: 86vw;
    font-size: 14px;
    z-index: 99;
    margin-top: 52px;
    border-radius: 12px;
    padding: 20px;
  }
`;

export const VaultsWrapper = styled.div`
  flex-direction: column;
  display: flex;
  width: 100%;
  box-sizing: border-box;
  position: relative;
  @media (max-device-width: 480px) {
    background-color: #fff;
  }
`;

export const GreyText = styled.span`
  font-family: "Poppins";
  font-size: ${(props) => props.fs ?? "0.73vw"};
  color: #828282;
  margin-top: ${(props) => props.mt ?? "0.38vw"};
`;

export const TopIconWrapper = styled.div`
  height: 2.08vw;
  width: 2.08vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.bg ?? "white"};
  border-radius: 0.41vw;
  @media (max-device-width: 480px) {
    height: 40px;
    width: 40px;
    border-radius: 8px;
  }
`;

export const HeadingText = styled.span`
  font-family: "Poppins";
  line-height: 1.875vw;
  margin-left: 1.25vw;
  font-size: 1.25vw;
  font-weight: 500;
  color: #333;
  @media (max-device-width: 480px) {
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

  @media (max-device-width: 480px) {
    height: auto;
    width: auto;
    flex-direction: column;
    margin-left: 10px;
    margin-right: 10px;
    background: #fff;
    border: 1px solid #f2f2f2;
    position: relative;
    border-radius: 26px;
    font-size: 16px;
  }
`;
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
  font-family: "Poppins";
`;

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
  font-family: "Poppins";
  font-size: 0.86vw;
  line-height: 0.86vw;
  gap: 0.68vw;
  @media (max-device-width: 480px) {
    width: calc(100% - 16px);
    position: relative;
    height: auto;
    margin: 12px;
    box-sizing: border-box !important;
    font-size: 16px;
    padding: 20px;
    border: 1px solid #f2f2f2;
    border-radius: 20px;
    gap: 8px;
  }
`;
export const VaultsTable = styled.div`
  width: 100%;
  background-color: white;
  border-radius: 1.06vw;
  min-height: 29.48vw;
  margin-top: 1.02vw;
  padding: 1.02vw;
  overflow: scroll;
  @media (max-device-width: 480px) {
    height: auto;
  }
`;

export const VaultsTableTopbar = styled.div`
  padding: 1.22vw;
  display: flex;
  height: 2.809vw;
  justify-content: space-between;
  padding: 0;
  @media (max-device-width: 480px) {
    flex-direction: column;
    height: auto;
    margin-bottom: 8px;
  }
`;

export const TopbarOptions = styled.div`
  display: flex;
  height: 2.809vw;
  background: #fcfcfd;
  width: 36.16vw;
  border-radius: 0.93vw;
  align-items: center;
  border: 1px solid #f2f2f2;
  padding-left: 0.07vw;
  padding-right: 0.07vw;
  @media (max-device-width: 480px) {
    display: flex;
    flex-wrap: wrap;
    width: calc(100% - 20px);
    height: auto;
    border-radius: 18px;
    margin-left: 10px;
    margin-right: 10px;
  }
`;

export const TopbarOption = styled.button`
  border: none;
  border-radius: 0.84vw;
  background-color: ${(props) => (props.active ? "white" : "#FCFCFD")};
  color: ${(props) => (props.active ? "#333" : "#4F4F4F")};
  width: 8.96vw;
  font-family: "Poppins";
  height: 2.509vw;
  font-size: 0.75vw;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.15s;
  box-shadow: ${(props) =>
    props.active ? "0px 4px 20px rgba(0, 0, 0, 0.04)" : "none"};
  @media (max-device-width: 480px) {
    font-size: 14px;
    width: 50%;
    border-radius: 16px;
    height: 46px;
  }
`;

export const FilterContainer = styled.div`
  height: 2.809vw;
  width: 7.97vw;
  background-color: #fcfcfd;
  display: flex;
  align-items: center;
  font-size: 0.75vw;
  padding-left: 1.45vw;
  border: 1px solid ${(props) => (props.active ? "#333" : "#F2F2F2")};
  padding-right: 1.05vw;
  border-radius: 0.94vw;
  box-sizing: border-box;
  justify-content: space-between;
  cursor: pointer;
  position: relative;
  @media (max-device-width: 480px) {
    height: 52px;
    margin-left: 6px;
    width: 20%;
    border-radius: 18px;
    padding-left: 10px;
    padding-right: 10px;
  }
`;
export const SortByContainer = styled.div`
  height: 2.809vw;
  width: 13.28vw;
  background-color: #fcfcfd;
  padding-left: 1.45vw;
  justify-content: space-between;
  font-family: "Poppins";
  color: #333;
  border: 1px solid ${(props) => (props.active ? "#333" : "#F2F2F2")};
  box-sizing: border-box;
  padding-right: 1.45vw;
  display: flex;
  align-items: center;
  font-size: 0.75vw;
  border-radius: 0.94vw;
  cursor: pointer;

  position: relative;
  @media (max-device-width: 480px) {
    height: 52px;
    margin-left: 6px;
    position: relative;
    border-radius: 18px;

    width: 20%;

    padding-left: 10px;
    padding-right: 10px;
  }
`;

export const SearchRow = styled.div`
  width: 100%;
  margin-top: 1.02vw;
  height: 2.809vw;
  display: flex;
  @media (max-device-width: 480px) {
    margin-left: 10px;
    margin-right: 10px;
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
  }
`;

export const SearchContainer = styled.div`
  height: 2.809vw;
  width: 16.17vw;
  background: #fcfcfd;
  border-radius: 0.94vw;
  box-shadow: inset 0px 4px 16px rgba(197, 197, 197, 0.25);
  display: grid;
  grid-template-columns: 10fr 2fr;
  font-size: 0.84vw;
  align-items: center;
  font-family: "Poppins";
  padding-left: 1.42vw;
  & input::placeholder {
    color: #bdbdbd;
  }
  @media (max-device-width: 480px) {
    width: 50%;
    height: 52px;
    border-radius: 18px;
  }
`;

export const VaultsContainer = styled.div`
  width: 26.68vw;
  height: 2.809vw;
  border: 1px solid #f2f2f2;
  border-radius: 1.25vw;
  background: #fcfcfd;
  margin-left: 2vw;
  padding: 0.26vw;
  display: flex;
  align-items: center;
  @media (max-device-width: 480px) {
    width: calc(100% - 20px);
    margin-left: 0;
    height: auto;
    padding: 5px;
    margin-top: 8px;
    border-radius: 24px;
  }
`;

export const VaultItem = styled.button`
  height: 2.1365vw;

  width: 8.7vw;
  background: ${(props) => (props.active ? "#333" : "none")};
  color: ${(props) => (props.active ? "white" : "#4F4F4F")};
  font-size: 0.72vw;
  cursor: pointer;
  transition: all 0.1s;
  border-radius: 1.04vw;
  @media (max-device-width: 480px) {
    width: 33%;
    height: 41px;
    border-radius: 20px;
    font-size: 14px;
  }
`;
export const HDivider = styled.div`
  width: 100%;
  height: 1px;
  margin-top: ${(props) => props.marginTop ?? "1.14vw"};
  margin-bottom: ${(props) => props.marginBottom ?? "1.14vw"};
  background-color: #f2f2f2;
`;

export const VDivider = styled.div`
  width: 1px;
  height: ${(props) => props.height ?? "55%"};
  background-color: #f2f2f2;
`;

export const VaultTableHeader = styled.div`
  display: flex;
  height: 2.709vw;
  align-items: center;
  width: 100%;
  padding-left: 2.18vw;
`;

export const VaultTableContent = styled.div`
  display: grid;
  grid-template-columns: 6fr 3fr 3fr 2fr 2fr 2fr 3fr;
  align-items: center;
  width: 100%;
  font-size: 0.72vw;
  color: #4f4f4f;
`;
export const VaultItemContent = styled.div`
  display: grid;
  grid-template-columns: 6fr 3fr 3fr 2fr 2fr 2fr 3fr;
  align-items: center;
  width: 100%;
  font-size: 0.93vw;
  font-weight: 500;
  color: #333;
`;
export const VaultTableItem = styled.div`
  display: flex;
  height: 5.36vw;
  align-items: center;
  width: 100%;
  padding-left: 2.18vw;
  border-bottom: ;
`;

export const FontSize = styled.span`
  font-size: ${(props) => props.fs};
`;

export const LightText = styled.span`
  font-weight: 300;
`;

export const GetBtn = styled.button`
  width: 4.53vw;
  height: 2.13vw;
  border-radius: 1.56vw;
  background: none;
  background-color: transparent;
  border: 1px solid #f2f2f2;
  color: #4f4f4f;
  transition: all 0.1s;
  cursor: pointer;
  &:hover {
    background-color: #333;
    color: white;
  }
`;
