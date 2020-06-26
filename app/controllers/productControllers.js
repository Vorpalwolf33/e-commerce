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
                        const categoryProds = products.filter( product => product.categoryId.includes(category._id));
                        if(categoryProds.length > 0)
                            resp.push({
                                type: category.name,
                                products: categoryProds
                            })
                    })
                    console.log(resp);
                    res.json(resp);
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

module.exports.update = (req, res) => {
    const _id = req.body.product._id;
    const {name, price, stock, categoryId, description, isAvailable} = req.body.product;
    Product.findOneAndUpdate({_id}, {name, price, stock, categoryId, description, isAvailable}, {new: true})
        .then( updatedProduct => {
            if(updatedProduct) {
                res.json(updatedProduct);
            }
            else res.json("There was some error while updating the product")
        })
        .catch(err => res.json(err))
        
}

module.exports.remove = (req, res) => {
    Product.findByIdAndDelete(req.body.id)
        .then( deletedProduct => {
            if(deletedProduct) {
                res.json({success: true})
            }
            else res.json({success: false})
        })
        .catch(err => res.json(err))
}