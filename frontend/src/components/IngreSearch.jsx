import { useState } from "react";
import styled from "styled-components";

import icon from './resources/magnify.svg';

export default function IngreSearch() {
    return (
        <IngredientSearch>
            <img src={icon}/>
            <SearchInput type="text"/>
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