const User = require('../models/User')
const bcrypt = require('bcryptjs')

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

const updatePassword = async(req, res) => {
    try {
        const user = await User.findById({_id: req.body.id})
        if (!user) {
            return res.status(404).send({
                succes: false,
                message: "user not found!"
            })
        }
        const {oldPassword, newPassword } = req.body
        if (!oldPassword || !newPassword) {
            return res.status(500).send({
                succes: false,
                message: "Please provide old or new password!"
            })
        }
        const isOldPasswordMatch = await bcrypt.compare(oldPassword, user.password)
        if (!isOldPasswordMatch) {
            return res.status(401).json({message: "Invalid old password!"}) 
        }
       
        const hashedPassword = await bcrypt.hash(newPassword, 12);
        user.password = hashedPassword
        await user.save()

        res.status(200).send({
            succes: true,
            message: "Password updated."
        })

    } catch {
        console.log(error)
        res.status(500).json({
            success: false,
            "statusCode": res.statusCode,
            message: error.message
        })
    }
}

const resetPassword = async(req, res) => {
    try {
        const {email, password, confirmPassword} = req.body
        if (!email || !password || !confirmPassword) {
            return res.status(500).json({
                success: false,
                message: "Please provide all fields."
            })
        }
        if (password != confirmPassword) {
            return res.status(401).json({message: "Passwords do not match!"})
        }

        const user = await User.findOne({email})

        if (!user) {
            return res.status(500).json({
                success: false,
                message: "User not found."
            })
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        user.password = hashedPassword
        user.confirmPassword = hashedPassword
        await user.save()

        res.status(200).send({
            "message": `reset password successful`,
            "statusCode": res.statusCode,
            "version": `${API_VERSION}`
        })

    } catch {
        console.log(error)
        res.status(500).json({
            success: false,
            "statusCode": res.statusCode,
            message: error.message
        })
    }
}

const deleteUser = async(req, res) => {
    try {
        const {id} = req.params
        const user = await User.findByIdAndDelete(id)
        if (!user) {
            return res.status(404).json({message: `we cannot find any user with ID: ${id}`})
        } 
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
        });

    } catch {
        console.log(error)
        res.status(500).json({
            success: false,
            "statusCode": res.statusCode,
            message: error.message
        })
    }
}

module.exports = { getUser, updateUser, updatePassword, resetPassword, deleteUser }