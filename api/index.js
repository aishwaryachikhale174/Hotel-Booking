import express from 'express';
import mongoose from 'mongoose';
import env from 'dotenv';
import authRoute from './routs/authRoute.js';
import hotelsRoute from './routs/hotelsRoute.js';
import roomsRoute from './routs/roomsRoute.js';
import userRoute from './routs/userRoute.js';
import cookieParser from 'cookie-parser';
import cors from "cors";
import bodyParser from "body-parser"


const app = express();
const portNum = 8085;
env.config();

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to MongoDb")
      } catch (error) {
        throw(error);
      }
}


mongoose.connection.on("Disconnected", () => {
    console.log("MongoDb disconnected")
})

// Middleware

app.use(express.json());
app.use(cookieParser())
app.use(cors())


app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.urlencoded({
// extended:true
// }));


app.use('/api/auth', authRoute);
app.use('/api/hotels', hotelsRoute);
app.use('/api/rooms', roomsRoute);
app.use('/api/users', userRoute);

app.use((err, req, res, next)=> {
    const errStatus = err.status || 500
    const errMessage = err.message || "Something went wrong"
    return res.status(errStatus).json({
       success: false,
       status: errStatus,
       message: errMessage,
       stack: err.stack
    });
});


app.listen(portNum, ()=> {
    connect()
    console.log("connected to backend");
});


