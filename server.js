const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors')

const app = express();
const dotenv = require("dotenv")

const authRoute = require('./routes/auth-routes')
const productRoute = require('./routes/product-routes')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
dotenv.config()

// MARK: - Start bankend server
mongoose.connect(process.env.MONGO_URL)
.then(()=> {
    console.log("backend server connected to MongoDB.")
    app.listen(process.env.PORT, () => {
        console.log(`backend server is running on port: ${process.env.PORT}`);
    });
}).catch((error)=> {
    console.log(error);
});

// MARK: - Put all routes here...
app.use("/api/v1/auth", authRoute)
app.use("/api/v1/products", productRoute)