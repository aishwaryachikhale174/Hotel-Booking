import express from 'express';
import { createHotel, updateHotel, deleteHotel, getHotel, getAllHotels, countByCity, countByType, getHotelRooms  } from '../controllers/hotelControl.js';
import {verifyUser, verifyAdmin} from '../utils/verifyUsers.js'


const router = express.Router();

// CREATE
router.post("/", verifyAdmin , createHotel );

// UPDATE
router.put("/modify/:id", verifyUser, updateHotel);

// DELETE
router.delete("/:id", verifyAdmin, deleteHotel );

// GET 
router.get("/get/:id", getHotel);

// GETALL
router.get("/", getAllHotels );
router.get("/countByCity", countByCity )
router.get("/countByType", countByType)
router.get("/room/:id", getHotelRooms)

export default router;