const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    // order_number: {
    //     type: Number,
    //     required: true
    // },
    order_date: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    orderItems: [
        {
            product_id: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ]
})

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;