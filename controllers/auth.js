const express = require('express');
const bcrypt = require('bcrypt');

const Admin = require('../models/admin');

const router = express.Router();

router.get('/sign-up', (req, res) => { //render sign-up page
  res.render('auth/sign-up.ejs');
});

router.get('/sign-in', (req, res) => { //render sign-in page
  res.render('auth/sign-in.ejs');
});

router.post('/sign-up', async (req, res) => { // create user in DB
  const userInDatabase = await Admin.findOne({ username: req.body.username });

  if (userInDatabase) { // username is taken
    return res.send('Username is taken');
  }

  if (req.body.password !== req.body.confirmPassword) { // password is not correct
    return res.send('Password and Confirm Password must match');
  }

  const hashedPassword = bcrypt.hashSync(req.body.password, 10); // encrypte the password
  req.body.password = hashedPassword; // replace the password

  const newUser = await Admin.create(req.body); // create the user

  req.session.user = {
    username: newUser.username,
    _id: newUser._id
  };

  req.session.save(() => {
    res.redirect("/");
  });
});

router.post('/sign-in', async (req, res) => { // retrieve the user in DB
  const userInDatabase = await Admin.findOne({ username: req.body.username });

  if (!userInDatabase) { // username not found
    return res.send('Username is invalid');
  }

  const validPassword = bcrypt.compareSync(req.body.password, userInDatabase.password);

  if (!validPassword) {
    return res.send('Password is invalid');
  }

  req.session.user = {
    username: userInDatabase.username,
    _id: userInDatabase._id,
  };

  req.session.save(() => {
    res.redirect('/');
  });
});

router.get("/sign-out", (req, res) => { // sign-out function
  req.session.destroy(() => {
    res.redirect("/");
  });
});

module.exports = router;