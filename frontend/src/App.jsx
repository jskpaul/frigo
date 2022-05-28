import { useState, useEffect } from 'react';
import { createGlobalStyle } from 'styled-components';

import Main from './components/main/Main';
import Sidebar from './components/Sidebar';

export default function App() {
  const [displayModal, toggleModal] = useState(false);

  useEffect(() => {
    console.log(displayModal);
  }, [displayModal]);

  return (
    <>
      <GlobalStyle />
      <Sidebar />
      <Main toggleModal={() => {toggleModal(!displayModal)}}/>
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