import { useEffect, useState } from "react";
import styled from "styled-components";

import icon from '../resources/magnify.svg';

export default function IngreSearch(props) {
    const [input, setInput] = useState('');
    
    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            props.addIngredient(input);
            setInput('');
            e.target.blur();
        }
    }

    return (
        <IngredientSearch>
            <img src={icon}/>
            <SearchInput
                type="text"
                placeholder="Add an ingredient!"
                value={input}
                onInput={(e) => setInput(e.target.value)}
                onKeyDown={(e) => handleKeyPress(e)}
            />
        </IngredientSearch>
    )
}

const IngredientSearch = styled.div`
    display: flex;
    height: 32px;
    width: 300px;
    flex-direction: row;
    padding: 12px;
    margin: 20px;
    border-radius: 16px;
    background: white;
`

const SearchInput = styled.input`
    border: none;
    :focus {
        outline: none;
    }

`