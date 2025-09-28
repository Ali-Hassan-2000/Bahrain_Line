const isSignedIn = (req, res, next) => { 
  // if the admin is sign in go to next, else redirect to sign-in page
  if (req.session.user) return next();
  res.redirect("/auth/sign-in");
};

module.exports = isSignedIn;