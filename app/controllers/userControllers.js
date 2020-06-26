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
    const filter = {_id: user._id};
    
    if(!user.cart.includes(req.body.product_id)) {
        user.cart.push(req.body.product_id);
        const update = {cart: user.cart};
        User.findOneAndUpdate(filter, update, {new: true})
            .then(updatedUser => {
                if(updatedUser) {
                    res.json({success: true});
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
    let cart = user.cart;
    cart = cart.filter( item => item != req.body.id);
    User.findOneAndUpdate({_id: user._id}, {cart}, {new: true})
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
    user.populate('cart').execPopulate()
        .then( populatedUser => {
            if(populatedUser) {
                res.json(populatedUser.cart);
            }
        })
        .catch(err =>console.log(err))

}
