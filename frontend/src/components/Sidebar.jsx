import styled from "styled-components";

import Fridge from "./Fridge";
import IngreSearch from "./IngreSearch";
import Title from "./shared/Title";
import Logo from "./resources/FrigoLogo.svg"

export default function Sidebar(props) {
    return (
        <SidebarWrapper>
            <img src={Logo} width={"256px"}/>
            <Title>Add Ingredients</Title>
            <IngreSearch></IngreSearch>
            <Fridge></Fridge>
        </SidebarWrapper>
    )
}

const SidebarWrapper = styled.div`
    height: calc(100vh - 32px); 
    width: 364px;
    position: absolute;
    top: 0;
    left: 0;
    background: #FFE371; 
    display: flex;
    flex-direction: column;
    align-items: center; //component content alignment
    background: #FFE371;
    border-top-right-radius: 16px;
    border-bottom-right-radius: 16px;
    padding-bottom: 32px;
`;

