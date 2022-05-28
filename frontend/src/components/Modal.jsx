import styled from "styled-components";
import Title from "./shared/Title";

export default function Modal(props) {
    const handleMouse = (e) => {
        props.show();
      }
    
    return (
        <ModalContainer visible={props.visible} onClick={() => handleMouse()}>
            <ModalBox onClick={e => e.stopPropagation()}>
                <TitleBox>Hi</TitleBox></ModalBox></ModalContainer>
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
    visibility: ${props => (props.visible ? 'visible' : 'hidden')};
    
`;

const ModalBox = styled.div`
    background: white;
    height: 80%;
    width: 90%;
    border-radius: 16px;
    padding: 12px;
`;

const TitleBox = styled.div`
    background: white;
    height:200px;
    width: 200px;
    align-items: center;
    justify-content: center;


`
