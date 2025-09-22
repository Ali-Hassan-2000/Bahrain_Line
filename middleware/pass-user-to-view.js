const passUserToView = (req, res, next) => { // pass the sign-in admin to local varible
  res.locals.user = req.session.user ? req.session.user : null;
  next();
};

module.exports = passUserToView;
