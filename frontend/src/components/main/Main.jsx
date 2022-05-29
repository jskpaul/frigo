import styled from "styled-components"

import Title from "../shared/Title";
import RecipeList from "./RecipeList";
import Recipe from "./Recipe";
import FilterSearch from "./filter/FilterSearch";

import { fadeIn } from '../shared/animations';

export default function Main(props) {
  return (
    <Wrapper>
      {props.ingredients
        ? <>
            <Title>Search Results</Title>
            <FilterSearch></FilterSearch>
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

const VertAlign = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  animation: ${fadeIn} 1s ease-out;
`;