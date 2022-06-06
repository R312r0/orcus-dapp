import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

import GlobalStyle from "../../globalStyles";
import Layout from "../layout";
import Router from "../router";
import { BlockchainContextProvider } from "../../context/blockchain-context";

function App() {
  return (
    <>
      <BlockchainContextProvider>
        <BrowserRouter>
          <GlobalStyle />
          <Layout>
            <Router />
          </Layout>
        </BrowserRouter>
      </BlockchainContextProvider>
    </>
  );
}

export default App;
