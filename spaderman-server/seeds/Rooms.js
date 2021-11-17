require("dotenv").config();
require("./../config/mongo.js");

const roomModel = require("./../models/Room");

const roomSeed = [
  {
    roomName: "room1",
    numberOfPlayers: 0,
  },
  {
    roomName: "room2",
    numberOfPlayers: 0,
  },
];


roomModel
.deleteMany()
    .then(() => {
        roomModel.insertMany(roomSeed).then((res) => {
            console.log("Rooms added");
            
            process.exit()
        } )
        
    }).catch((err) => console.log("err", err));