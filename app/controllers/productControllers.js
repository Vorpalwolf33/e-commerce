const multer = require('multer');
const fs = require('fs');
const path = require('path');

const Product = require('../models/product');
const Category = require('../models/category');

const {loadProductImage, loadMultipleProductsImages, deleteImage} = require('../generalFunctions/imageOperations');

module.exports.add = (req, res) => {
    const product = new Product(req.body);
    product.images = [{filename: req.file.filename}];
    product.save()
        .then( addedProduct => {
            if(addedProduct) {
                const img = fs.readFileSync(req.file.path);
                addedProducts.images[0].file = img.data; 
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
                        categoryProds.forEach( (product, index) => {
                            if(product.images && product.images.length > 0 && product.images[0].filename) {
                                loadMultipleProductsImages(categoryProds);
                            }
                        })
                        if(categoryProds.length > 0)
                            resp.push({
                                type: category.name,
                                products: categoryProds
                            })
                    })
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
                if(product.images && product.images.length > 0 && product.images[0].filename) {
                    product.images[0].file = loadProductImage(product.images[0].filename);
                }
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
    const _id = req.body._id;
    if(req.file && req.file.filename); {

        images = [{filename: req.file.filename}];
    }
    const product = {...req.body};
    delete product._id;
    delete product.__v;
    console.log(product);
    if(req.file && req.file.filename) {
        deleteImage(product.images);
        product.images = [{filename: req.file.filename}];
    }
    Product.findOneAndUpdate({_id}, product, {new: true})
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
                deleteImage(deletedProduct.images[0].filename); 
                res.json({success: true})
            }
            else res.json({success: false})
        })
        .catch(err => res.json(err))
}

module.exports.customerSearch = (req, res) => {
    const {searchTerm} = req.body;
    Product.find({name: {$regex: searchTerm, $options: "i"}})
        .then( searchedProducts => {
            if(searchedProducts && searchedProducts.length > 0) {
                loadMultipleProductsImages(searchedProducts);
                res.json(searchedProducts);
            }
            else res.json({err: "Could not find any products"});
        })
        .catch( err => res.json(err))
}

module.exports.guestSearch = (req, res) => {
    const {searchTerm} = req.body;
    Product.find({name: {$regex: searchTerm, $options: "i"}})
        .then( searchedProducts => {
            if(searchedProducts && searchedProducts.length > 0) {
                loadMultipleProductsImages(searchedProducts);
                res.json(searchedProducts);
            }
            else res.json({err: "Could not find any products"});
        })
        .catch( err => res.json(err))
}

module.exports.imagesMiddleware = (req, res, next) => {
    next();
}