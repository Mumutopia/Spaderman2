const express = require("express");
const router = express.Router();
const RoomModel = require ("../models/Room");

router.get("/rooms", async(req,res,next) => {
    try {
        const rooms = await RoomModel.find();
        res.status(200).json(rooms)
    } catch (err) {
        next(err);
      }
})
router.post("/rooms", async(req,res,next) => {
    
    try {
        const rooms = await RoomModel.create(req.body);
        res.status(201).json(rooms)
    } catch (err) {
        next(err);
      }
})

module.exports = router;