const mongoose = require('mongoose')
const productSchema = mongoose.Schema(
    {
        productName: {
            type: String,
            required: [true, "No product name found. please try to scan the qr code again."]
        },
        productID: {
            type: String,
            required: true,
            default: ""
        },
        productImage: {
            type: String,
            required: true,
            default: ""
        },
        price: {
            type: Number,
            required: true,
            default: 0
        },
        expirationDate: {
            type: String,
            required: true,
            default: ""
        }
    }, 
    {
        timestamps: true
    }
)