const jwt = require('jsonwebtoken');
const User = require('../models/user');
const secretKey = require('../../config/secretkey');

module.exports.authenticateUser = (req, res, next) => {
    const token = req.headers['x-auth'];
    const tokenData = jwt.verify(token, secretKey);
    const id = tokenData._id;
    User.findByToken(id, token)
        .then( foundUser => {
            req.user = foundUser;
            next();
        })
        .catch( err => res.status('401').json({errors: {
            error: "Unauthorised",
            message: "Invalid email / password"
        }}))
}

module.exports.authoriseUser = (req, res, next) => {
    const token = req.headers['x-auth'];
    const tokenData = jwt.verify(token, secretKey);
    switch(tokenData.role) {
        case "Customer": res.status('401').json({errors: {
            type: "Unauthorised",
            message: "You are not authorised to access this page"
        }}); break;
        case "Admin": next(); break;
        default: res.status('401').json({
            errors: {
                type: "Unauthorised",
                message: "You are not authorised to access this page"
            }
        });
    }
}