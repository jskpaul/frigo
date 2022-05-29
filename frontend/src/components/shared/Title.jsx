import styled from 'styled-components';

export default function Title(props) {
  return (
    <StyledTitle>
      {props.children}
    </StyledTitle>
  )
}

const StyledTitle = styled.div`
  font-weight: 700;
  font-size: 1.5em;
  padding-top: 32px;
  padding-bottom: 24px;
  color: #492220;
`;