const fs = require('fs');
const path = require('path');

module.exports.loadProductImage = (filename) => {
    return fs.readFileSync(path.resolve(__dirname + '/../../') + '/files/images/' + filename);
}

module.exports.loadMultipleProductsImages = (products) => {
    products.forEach( (product, index) => {
        products[index].images[0].file = this.loadProductImage(product.images[0].filename);
    })
}

module.exports.loadImagesForCart = (cart) => {
    cart.forEach( (item, index) => {
        cart[index].product.images[0].file = this.loadProductImage(item.product.images[0].filename);
    })
}

module.exports.deleteImage = (filename) => {
    fs.unlinkSync(path.resolve(__dirname + '/../../') + '/files/images/' + filename)
}