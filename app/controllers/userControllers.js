const User = require('../models/user');

module.exports.register = (req, res) => {
    console.log("From register");
    const body = req.body;
    console.log(body);
    const user = new User(body);
    user.save()
        .then( savedUser => {
            res.json(savedUser);
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
            // console.log("token is generated");
            res.json({token})
        })
        .catch(err => {
            console.log(err);
            res.status('401').json(err)
        })
}

module.exports.home = (req, res) => {
    const token = req.headers['x-auth'];
    const user = (req.user.role) ? {userRole: req.user.role} : {userRole: "Customer"};
    user.username = req.user.username;
    res.json({user});
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
    user.cart.push(req.body.product_id);
    const update = {cart: user.cart};
    User.findOneAndUpdate(filter, update)
        .then(response => {
            console.log(response);
        })    
        .catch(err => console.log(err))
}
