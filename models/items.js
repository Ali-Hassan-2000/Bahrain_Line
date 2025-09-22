const mongoose = require('mongoose');

const itemsSchema = new mongoose.Schema({
  ItemName: {
    type: String,
    required: true,
  },
  ItemPrice: {
    type: Number,
    required: true,
  },
});

const Item = mongoose.model('Item', itemsSchema);

module.exports = Item;
