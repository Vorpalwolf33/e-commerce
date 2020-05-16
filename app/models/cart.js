const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    productsIds: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]
})

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;