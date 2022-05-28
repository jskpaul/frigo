import styled from "styled-components";

import Ingredient from "./Ingredient";

export default function Fridge(props) {
    return (
        <FridgeBox>
            {props.ingredients.map((e, i) => {
                return (
                    <Ingredient
                        key={i}
                        id={e.id}
                        removeIngredient={props.removeIngredient}
                    >
                        {e.val}
                    </Ingredient>
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