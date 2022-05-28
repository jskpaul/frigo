import styled, { createGlobalStyle } from 'styled-components';

import Main from './components/main/Main';
import Sidebar from './components/Sidebar';
import Modal from './components/Modal';

export default function App() {
  return (
    <>
      <GlobalStyle />
      <Modal />
      <Sidebar />
      <Main />
    </>
  );
}

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Open Sans', sans-serif;
    background: #f1efe9;
  }
`;