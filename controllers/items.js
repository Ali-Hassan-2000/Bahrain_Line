const express = require('express');
const router = express.Router();

const Item = require('../models/items');
const Category = require('../models/category');
const Admin = require('../models/admin');
/* ----------------------------------- ROUTES ------------------------------------------- */
// Default page for users an admins
router.get('/', async (req, res) => {
  try{
    const categories = await Category.find(); // Fetch categories from the database
    const items = await Item.find(); // Fetch items from the database
    console.log(categories);
    console.log(items);

    res.render('items/index.ejs', {
      categories,
      items,
    });
  } catch (error){
    console.log(error);
    res.redirect('/');
  }
});

// render about page for users and admins
router.get('/about.ejs', (req, res) => {
  res.render('items/about.ejs');
});

// render create item page
router.get('/new_item', async (req, res) => {
  try{
    const categories = await Category.find(); // Fetch categories from the database

    res.render('items/new_item.ejs', {
      categories,
    });
  } catch (error){
    console.log(error);
    res.redirect('/');
  }
});

// render create category page
router.get('/new_category', async (req, res) => {
  try{
    res.render('items/new_category.ejs');
  } catch (error){
    console.log(error);
    res.redirect('/');
  }
});

// handle create form for items and categories
router.post('/', async (req, res) => {
  try{
    if (req.body.action === 'add_item') { // for item form
      const category = await Category.findOne({ CategoryName: req.body.ItemCategory });
      req.body.ItemCategoryId = category._id; // get the ItemCategoryId

      const AdminCreate = await Admin.findOne({username: req.session.user.username});
      req.body.ownerId = AdminCreate._id;

      const AdminName = await Admin.findOne({username: req.session.user.username});
      req.body.owner = AdminName.username;

      await Item.create(req.body);
      res.redirect('/items');
    }

    if (req.body.action === 'add_category') { // for category form    
      const existingCategory = await Category.findOne({ CategoryName: req.body.CategoryName });

      if (existingCategory) { // check if category exiset
        return res.redirect('/items/new_category');
      }
      await Category.create(req.body);
      res.redirect('/items');
    }
  } catch (error){
    console.log(error);
    res.redirect('/');
  }
});

// render show item page
/*
router.get('/:itemId', async (req, res) => {
  try {
    const populatedListings = await Listing.findById(req.params.listingId).populate('owner');

    // let the user like only one time
    const userHasFavorited = populatedListings.favoritedByUsers.some((user) => user.equals(req.session.user._id));

    res.render('listings/show.ejs', {
      listing: populatedListings,
      userHasFavorited: userHasFavorited,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});
*/


/* ----------------------------------- EXPORT ------------------------------------------- */
module.exports = router;