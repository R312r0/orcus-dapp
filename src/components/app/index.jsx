import React, {useState, useEffect} from 'react';
import { BrowserRouter } from 'react-router-dom';

import GlobalStyle from '../../globalStyles';
import Layout from '../layout';
import Router from '../router';
import {BlockchainContextProvider} from "../../context/blockchain-context";

function App() {

    const [width, setWidth] = useState(window.innerWidth);

    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
    }
    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    const isMobile = width <= 768;

  return (
<>
      {!isMobile ?

              <BlockchainContextProvider>
                  <BrowserRouter>
                      <GlobalStyle />
                      <Layout>
                          <Router />
                      </Layout>
                  </BrowserRouter>
              </BlockchainContextProvider>
              :
              <h1> Mobile version is coming soon! </h1>
      }
</>


  );
}

export default App;
