import { useEffect } from "react";
import styled from "styled-components"
import Modal from "../Modal";

import Title from "../shared/Title";
import RecipeList from "./RecipeList";

export default function Main(props) {
  useEffect(() => {

  });

  return (
    <Wrapper>
      <Title>Search Results</Title>
      <RecipeList>
       
      </RecipeList>
    </Wrapper>
  )
}


const Wrapper = styled.div`
  position: absolute;
  top: 0px;
  left: 364px;
  width: calc(100vw - 364px);
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;