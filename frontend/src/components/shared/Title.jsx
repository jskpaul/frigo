import styled from 'styled-components';

export default function Title(props) {
  return (
    <StyledTitle>
      {props.children}
    </StyledTitle>
  )
}

const StyledTitle = styled.div`
  font-weight: bolder;
  font-size: 1.5em;
  padding-top: 24px;
  padding-bottom: 24px;
`;