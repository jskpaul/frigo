import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components"

import Title from "../shared/Title";
import RecipeList from "./RecipeList";
import Recipe from "./Recipe";

export default function Main(props) {
  return (
    <Wrapper>
      {props.ingredients
        ? <>
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
          </>
        : <VertAlign>
            <Title>Enter your ingredients</Title>
          </VertAlign>
      }
    </Wrapper>
  )
}


const Wrapper = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  padding-left: 364px;
  width: calc(100vw - 364px);
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: hidden;
`;

const fadeIn = keyframes`
  from {
    transform: translateY(20px);
    opacity: 0;
  }

  to {
    transform: translateY(0px);
    opacity: 1;
  }
`;

const VertAlign = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  animation: ${fadeIn} 1s ease-out;
`;