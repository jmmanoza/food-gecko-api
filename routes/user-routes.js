const express = require('express')
const userController = require('../controller/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router()

router.get("/get", authMiddleware, userController.getUser)
router.put("/update", authMiddleware, userController.updateUser)
router.post("/updatepassword", authMiddleware, userController.updatePassword)
router.post("/resetpassword", authMiddleware, userController.resetPassword)
router.delete("/delete/:id", authMiddleware, userController.deleteUser)
module.exports = router;