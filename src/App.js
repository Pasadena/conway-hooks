import React, { Component } from 'react';
import './App.css';
import ContextProvider from './GameContext';
import GameBoard from './components/GameBoard';
import BoardSize from './components/BoardSize';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ContextProvider>
          <BoardSize />
          <GameBoard />
          <div className="App-footer" />
        </ContextProvider>
      </div>
    );
  }
}

export default App;
