import express from 'express'

const product_routes = express.Router()

router.post("/api/products", saveProduct);
router.get("/api/products", fetchProduct);
router.get("/api/products/:id", fetchProductById);

export default product_routes;