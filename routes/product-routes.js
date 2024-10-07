const express = require('express')
const productController = require('../controller/productController')
const authenticator = require('../middlewares/authMiddleware');

const router = express.Router()

router.post("/add", authenticator, productController.addProduct)
router.get("/", authenticator, productController.getAllProducts)
router.get("/:id", authenticator, productController.getProductById)
router.put("/update/:id", authenticator, productController.updateProduct)
router.delete("/delete/:id", authenticator, productController.deleteProduct)

module.exports = router;