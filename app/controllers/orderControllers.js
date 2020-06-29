const Order = require('../models/order');
const Product = require('../models/product');
const { findOneAndDelete } = require('../models/order');

module.exports.add = (req, res) => {
    const userId = req.user._id;
    const order = new Order({userId, orderItems: req.body.orderItems});
    order.save()
        .then( savedOrder => {
            if(savedOrder && savedOrder.status === "Order Placed") {
                res.json({success: true});
                return Promise.resolve(savedOrder);
            }
            else return Promise.reject({message: "Order failed"})

        })
        .then( savedOrder => {
            Product.findOne({_id: savedOrder.orderItems[0].product})
                .then( foundProduct => {
                    foundProduct.stock -= savedOrder.orderItems[0].quantity;
                    foundProduct.save()
                        .then( updatedProduct => {
                            if(updatedProduct) {
                                console.log("product stock reduced due to ordering\n Current Stock: ", updatedProduct.stock);
                            }
                        })
                })
                .catch(err => console.log(err))
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
    Order.findOne({_id: orderId})
        .then( order => {
            if(order && order.status !== "Delivered") {
                req.user.wallet += order.total;
                return req.user.save();
            }
            else {return Promise.reject({success: false})}
        })
        .then( updatedUser => {
            if(updatedUser) {
                return Order.findOne({_id: orderId})
            }
            else return Promise.reject({success: false})
        })
        .then( order => {
            if(order) {
                return order.populate('orderItems.product').execPopulate()
            }
            else return Promise.reject({success: false})
        })
        .then( populatedOrder => {
            populatedOrder.orderItems.forEach( async item => {
                item.product.stock += item.quantity;
                await item.product.save()
            })
            return Order.findOneAndDelete({_id: populatedOrder._id})
        })
        .then( deletedOrder => {
            if(deletedOrder) res.json({success: true});
            else res.json({success: false});
        })
        .catch(err => res.json(err))
}


module.exports.cartOrder = (req, res) => {
    const user = req.user;
    user.populate('cart.product').execPopulate()
        .then( populatedUser => {
            if(populatedUser) {
                const order = new Order({userId: populatedUser._id, orderItems: populatedUser.cart});
                return order.save()
            }
            else return Promise.reject({success: false, error: "Problem with populating the user"});
        })
        .then( savedOrder => {
            if(savedOrder) {
                return savedOrder.populate('orderItems.product').execPopulate()                
            }
            else return Promise.reject({success: false, error: "Could not save the order"})
        })
        .then( populatedOrder => {
            if(populatedOrder) {
                populatedOrder.orderItems.forEach(async item => {
                    item.product.stock -= item.quantity;
                    await item.product.save()
                })
                let total = 0;
                populatedOrder.orderItems.forEach( item => {
                    total += item.product.price * item.quantity;
                })                
                user.wallet -= total;
                user.cart = [];
                return user.save()
            }
            else res.json({success: true, cartCleared: false});
        })
        .then( updatedUser => {
            if(updatedUser) {
                res.json({success: true, cartCleared: true})
            }
            else res.json({success: true, cartCleared: false})
        })
        .catch( err => res.json(err))
}