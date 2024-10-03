const Product = require('../models/Product')
const product_router = require("express").Router();

// C - Add a product 
product_router.post('/add', async(req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json({
            "message": `${req.method} Request successful`,
            "result": product,
            "statusCode": res.statusCode,
            "version": "1.0"
        });
    } catch(error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})

// R - Get products 
product_router.get('/', async(req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json({
            "message": `${req.method} Request successful`,
            "results": products,
            "statusCode": res.statusCode,
            "version": "1.0"
        });
    } catch(error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})

// R - Get a product from ID 
product_router.get('/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({message: `we cannot find any product with ID: ${id}`})
        }
        res.status(200).json({
            "message": `${req.method} Request successful`,
            "result": product,
            "statusCode": res.statusCode,
            "version": "1.0"
        });
    } catch(error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})

// U - update a product 
product_router.put('/update/:id', async(req, res) => {
    try {
        const {id} = req.params
        const product = await Product.findByIdAndUpdate(id, req.body)
        if (!product) {
            return res.status(404).json({message: `we cannot find any product with ID: ${id}`})
        } 
        const updatedProduct = await Product.findById(id)
        res.status(200).json({
            "message": `${req.method} Request successful`,
            "result": updatedProduct,
            "statusCode": res.statusCode,
            "version": "1.0"
        });
    } catch(error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})

// D - Delete a product 
product_router.delete('/delete/:id', async(req, res) => {
    try {
        const {id} = req.params
        const product = await Product.findByIdAndDelete(id)
        if (!product) {
            return res.status(404).json({message: `we cannot find any product with ID: ${id}`})
        } 
        res.status(200).json({
            "message": "DELETE Request successful",
            "result": product,
            "statusCode": res.statusCode,
            "version": "1.0"
        });
    } catch(error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})

module.exports = product_router