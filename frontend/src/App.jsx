import styled, { createGlobalStyle } from 'styled-components';

import Sidebar from './components/Sidebar';

function App() {
  return (
    <>
      <GlobalStyle />
      <Sidebar/>
      <StyledDiv>
        Hi
      </StyledDiv>
    </>
  );
}

export default App;

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Open Sans', sans-serif;
  }
`;

const StyledDiv = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;