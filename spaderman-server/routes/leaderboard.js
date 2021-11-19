const express = require("express");
const router = express.Router();
const GamesModel = require("../models/Games")

// router.get("/", async(req,res,next)=> {
//     try {
//         const games = await GamesModel.find();
//         res.status(200).json(games)
//     } catch (err) {
//         next(err);
//       }
// })

module.exports = router;