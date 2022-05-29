import { useState, useEffect } from "react";
import styled from "styled-components";

export default function ChessModal() {
  const [board, setBoard] = useState([]);
  const [str, setStr] = useState([]);

  useEffect(() => {
    let b = new Array(64).fill(0);

    // Pawns
    for (let i = 8; i < 16; i++) {
      b[i] = 1;
      b[i + 40] = 7;
    }

    // Knights
    b[1] = 2; b[6] = 2; b[57] = 8; b[62] = 8;

    // Bishops
    b[2] = 3; b[5] = 3; b[58] = 9; b[61] = 9;

    // Rooks
    b[0] = 4; b[7] = 4; b[56] = 10; b[63] = 10;

    // Queens
    b[3] = 5; b[59] = 11;

    // Kings
    b[4] = 6; b[60] = 12;

    setBoard(b);
  }, []);

  useEffect(() => {
    setStr(print());
    console.log(print());
  }, [board]);

  const print = () => {
    const row = '+-+-+-+-+-+-+-+-+';
    let s = [];
    for (let i = 0; i < 8; i++) {
      let temp = [];
      for (let j = i*8; j < (i*8) + 8; j++) {
        temp.push('|');
        let p = ' ';
        switch(board[j]) {
          case 1:
            p = 'P';
            break;
          case 2:
            p = 'N';
            break;
          case 3:
            p = 'B';
            break;
          case 4:
            p = 'R';
            break;
          case 5:
            p = 'Q';
            break;
          case 6:
            p = 'K';
            break;
          case 7:
            p = 'p';
            break;
          case 8:
            p = 'n';
            break;
          case 9:
            p = 'b';
            break;
          case 10:
            p = 'r';
            break;
          case 11:
            p = 'q'
            break;
          case 12:
            p = 'k'
            break;
        }
        temp.push(p);
      }
      temp.push('|');
      s.push(row);
      s.push(temp);
    }
    s.push(row);
    s.reverse();

    return s;
  }

  const handleKey = (e) => {
    if (e.keycode === 13) {
      
    }
  }

  return (
    <ModalContainer>
      <ModalBox>
        {str.map((e) => {
          return <div>{e}</div>;
        })}
        <Inp
          type='text'
          onKeyDown={(e) => handleKey(e)}
        />
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
`;

const ModalBox = styled.div`
  background: #FCFBF7;
  height: 500px;
  width: 500px;
  border-radius: 8px;
  padding: 12px;
  padding-right: 36px;
  padding-left: 36px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'Roboto Mono', monospace;
  letter-spacing: 8px;
`;

const Inp = styled.input`
margin-top: 18px;

`;