import styled from 'styled-components';

import close from '../resources/close.svg';

export default function Ingredient(props) {
  const handleClick = () => {
    props.removeIngredient(props.id)
  }

  return (
    <Holder>
      <Tag>
        <Text>
          {props.children}
        </Text>
        <Img
          src={close}
          width={'16px'}
          onClick={() => {handleClick()}}
        />
      </Tag>
    </Holder>
  )
}

const Holder = styled.div`
  display: inline-block;
`;

const Tag = styled.div`
  background: #e0eca9aa;
  margin: 8px;
  padding: 8px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  width: fit-content;
`;

const Text = styled.div`
  max-width: 244px;
  text-overflow: ellipsis;
  overflow-x: hidden;
`;

const Img = styled.img`
  margin-left: 8px;
  cursor: pointer;
`;