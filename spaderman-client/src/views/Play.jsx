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
  const [refreshRooms, setRefreshRooms] = useState(0);

  const handleClick = async (e) => {
    console.log(createRoom);
    const toSend = { roomName: createRoom };
    e.preventDefault();
    try {
      await APIHandler.post("/play/rooms", toSend);
    } catch (err) {
      console.error(err);
    }
    fetchRooms();
  };

  const fetchRooms = async () => {
    try {
      const dataRooms = await APIHandler.get("/play/rooms");

      setRooms(dataRooms.data);
    } catch (err) {
      console.error(err);
    }
  };

   
  const increasePlayersInRoom = async (roomId) => {
    try {
      console.log()
      const data ={
        _id:roomId,
        numberOfPlayers :+1
      }

      await APIHandler.patch("/play/rooms",data)
      
    } catch (error) {
      
    }
  }

  useEffect(() => {
    fetchRooms();
  }, [refreshRooms]);

  useEffect(() => {
    fetchRooms();
    socket.on("refreshRooms", () => {
      setRefreshRooms((refreshRooms) => refreshRooms + 1);
    });
    // socket.on("updateRoomsPlayer",(room) =>{
    //   increasePlayersInRoom(room)
    //   setRefreshRooms((refreshRooms) => refreshRooms + 1)
    // }
    // )
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
        <form onSubmit={handleClick}>
          <input
            name="roomName"
            type="text"
            onChange={(event) => SetcreateRoom(event.target.value)}
          />
          <button>Create</button>
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
