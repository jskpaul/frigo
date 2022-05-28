import styled from "styled-components";

import Title from "./shared/Title";
import Tag from "./shared/Tag";

export default function Modal(props) {
    const handleMouse = (e) => {
        props.show();
      }
    

    return (
        <ModalContainer visible={props.visible} onClick={() => handleMouse()}>
            <ModalBox onClick={e => e.stopPropagation()}>
                <Title>{props.recipe.title}</Title>

                {props.recipe.tags.map((e, i) => {
                    return (
                        <Tag
                            key={i}
                            color={'FFE371'}
                            id={i}
                            removeItem={() => {console.log()}}
                        >
                            {e}
                        </Tag>
                    )
                }) }
                <IngredientBox>
                    {props.recipe.ingredients.map((e, i) => {
                        return (
                            e
                        )
                    }) }
                </IngredientBox>
                <div>
                    {props.recipe.directions}
                </div>


            </ModalBox>
        </ModalContainer>
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

const IngredientBox = styled.div`
    background: white;
    display: flex;
    flex-direction: row;
`