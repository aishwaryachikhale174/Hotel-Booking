import { createError } from "./error.js";
import jwt from "jsonwebtoken";


export const verifyToken = (req, res, next) => {
    const token = req.cookies.token_info;
    if(!token) {
        return next(createError(401, "You are not authenticated"))
    }

    jwt.verify(token, process.env.JWT_KEY, (err, user) => {
        if(err) return next(createError(403, "Token is not valid"))
        req.user = user;
        next()
    })
}

export const verifyUser = (req, res, next) => {
    const token = req.cookies.token_info;
    console.log("From req.cookies " +  req.cookies[0])
    console.log("From token " + token)
    if(!token) {
        return next(createError(401, "You are not authenticated"))
    }

    jwt.verify(token, process.env.JWT_KEY, (err, user) => {
        if(err) return next(createError (403, "Token is not valid"))
        req.user = user;
        console.log("From user" + "" + req.user[0])
        if(req.user.userId === req.params.id || req.user.isAdmin) {
            next();      
        } else {
            return next(createError(403, "You are not authorized"));
        }
    });
}

export const verifyAdmin = (req, res, next) => {
    const token = req.cookies.token_info;
    if(!token) {
        return next(401, "You are not authenticated")
    }

    jwt.verify(token, process.env.JWT_KEY, (error, user) => {
        if(error) return next(createError(403, "token is not valid"));
        req.user = user;
        if(req.user.isAdmin) {
            next();
        } else {
            return next(createError(403, "You are not authorized"))
        }
    });
}