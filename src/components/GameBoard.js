import React, { useState } from 'react';
import useTic from '../util/useTic';
import generateInitialState from '../util/initialState';

const Cell = ({ cellState }) => {
  return (
    <div className={`Cell ${cellState === 1 ? 'Cell__alive': 'Cell__dead'}`} />
  )
}

export default function GameBoard() {
  const [boardState, setBoardState] = useState(generateInitialState());
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
  /**useEffect(async () => {
    const seed = await initialDataGenerator();
    const withSeed = seed.reduce((state, point) => {
      const [x, y] = point;
      state[x][y] = 1;
      return state;
    }, boardState);
    console.log("With seed", withSeed)
    setBoardState(withSeed);
  }, []);**/
  useTic(() => doTic());
  return (
    <div className="Board">
      {
        boardState.map((row, rowIndex) => row.map((col, colIndex) => {
          return <Cell key={`cell-${rowIndex}-${colIndex}`} cellState={boardState[rowIndex][colIndex]} />
        }))
      }
    </div>
  );
}