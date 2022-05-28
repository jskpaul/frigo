import styled from "styled-components";

import timer from '../resources/timer.svg';

export default function Recipe(props) {
  const handleMouse = () => {
    props.toggleModal();
  }

  return (
    <Item onClick={() => handleMouse()}>
      <TextContainer>
        <Header>title: {props.title}</Header>
        <FlavorText>
          Instructions: EJIFOJWEIOFJ
        </FlavorText>
      </TextContainer>
      <IconContainer>
        <img src={timer} width={'24px'} />
         30 Minutes
      </IconContainer>
    </Item>
  );
}

const Item = styled.div`
  width: calc(100% - 58px);
  max-height: 86px;
  border-radius: 16px;
  background: #fff;
  margin: 12px;
  margin-top: 24px;
  margin-bottom: 24px;
  padding: 15px;
  padding-left: 20px;
  filter: drop-shadow(2px 3px 2px #696969);
  display: flex;
`;

const TextContainer = styled.div`
  flex: 1;
`;

const Header = styled.div`
  font-weight: 600;
  color: #4f4b49;
  margin-bottom: 8px;
`;

const FlavorText = styled.div`
  color: #4f4b49;
  font-size: 0.8em;
  max-width: calc(100% - 56px);
  max-height: 56px;
  overflow-wrap: break-word;
  word-break: break-all;
  overflow-x: hidden;
  overflow-y: auto;
`;

const IconContainer = styled.div`
  width: 260px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;