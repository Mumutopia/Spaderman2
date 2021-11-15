// import React, { useState, useEffect } from "react";
// import socketIOClient from "socket.io-client";
// import { board } from "../js/board.js";
// import TestListen from "./TestListen.jsx";
// import TestDisplay from "./TestDisplay.jsx";

// const ENDPOINT = "http://localhost:5001";
// const socket = socketIOClient(ENDPOINT);

// export default function Test() {
//   const [myCount, setMyCount] = useState(0);
//   const [myXPosition, setMyxPosition] = useState(5);
//   const [myYPosition, setMyyPosition] = useState(5);
//   const [otherXPosition, setOtherXPosition] = useState(5);
//   const [otherYPosition, setOtherYPosition] = useState(5);
//   const [otherCount, setOtherCount] = useState(0);

//   const handlingInput = (event) => {
    
//     switch (event.key) {
//       case "ArrowRight":
//         setMyxPosition((myXPosition) =>
//           myXPosition < board.length - 1 ? myXPosition + 1 : myXPosition
//         );

//         break;
//       case "ArrowDown":
//         setMyyPosition((myYPosition) =>
//           myYPosition < board.length - 1 ? myYPosition + 1 : myYPosition
//         );
//         break;
//       case "ArrowUp":
//         setMyyPosition((myYPosition) =>
//           myYPosition > 0 ? myYPosition - 1 : myYPosition
//         );
//         break;
//       case "ArrowLeft":
//         setMyxPosition((myXPosition) =>
//           myXPosition > 0 ? myXPosition - 1 : myXPosition
//         );
//         break;

//       default:
//         break;
//     }
//   };

//   console.log(myXPosition < board.length - 1);

//   const updateOtherCount = (add) => {
//     setOtherCount((otherCount) => otherCount + add);
//   };

//   const updateCount = (add) => {
//     if (myCount >= 20) return;
//     setMyCount((myCount) => myCount + add);
//   };

//   useEffect(() => {
//     socket.on("serverReponded", (message) => {
//       if (socket.id !== message.id) {
//         setOtherCount(message.count);
//       }
//     });

//     socket.on("trackMovement", (data) => {
//       if (socket.id !== data.id) {
//         setOtherXPosition(data.movement.myXPosition);
//         setOtherYPosition(data.movement.myYPosition);
//       }
//     });
//   }, []);

//   useEffect(() => {
//     console.log("effect");
//     socket.emit("playerMoving", { myXPosition, myYPosition });
//   }, [myXPosition, myYPosition]);

//   useEffect(() => {
//     socket.emit("clientTalks", myCount);
//   }, [myCount]);

//   return (
//     <>
//       <TestListen
//         count={myCount}
//         handlingInput={handlingInput}
//         handleCount={updateCount}
//         handleOther={updateOtherCount}
//       />
//       <TestDisplay
//         count={myCount}
//         otherYPosition={otherYPosition}
//         otherXPosition={otherXPosition}
//         otherCounter={otherCount}
//         myXPosition={myXPosition}
//         myYPosition={myYPosition}
//       />
//     </>
//   );
// }
