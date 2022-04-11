import { BrowserRouter } from 'react-router-dom';

import GlobalStyle from '../../globalStyles';
import Layout from '../layout';
import Router from '../router';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Layout>
        <Router />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
