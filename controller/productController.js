const Product = require('../models/Product')

// NOTE: Bump up this if there is new routes.
const API_VERSION = "1.0";

// C - Add a product 
const addProduct = async(req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json({
            "message": `${req.method} Request successful`,
            "result": product,
            "statusCode": res.statusCode,
            "version": `${API_VERSION}`
        });
    } catch(error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
}

// R - Get products 
const getAllProducts = async(req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json({
            "message": `${req.method} Request successful`,
            "results": products,
            "statusCode": res.statusCode,
            "version": `${API_VERSION}`
        });
    } catch(error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
}

// R - Get a product from ID 
const getProductById = async(req, res) => {
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
            "version": `${API_VERSION}`
        });
    } catch(error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
}

// U - update a product 
const updateProduct = async(req, res) => {
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
            "version": `${API_VERSION}`
        });
    } catch(error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
}

// D - Delete a product 
const deleteProduct = async(req, res) => {
    try {
        const {id} = req.params
        const product = await Product.findByIdAndDelete(id)
        if (!product) {
            return res.status(404).json({message: `we cannot find any product with ID: ${id}`})
        } 
        res.status(200).json({
            "message": `${req.method} Request successful`,
            "result": product,
            "statusCode": res.statusCode,
            "version": `${API_VERSION}`
        });
    } catch(error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
}

module.exports = { addProduct, getAllProducts, getProductById, updateProduct, deleteProduct }; 