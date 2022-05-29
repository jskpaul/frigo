import styled from "styled-components";

import timer from '../resources/timer.svg';

export default function Timer(props) {
  return (
    <IconContainer big={props.big}>
      <img src={timer} width={props.big ? '36px' : '24px'} />
       {props.minutes} Minutes
    </IconContainer>
  )
}

const IconContainer = styled.div`
  width: 260px;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: ${props => props.big ? 1.2 : 1 }em;
  font-weight: ${props => props.big ? 600 : 400};
`;