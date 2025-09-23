const express = require('express');
const router = express.Router();

const Item = require('../models/items');
const Category = require('../models/category');
const Admin = require('../models/admin');
/* ----------------------------------- ROUTES ------------------------------------------- */
// Default page for users an admins
router.get('/', (req, res) => {
  res.render('items/index.ejs');
});

// render about page for users and admins
router.get('/about.ejs', (req, res) => {
  res.render('items/about.ejs');
});

// render create item page
router.get('/new', async (req, res) => {
  try{
    const categories = await Category.find(); // Fetch categories from the database

    res.render('items/new.ejs', {
      categories,
    });
  } catch (error){
    console.log(error);
    res.redirect('/');
  }
});

// handle create form
router.post('/', async (req, res) => {
  try{
    const category = await Category.findOne({ CategoryName: req.body.ItemCategory });
    req.body.ItemCategoryId = category._id; // get the ItemCategoryId

    const AdminCreate = await Admin.findOne({username: req.session.user.username});
    req.body.ownerId = AdminCreate._id;

    const AdminName = await Admin.findOne({username: req.session.user.username});
    req.body.owner = AdminName.username;
    
    console.log(req.body);

    await Item.create(req.body);

    res.redirect('/items');
  } catch (error){
    console.log(error);
    res.redirect('/');
  }
});


/* ----------------------------------- EXPORT ------------------------------------------- */
module.exports = router;