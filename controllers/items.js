const express = require('express');
const router = express.Router();

const Item = require('../models/items');
const Category = require('../models/category');
const Admin = require('../models/admin');
const isSignedIn = require('../middleware/is-signed-in');

// for photos of the app (npm install multer multer-storage-cloudinary cloudinary)
const upload = require('../config/multer')
const cloudinary = require('../config/cloudinary')
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

// render create item page
router.get('/new_item', isSignedIn, async (req, res) => {
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
router.get('/new_category', isSignedIn, async (req, res) => {
  try{
    const categories = await Category.find();

    res.render('items/new_category.ejs', {
      categories,
    });
  } catch (error){
    console.log(error);
    res.redirect('/');
  }
});

// handle create form for items and categories
router.post('/', isSignedIn, upload.array('ItemImg'), async (req, res) => {
  try{
    if (req.body.action === 'add_item') { // for item form
      const category = await Category.findOne({ CategoryName: req.body.ItemCategory });
      req.body.ItemCategoryId = category._id; // get the ItemCategoryId

      const AdminCreate = await Admin.findOne({username: req.session.user.username});
      req.body.ownerId = AdminCreate._id;

      const AdminName = await Admin.findOne({username: req.session.user.username});
      req.body.owner = AdminName.username;
 
      req.body.ItemImg = []; // Initialize ItemImg as an empty array
      const itemImages = req.files; // Get the uploaded files
      
      /* we take the images from the form and store them in itemImages
      then we push each image in the array and give it (url, image link string) 
      and (_id, image cloud storage) */
      itemImages.forEach(file => {
        req.body.ItemImg.push({
          url: file.path,
          cloudinary_id: file.filename
          });
      });  

      const newItem = await Item.create(req.body);
      res.redirect(`/items/${newItem._id}`);
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
router.delete('/:Id', isSignedIn, async (req, res) => {
  try{
    const deleteItem = await Item.findById(req.params.Id);
    const deleteCategory = await Category.findById(req.params.Id);
    
      if(deleteItem){

        // Loop through all images and delete them from Cloudinary
        for (const img of deleteItem.ItemImg) {
          if (img.cloudinary_id) {
            await cloudinary.uploader.destroy(img.cloudinary_id);
          }
        }

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
router.get('/:Id/edit', isSignedIn, async (req, res) => {
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
router.put('/:Id', isSignedIn, upload.array('ItemImg'), async (req, res) => {
  try{
    const currentItem = await Item.findById(req.params.Id);
    const currentCategory = await Category.findById(req.params.Id);

    if(currentItem){

    // Check if new images are uploaded
    if (req.files && req.files.length > 0) {
      // Delete old images from Cloudinary
      for (const img of currentItem.ItemImg) {
        if (img.cloudinary_id) {
          await cloudinary.uploader.destroy(img.cloudinary_id);
        }
      }

      // Update ItemImg array with new images
      currentItem.ItemImg = req.files.map(file => ({
        url: file.path,
        cloudinary_id: file.filename,
      }));
      } else {
        // If no new images are uploaded, retain existing images
        currentItem.ItemImg = currentItem.ItemImg.map((img, index) => ({
          url: req.body[`currentImage${index + 1}`], // Use existing URL from hidden input
          cloudinary_id: img.cloudinary_id // Keep existing Cloudinary ID
        }));
      }

      // Update other fields from req.body
      currentItem.ItemName = req.body.ItemName; 
      currentItem.ItemPrice = req.body.ItemPrice; 
      currentItem.ItemDescription = req.body.ItemDescription; 
      currentItem.ItemCategory = req.body.ItemCategory; 
      currentItem.ItemCategoryId = req.body.ItemCategoryId; 
      currentItem.Owner = req.body.Owner; 
      currentItem.OwnerId = req.body.OwnerId; 

      // Save the updated item
      await currentItem.save();
      
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