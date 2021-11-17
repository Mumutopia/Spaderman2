import React, {useState, useEffect} from "react";
import { socket } from "../js/socket";
import "../styles/Play.css";
import HomeButton from "../components/HomeButton";
import ButtonLink from "../components/ButtonLink";
import { Link } from "react-router-dom";

export default function Play() {

  const [createInput,SetcreateInput] = useState("")  
  const rooms = { name: "tot", name2: "tit" };
  const [test,setTest] =useState("")

  const handleClick =() =>{
    socket.emit("createRoom",createInput)
    console.log(createInput);
  }

  useEffect(()=>{
    console.log("render")
  },[createInput,test])

  useEffect(()=>{
      console.log("ici")
      socket.on("roomCreated",(room)=>{
        setTest(room)
       console.log(room)
      }
      )
  },[])

  return (
    <div className="play-wrapper">
      <HomeButton className="home" name="home">
        Home
      </HomeButton>
      <ButtonLink className="logout" name="logout">
        Logout
      </ButtonLink>
      <div className="grid-1">
        {Object.keys(rooms).map((room, i) => {
          return (
            <Link
              key={i}
              to={{
                pathname: `/game/${room}`,
                state: room,
              }}
            >
              Join {room}
            </Link>
          );
        })}
      </div>
      <div className="grid-2">
        
          <input onChange={event => SetcreateInput(event.target.value)} />
          <button onClick={handleClick}>Create</button>
          <p>{test}</p>
        
      </div>
      <div className="grid-3"></div>
    </div>
  );
}
