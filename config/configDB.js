const mongoose = require('mongoose');

const configDB = () => {
    mongoose.Promise = global.Promise;

    mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost:27017/ecommerce", {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
        .then( () => {console.log("Succesfully connected to database")})
        .catch( () => {console.log("Error while connecting to database: \n", err)})
}

module.exports = configDB;  