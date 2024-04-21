import express from 'express';
import {verifyUser, verifyAdmin} from '../utils/verifyUsers.js'

import { deleteUser, getAllUser, getUser, updateUser,  } from '../controllers/userControl.js';

const router = express.Router();

// update user
router.put("/upgrade/:id", verifyUser, updateUser);


// delete user
router.delete("/:id", verifyUser, deleteUser);

// get user
router.get("/obtain/:id", getUser );


// getall users
router.get("/", verifyAdmin, getAllUser );
export default router;