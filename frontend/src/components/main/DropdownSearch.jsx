import { useEffect, useState } from 'react';
import styled from 'styled-components';

import icon from '../resources/magnify.svg';

export default function DropdownSearch(props) {
  const [focus, setFocus] = useState(false);
  const [input, setInput] = useState('');
  const [matches, setMatches] = useState(props.unselected);

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      setFocus(false);
      e.target.blur();
    }
  }

  const handleMouse = (id) => {
    for (let i = 0; i < props.unselected.length; i++) {
      if (props.unselected[i] === id) {
        props.addTag(i);
        break;
      }
    }
  }

  useEffect(() => {
    let x = props.unselected.slice();
    x = x.filter(e => e.includes(input));

    setMatches(x);
  }, [input, props])

  return (
    <Container>
      <Bar>
        <img src={icon} width={"24px"}/>
        <SearchInput
          type="text"
          placeholder="Search for tags"
          value={input}
          onInput={(e) => setInput(e.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={() => {setFocus(false); setInput('')}}
          onKeyDown={(e) => handleKeyPress(e)}
          />
      </Bar>
      <Matches show={focus}>
        {matches.map((e, i) => {
          return (
            <Item key={i} even={i%2} onMouseDown={() => {handleMouse(e)}}>
              {e}
            </Item>
          )
        })}
      </Matches>
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  margin-top: 12px;
  margin-bottom: -16px;
`;

const Bar = styled.div`
  display: flex;
  height: 24px;
  width: calc(100% - 400px);
  min-width: 400px;
  flex-direction: row;
  padding: 12px;
  margin: 20px;
  margin-top: 0px;
  border-radius: 16px;
  overflow-x: auto;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
  // filter: drop-shadow(2px 4px 6px #69696933);
  // background: #fffefa;
`;

const SearchInput = styled.input`
    border: none;
    background: none;
    margin-left: 8px;
    :focus {
        outline: none;
    }
    flex: 1;
`

const Matches = styled.div`
    position: absolute;
    top: 36px;
    left: 72px;;
    z-index: 1;
    filter: drop-shadow(2px 4px 6px #69696933);
    overflow-y: auto;
    overflow-x: hidden;
    max-height: ${props => props.show ? '500px' : '0px'};
    //transition: max-height 0.2s;
`;

const Item = styled.div`
    background: ${props => props.even ? '#fcfbf7' : '#ffffff'};
    width: 400px;
    display: flex;
    align-items: center;
    padding: 8px;
    transition: background 0.1s;
    :hover {
      background: ${props => props.even ? '#edebe4' : '#ebebeb'};
    }
`;