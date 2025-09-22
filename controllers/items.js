const express = require('express');
const router = express.Router();

const Item = require('../models/items');
/* ----------------------------------- ROUTES ------------------------------------------- */
// Default page for users an admins
router.get('/', (req, res) => {
  res.render('items/index.ejs');
});

// render about page for users and admins
router.get('/about.ejs', (req, res) => {
  res.render('items/about.ejs');
});



/* ----------------------------------- EXPORT ------------------------------------------- */
module.exports = router;