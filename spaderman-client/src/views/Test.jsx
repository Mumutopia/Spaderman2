import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import { board } from "../js/board.js";
import TestListen from "./TestListen.jsx";
import TestDisplay from "./TestDisplay.jsx";

const ENDPOINT = "http://localhost:5001";
const socket = socketIOClient(ENDPOINT);

// let tmp = null;

export default function Test() {
  const [myCount, setMyCount] = useState(0);
  const [myXPosition, setMyxPosition] = useState(5);
  const [myYPosition, setMyyPosition] = useState(5);
  const [otherXPosition, setOtherXPosition] = useState(5);
  const [otherYPosition, setOtherYPosition] = useState(5);
  const [otherCount, setOtherCount] = useState(0);

  // const handleClick = (evt) => {
  //   setMyCount((myCount) => myCount + 1);
  // };

  // console.log(myXPosition)
  // const handleMouvement = (event) => {
    useEffect(()=> {
      socket.on("serverReponded", (message) => {
        
              if (socket.id !== message.id) {
                setOtherCount(message.count);
              }
            })
  
  }, [])
  //   switch (event.key) {
  //     case "ArrowRight":
  //       console.log("mypos:",myXPosition)
  //       if (myXPosition < board.length - 1) {
  //         setMyxPosition((myXPosition) => myXPosition + 1);
  //       }
  //       break;
  //     case "ArrowDown":
  //       if (myYPosition < board.length - 1) {
  //         setMyyPosition((myYPosition) => myYPosition + 1);
  //       }
  //       break;
  //     case "ArrowUp":
  //       if (myYPosition > 0) {
  //         setMyyPosition((myYPosition) => myYPosition - 1);
  //       }
  //       break;
  //     case "ArrowLeft":
  //       if (myXPosition > 0) {
  //         setMyxPosition((myXPosition) => myXPosition - 1);
  //       }
  //       break;

  //     default:
  //       break;
  //   }
  // }

 const updateOtherCount = (add) => {
  setOtherCount((otherCount)=> otherCount +add)
 }

  const updateCount = (add) => {
    setMyCount((myCount) => myCount + add)
    
      };

  // useEffect(() => {

  //   console.log(myXPosition < board.length - 1)
  //   console.log("effect")
  //   socket.emit("playerMoving", { myXPosition, myYPosition });
  // }, [myXPosition, myYPosition]);

  useEffect(() => {
    socket.emit("clientTalks", myCount);
  }, [myCount]);

  // useEffect(() => {
  //   window.addEventListener("keyup",handleMouvement);
  //   socket.on("serverReponded", (message) => {
      
  //     if (socket.id !== message.id) {
  //       setOtherCount(message.count);
  //     }
  //   })
  //   socket.on("trackMovement", (data) => {
      
  //     if (socket.id !== data.id){
  //       setOtherXPosition(data.movement.myXPosition)
  //       setOtherYPosition(data.movement.myYPosition)
  //     }
  //   });
  // }, []);

  return (
    <>

      <TestListen count={myCount} handleCount={updateCount} handleOther={updateOtherCount}/>
      <TestDisplay count={myCount} otherCounter={otherCount} />

      {/* <p>
        <button onClick={handleClick}>incremente {myCount}</button>
      </p>

      <p> PLayer 1 Count:{myCount} </p>
      <p> player2 Count :{otherCount}</p>

      <p>
        {" "}
        my position :[{myXPosition},{myYPosition}]{" "}
      </p>
      <p>
        {" "}
        PLayer 2 position:[{otherXPosition},{otherYPosition}]{" "}
      </p> */}
    </>
  );
}
