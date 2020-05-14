const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    categoryId: [
        {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Category'
        }
    ],
    isAvailable: {
        type: Boolean,
        default: true
    },
    stock: {
        type: Number,
        required: true
    }
})

productSchema.pre('save', function() {
    const product = this;
    product.categories.forEach( cat => {
        category.findOne({name: cat})
            .then( foundCat => {
                if(foundCat == null) {
                    const category = new Category({cat});
                    category.save()
                        .then( savedCat => {
                            product.categoryId.push(savedCat._id);
                        })
                        .catch(err => console.log(err))
                }
            })
            .catch( err => console.log(err));
    });
    if(!product.isNew) {
        next();
    }
})

const Product = mongoose.model('Product', productSchema);

module.exports = Product;