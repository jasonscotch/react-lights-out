import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows = 5, ncols = 5, chanceLightStartsOn = 0.25 }) {
  const [board, setBoard] = useState(createBoard());
  let newBoard = [];

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    
    for (let i = 0; i < nrows; i++) {
      let row = [];
      for (let j = 0; j < ncols; j++) {
        const isLit = Math.random() < chanceLightStartsOn;
        row.push(isLit);
      }
      initialBoard.push(row);
    }

    return initialBoard;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    return board.every(row => row.every(value => value === false));
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // Make a (deep) copy of the oldBoard
      newBoard = oldBoard.map(row => [...row]);

      // in the copy, flip this cell and the cells around it
      flipCell(y, x, newBoard);

      flipCell(y - 1, x, newBoard);
      flipCell(y + 1, x, newBoard);
      flipCell(y, x - 1, newBoard);
      flipCell(y, x + 1, newBoard);

      return newBoard;
    });
  }

  function restartGame() {
    // Call setBoard with a new board state
    setBoard(createBoard());
  }

  // if the game is won, just show a winning msg & render nothing else

  if (hasWon()) {
    return ( 
    <div>
      <div className="Board-win roll-in-left">You have Won!</div>
      <button className="Board-button" onClick={restartGame}>Restart</button>
    </div>
    
    )
  }

  // make table board
  let table = [];

  for (let i = 0; i < nrows; i++) {
    let row = [];
    for (let j = 0; j < ncols; j++) {
      let coord = `${i}-${j}`;
      row.push(
        <Cell
          key={coord}
          isLit={board[i][j]}
          flipCellsAroundMe={() => flipCellsAround(coord)} 
        />
      );
    }
    table.push(<tr key={i}>{row}</tr>)
  }
  
  

  return (
    <div>
      <h2>Lights Out!</h2>
      <table className="Board">
        <tbody>{table}</tbody>
      </table>
      <button className="Board-button" onClick={restartGame}>Restart</button>
    </div>
  )

}

export default Board;
