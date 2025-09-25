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

// render show item page and show category page
router.get('/:Id', async (req, res) => {
  try {
    const categories = await Category.find();
    const Items = await Item.find();

    const showItem = await Item.findById(req.params.Id);
    const showCategory = await Category.findById(req.params.Id);

    if(showItem){
      res.render('items/show_item.ejs', {
      categories,
      showItem,
    });
    }
    if(showCategory){
      res.render('items/show_category.ejs', {
      Items,
      showCategory,
      categories,
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

// render edit item page
router.get('/:itemId/edit', async (req, res) => {
  try {
    const currentItem = await Item.findById(req.params.itemId);
    const categories = await Category.find();
    res.render('items/edit_item.ejs', {
      item: currentItem,
      categories,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

// handle edit form for items
router.put('/:itemId', async (req, res) => {
  try{
    const currentItem = await Item.findById(req.params.itemId);

    if (req.file) {
      // If a new image is uploaded, use its path
      req.body.ItemImg = req.file.path;
    } else {
      // Use the existing image path if no new image is uploaded
      req.body.ItemImg = req.body.currentImage;
    }

    await currentItem.updateOne(req.body);
    
    res.redirect(`/items/${req.params.itemId}`);
  }
  catch (error){
    console.log(error);
    res.redirect('/');
  }
});



/* ----------------------------------- EXPORT ------------------------------------------- */
module.exports = router;