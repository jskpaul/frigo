import styled from "styled-components";

import Title from "./shared/Title";

export default function Sidebar(props) {
    return (
        <SidebarWrapper>
          <Title>Add Ingredients</Title>
        </SidebarWrapper>
    )
}

const SidebarWrapper = styled.div`
    height: 100vh; 
    width: 364px;
    position: absolute;
    top: 0;
    left: 0;
    background: #FFE371;
    border-top-right-radius: 12px;
    border-bottom-right-radius: 12px;
`;
