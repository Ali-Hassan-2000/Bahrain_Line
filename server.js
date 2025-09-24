const dotenv = require('dotenv');

dotenv.config();
const express = require('express');

const app = express();

const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const session = require('express-session');
const MongoStore = require("connect-mongo");

// Middlewares
const isSignedIn = require("./middleware/is-signed-in.js");
const passUserToView = require("./middleware/pass-user-to-view.js");

// Controllers
const authController = require('./controllers/auth.js');
const itemsController = require('./controllers/items.js');

// Set the port from environment variable or default to 3000
const port = process.env.PORT ? process.env.PORT : '3000';

mongoose.connect(process.env.MONGODB_URI);
/*
.then(async () => { // add then to fill categories

  const predefinedCategories = [ // add more if nedded
      { CategoryName: 'Traditional chests' },
      { CategoryName: 'Boats' },
      { CategoryName: 'Palm leaves' },
      { CategoryName: 'Fridge magnets' },
      { CategoryName: 'Keychains' }
  ];

  const Category = require('./models/category');
  const existingCategories = await Category.find();

  if (existingCategories.length === 0) { // if categories added before don't duplicate the same list
    await Category.insertMany(predefinedCategories);
  }
});
*/

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// MIDDLEWARE
//
// Middleware to parse URL-encoded data from forms
app.use(express.urlencoded({ extended: false }));
// Middleware for using HTTP verbs such as PUT or DELETE
app.use(methodOverride('_method'));
// Morgan for logging HTTP requests
app.use(morgan('dev'));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
  })
);
app.use(passUserToView);

// Default page for users and admins
app.get('/', (req, res) => {
  res.render('items/index.ejs');
});

// mount controllers
app.use('/auth', authController);
app.use('/items', itemsController);

/* ----------------------------------- ROUTES --------------------------------------- */
// PROTECTED

/* ----------------------------------- TCP --------------------------------------- */
app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});
