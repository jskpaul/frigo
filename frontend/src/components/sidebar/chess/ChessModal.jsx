import { useState, useEffect } from "react";
import styled from "styled-components";

const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

export default function ChessModal(props) {
  const [board, setBoard] = useState([]);
  const [str, setStr] = useState([]);
  const [inpVal, setInpVal] = useState('');
  const [current, toggleCurrent] = useState(0);

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
    //console.log(print());
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

  const getLegalMoves = (player, state) => {
    let moves = new Array(64);

    for (let i = 0; i < 64; i++) {
      moves[i] = new Array(64).fill(0);
      // moves[i] is the starting square
      // moves[i][j] is where you go
      // coordinate board[x + 8*y]
      let x = i % 8;
      let y = Math.floor(i / 8);
      let m = [];
      if (player === 0) {
        switch(state[x + 8*y]) {
          case 1: // P
            if (state[i + 8] === 0) {
              moves[i][i + 8] = 1;
            }
            if ((state[i + 16] === 0) && (y === 1)) {
              moves[i][i + 16] = 1;
            }
            if ((state[i + 7] > 6) && (x !== 0)) {
              moves[i][i + 7] = 1;
            }
            if ((state[i + 9] > 6) && (x !== 7)) {
              moves[i][i + 9] = 1;
            }
            // En Passant
            // Promotion
            break;
          case 2: // N
            /*
            6 7
            4   5
            2   3
            0 1
            */
            m = new Array(8).fill(1);
            if (x === 0) {
              m = m && [0, 1, 0, 1, 0, 1, 0, 1];
            } else if (x === 7) {
              m = m && [1, 0, 1, 0, 1, 0, 1, 0];
            } else if (x === 1) {
              m = m && [1, 1, 0, 1, 0, 1, 1, 1];
            } else if (x === 6) {
              m = m && [1, 1, 1, 0, 1, 0, 1, 1];
            }
            if (y === 0) {
              m = m && [0, 0, 0, 0, 1, 1, 1, 1];
            } else if (y === 7) {
              m = m && [1, 1, 1, 1, 0, 0, 0, 0];
            } else if (y === 1) {
              m = m && [0, 0, 1, 1, 1, 1, 1, 1];
            } else if (y === 6) {
              m = m && [1, 1, 1, 1, 1, 1, 0, 0];
            }
            [-17, -15, -10, -6, 6, 10, 15, 17].map((e, ind) => {
              if (m[ind] && ((state[i + e] === 0) || (state[i + e] > 6))) {
                moves[i][i + e] = 1;
              }
            });
            break;
          case 3: // B
            for (let k = 1; k < 8 - x; k++) {
              if ((y + k < 8) && ((state[i + 9*k] === 0) || (state[i + 9*k] > 6))) {
                moves[i][i + 9*k] = 1;
              } else {
                break;
              }
            }
            for (let k = 1; k < 8 - x; k++) {
              if ((y - k >= 0) && ((state[i - 7*k] === 0) || (state[i - 7*k] > 6))) {
                moves[i][i - 7*k] = 1;
              } else {
                break;
              }
            }
            for (let k = 1; k < x; k++) {
              if ((y + k < 8) && ((state[i + 7*k] === 0) || (state[i + 7*k] > 6))) {
                moves[i][i + 7*k] = 1;
              } else {
                break;
              }
            }
            for (let k = 1; k < 8 - x; k++) {
              if ((y - k >= 0) && ((state[i - 9*k] === 0) || (state[i - 9*k] > 6))) {
                moves[i][i - 9*k] = 1;
              } else {
                break;
              }
            }
            break;
          case 5: // Q
            for (let k = 1; k < 8 - x; k++) {
              if ((y + k < 8) && ((state[i + 9*k] === 0) || (state[i + 9*k] > 6))) {
                moves[i][i + 9*k] = 1;
              } else {
                break;
              }
            }
            for (let k = 1; k < 8 - x; k++) {
              if ((y - k >= 0) && ((state[i - 7*k] === 0) || (state[i - 7*k] > 6))) {
                moves[i][i - 7*k] = 1;
              } else {
                break;
              }
            }
            for (let k = 1; k < x; k++) {
              if ((y + k < 8) && ((state[i + 7*k] === 0) || (state[i + 7*k] > 6))) {
                moves[i][i + 7*k] = 1;
              } else {
                break;
              }
            }
            for (let k = 1; k < 8 - x; k++) {
              if ((y - k >= 0) && ((state[i - 9*k] === 0) || (state[i - 9*k] > 6))) {
                moves[i][i - 9*k] = 1;
              } else {
                break;
              }
            }
          case 4: // R
            for (let k = 1; k < 8 - x; k++) {
              if ((state[i + k] === 0) || (state[i + k] > 6)) {
                moves[i][i + k] = 1;
              } else {
                break;
              }
            }
            for (let k = 1; k < x; k++) {
              if ((state[i - k] === 0) || (state[i - k] > 6)) {
                moves[i][i - k] = 1;
              } else {
                break;
              }
            }
            for (let k = 1; k < y; k++) {
              if ((state[i - 8*k] === 0) || (state[i - 8*k] > 6)) {
                moves[i][i - 8*k] = 1;
              } else {
                break;
              }
            }
            for (let k = 1; k < 8 - y; k++) {
              if ((state[i + 8*k] === 0) || (state[i  + 8*k] > 6)) {
                moves[i][i + 8*k] = 1;
              } else {
                break;
              }
            }
            break;
          case 6: // K
            m = new Array(8).fill(1);
            if (x === 7) {
              m = m && [1, 0, 0, 0, 1, 1, 1, 1];
            } else if (x === 0) {
              m = m && [1, 1, 1, 1, 1, 0, 0, 0];
            }
            if (y === 7) {
              m = m && [0, 0, 1, 1, 1, 1, 1, 0];
            } else if (y === 0) {
              m = m && [1, 1, 1, 0, 0, 0, 1, 1];
            }
            [8, 9, 1, -7, -8, -9, -1, 7].map((e, ind) => {
              if (m[ind] && ((state[i + e] > 6) || (state[i + e] === 0))) {
                moves[i][i + e] = 1;
              }
            })
            break;
        }
      } else {
        switch(state[x + 8*y]) {
          case 7: // p
            if (state[i - 8] === 0) {
              moves[i][i - 8] = 1;
            }
            if ((state[i - 16] === 0) && (y === 6)) {
              moves[i][i - 16] = 1;
            }
            if ((state[i - 7] && (state[i - 7] < 7)) && (x !== 7)) {
              moves[i][i - 7] = 1;
            }
            if ((state[i - 9] && (state[i - 9] < 7)) && (x !== 0)) {
              moves[i][i - 9] = 1;
            }
            // En Passant
            // Promotion
            break;
          case 8: // n
            m = new Array(8).fill(1);
            if (x === 0) {
              m = m && [0, 1, 0, 1, 0, 1, 0, 1];
            } else if (x === 7) {
              m = m && [1, 0, 1, 0, 1, 0, 1, 0];
            } else if (x === 1) {
              m = m && [1, 1, 0, 1, 0, 1, 1, 1];
            } else if (x === 6) {
              m = m && [1, 1, 1, 0, 1, 0, 1, 1];
            }
            if (y === 0) {
              m = m && [0, 0, 0, 0, 1, 1, 1, 1];
            } else if (y === 7) {
              m = m && [1, 1, 1, 1, 0, 0, 0, 0];
            } else if (y === 1) {
              m = m && [0, 0, 1, 1, 1, 1, 1, 1];
            } else if (y === 6) {
              m = m && [1, 1, 1, 1, 1, 1, 0, 0];
            }
            [-17, -15, -10, -6, 6, 10, 15, 17].map((e, ind) => {
              if (m[ind] && (state[i + e] < 7)) {
                moves[i][i + e] = 1;
              }
            });
            break;
          case 9: // b
            for (let k = 1; k < 8 - x; k++) {
              if ((y + k < 8) && (state[i + 9*k] < 7)) {
                moves[i][i + 9*k] = 1;
              } else {
                break;
              }
            }
            for (let k = 1; k < 8 - x; k++) {
              if ((y - k >= 0) && (state[i + 9*k] < 7)) {
                moves[i][i - 7*k] = 1;
              } else {
                break;
              }
            }
            for (let k = 1; k < x; k++) {
              if ((y + k < 8) && (state[i + 9*k] < 7)) {
                moves[i][i + 7*k] = 1;
              } else {
                break;
              }
            }
            for (let k = 1; k < 8 - x; k++) {
              if ((y - k >= 0) && (state[i + 9*k] < 7)) {
                moves[i][i - 9*k] = 1;
              } else {
                break;
              }
            }
            break;
          case 11: // q
            for (let k = 1; k < 8 - x; k++) {
              if ((y + k < 8) && (state[i + 9*k] < 7)) {
                moves[i][i + 9*k] = 1;
              } else {
                break;
              }
            }
            for (let k = 1; k < 8 - x; k++) {
              if ((y - k >= 0) && (state[i + 9*k] < 7)) {
                moves[i][i - 7*k] = 1;
              } else {
                break;
              }
            }
            for (let k = 1; k < x; k++) {
              if ((y + k < 8) && (state[i + 9*k] < 7)) {
                moves[i][i + 7*k] = 1;
              } else {
                break;
              }
            }
            for (let k = 1; k < 8 - x; k++) {
              if ((y - k >= 0) && (state[i + 9*k] < 7)) {
                moves[i][i - 9*k] = 1;
              } else {
                break;
              }
            }
          case 10: // r
            for (let k = 1; k < 8 - x; k++) {
              if (state[i + k] < 7) {
                moves[i][i + k] = 1;
              } else {
                break;
              }
            }
            for (let k = 1; k < x; k++) {
              if (state[i - k] < 7) {
                moves[i][i - k] = 1;
              } else {
                break;
              }
            }
            for (let k = 1; k < y; k++) {
              if (state[i - 8*k] < 7) {
                moves[i][i - 8*k] = 1;
              } else {
                break;
              }
            }
            for (let k = 1; k < 8 - y; k++) {
              if (state[i + 8*k] < 7) {
                moves[i][i + 8*k] = 1;
              } else {
                break;
              }
            }
            break;
          case 12: // k
            m = new Array(8).fill(1);
            if (x === 7) {
              m = m && [1, 0, 0, 0, 1, 1, 1, 1];
            } else if (x === 0) {
              m = m && [1, 1, 1, 1, 1, 0, 0, 0];
            }
            if (y === 7) {
              m = m && [0, 0, 1, 1, 1, 1, 1, 0];
            } else if (y === 0) {
              m = m && [1, 1, 1, 0, 0, 0, 1, 1];
            }
            [8, 9, 1, -7, -8, -9, -1, 7].map((e, ind) => {
              if (m[ind] && (state[i + e] < 7)) {
                moves[i][i + e] = 1;
              }
            })
            break;
        }
      }
    }

    console.log(moves);
    return moves;
  }

  const inCheck = (player) => {
    let king = 0;
    for (let i = 0; i < 64; i++) {
      if (board[i] === (6 + (player * 6))) {
        king = i;
        break;
      }
    }
    let m = getLegalMoves(1 - player, board);
    let inCheck = false;
    for (let i = 0; i < 64; i++) {
      if (m[i][king]) {
        inCheck = true;
        break;
      }
    }
    
    return inCheck;
  }

  const handleMouse = () => {
    props.exit();
  }

  const checkCheck = (from, to, player) => {
    let hypothetical = board.slice();
    hypothetical[to] = hypothetical[from].slice();
    hypothetical[from] = 0;
    let king = 0;
    for (let i = 0; i < 64; i++) {
      if (hypothetical[i] === (6 + (player *6))) {
        king = i;
        break;
      }
    }
    let c = getLegalMoves(1 - player, hypothetical).map((e) => {
      if (e[king]) {
        return 1;
      }
      return 0;
    });
    
    return (c.indexOf(1) !== -1);
  }

  const handleKey = (e) => {
    if (e.keyCode === 13) {
      let m = getLegalMoves(current, board);
      for (let i = 0; i < 64; i++) {
        for (let j = 0; j < 64; j++) {
          if (m[i][j]) {
            if (checkCheck(i, j, current)) {
              m[i][j] = 0;
            }
          }
        }
      }
      let startFile = files.indexOf(inpVal.slice(0,1));
      let startRank = inpVal.slice(1,2) - 1;
      let endFile = files.indexOf(inpVal.slice(2,3));
      let endRank = inpVal.slice(3,4) - 1;
      let start = startFile + 8*startRank;
      let end = endFile + 8*endRank;
      if (m[start][end]) {
        let checkStore = board.slice();
        let b = board.slice();
        b[end] = b[start];
        b[start] = 0;
        setBoard(b);
        if (inCheck(current)) {
          setBoard(checkStore);
        } else {
          toggleCurrent(1 - current);
        }
      }
    }
  }

  return (
    <ModalContainer onClick={() => handleMouse()}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        {str.map((e, i) => {
          return <div key={i}>{e}</div>;
        })}
        <Inp
          type='text'
          value={inpVal}
          onInput={(e) => setInpVal(e.target.value)}
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