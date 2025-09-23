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
  ItemDescription: {
    type: String,
  },
  ItemImg: {
    type: String, // the path of the Img
  },

  ItemCategory:{ // refrences
    type: String,
    ref: 'Category',
    required: true,
  },
  Owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
  },
});

const Item = mongoose.model('Item', itemsSchema);

module.exports = Item;