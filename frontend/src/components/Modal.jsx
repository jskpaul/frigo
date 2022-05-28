import styled from "styled-components";
import Title from "./shared/Title";

export default function Modal() {
    return (
        <ModalContainer>
            <ModalBox>
                <Title>Hi</Title></ModalBox></ModalContainer>
    )
}

const ModalContainer = styled.div`
    background: #000000aa;
    height:100vh;
    width: 100vw;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
`;

const ModalBox = styled.div`
    background: white;
    height:300px;
    width: 300px;
    border-radius: 16px;
    padding: 12px;
`;

const TitleBox = styled.div`
align-items: center;
justify-content: center;


`
