import styled from "styled-components";

import Tag from "./shared/Tag";
import Timer from "./shared/Timer";

export default function Modal(props) {
    const handleMouse = (e) => {
        props.show();
    }
    
    return (
        <ModalContainer visible={props.visible} onClick={() => handleMouse()}>
            <ModalBox onClick={e => e.stopPropagation()}>
                <Title main>{props.recipe.title}</Title>
                <TimerBox>
                    <Timer big minutes={props.recipe.minutes} />
                </TimerBox>
                <Tagbar>
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
                    })}
                </Tagbar>
                <Title>Ingredients</Title>
                <IngredientAlign>
                    <IngredientBox>
                        {props.recipe.ingredients.map((e, i) => {
                            let commaSeparation = i===0 ? '' : ', '
                            return (
                                commaSeparation + e
                            )
                        })}
                    </IngredientBox>
                </IngredientAlign>
                <Title>Directions</Title>
                <DirContainer>
                    <Directions>
                        {props.recipe.directions.map((e) => {
                            return (
                                <Dir>
                                    {e}
                                </Dir>
                            )
                        })}{props.recipe.directions.map((e) => {
                            return (
                                <Dir>
                                    {e}
                                </Dir>
                            )
                        })}{props.recipe.directions.map((e) => {
                            return (
                                <Dir>
                                    {e}
                                </Dir>
                            )
                        })}{props.recipe.directions.map((e) => {
                            return (
                                <Dir>
                                    {e}
                                </Dir>
                            )
                        })}{props.recipe.directions.map((e) => {
                            return (
                                <Dir>
                                    {e}
                                </Dir>
                            )
                        })}
                    </Directions>
                </DirContainer>
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
    z-index: 2;
    visibility: ${props => (props.visible ? 'visible' : 'hidden')};
    
`;

const ModalBox = styled.div`
    background: #FCFBF7;
    height: 80%;
    width: calc(90% - 72px);
    border-radius: 16px;
    padding: 12px;
    padding-right: 36px;
    padding-left: 36px;
    position: relative;
    display: flex;
    flex-direction: column;
`;

const TimerBox = styled.div`
    position: absolute;
    top: 72px;
    right: -42px;
`;

const IngredientAlign = styled.div`
    width: 100%;
    display: flex;
    justify-content: start;
`;

const IngredientBox = styled.div`
    background: white;
    display: flex;
    flex-direction: row;
    width: calc(100% - 48px);
    padding: 24px;
    border-radius: 12px;
    filter: drop-shadow(2px 4px 6px #69696933);
`;

const Title = styled.div`
    font-weight: 700;
    font-size: ${props => props.main ? 2 : 1.5}em;
    padding-top: 24px;
    padding-bottom: 12px;
    color: #492220;
    display: flex;
    justify-content: ${props => props.main ? 'center' : 'start'};
`;

const Tagbar = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: -8px;
    margin-bottom: -8px;
`;

const DirContainer = styled.div`
    flex: 1;
    overflow-y: auto;
`;

const Directions = styled.ol`
    margin-top: 0px;
    font-size: 1.05em;
`;

const Dir = styled.li`
    margin: 16px 0px;
`;