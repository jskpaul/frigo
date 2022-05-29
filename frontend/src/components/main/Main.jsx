import styled from "styled-components"

import Title from "../shared/Title";
import RecipeList from "./RecipeList";
import Recipe from "./Recipe";
import FilterSearch from "./FilterSearch";

import { fadeIn } from '../shared/animations';

export default function Main(props) {
  return (
    <Wrapper>
      {props.ingredients
        ? (props.loading
          ? <VertAlign>
              <Title>Loading...</Title>
            </VertAlign>
          : <>
              <Title>Search Results</Title>
              <FilterSearch
                unselected={props.unselected}
                tags={props.tags}
                addTag={props.addTag}
                removeTag={props.removeTag}
                clearAll={props.clearAll}
              />
              <RecipeList>
                {props.recipes.length
                ? props.recipes.map((e, i) => {
                  return (
                    <Recipe
                      key={i}
                      index={i}
                      data={e}
                      setIndex={props.setIndex}
                      toggleModal={props.toggleModal}
                    />
                  )
                })
                : <Alert>No results found...</Alert>}
              </RecipeList>
            </>
          )
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

const Alert = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5em;
  font-weight: 600;
  color: #492220;
`;