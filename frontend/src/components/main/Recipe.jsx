import styled from "styled-components";

export default function Recipe(props) {
  const handleMouse = () => {
    props.toggleModal();
  }

  return (
    <Item onClick={() => handleMouse()}>
      {props.title}
    </Item>
  );
}

const Item = styled.div`
  width: calc(100% - 48px);
  height: 72px;
  border-radius: 16px;
  background: #fff;
  margin: 12px;
  padding: 12px;
  filter: drop-shadow(2px 5px 3px #696969);
`;