const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const createError = require('../utils/appError')

// NOTE: Bump up this if there is new routes.
const API_VERSION = "1.0";

const signup = async(req, res) => {
    try {
        const user = await User.findOne({email: req.body.email});
        
        if (user) {
            return res.status(400).json({message: "User already exists!"})
        } else if (req.body.password != req.body.confirmPassword) {
            return res.status(401).json({message: "Passwords do not match!"})
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        const newUser = await User.create({
            ...req.body,
            password: hashedPassword,
            confirmPassword: hashedPassword
        });
        const token = jwt.sign({_id: newUser._id}, `${process.env.JWT_SECRET_KEY}`, {
            expiresIn: "7d",
        });
        
        res.status(201).json({
            "message": `${req.method} Request successful`,
            "data": {
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                email: newUser.email,
                profilePhoto: newUser.profilePhoto,
                api_token: token
            },
            "statusCode": res.statusCode,
            "version": `${API_VERSION}`
        });
    } catch(error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
}

const login = async(req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({email})

        if (!user) {
            return res.status(404).json({message: "User not found!"}) 
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return res.status(401).json({message: "Invalid email or password!"}) 
        }

        const token = jwt.sign({_id: user._id}, `${process.env.JWT_SECRET_KEY}`, {
            expiresIn: "7d",
        });

        res.status(200).json({
            "message": `${req.method} Request successful`,
            "data": {
                _id: user._id,
                fullName: user.fullName,
                username: user.username,
                email: user.email,
                profilePhoto: user.profilePhoto,
                api_token: token
            },
            "statusCode": res.statusCode,
            "version": `${API_VERSION}`
        });

    } catch(error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
}

module.exports = { signup, login };