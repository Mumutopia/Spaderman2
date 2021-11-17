import React, { useState, useEffect } from "react";
import { socket } from "../js/socket";
import "../styles/Play.css";
import HomeButton from "../components/HomeButton";
import ButtonLink from "../components/ButtonLink";
import { Link } from "react-router-dom";
import APIHandler from "../api/APIHandler";
import axios from "axios";

export default function Play() {
  const [createRoom, SetcreateRoom] = useState("");

  const [test, setTest] = useState("");
  const [rooms, setRooms] = useState(9);
  console.log(createRoom);

  const handleClick = async (e) => {
    console.log(createRoom);
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5001/play/rooms",createRoom)
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
    
  };

 

  const fetchRooms = async () => {
    try {
      const dataRooms = await axios.get("http://localhost:5001/play/rooms");
      
      setRooms(dataRooms.data);
      
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {}, [createRoom, test, rooms]);

  useEffect(() => {
    fetchRooms();
  }, []);

  return isNaN(rooms) ? (
    <div className="play-wrapper">
      {/* <HomeButton className="home" name="home">
        Home
      </HomeButton>
      <ButtonLink className="logout" name="logout">
        Logout
      </ButtonLink> */}
      <div className="grid-1"></div>
      <div>
        {rooms.map((room, i) => {
          return (
            <div key={i}>
              <Link
                to={{
                  pathname: `/game/${room._id}`,
                  state: room,
                }}
              >
                Join {room.roomName}
              </Link>
              <p>Number of players : {room.numberOfPlayers}</p>
            </div>
          );
        })}
      </div>

      <div className="grid-2">
        <form >
          <input name="roomName" type="text" onChange={(event) => SetcreateRoom(event.target.value)} />
          <button onClick={handleClick}>Create</button>
        </form>
      </div>
      <div className="grid-3"></div>
    </div>
  ) : (
    <div className="play-wrapper">
      <div className="grid-2">
        
        <p>{test}</p>
      </div>
      <div className="grid-3"></div>
    </div>
  );
}
