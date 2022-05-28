import styled from "styled-components"

import Title from "../shared/Title";

export default function Main() {
  return (
    <Wrapper>
      <Title>Search Results</Title>
    </Wrapper>
  )
}


const Wrapper = styled.div`
  position: absolute;
  top: 0px;
  left: 364px;
  width: calc(100vw - 364px);
  display: flex;
  flex-direction: column;
  align-items: center;
`;