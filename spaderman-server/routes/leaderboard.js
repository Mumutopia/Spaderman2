const express = require("express");
const router = express.Router();
const GameModel = require("../models/Game")

router.get("/", async(req,res,next)=> {
    try {
        const games = await GameModel.find();
        res.status(200).json(games)
    } catch (err) {
        next(err);
      }
})

module.exports = router;