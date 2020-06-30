const Category = require('../models/category');

module.exports.add = (req, res) => {
    const cat = req.body;
    const category = new Category(cat);
    category.save()
        .then( addedCategory => res.json(addedCategory))
        .catch( err => res.send(err))
}

module.exports.remove = (req, res) => {
    const categoryId = req.body._id;
    Category.findOneAndRemove({_id: categoryId})
        .then(removedId => res.json({status: true}))
        .catch( err => res.send(err))
}

module.exports.list = (req, res) => {
    Category.find()
        .then( categories => {
            res.json(categories);
        })
        .catch(err => res.json(err))
}

module.exports.update = (req, res) => {
    const category = req.body.category;
    Category.findOneAndUpdate({_id: category._id}, {name: category.name}, {new: true})
        .then( updatedCategory => {
            if(updatedCategory) {
                res.json(updatedCategory);
                console.log(updatedCategory);
            }
        })
        .catch(err => res.json(err))
}