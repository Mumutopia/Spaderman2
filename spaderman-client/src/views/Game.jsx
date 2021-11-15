import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import { board } from "../js/board.js";
import GameListen from "../components/GameListen.jsx";
import GameDisplay from "../components/GameDisplay.jsx";

const ENDPOINT = "http://localhost:5001";
const socket = socketIOClient(ENDPOINT);

export default function Game() {
  const [myXPosition, setMyxPosition] = useState(5);
  const [myYPosition, setMyyPosition] = useState(5);
  const [otherXPosition, setOtherXPosition] = useState(5);
  const [otherYPosition, setOtherYPosition] = useState(5);
  const [boardGame, setBoardGame] = useState(board);
  const [event, setEvent] = useState("");
  const [myScore, setMyScore] = useState(0);
  const [otherScore, setOtherScore] = useState(0);
  const [myBomb, setMyBomb] = useState(30);
  const [otherBomb, setOtherBomb] = useState(30);
  let cloneBoard;

  function storeEvent(evt) {
    setEvent((event) => (event = evt));
  }

  const handlingInput = (event) => {
    switch (event.key) {
      case "ArrowRight":
        setMyxPosition((myXPosition) =>
          myXPosition < board.length - 1 ? myXPosition + 1 : myXPosition
        );

        break;
      case "ArrowDown":
        setMyyPosition((myYPosition) =>
          myYPosition < board.length - 1 ? myYPosition + 1 : myYPosition
        );
        break;
      case "ArrowUp":
        setMyyPosition((myYPosition) =>
          myYPosition > 0 ? myYPosition - 1 : myYPosition
        );
        break;
      case "ArrowLeft":
        setMyxPosition((myXPosition) => {
          return myXPosition > 0 ? myXPosition - 1 : myXPosition;
        });
        break;
      case "l":
        dig(myXPosition, myYPosition);
        break;
      case "j":
        console.log(boardGame);
        break;

      default:
        break;
    }
  };

  const dig = (x, y) => {
    cloneBoard = [...boardGame];
    console.log("diggingrender");

    switch (boardGame[y][x]) {
      case "R":
        cloneBoard[y][x] = "E";
        setBoardGame(cloneBoard);

        setMyScore((myScore) => myScore + 100);

        break;
      case "BR":
        cloneBoard[y][x] = "E";
        setBoardGame(cloneBoard);
        setMyScore((myScore) => myScore + 200);

        break;
      case "GR":
        cloneBoard[y][x] = "E";
        setBoardGame(cloneBoard);
        setMyScore((myScore) => myScore + 500);

        break;
      case "B":
        cloneBoard[y][x] = "E";
        setBoardGame(cloneBoard);
        setMyBomb((myBomb) => myBomb + 15);
        break;
      default:
        cloneBoard[y][x] = "E";
        setBoardGame(cloneBoard);
        console.log("changed");
        break;
    }
    socket.emit("digBoard", boardGame);
  };

  useEffect(() => {
    socket.on("trackMovement", (data) => {
      console.log("mvt");

      if (socket.id !== data.id) {
        setOtherXPosition(data.movement.myXPosition);
        setOtherYPosition(data.movement.myYPosition);
      }
    });
    socket.on("refreshBoard", (props) => {
      console.log("ok recu");
      console.log(props);
      setBoardGame(props);
    });

    socket.on("otherPlayerScore", (data) => {
      console.log("===", data.myScore);
      console.log(socket.id !== data.id);
      if (socket.id !== data.id) {
        setOtherScore(data.myScore);
      }
    });
    socket.on("otherPlayerBomb", (data) => {
      if (socket.id !== data.id) {
        setOtherBomb(data.myBomb);
      }
    });
  }, []);

  useEffect(() => {
    socket.emit("playerMoving", { myXPosition, myYPosition });
    socket.emit("transferScore", myScore);
    socket.emit("transferBomb", myBomb);
  }, [myXPosition, myYPosition, myScore, myBomb]);

  useEffect(() => {
    handlingInput(event);
    console.log("boardchanged");

    console.log(boardGame);
  }, [event]);

  return (
    <>
      <GameListen storeEvent={storeEvent} />
      <GameDisplay
        otherYPosition={otherYPosition}
        otherXPosition={otherXPosition}
        myXPosition={myXPosition}
        myYPosition={myYPosition}
        myScore={myScore}
        otherScore={otherScore}
        myBomb={myBomb}
        otherBomb={otherBomb}
      />
    </>
  );
}
