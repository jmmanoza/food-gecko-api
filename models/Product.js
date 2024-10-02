const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
    {
        productID: {
            type: String,
            required: true,
        },
        productName: {
            type: String,
            required: true
        },
        productImage: {
            type: String,
            required: false,
        },
        price: {
            type: Number,
            required: true,
            default: 0
        },
        expirationDate: {
            type: String,
            required: true,
        }
    }, 
    {
        timestamps: true
    }
)

const Product = mongoose.model('Product', productSchema);

module.exports = Product;