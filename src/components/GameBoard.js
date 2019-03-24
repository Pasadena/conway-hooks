import React, { useState, useEffect } from 'react';
import useTic from '../util/useTic';
import generateInitialState from '../util/initialState';
import { types, useGameContext } from '../GameContext';

const Cell = ({ cellState }) => {
  return (
    <div className={`Cell ${cellState === 1 ? 'Cell__alive': 'Cell__dead'}`} />
  )
}

export default function GameBoard() {
  const [state, dispatch] = useGameContext();
  const [boardState, setBoardState] = useState(generateInitialState(state.size));

  const stateForCell = (x, y) => {
    const prevState = boardState[x][y];
    const aliveNeighbours = boardState
      .slice(x - 1, x + 2)
      .map(row => row.slice(y - 1, y + 2))
      .flat()
      .reduce((sum, item) => sum + item, 0);
    if (aliveNeighbours === 2 || aliveNeighbours === 3) return 1;
    if (prevState === 0 && aliveNeighbours === 3) return 1;
    return 0;
  }

  const doTic = () => {
    const newBoardState = boardState
      .map(((row, rowIndex) => row.map((col, colIndex) => stateForCell(rowIndex, colIndex))));
    setBoardState(newBoardState);
  }

  useEffect(() => {
    setBoardState(generateInitialState(state.size))
  }, [state.size]);

  useTic(() => doTic());
  return (
    <div className="Board" style={{ gridTemplateColumns: `repeat(${state.size}, 1fr)` }}>
      {
        boardState.map((row, rowIndex) => row.map((col, colIndex) => {
          return (
            <Cell
                style={{ width: `100/${state.size}%`, height: `100/${state.size}%` }}
                key={`cell-${rowIndex}-${colIndex}`}
                cellState={boardState[rowIndex][colIndex]}
              />
          );
        }))
      }
    </div>
  );
}