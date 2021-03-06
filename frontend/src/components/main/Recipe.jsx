import { useEffect } from "react";
import styled from "styled-components";

import Timer from "../shared/Timer";

export default function Recipe(props) {
  const handleMouse = () => {
    props.setIndex(props.index);
    props.toggleModal();
  }

  return (
    <Item onClick={() => handleMouse()}>
      <TextContainer>
        <Header>{props.data.title}</Header>
        <FlavorText>
          Ingredients: {
            props.data.ingredients.map((e, i) => {
              let commaSeparation = i == 0 ? '' : ', ';
              return commaSeparation + e;
            })
          }
        </FlavorText>
      </TextContainer>
      <Timer minutes={props.data.minutes} />
    </Item>
  );
}

const Item = styled.div`
  width: calc(100% - 58px);
  max-height: 86px;
  border-radius: 16px;
  background: #fffefa;
  margin: 12px;
  margin-top: 24px;
  margin-bottom: 24px;
  padding-top: 24px;
  padding-bottom: 24px;
  padding-right: 20px;
  padding-left: 20px;
  filter: drop-shadow(2px 4px 6px #69696933);
  display: flex;
  cursor: pointer;
`;

const TextContainer = styled.div`
  flex: 1;
`;

const Header = styled.div`
  font-weight: 600;
  color: #4f4b49;
  margin-bottom: 12px;
`;

const FlavorText = styled.div`
  color: #4f4b49;
  font-size: 0.8em;
  max-width: calc(100% - 56px);
  max-height: 56px;
  word-break: break-all;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;  
`;

const IconContainer = styled.div`
  width: 260px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;