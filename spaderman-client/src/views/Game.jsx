import "../styles/Game.css";
import React, { useState, useEffect, useRef } from "react";
import { useParams} from "react-router";
import { socket } from "../js/socket";
import { board } from "../js/board.js";
import GameListen from "../components/GameListen.jsx";
import GameDisplay from "../components/GameDisplay.jsx";
import GameBoard from "../components/GameBoard";



let bombAudio = [
    new Audio("/sounds/bomb1.mp3"),
    new Audio("/sounds/bomb2.mp3"),
    new Audio("/sounds/bomb3.mp3"),
    new Audio("/sounds/bomb4.mp3"),
    new Audio("/sounds/bomb5.mp3"),
  ];

  let digAudio = [
    new Audio("/sounds/digging.mp3"),
    new Audio("/sounds/digging2.mp3"),
  ];

  let gameAudio = new Audio("/sounds/game-music2.mp3");
  let gameIntro = new Audio("/sounds/intro2.mp3");
  let gameOutro = new Audio("/sounds/intro2.mp3");
  
  

  let getItemAudio = [
    new Audio("/sounds/get-item.mp3"),
    new Audio("/sounds/get-item2.mp3"),
    new Audio("/sounds/get-item3.mp3"),
  ];


export default function Game() {


  // function randomItemsSound() {
    
  //   setTimeout(() => {
  //     getItemAudio[Math.floor(Math.random() * 3)].play();
  //   }, 1000);
  // }
  

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
  const [isBusy, setIsBusy] = useState(false);
  const [isStunned, setIsStunned] = useState(false);
  const myXPositionRef = useRef(myXPosition);
  const myYPositionRef = useRef(myYPosition);
  const otherXPositionRef = useRef(otherXPosition);
  const otherYPositionRef = useRef(otherYPosition);
  const params= useParams()
 const room = params.name
  

  myXPositionRef.current = myXPosition;
  myYPositionRef.current = myYPosition;
  otherXPositionRef.current = otherXPosition;
  otherYPositionRef.current = otherYPosition;

  const bombRadius = 2;

  let cloneBoard;

  function storeEvent(evt) {
    setEvent((event) => (event = evt));
  }

  const handlingInput = (event) => {
    if (!isBusy && !isStunned) {
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
          digAudio[Math.floor(Math.random() * 2)].play();
          setIsBusy(true);
          setTimeout(() => {
            setIsBusy(false);
          }, 1000);
          break;
        case "j":
          if (myBomb > 0) {
            plantBomb(myXPosition, myYPosition);
            plantedBomb();
            setMyBomb((myBomb) => myBomb - 1);
          }

          break;

        default:
          break;
      }
    }
  };

  function checkRadius(bomb, radius, xPos, yPos) {
    console.log(xPos, yPos);

    if (
      bomb[0] - radius <= xPos &&
      bomb[0] + radius >= xPos &&
      bomb[1] - radius <= yPos &&
      bomb[1] + radius >= yPos &&
      (bomb[0] === xPos || bomb[1] === yPos)
    ) {
      return true;
    } else return false;
  }

  function plantedBomb() {
    const bombPlanted = [myXPosition, myYPosition];
    console.log("bombavant", bombPlanted);
    setTimeout(() => {
      if (
        checkRadius(
          bombPlanted,
          bombRadius,
          myXPositionRef.current,
          myYPositionRef.current
        )
      ) {
        setMyScore((myScore) => myScore - 200);
        setIsStunned(true);
        setTimeout(() => {
          setIsStunned(false);
        }, 1800);
      }

      if (
        checkRadius(
          bombPlanted,
          bombRadius,
          otherXPositionRef.current,
          otherYPositionRef.current
        )
      ) {
        socket.emit("sendStunned",room, true);
        setTimeout(() => {
          socket.emit("sendStunned",room, false);
        }, 1800);
      }
    }, 2000);
  }

  const plantBomb = (x, y) => {
    cloneBoard = [...boardGame];
    const bufferValue = cloneBoard[y][x];
    cloneBoard[y][x] += "T";

    setBoardGame(cloneBoard);
    socket.emit("digBoard",room, boardGame);
    setTimeout(function () {
      cloneBoard[y][x] = bufferValue[0];
      console.log(cloneBoard);
      addRadiusX(x, y);
      addRadiusY(x, y);
      socket.emit("digBoard",room, boardGame);
      bombAudio[Math.floor(Math.random() * 5)].play();
      setTimeout(() => {
        removeRadiusX(x, y);
        removeRadiusY(x, y);
        socket.emit("digBoard",room, boardGame);
      }, 250);
    }, 2000);
  };

  const addRadiusX = (x, y) => {
    for (let i = -bombRadius; i <= bombRadius; i++) {
      if (cloneBoard[y][x + i] !== undefined) {
        cloneBoard[y][x + i] += "X";
      }
    }
    setBoardGame(cloneBoard);
  };
  const addRadiusY = (x, y) => {
    for (let i = -bombRadius; i <= bombRadius; i++) {
      if (y + i >= 0 && y + i < 10) {
        cloneBoard[y + i][x] += "X";
      }
    }
    setBoardGame(cloneBoard);
  };

  const removeRadiusX = (x, y) => {
    for (let i = -bombRadius; i <= bombRadius; i++) {
      if (cloneBoard[y][x + i] !== undefined) {
        let originalValue = boardGame[y][x + i];
        cloneBoard[y][x + i] = originalValue[0];
      }
    }
    setBoardGame(cloneBoard);
  };

  const removeRadiusY = (x, y) => {
    for (let i = -bombRadius; i <= bombRadius; i++) {
      if (y + i >= 0 && y + i < 10) {
        let originalValue = boardGame[y + i][x];
        cloneBoard[y + i][x] = originalValue[0];
      }
    }
    setBoardGame(cloneBoard);
  };

  const dig = (x, y) => {
    cloneBoard = [...boardGame];

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

        break;
    }
    socket.emit("digBoard",room, boardGame);
  };

  useEffect(() => {
    
    socket.emit("new-user",params.name)

    socket.on("trackMovement", (myXPosition,myYPosition,id) => {
      console.log(myXPosition);
      if (socket.id !== id) {
        setOtherXPosition(myXPosition);
        setOtherYPosition(myYPosition);
      }
    });
    socket.on("refreshBoard", (props) => {
      setBoardGame(props);
    });

    socket.on("otherPlayerScore", (data) => {
      if (socket.id !== data.id) {
        setOtherScore(data.myScore);
      }
    });
    socket.on("otherPlayerBomb", (data) => {
      if (socket.id !== data.id) {
        setOtherBomb(data.myBomb);
      }
    });

    socket.on("Stunned", (message) => {
      setIsStunned(message);
      setMyScore((myScore) => myScore - 100);
    });

 
  }, []);

  
  useEffect(() => {
    
    socket.emit("playerMoving",  myXPosition,myYPosition,room);
    socket.emit("transferScore",params.name, myScore);
    socket.emit("transferBomb",room, myBomb);
  }, [myXPosition, myYPosition, myScore, myBomb, isBusy]);

  useEffect(() => {
    handlingInput(event);

    console.log(boardGame);
  }, [event]);

  return (
    <>
      <div id="game-wrapper">
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
        <GameBoard
          board={boardGame}
          myXPosition={myXPosition}
          myYPosition={myYPosition}
          otherYPosition={otherYPosition}
          otherXPosition={otherXPosition}
        />
      </div>
    </>
  );
}
