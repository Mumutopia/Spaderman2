const { Schema, model } = require("mongoose");

const RoomSchema = new Schema({
  roomName : {
      type :String,
      unique: true,
  },
  numberOfPlayers : {
    type : Number,
    default : 0
  }
});


const RoomModel = model("rooms", RoomSchema);
module.exports = RoomModel;
