const Product = require('../models/product');

module.exports.add = (req, res) => {
    
    const product = new Product(req.body);
    product.save()
        .then( addedProduct => {
            if(addedProduct) {
                res.json(addedProduct);
            }
            else res.json({error: {message: "Product could not be added", description: "Product was not added to the database succesfully!! Error while saving the product to the database"}});
        })
        .catch( err => res.json(err))
}

module.exports.list = (req, res) => {
    Product.find() 
        .then( products => res.json(products))
        .catch( err => res.json(err))
}

module.exports.show = (req, res) => {
    const _id = req.params.id;
    Product.findOne({_id})
        .then( product => {
            if(product) {
                res.json(product);
            }
            else {
                res.json({
                    error: {
                        message: "Could not find the product",
                        err: "Invalid product id"
                    }
                })
            }
        })  
        .catch( err => res.json(err))  
}