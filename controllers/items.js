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
    const IsAdmin = await Admin.findOne({username: req.session.user.username});

    res.render('items/index.ejs', {
      categories,
      items,
      IsAdmin, // will be used later
    });
  } catch (error){
    console.log(error);
    res.redirect('/');
  }
});

// render about page for users and admins
router.get('/about.ejs', async (req, res) => {
  try{
    const IsAdmin = await Admin.findOne({username: req.session.user.username});
    res.render('items/about.ejs', {
      IsAdmin, // will be used later
    });
  } catch(error){
    console.log(error);
    res.redirect('/');
  }
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

// render show item page and show category page
router.get('/:Id', async (req, res) => {
  try {
    const categories = await Category.find();
    const Items = await Item.find();

    const showItem = await Item.findById(req.params.Id);
    const showCategory = await Category.findById(req.params.Id);

    const IsAdmin = await Admin.findOne({username: req.session.user.username});

    if(showItem){
      res.render('items/show_item.ejs', {
      categories,
      showItem,
      IsAdmin, // will be used later
    });
    }
    if(showCategory){
      res.render('items/show_category.ejs', {
      Items,
      showCategory,
      categories,
      IsAdmin, // will be used later
    });
    }
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

// handle button for items and categories
router.delete('/:Id', async (req, res) => {
  try{
    const deleteItem = await Item.findById(req.params.Id);
    const deleteCategory = await Category.findById(req.params.Id);
    
    if(deleteItem){
      await deleteItem.deleteOne();
      res.redirect('/items');
    }
    if(deleteCategory){
      await Item.deleteMany({ ItemCategoryId: deleteCategory._id });
      await deleteCategory.deleteOne();
      res.redirect('/items');
    }
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

// render edit item page and category page
router.get('/:Id/edit', async (req, res) => {
  try {
    const currentItem = await Item.findById(req.params.Id);
    const currentCategory = await Category.findById(req.params.Id);
    const categories = await Category.find();
    
    if(currentItem){
      res.render('items/edit_item.ejs', {
      item: currentItem,
      categories,
    });
    }
    if(currentCategory){
      res.render('items/edit_category.ejs', {
      category: currentCategory,
      categories,
    });
    }
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

// handle edit form for item and category
router.put('/:Id', async (req, res) => {
  try{
    const currentItem = await Item.findById(req.params.Id);
    const currentCategory = await Category.findById(req.params.Id);

    if(currentItem){
      if (req.file) {
        // If a new image is uploaded, use its path
        req.body.ItemImg = req.file.path;
      } else {
        // Use the existing image path if no new image is uploaded
        req.body.ItemImg = req.body.currentImage;
      }
      await currentItem.updateOne(req.body);
      res.redirect(`/items/${req.params.Id}`);
    }
    if(currentCategory){
      await currentCategory.updateOne(req.body);
      await Item.updateMany({ItemCategory: currentCategory.CategoryName}, { $set: { ItemCategory: req.body.CategoryName}});
      // here I get the items based on the previous category name, then update thier category name with the new
      res.redirect(`/items/${req.params.Id}`);
    }
  }
  catch (error){
    console.log(error);
    res.redirect('/');
  }
});
/* ----------------------------------- EXPORT ------------------------------------------- */
module.exports = router;