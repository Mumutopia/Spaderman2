require("dotenv").config();
require("./../config/mongo.js");

const userModel = require("./../models/User");
const gameModel = require("../models/Game.js");

const gamesSeed = [
  {
    players: [
      {
        score: 1221,
      },
      {
        score: 53453,
      },
    ],
  },
  {
    players: [
      {
        score: 434,
      },
      {
        score: 334,
      },
    ],
  },
  {
    players: [
      {
        score: 122,
      },
      {
        score: 21321,
      },
    ],
  },
];



function createSeed() {
  return new Promise(async (resolve, reject) => {
    try {
      const selectUsers = await userModel.find();
      
      gamesSeed.forEach((el) => {
        
        el.players[0].player1 =
          selectUsers[0]._id;
        el.players[1].player2 =
          selectUsers[1]._id;

        });

       
        resolve(gamesSeed);
    } catch (err) {
      reject(err);
    }
  });
}

createSeed().then((r) => {
  console.log(r);
  gameModel
    .deleteMany()
    .then(() => {
      gameModel.insertMany(gamesSeed).then((res) => {
        console.log("games added");

        process.exit();
      });
    })
    .catch((err) => console.log("err", err));
});
