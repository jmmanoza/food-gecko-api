const express = require('express')
const userController = require('../controller/userController');
const authenticator = require('../middlewares/authMiddleware');

const router = express.Router()

router.get("/get", authenticator, userController.getUser)
router.put("/update", authenticator, userController.updateUser)
router.post("/updatepassword", authenticator, userController.updatePassword)
router.post("/resetpassword", authenticator, userController.resetPassword)
router.delete("/delete/:id", authenticator, userController.deleteUser)
module.exports = router;