const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    CategoryName: [ // number of items category array (refrence)
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Item',
        },
    ], 
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;