import "../styles/GameBoard.css";
import React, { useRef } from "react";

export default function GameBoard({
  board,
  myXPosition,
  myYPosition,
  otherXPosition,
  otherYPosition,
  gameTimer
}) {

   
  const getCSSClass = (i, j) => {
    const classes = [];
    const store = board[i][j]
    classes.push(
      i === myYPosition && j === myXPosition ? "myPlayer" : undefined
    );
    
    classes.push( store.includes("T") ? "bombs" : undefined) 
    classes.push( store.includes("X") ? "bomb-radius" : undefined) 
    classes.push(
      i === otherYPosition && j === otherXPosition ? "otherPlayer" : undefined
    );
    classes.push(board[i][j] === "E" ? "dug" : undefined);
    return classes.filter((c) => c !== undefined).join(" ");
   
  };
  const getCSSClasss = (i, j) => {
    const classes = [];

    return classes.filter((c) => c !== undefined).join(" ");
    // i === otherYPosition && j === otherXPosition
    // ? "otherPlayer"
    // : board[i][j] === "E" ? "dug" : ""
  };

  


  const fusionFunction = (i, j) => {
    return getCSSClass(i, j) + " " + getCSSClasss(i, j);
  };

  return (
    <div id="boardGame-wrapper">
    <h3>Time left : {gameTimer}</h3>
      <div id="board-wrapper">
        {board.map((x, i) =>
          x.map((y, j) => (
            <div
              className={fusionFunction(i, j)}
              data-coord={{ x: j, y: i }}
              data-x={j}
              data-y={i}
              key={j + "-" + i}
              id={j + "-" + i}
            ></div>
          ))
        )}
      </div>
    </div>
  );
}
