import { useEffect, useState } from "react";
import styled from "styled-components"
import Modal from "../Modal";

import Title from "../shared/Title";
import RecipeList from "./RecipeList";
import Recipe from "./Recipe";

export default function Main(props) {
  const [test, setTest] = useState([
    {
      title: 'f'
    },{
      title: 'a'
    },{
      title: 'b'
    },{
      title: 'c'
    },
  ]);
    
  useEffect(() => {
  });

  return (
    <Wrapper>
      <Title>Search Results</Title>
      <RecipeList>
        {test.map((e, i) => {
          return (
            <Recipe
              key={i}
              title={e.title}
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