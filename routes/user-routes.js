const express = require('express')
const userController = require('../controller/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router()

router.get("/get", authMiddleware, userController.getUser)

module.exports = router;