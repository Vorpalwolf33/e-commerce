const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secretKey = require('../../config/secretkey');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: {
            validator: email => validator.isEmail(email),
            message: () => "Invalid email / password"
        }
    },
    password: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        default: "Customer"
    },
    tokens: [
        {
            token: String,
            createdAt: {
                type: Date,
                default: Date.now
            }            
        }
    ],
    address: [
        {
            city: {
                type: String,
                required: true
            },
            state: {
                type: String,
                required: true
            },
            locality: {
                type: String,
                required: true
            },
            houseDetails: {
                type: String,
                required: true
            },
            landmark: {
                type: String,
                required: true
            },
            zipcode: {
                type: Number,
                required: true
            }
        }
    ],
    cart: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ],
    wallet: {
        type: Number,
        default: 0
    }
});

userSchema.pre('save', function(next){
    const user = this;
    if(user.isNew) bcryptjs.genSalt(10)
        .then( salt => {
            bcryptjs.hash(user.password, salt)
                .then( encryptedPassword => {
                    console.log("hash Worked");
                    user.password = encryptedPassword;
                    user.hashed = true;
                    next();
                })
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    else next();
})

userSchema.methods.generateToken = function(){
    const user = this;
    const tokenData = {
        _id: user._id,
        role: user.role
    }
    const token = jwt.sign(tokenData, secretKey);
    user.tokens.push({token})
    return user.save()
            .then( () => Promise.resolve(token))
            .catch( err => Promise.reject({errors: "Invalid email / password"}))
}

userSchema.statics.findByToken = function(id, token) {
    const User = this;
    return User.findOne({_id: id, 'tokens.token': token})
        .then( foundUser => Promise.resolve(foundUser))
        .catch( err => Promise.reject(err))
}

userSchema.statics.findByCredentials = function(email, password){
    const User = this;
    return User.findOne({email})
        .then( retrievedUser => {
            if(retrievedUser) {
                return bcryptjs.compare(password, retrievedUser.password)
                    .then( isVerified => {
                        if(isVerified) return Promise.resolve(retrievedUser)
                        else return Promise.reject({errors: "Invalid email / password"})
                    })
                    .catch( err => Promise.reject(err))
            }
            else return Promise.reject({errors: "Invalid email / password"})
        })
        .catch()
}

const User = mongoose.model('User', userSchema);



module.exports = User;