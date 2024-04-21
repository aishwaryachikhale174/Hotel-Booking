import express from 'express';
import { registerUser, loginUser, logout } from '../controllers/authControl.js';


const router = express.Router();

// Registration
router.post("/register", registerUser);

// Login
router.post("/login", loginUser)

// Logout
router.post("/logout" , logout)


export default router;