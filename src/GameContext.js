import React, { useReducer, useContext } from 'react';

export const types = {
  CHANGE_BOARD_SIZE: Symbol('reducer/CHANGE_BOARD_SIZE'),
}

const initialState = {
  size: 10,
}

function reducer(state, action) {
  switch (action.type) {
    case types.CHANGE_BOARD_SIZE:
      return { size: action.payload };
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