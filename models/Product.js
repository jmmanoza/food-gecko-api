const mongoose = require('mongoose')
const User = require('./User')

const productSchema = mongoose.Schema(
    {
        productName: {
            type: String,
            required: true,
            unique: true
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
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }, 
    {
        timestamps: true
    }
)

const Product = mongoose.model('Product', productSchema);

module.exports = Product;