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
router.post("/rooms/", async(req,res,next) => {
   
    try {
        const rooms = await RoomModel.create(req.body);
        res.status(201).json(rooms)
    } catch (err) {
        next(err);
      }
})

router.delete("/rooms/:id", async(req,res,next)=>{
    console.log(req.params.id);
    try {
        await RoomModel.findByIdAndDelete(req.params.id)
    } catch (err) {
        next(err);
      }
})

router.patch("/rooms/", async(req,res,next)=> {
    console.log(req.body);
    try {
        await RoomModel.findByIdAndUpdate(req.body._id,{numberOfPlayers:req.body.numberOfPlayers},{ new: true })
    }  catch (err) {
        next(err);
      }
})

module.exports = router;