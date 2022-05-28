import styled from "styled-components"

export default function RecipeList(props) {
  return (
    <Wrapper>
      {props.children}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  flex: 1;
  width: calc(100% - 64px);
  margin-bottom: 36px;
  overflow-y: auto;
  overflow-x: hidden;
`;