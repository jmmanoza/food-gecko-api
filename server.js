const express = require('express');
const mongoose = require('mongoose')
const app = express();
const Product = require('./models/Product')
const port = 3000;
const dotenv = require("dotenv")

app.use(express.json())
dotenv.config()

// Fetch a Product from ID Route
app.get('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch(error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})

// Fetch Products Route
app.get('/products', async(req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json(products);
    } catch(error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})

// Save a Product Route
app.post('/products', async(req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product);
    } catch(error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})

// start
mongoose.connect(process.env.MONGO_URL)
.then(()=> {
    console.log("connected to mongodb")
    app.listen(port, () => {
        console.log("app listening on port: 3000");
    });
}).catch((error)=> {
    console.log(error);
});