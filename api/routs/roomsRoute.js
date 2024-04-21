import express from 'express';
import {createRoom, updateRoom, deleteRoom, getRoom, getAllRooms, updateRoomAvailability} from "../controllers/roomControl.js"
import {verifyAdmin} from "../utils/verifyUsers.js"


const router = express.Router();

// CREATE ROOM
router.post("/:hotelid", verifyAdmin, createRoom);

// UPDATE ROOM
router.put("/modify/:id", verifyAdmin, updateRoom);
router.put("/availability/:id", updateRoomAvailability)

// DELETE ROOM
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);

// GET ROOM
router.get("/get/:id/", getRoom);

// GET ALLROOMS
router.get("/", getAllRooms);






export default router;