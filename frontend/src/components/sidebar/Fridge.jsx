import styled from "styled-components";

import Tag from "../shared/Tag";

export default function Fridge(props) {
    return (
        <FridgeBox>
            {props.ingredients.map((e, i) => {
                return (
                    <Tag
                        key={i}
                        id={e.id}
                        removeItem={props.removeIngredient}
                        color={'e0eca9aa'}
                        remove
                        animate
                    >
                        {e.val}
                    </Tag>
                )
            })}
        </FridgeBox>
    )
}

const FridgeBox = styled.div`
    background: white;
    width: 300px;
    flex: 1;
    border-radius: 16px;
    padding: 12px;
`;