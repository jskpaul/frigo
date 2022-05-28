import styled from "styled-components";
import Fridge from "./Fridge";

export default function Sidebar() {
    return (
        <SidebarWrapper>
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
`;
