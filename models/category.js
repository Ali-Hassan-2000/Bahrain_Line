const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    CategoryName:// items category array (reference)
    {
    type: String,
    enum: ['Traditional chests', 'Boats', 'Palm leaves', 'Fridge magnets', 'Keychains'],// more will be added
    required: true,
    },
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;