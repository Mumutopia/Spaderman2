import "../styles/Game.css";
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router";
import { socket } from "../js/socket";
import { board } from "../js/board.js";
import { Link, Navigate } from "react-router-dom";
import GameListen from "../components/GameListen.jsx";
import GameDisplay from "../components/GameDisplay.jsx";
import GameBoard from "../components/GameBoard";
import DisplayWinner from "../components/DisplayWinner";
import APIHandler from "../api/APIHandler";
import { useAuth } from "../auth/UserContext";
import DisplayOtherPlayer from "../components/DisplayOtherPlayer";

let bombAudio = [
  new Audio("/sounds/bomb1.mp3"),
  new Audio("/sounds/bomb2.mp3"),
  new Audio("/sounds/bomb3.mp3"),
  new Audio("/sounds/bomb4.mp3"),
  new Audio("/sounds/bomb5.mp3"),
  new Audio("/sounds/bomb6.mp3"),
  new Audio("/sounds/bomb7.mp3"),
];

let digAudio = [
  new Audio("/sounds/digging.mp3"),
  new Audio("/sounds/digging2.mp3"),
  new Audio("/sounds/digging3.mp3"),
  new Audio("/sounds/digging4.mp3"),
];

let gameAudio = new Audio("/sounds/game-music2.mp3");
let gameIntro = new Audio("/sounds/intro2.mp3");
let gameOutro = new Audio("/sounds/intro2.mp3");

let getItemAudio = [
  new Audio("/sounds/get-item.mp3"),
  new Audio("/sounds/get-item2.mp3"),
  new Audio("/sounds/get-item3.mp3"),
  new Audio("/sounds/get-item4.mp3"),
  new Audio("/sounds/get-item5.mp3"),
  new Audio("/sounds/get-item6.mp3"),
];

let gethitAudio = [
  new Audio("/sounds/hit.mp3"),
  new Audio("/sounds/hit2.mp3"),
  new Audio("/sounds/hit3.mp3"),
  new Audio("/sounds/hit4.mp3"),
  new Audio("/sounds/hit5.mp3"),
  new Audio("/sounds/hit6.mp3"),
  new Audio("/sounds/hit7.mp3"),
  new Audio("/sounds/hit8.mp3"),
  new Audio("/sounds/hit6.mp3"),
]

function randomItemsSound() {
  
  setTimeout(() => {
    getItemAudio[Math.floor(Math.random() * 6)].play();
  }, 1000);
}

/*
const [players, setWhoIsWho] = useState({
    p1: null,
    p2: null,
  })
const players =  {
  p1: null,
  p2: null,
};

const currentPlayerToSet = Object.entries(players).find(p => p === null);
currentPlayerToSet = "socket-id"
*/

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
  const [isBusy, setIsBusy] = useState(true);
  const [isStunned, setIsStunned] = useState(false);
  const [gameTimer, setGameTimer] = useState(30);
  const [hideStartButton, setHideStartButton] = useState();
  const [displayResult, setDisplayResult] = useState("hide-result");
  const [displayDugitems, setDisplayDugItem] = useState("item-dug");
  const [otherPlayerName, setOtherPlayerName] = useState("waiting for player...")
  const [hitPlayerImage,setHitPlayerImage] = useState("/img/blue-shovel4.png")
  const [hitOtherPlayerImage,setHitOtherPlayerImage] = useState("/img/red-shovel4.png")

  const myXPositionRef = useRef(myXPosition);
  const myYPositionRef = useRef(myYPosition);
  const otherXPositionRef = useRef(otherXPosition);
  const otherYPositionRef = useRef(otherYPosition);
  const gameTimerRef = useRef(gameTimer);
  const params = useParams();
  const room = params.id;
  const myScoreRef = useRef(myScore);
  const otherScoreRef = useRef(otherScore);

  const { currentUser } = useAuth();

  
  myXPositionRef.current = myXPosition;
  myYPositionRef.current = myYPosition;
  otherXPositionRef.current = otherXPosition;
  otherYPositionRef.current = otherYPosition;
  gameTimerRef.current = gameTimer;
  myScoreRef.current = myScore;
  otherScoreRef.current = otherScore;

  const bombRadius = 2;

  let cloneBoard;

  const leaveGame = async () => {
    gameAudio.pause();
    try {
      socket.emit("closeRoom");
      await APIHandler.delete(`/play/rooms/${room}`);
    } catch (err) {
      console.error(err);
    }
  };

  function startGame() {
    setIsBusy(false);
    gameAudio.play();
    socket.emit("newuser-refresh",params.id, currentUser?.username)
    
    setHideStartButton("start-button-hidden");
    let gameTime = setInterval(() => {
      setGameTimer((time) => time - 1);

      if (gameTimerRef.current <= 0) {
        clearInterval(gameTime);
        setIsBusy(true);
        setDisplayResult("display-result");
        saveResult();
      }
    }, 1000);
  }

  function sendSignal() {
    
    socket.emit("sendStartSignal", room);
  }

  const saveResult = async () => {
    try {
      const result = {
        player: currentUser._id,
        score: myScoreRef.current,
        otherScore: otherScoreRef.current,
      };
      
      await APIHandler.post("/games", result);
    } catch (err) {
      console.error(err);
    }
  };

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
          digAudio[Math.floor(Math.random() * 4)].play();
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
    
    setTimeout(() => {
      if (
        checkRadius(
          bombPlanted,
          bombRadius,
          myXPositionRef.current,
          myYPositionRef.current
        )
      ) {
        gethitAudio[Math.floor(Math.random() * 9)].play();
        setMyScore((myScore) => myScore - 200);
        setIsStunned(true);
        setHitPlayerImage("/img/blue-hit.png")
        setTimeout(() => {
          setHitPlayerImage("/img/blue-shovel4.png")
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
        socket.emit("sendStunned", room, true);
        setHitOtherPlayerImage("/img/red-hit.png")
        setTimeout(() => {
          socket.emit("sendStunned", room, false);
          setHitOtherPlayerImage("/img/red-shovel4.png")
        }, 1800);
      }
    }, 2000);
  }

  const plantBomb = (x, y) => {
    cloneBoard = [...boardGame];
    const bufferValue = cloneBoard[y][x];
    cloneBoard[y][x] += "T";

    setBoardGame(cloneBoard);
    socket.emit("digBoard", room, boardGame);
    setTimeout(function () {
      cloneBoard[y][x] = bufferValue[0];
      
      addRadiusX(x, y);
      addRadiusY(x, y);
      socket.emit("digBoard", room, boardGame);
      bombAudio[Math.floor(Math.random() * 7)].play();
      setTimeout(() => {
        removeRadiusX(x, y);
        removeRadiusY(x, y);
        socket.emit("digBoard", room, boardGame);
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
        setDisplayDugItem("ruby-dug");
        randomItemsSound();

        break;
      case "BR":
        cloneBoard[y][x] = "E";
        setBoardGame(cloneBoard);
        setMyScore((myScore) => myScore + 200);
        setDisplayDugItem("blueruby-dug");
        randomItemsSound();

        break;
      case "GR":
        cloneBoard[y][x] = "E";
        setBoardGame(cloneBoard);
        setMyScore((myScore) => myScore + 500);
        setDisplayDugItem("goldruby-dug");
        randomItemsSound();

        break;
      case "B":
        cloneBoard[y][x] = "E";
        setBoardGame(cloneBoard);
        setMyBomb((myBomb) => myBomb + 15);
        setDisplayDugItem("bomb-dug");
        randomItemsSound();

        break;
      default:
        cloneBoard[y][x] = "E";
        setBoardGame(cloneBoard);

        break;
    }
    socket.emit("digBoard", room, boardGame);
  };

  useEffect(() => {
    socket.emit("new-user", params.id, currentUser?.username);

    socket.on("trackMovement", (myXPosition, myYPosition, id) => {
      
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

    socket.on("startSignal", () => {
      
      startGame();
    });

    socket.on("incomingUser",username => {
      console.log("receivedname")
      setOtherPlayerName(username)
    })
  }, []);

  useEffect(() => {
    socket.emit("playerMoving", myXPosition, myYPosition, room);
    socket.emit("transferScore", params.id, myScore);
    socket.emit("transferBomb", room, myBomb);
  }, [
    myXPosition,
    myYPosition,
    myScore,
    myBomb,
    isBusy,
    gameTimer,
    displayResult,otherPlayerName
  ]);

  useEffect(() => {
    handlingInput(event);

    
  }, [event]);

  return (
    <>
      <div id="game-wrapper">
        <h2 className="player1-name">{currentUser?.username}</h2>
        <h2 className="player2-name">{otherPlayerName}</h2>
        <div className="gameboard-header">
          <h1 className="main-board-title">Spaderman</h1>

          <div className="header-buttons">
            <button className={hideStartButton} onClick={sendSignal}>
              Start{" "}
            </button>
            <button className="quit-button" onClick={leaveGame}>
              <Link to="/home">Quit </Link>{" "}
            </button>
          </div>

          <DisplayWinner
            myScore={myScore}
            otherScore={otherScore}
            displayResult={displayResult}
          />
        </div>
        <GameListen storeEvent={storeEvent} />
        <GameDisplay
          myScore={myScore}
          myBomb={myBomb}
          displayDugitems={displayDugitems} hitPlayerImage={hitPlayerImage}

        />
        <DisplayOtherPlayer otherScore={otherScore} otherBomb={otherBomb} hitOtherPlayerImage={hitOtherPlayerImage} />

        <GameBoard
          board={boardGame}
          myXPosition={myXPosition}
          myYPosition={myYPosition}
          otherYPosition={otherYPosition}
          otherXPosition={otherXPosition}
          gameTimer={gameTimer}
        />
      </div>
    </>
  );
}
