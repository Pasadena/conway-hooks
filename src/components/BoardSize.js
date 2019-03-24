import React from 'react';
import debounce from 'lodash.debounce';
import { types, useGameContext } from '../GameContext';

function BoardSize() {
  const [state, dispatch] = useGameContext();

  const changeSize = value => {
    dispatch({ type: types.CHANGE_BOARD_SIZE, payload: Number(value) })
  };
  const debouncedChange = debounce(changeSize, 2000);

  return (
    <div className="BoardSize">
      <div className="BoardSize-wrapper">
        <label>Set the size of the game:</label>
        <input
          type="text"

          onChange={e => debouncedChange(e.target.value)}
        />
      </div>
    </div>
  );
}

export default BoardSize;
