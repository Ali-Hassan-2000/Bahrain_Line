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
    type: Image,
  },
  ItemCategory:{
    type: String,
      enum: ['Traditional chests', 'Boats', 'Palm leaves', 'Fridge magnets', 'Keychains'],// more will be added
      required: true,
  },
});

const Item = mongoose.model('Item', itemsSchema);

module.exports = Item;