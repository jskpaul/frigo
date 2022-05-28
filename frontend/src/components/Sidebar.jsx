import styled from "styled-components";
import Fridge from "./Fridge";

import Title from "./shared/Title";

export default function Sidebar(props) {
    return (
        <SidebarWrapper>
            <Title>Add Ingredients</Title>
            <Fridge></Fridge>
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
    display: flex;
    flex-direction: column;
    justify-content: space-around; //component content alignment
    align-items: center;
    background: #FFE371;
    border-top-right-radius: 12px;
    border-bottom-right-radius: 12px;
`;
