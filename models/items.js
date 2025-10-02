const mongoose = require('mongoose');

const imagesSchema = new mongoose.Schema({
  url: { type: String},
  cloudinary_id: { type: String},
});

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

  ItemImg: [imagesSchema], //Embeded

  ItemCategory:{ // refrences
    type: String,
    ref: 'Category',
    required: true,
  },
  ItemCategoryId:{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  Owner: {
    type: String,
    ref: 'Admin',
  },
  OwnerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
  },
});

const Item = mongoose.model('Item', itemsSchema);

module.exports = Item;