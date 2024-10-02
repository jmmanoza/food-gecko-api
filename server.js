const express = require('express');
const mongoose = require('mongoose')
const app = express();
const Product = require('./models/Product')
const port = 3000;

app.use(express.json())

// routes
app.get("/", (req, res)=> {
    res.send("hello im here. up and running.")
});

app.get("/products", (req, res) => {
    res.send("Hello all products.")
});

// save the scanned products to db

app.post('/product', async(req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product);
    } catch(error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})

// start

mongoose.connect("mongodb+srv://admin:unatoby123@food-gecko-api-cluster.wz05d.mongodb.net/?retryWrites=true&w=majority&appName=food-gecko-api-cluster")
.then(()=> {
    console.log("connected to mongodb")
    app.listen(port, () => {
        console.log("app listening on port: 3000");
    });
}).catch((error)=> {
    console.log(error);
});