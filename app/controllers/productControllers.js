const Product = require('../models/product');
const Category = require('../models/category');

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

module.exports.homeList = (req, res) => {
    const user = req.user;
    Product.find()
        .then( products => {
            const resp = [];

            // Temporarily use categories to make the multiple lists of the products
            Category.find()
                .then( categories => {
                    categories.forEach( category => {
                        const categoryProds = products.filter( product => product.categoryIds.includes(category._id));
                        if(categoryProds.length > 0)
                            resp.push({
                                type: category.name,
                                products: categoryProds
                            })
                    })
                    res.json(resp)
                })
                .catch(err => res.json(err))
            
        })
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