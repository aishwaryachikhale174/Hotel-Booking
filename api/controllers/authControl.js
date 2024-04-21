import User from '../models/userModels.js'
import { createError } from '../utils/error.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res, next) => {
    try {
        var password = req.body.password;
        var email = req.body.email;
        var username = req.body.username;

        if(!(password && email && username)) {
            return next(createError(400, "Data not formatted properly"))
        }

        // Check if user is already in Database
        const emailExist = await User.findOne({email: req.body.email , username: req.body.username})
        if(emailExist) return res.status(400).send("User or email already exists try to register with new user or email")

        // generate salt to hash password
        const salt =  bcrypt.genSaltSync(10);

        // now we set the user password to hashed password
        let pass = password.toString()
        const hash =  bcrypt.hashSync(pass, parseInt(salt) );
        console.log(req.body)

        const registration = new User({
            ...req.body,
            password: hash,
        })  
        console.log(registration)
        const saveUser = await registration.save();
        res.status(200).json("User has been created")

    } catch(err) {
        next(createError(404, err))
    }
}

export const loginUser = async(req, res, next) => {
    try {
        console.log(req.body)
        if(req.body.username === "") {
            return next(createError(404, "Username or password should not be empty"))
        }
    
        const user = await User.findOne({username: req.body.username}) 
        if(!user) return next(createError(404, "user not found"))

        var validPassword = await bcrypt.compare(req.body.password, user.password);

        if(!validPassword) return next(createError(400, "User or Password is invalid"));

        var sendData = {username: user.username, email: user.email};

        const {password, isAdmin, ...otherDetails} = user._doc;

        const token = jwt.sign({ userId: user._id, isAdmin : user.isAdmin}, process.env.JWT_KEY, {expiresIn: '5h'});

        res.cookie('token_info', token, { maxAge: 900000, httpOnly: true })

        .status(200).json({details:{...otherDetails}, isAdmin})

    } catch(error) {
        next(createError(400, error))
    }
}

export const logout = (req, res, next) => {
    try {
      // Clear the "token_info" cookie by setting it to an empty value and expiring it
      res.cookie('token_info', '', { expires: new Date(0), httpOnly: true }).json("Logged out successfully");
    } catch (err) {
      next(err);
    }
  };