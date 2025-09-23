const express = require('express');
const router = express.Router();

const Item = require('../models/items');
const Category = require('../models/category');
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
    res.render('items/new.ejs');
  } catch (error){
    console.log(error);
    res.redirect('/');
  }
});

// handle create form
router.post('/', async (req, res) => {
  try{
    req.body.owner = req.session.user._id;
    req.body.ItemCategory = ItemCategory;
    await Item.create(req.body);
    res.redirect('/items');
  } catch (error){
    console.log(error);
    res.redirect('/');
  }
});


/* ----------------------------------- EXPORT ------------------------------------------- */
module.exports = router;