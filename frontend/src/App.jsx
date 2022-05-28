import styled, { createGlobalStyle } from 'styled-components';

import Main from './components/main/Main';
import Sidebar from './components/Sidebar';

export default function App() {
  return (
    <>
      <GlobalStyle />
      <Sidebar />
      <Main />
    </>
  );
}

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Open Sans', sans-serif;
    background: #f2efe9;
  }
`;