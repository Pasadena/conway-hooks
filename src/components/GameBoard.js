import React, { useState, useEffect, useRef } from 'react';

const MAX_LENGTH = 10;

const generateBoard = () => {
  const board = Array(MAX_LENGTH).fill(0).map(row => Array(MAX_LENGTH).fill(0));
  const seed = [[4,5], [4,6], [4,7], [5,5], [5,6], [5,7]];
  const withSeed = seed.reduce((state, point) => {
    const [x, y] = point;
    state[x][y] = 1;
    return state;
  }, board);
  return withSeed;
}

const Cell = ({ cellState }) => {
  return (
    <div className={`Cell ${cellState === 1 ? 'Cell__alive': 'Cell__dead'}`} />
  )
}

function useInterval(callback) {
  const savedCallback = useRef();
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => savedCallback.current();
    let id = setInterval(tick, 2000);
    return () => clearInterval(id);
  }, []);
}

export default function GameBoard() {
  const [boardState, setBoardState] = useState(generateBoard());
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

  const calculateTic = () => {
    const newBoardState = boardState.map(((row, rowIndex) => row.map((col, colIndex) => stateForCell(rowIndex, colIndex))));
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
  useInterval(() => calculateTic());
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