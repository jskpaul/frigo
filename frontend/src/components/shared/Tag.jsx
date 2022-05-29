import styled, { css } from 'styled-components';

import close from '../resources/close.svg';

import { onlyFade } from './animations';

export default function Tag(props) {
  const handleClick = () => {
    props.removeItem(props.id)
  }

  return (
    <Holder>
      <StyledTag color={props.color} animate={props.animate}>
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
  animation: ${props => props.animate ? css`${onlyFade} 0.5s ease` : 'none'};
`;

const Text = styled.div`
  text-overflow: ellipsis;
  overflow-x: hidden;
`;

const Img = styled.img`
  margin-left: 8px;
  cursor: pointer;
`;