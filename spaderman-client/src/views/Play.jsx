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
    socket.emit("closeRoom");
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
      console.log();
      const data = {
        _id: roomId,
        numberOfPlayers: +1,
      };

      await APIHandler.patch("/play/rooms", data);
    } catch (error) {}
  };

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
      <header className="play-header-grid">
        
        <HomeButton />
      </header>

      <div className="playroom-grid">
        {rooms.map((room, i) => {
          return (
            <div className="rooms-div" key={i}>
              <button className="play-button-effect">
                <Link
                  className="play-link-style"
                  to={{
                    pathname: `/game/${room._id}`,
                    state: room,
                  }}
                >
                  <p>Join {room.roomName}</p>
                  <br />
                  <p>Players : {room.numberOfPlayers}/2</p>
                </Link>{" "}
              </button>
            </div>
          );
        })}
      </div>

      <div className="create-room-grid">
        <form onSubmit={handleClick}>
          <input
            name="roomName"
            type="text"
            onChange={(event) => SetcreateRoom(event.target.value)}
          />
          <button>Create</button>
        </form>
      </div>
      <div className="play-grid-3"></div>
    </div>
  ) : (
    <div className="play-wrapper">
    <header className="play-header-grid">
        
        <HomeButton />
      </header>
      <div className="playroom-grid">
        <p>No one is playing ...</p>
      </div>
      <div className="create-room-grid">
        <form onSubmit={handleClick}>
          <input
            name="roomName"
            type="text"
            onChange={(event) => SetcreateRoom(event.target.value)}
          />
          <button>Create</button>
        </form>
      </div>
    </div>
  );
}
