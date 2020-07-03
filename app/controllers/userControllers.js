const User = require('../models/user');

const {loadImagesForCart} = require('../generalFunctions/imageOperations');

module.exports.register = (req, res) => {
    console.log("From register");
    const body = req.body;
    console.log(body);
    const user = new User(body);
    user.save()
        .then( savedUser => {
            const {username, email, role} = savedUser;
            res.json({username, email, role});
        })
        .catch( err => res.json(err))
}

module.exports.login = (req, res) => {
    const body = req.body;
    User.findByCredentials(body.email, body.password) 
        .then( user => {
            if(user) {
                return user.generateToken();
            }
            else return Promise.reject({errors: "Invalid email / password"})
        })
        .then( token => {
            res.json({token})
        })
        .catch(err => {
            console.log(err);
            res.status('401').json(err)
        })
}

module.exports.home = (req, res) => {
    const token = req.headers['x-auth'];
    const user = (req.user.role) ? {role: req.user.role} : {role: "Customer"};
    user.username = req.user.username;
    user.wallet = req.user.wallet;
    res.json(user);
}

module.exports.logout = (req, res) => {
    const token = req.headers['x-auth'];
    const filter = {_id: req.user._id};
    const update = {tokens: req.user.tokens.filter(tkn => tkn.token != token)}
    User.findOneAndUpdate(filter, update) 
        .then( updatedUser => {
            if(updatedUser)
                res.json(updatedUser);
            else res.json({error: "There was some error while logging out"})
        })
        .catch(err => res.send(err))
}

module.exports.addToCart = (req, res) => {
    const user = req.user;
    if(user.cart.filter( (item) => item.product == req.body.cartItem.product).length === 0) {
        user.cart.push(req.body.cartItem);
        user.save()
            .then( updatedUser => {
                if(updatedUser) {
                    res.json({success: true})
                }
            })
            .catch(err => console.log(err))
    }
    else { res.json({size: user.cart.length});}
}

module.exports.showCart = (req, res) => {
    const user = req.user;
    res.json(user.cart);
}

module.exports.removeFromCart = (req, res) => {
    const user = req.user;
    user.cart = user.cart.filter( item => {
        return item.product != req.body.id
    });
    user.save()
        .then( updatedUser => {
            if(updatedUser) {
                res.json({success: true});
            }
            else res.json({success: false})
        })
        .catch(err => res.json(err))
}

module.exports.list = (req, res) => {
    const user = req.user;
    user.populate('cart.product').execPopulate()
        .then( populatedUser => {
            if(populatedUser) {
                loadImagesForCart(populatedUser.cart);
                res.json(populatedUser.cart);
            }
        })
        .catch(err =>console.log(err))
}

module.exports.addMoneyToWallet = (req, res) => {
    const user = req.user;
    user.wallet += req.body.money;
    user.save()
        .then( updatedUser => {
            if(updatedUser) {
                res.json({success: true});
            }
            else {
                res.json({success: false});
            }
        })
        .catch(err => res.json(err))
}

module.exports.changeQuantity = (req, res) => {
    const user = req.user;
    user.cart[user.cart.findIndex((cartItem) => cartItem._id == req.body.cart_id)].quantity = req.body.quantity;
    user.save()
        .then( updatedUser => {
            if(updatedUser) {
                res.json({success: true, quantity: req.body.quantity})
            }
            else res.json({success: false})
        })
        .catch(err => res.json(err))
}

module.exports.clearCart = (req, res) => {
    const user = req.user;
    user.cart = [];
    user.save()
        .then(updatedUser => {
            if(updatedUser && updatedUser.cart.length === 0) {
                res.json({success: true})
            }
            else return Promise.reject({success: false});
        })
        .catch(err => res.json(err))
}

module.exports.profile = (req, res) => {
    const {username, role, email, address, mobile, wallet} = req.user;
    res.json({username, role, email, address, mobile, wallet});
}

module.exports.addAddress = (req, res) => {
    if(req.body.address) {
        req.user.address.push(req.body.address);
        req.user.save()
            .then( updatedUser => {
                if(updatedUser) {
                    res.json({success: true, _id: updatedUser.address[updatedUser.address.length - 1]._id});
                }
                else res.json({success: false});
            })
            .catch(err => res.json(err))
    }
    else res.json({success: false});
}

module.exports.removeAddress = (req, res) => {
    req.user.address = req.user.address.filter( ele => ele && ele._id && ele._id != req.body._id);
    req.user.save()
        .then( updatedUser => {
            console.log(updatedUser);
            if(updatedUser) {
                res.json({success: true});
            }
            else res.json({success: false});
        })
        .catch(err => res.json(err))
}

module.exports.update = (req, res) => {
    req.user.username = req.body.user.username;
    req.user.email = req.body.user.email;
    req.user.mobile = req.body.user.mobile;
    req.body.user.address.forEach( (address, index) => {
        for(let key in address) {
            req.user.address[index][key] = address[key];
        }
    })
    req.user.save()
        .then( updatedUser => {
            if(updatedUser) {
                const {username, email, mobile, address, wallet, role} = updatedUser;
                res.json({username, email, mobile, address, wallet, role})
            }
            else res.json("There was some error while updating the user")
        })
        .catch(err => res.json(err))
}