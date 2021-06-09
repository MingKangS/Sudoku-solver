import React from 'react';
import Sudoku from './Sudoku/Sudoku';
import './App.css';
import ReactDOM from 'react-dom'

function App() {
  return (
    
    <div className="App">
      <header>SUDOKU SOLVER VISUALISER</header>
      <div class="space1"></div>
      <div><Sudoku></Sudoku></div> 
      <div class="space1"></div>
      <div id="bottom"></div>
    </div>
  );
}

export default App;
