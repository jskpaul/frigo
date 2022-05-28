import styled from 'styled-components';

import close from '../resources/close.svg';

export default function Tag(props) {
  const handleClick = () => {
    props.removeItem(props.id)
  }

  return (
    <Holder>
      <StyledTag color={props.color}>
        <Text>
          {props.children}
        </Text>
        {props.remove &&
          <Img
            src={close}
            width={'16px'}
            onClick={() => {handleClick()}}
          />
        }
      </StyledTag>
    </Holder>
  )
}

const Holder = styled.div`
  display: inline-block;
`;

const StyledTag = styled.div`
  background: #${props => props.color};
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