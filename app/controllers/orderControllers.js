const Order = require('../models/order');
const Product = require('../models/product');

module.exports.add = (req, res) => {
    const orderDetails = req.body.order;
    const order = {
        orderItems: req.body.order,
        userId: req.user._id,
        total: 0
    }
    orderDetails.forEach( item => {
        Product.findOne({_id: item.product_id})
            .then( product => {
                if(product) {
                    order.total += product.price * item.quantity;
                }
            })
            .catch(err => console.log(err))
    })
    const tempOrder = new Order(order);
    console.log(tempOrder);
}