const { Schema, model } = require("mongoose");

const RoomSchema = new Schema({
  name : {
      type :String,
      unique: true,
  }
});


const GameModel = model("games", GameSchema);
module.exports = GameModel;
