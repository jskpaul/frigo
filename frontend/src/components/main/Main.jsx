import { useEffect, useState } from "react";
import styled from "styled-components"

import Title from "../shared/Title";
import RecipeList from "./RecipeList";
import Recipe from "./Recipe";

export default function Main(props) {
  return (
    <Wrapper>
      <Title>Search Results</Title>
      <RecipeList>
        {props.recipes.map((e, i) => {
          return (
            <Recipe
              key={i}
              index={i}
              data={e}
              setIndex={props.setIndex}
              toggleModal={props.toggleModal}
            />
          )
        })}
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