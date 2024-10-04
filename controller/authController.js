const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const createError = require('../utils/appError')

// NOTE: Bump up this if there is new routes.
const API_VERSION = "1.0";

const signUp = async(req, res) => {
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
        const token = jwt.sign({_id: newUser._id}, 'secretkey123');
        
        res.status(201).json({
            "message": `${req.method} Request successful`,
            "result": newUser,
            "api_token": token,
            "statusCode": res.statusCode,
            "version": `${API_VERSION}`
        });
    } catch(error) {
        next(error)
    }
}

const login = async(req, res, next) => {
    try {

    } catch(error) {
        next(error)
    }
}

module.exports = { signUp, login };