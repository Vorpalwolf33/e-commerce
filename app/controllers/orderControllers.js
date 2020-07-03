const Order = require('../models/order');
const Product = require('../models/product');

const {loadImagesForCart} = require('../generalFunctions/imageOperations');

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
                orders.forEach( (order, index) => {
                    loadImagesForCart(order.orderItems);
                    orders[index] = order
                })
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

module.exports.adminList = (req, res) => {
    const filter = req.body.filter;
    if(filter !== 'all') {
        Order.find({status: filter}).populate('orderItems.product').populate('userId')
            .then( filteredOrders => {
                if(filteredOrders) {
                    res.json(filteredOrders);
                }
                else return Promise.reject({err: "Could not filter orders"})
            })
            .catch( err => res.json(err))
    }
    else {
        Order.find().populate('orderItems.product').populate('userId')
            .then( orders => {
                if(orders) {
                    res.json(orders);
                }
                else return Promise.reject({err: "Error while retreiving the orders"})
            })
            .catch( err => res.json(err))
    }
}

module.exports.show = (req, res) => {
    Order.findById(req.body._id).populate('userId').populate('orderItems.product')
        .then( order => {
            if(order) {
                const {order_date, total, status, _id} = order;
                const temp = {order_date, total, status, _id}
                temp.userId = {username: order.userId.username, _id: order.userId._id};
                temp.orderItems = order.orderItems.map( item => ({
                    _id: item._id,
                    product: {name: item.product.name, price: item.product.price, _id: item.product._id},
                    quantity: item.quantity
                }));
                res.json(temp);
            }
            else Promise.reject({err: "Could not retrieve or populate the order"});
        })
        .catch( err => res.json(err))
}

module.exports.progress = (req, res) => {
    Order.findById(req.body._id)
        .then( order => {
            if(order) {
                switch(order.status) {
                    case "Order Placed":
                        order.status = "Shipped"; 
                        break;
                    case "Shipped":
                        order.status = "Out for Delivery";
                        break;
                    case "Out for Delivery":
                        order.status = "Delivered";
                        break;
                    case "Delivered": 
                        order.status = "Order Placed";
                        break;
                    default: break;
                }
                return order.save()
            }
            else return Promise.reject({err: "Error while retrieving the order"})
        })
        .then( savedOrder => {
            if(savedOrder) {
                res.json({status: savedOrder.status});
            }
            else return Promise.reject({err: "Error while saving the updated order"});

        })
        .catch( err => res.json(err))
}