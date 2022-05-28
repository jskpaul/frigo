import styled, { createGlobalStyle } from 'styled-components';

export default function App() {


  return (
    <>
      <GlobalStyle />
      <StyledDiv>
        H
      </StyledDiv>
    </>
  );
}

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
  position: absolute;
`;