const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    categoryId: [
        {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Category'
        }
    ],
    isAvailable: {
        type: Boolean,
        default: true
    },
    stock: {
        type: Number,
        required: true
    },
    images: [
        {
            filename: {
                type: String,
                required: true 
            },
            file: {
                type: Buffer,
                default: undefined
            }
        }
    ]
})

const Product = mongoose.model('Product', productSchema);

module.exports = Product;