const express = require('express')
const productController = require('../controller/productController')

const router = express.Router()

router.post("/add", productController.addProduct)
router.get("/", productController.getAllProducts)
router.get("/:id", productController.getProductById)
router.put("/update/:id", productController.updateProduct)
router.delete("/delete/:id", productController.deleteProduct)

module.exports = router;