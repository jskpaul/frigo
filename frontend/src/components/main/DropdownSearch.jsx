import { useEffect, useState } from 'react';
import styled from 'styled-components';

import icon from '../resources/magnify.svg';

const times = ['<15 mins', '<30 mins', '<1 hr', '<2 hrs', '>2 hrs'];

export default function DropdownSearch(props) {
  const [focus, setFocus] = useState(false);
  const [input, setInput] = useState('');
  const [matches, setMatches] = useState(props.unselected);

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      if (matches.length) {
        handleMouse(matches[0]);
      }
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

  const handleUpdate = (i) => {
    if (i === props.time) {
      props.updateTime(0);
    } else {
      props.updateTime(i);
    }
  }

  return (
    <Container>
      <Time>
        Filter By Time: 
        {times.map((e, i) => {
          return (
            <StupidFuckingButtons key={i} selected={i+1 === props.time} onClick={() => handleUpdate(i + 1)}>
              {e}
            </StupidFuckingButtons>
          )
        })}
      </Time>
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
  margin-top: 16px;
  margin-bottom: -16px;
`;

const Bar = styled.div`
  display: flex;
  height: 24px;
  width: calc(100% - 256px);
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
    top: 92px;
    left: 64px;;
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

const Time = styled.div`
  width: 548px;
  margin-left: 32px;
  margin-top: 12px;
  margin-bottom: 4px;
  border: none;
  background: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px;
  font-size: 12px;
  font-weight: 400;
`;

const StupidFuckingButtons = styled.div`
  width: 74px;
  height: 32px;
  border-radius: 12px;
  background: ${props => props.selected ? '#cdcdcd' : '#ebebeb'};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: 600;
`;