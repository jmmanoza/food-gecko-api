const mongoose = require('mongoose')

const UserSchema = mongoose.Schema(
    {
        fullName: {
            type: String,
            require: true
        },
        username: {
            type: String,
            require: true
        },
        email: {
            type: String,
            require: true,
            unique: true
        },
        profilePhoto: {
            type: String,
            require: false
        },
        password: {
            type: String,
            require: true,
        },
        confirmPassword: {
            type: String,
            require: true
        }
    }, 
    {
        timestamp: true
    }
) 

module.exports = mongoose.model('User', UserSchema)