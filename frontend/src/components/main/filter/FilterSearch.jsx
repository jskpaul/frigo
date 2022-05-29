import styled from "styled-components";
import { useState } from "react";
import droparrow from "../../resources/drop-down-arrow.svg";
import rightarrow from "../../resources/rightarrow.svg";

export default function FilterSearch(props) {
    const [expand, setExpand] = useState(false);
    return (
        <AddTagWrapper onClick={()=>{setExpand(!expand)}}>
            <AddTagunexpanded>
                <Arrow expand={expand} src={rightarrow} width={"8px"}/>
                Add Tags!
                </AddTagunexpanded>
            {expand &&
                <AddTagexpanded>EXPAND</AddTagexpanded>
            }
        </AddTagWrapper>
    )
}

const AddTagWrapper = styled.div`
    background: white;
    // height: ${props => (props.expand? "100px":"22px")};
    width: calc(100% - 132px );
    border-radius: 16px;
    padding: 24px;
    padding-top:10px;
    padding-bottom:10px;
    user-select: none;
`;

const AddTagunexpanded = styled.div`
    background:white;

`

const AddTagexpanded = styled.div`
    background:white;
    
`

const Arrow = styled.img`
    transform: rotate(${props => (props.expand? 90:0)}deg);
    transition: transform 0.05s;
    margin-right: 5px;
    transition-timing-function: ease;
`