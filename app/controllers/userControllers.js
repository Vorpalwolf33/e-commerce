const User = require('../models/user');

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