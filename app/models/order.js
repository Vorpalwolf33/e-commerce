const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
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
        default: 0
    },
    // Let there be 4 status of orders( Order Placed, Shipped, Out for Deliver, Delivered)
    status: {
        type: String,
        default: "Order Placed"
    },
    orderItems: [
        {
            product: {
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

orderSchema.pre('save', function(next) {
    const order = this
    order.populate('orderItems.product').execPopulate()
        .then( populatedOrder => {
            let total = 0;
            populatedOrder.orderItems.forEach( (item, index) => {
                total += (item.product.price * item.quantity);
                populatedOrder.orderItems[index].product = item.product._id;
            });
            populatedOrder.total = total;
            next();
        })
        .catch(err => next(err))
})

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;