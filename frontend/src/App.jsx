import { useState, useEffect } from 'react';
import { createGlobalStyle } from 'styled-components';

import Main from './components/main/Main';
import Sidebar from './components/Sidebar';
import Modal from './components/Modal';

export default function App() {
  const [displayModal, toggleModal] = useState(false);

  useEffect(() => {
    console.log(displayModal);
  }, [displayModal]);

  return (
    <>
      <GlobalStyle />
      <Modal />
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