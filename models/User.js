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
            require: false,
            default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
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