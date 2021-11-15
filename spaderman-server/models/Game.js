const { Schema, model } = require("mongoose");

const GameSchema = new Schema({
  players: [
    {
      player1: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
      score: Number,
    },
    {
      player2: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
      score: Number,
    },
  ],
});


const GameModel = model("games", GameSchema);
module.exports = GameModel;
