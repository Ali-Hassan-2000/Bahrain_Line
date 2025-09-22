const express = require('express');
const router = express.Router();

const Item = require('../models/items');
/* ----------------------------------- ROUTES ------------------------------------------- */

router.get('/', (req, res) => {
  res.render('items/index.ejs');
});

/* ----------------------------------- EXPORT ------------------------------------------- */
module.exports = router;