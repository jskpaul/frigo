
import { useState } from "react";
import styled from "styled-components";

import Tag from "../shared/Tag";
import DropdownSearch from "./DropdownSearch";

import rightarrow from "../resources/rightarrow.svg";

export default function FilterSearch(props) {
    const [expand, setExpand] = useState(false);

    const handleRemove = (id) => {
        props.removeTag(id);
    }

    const handleClear = () => {
        props.clearAll();
    }

    return (
        <AddTagWrapper>
            <AddTagunexpanded onClick={()=>{setExpand(!expand)}}>
                <Arrow expand={expand} src={rightarrow} width={"8px"}/>
                    Filter your search
                </AddTagunexpanded>
            {expand &&
                <AddTagexpanded>
                    <DropdownSearch
                        unselected={props.unselected}
                        tags={props.tags}
                        addTag={props.addTag}
                        updateTime={props.updateTime}
                    />
                    {!!props.tags.length && <Clear onClick={() => handleClear()}>Clear All</Clear>}
                    <TagHolder>
                        {props.tags.map((e, i) => {
                            return (
                                <Tag
                                    key={i}
                                    id={e}
                                    removeItem={() => {handleRemove(i)}}
                                    color={'fee371'}
                                    remove
                                    animate
                                >{e}</Tag>
                            )
                        })}
                    </TagHolder>
                </AddTagexpanded>
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
    margin-right: 8px;
    transition-timing-function: ease;
`

const TagHolder = styled.div`
    width: calc(100% - 64px);
    max-height: 162px;
    overflow-y: auto;
`;

const Clear = styled.div`
    color: #4f4b49;
    text-decoration: underline;
    font-size: 0.8em;
    margin-left: 12px;
    cursor: pointer;
    width: 50px;
`;