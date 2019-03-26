import React, { useReducer, useContext } from 'react';

export const types = {
  CHANGE_BOARD_SIZE: Symbol('reducer/CHANGE_BOARD_SIZE'),
  ADD_TO_SEED: Symbol('reducer/ADD_TO_SEED'),
  REMOVE_FROM_SEED: Symbol('reducer/REMOVE_FROM_SEED'),
}

const initialState = {
  size: 10,
  selectedCells: [],
  seed: [],
}

function reducer(state, action) {
  switch (action.type) {
    case types.CHANGE_BOARD_SIZE:
      return { ...state, size: action.payload };
    case types.ADD_TO_SEED: {
      state.selectedCells.push(action.data);
      if(state.selectedCells.length === 6) {
        return { ...state, selectedCells: [], seed: state.selectedCells }
      }
      return { ...state };
    }
    case types.REMOVE_FROM_SEED: {
      return { ...state, seed: state.selectedCells.filter(cell => cell !== action.data) };
    }
    default:
      return state;
  }
}

const GameContext = React.createContext(initialState);

const ContextProvider = ({ children }) => {
  const context = useReducer(reducer, initialState);
  return (
    <GameContext.Provider value={context}>
      { children }
    </GameContext.Provider>
  );
}

export function useGameContext() {
  const gameContext = useContext(GameContext);
  return gameContext;
}

export default ContextProvider;