import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: #191919;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
    font-family: 'Montserrat', sans-serif;
  }

  div {
    box-sizing: border-box;
  }

  button {
    border: none;
  }

  input {
    background: transparent;
    padding: 0;
    outline: none;
    border: none;
  }
`;

export default GlobalStyle;
