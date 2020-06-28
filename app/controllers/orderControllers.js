const Order = require('../models/order');

module.exports.add = (req, res) => {
    const userId = req.user._id;
    const order = new Order({userId, orderItems: req.body.orderItems});
    order.save()
        .then( savedOrder => {
            if(savedOrder && savedOrder.status === "Order Placed") {
                res.json({success: true});
            }

        })
        .catch( err => res.json(err))
}

module.exports.list = (req, res) => {
    const userId = req.user._id;
    Order.find({userId}).populate('orderItems.product')
        .then( (orders) => {
            if(orders) {
                res.json(orders)
            }
        })
        .catch( err => res.json(err))
}

module.exports.cancel = (req, res) => {
    const orderId = req.body.id;
    Order.findOneAndDelete({_id: orderId})
        .then( deletedOrder => {
            if(deletedOrder) {
                res.json({success: true});
            }
            else {
                res.json({success: false});
            }
        })
        .catch( err => res.json(err))
}

module.exports.cartOrder = (req, res) => {
    const user = req.user;
    user.populate('cart.product').execPopulate()
        .then( populatedUser => {
            if(populatedUser) {
                const order = new Order({userId: populatedUser._id, orderItems: populatedUser.cart})
                order.save()
                .then( savedOrder => {
                    if(savedOrder && savedOrder.status === "Order Placed") {
                        populatedUser.cart = []
                        populatedUser.save()
                            .then( updatedUser => {
                                if(updatedUser && updatedUser.cart.length === 0) {
                                    res.json({success: true, cartCleared: true})
                                }
                                else res.json({success: true, cartCleared: false})
                            })
                            .catch(err => res.json({...err, success: true, cartCleared: false}))
                    }
        
                })
                .catch( err => res.json(err))
            }
            else {
                res.json({success: false})
            }
        })
        .catch( err => res.json(err))
}