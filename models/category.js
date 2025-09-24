const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    CategoryName:// items category array (reference)
    {
    type: String,
    required: true,
    },
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;