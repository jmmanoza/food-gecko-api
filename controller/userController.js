const User = require('../models/User')

const API_VERSION = "1.0";

const getUser = async(req, res) => {
    try {

        const user = await User.findById({_id: req.body.id})

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found!"
            })
        }
        user.password = undefined
        user.confirmPassword = undefined

        res.status(200).json({
            "message": `${req.method} Request successful`,
            "data": {
                fullName: user.fullName,
                username: user.username,
                email: user.email,
                profilePhoto: user.profilePhoto
            },
            "statusCode": res.statusCode,
            "version": `${API_VERSION}`
        });

    } catch(error) {
        console.log(error)
        res.status(500).json({
            success: false,
            "statusCode": res.statusCode,
            message: error.message
        })
    }
}

const updateUser = async (req, res) => {
    try {
        const user = await User.findById({_id: req.body.id}) 

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            })
        }

        const {fullName, username, email, profilePhoto} = req.body

        if (fullName) user.fullName = fullName
        if (username) user.username = username
        if (email) user.email = email
        if (profilePhoto) user.profilePhoto = profilePhoto
        await user.save()

        res.status(200).json({
            "message": `${req.method} Request successful`,
            "result": {
                fullName: user.fullName,
                username: user.username,
                email: user.email,
                profilePhoto: user.profilePhoto
            },
            "statusCode": res.statusCode,
            "version": `${API_VERSION}`
        })

    } catch(error) {
        console.log(error)
        res.status(500).json({
            success: false,
            "statusCode": res.statusCode,
            message: error.message
        })
    }
}

module.exports = { getUser, updateUser }