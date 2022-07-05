// Middleware to check if the user is logged in

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      console.log(req.cookies);
      console.log(req.session.passport.user, "passport USER");
      console.log(req.user, "USER");
      return next();
    }
  
    res.redirect("/login");
}
  
module.exports = isLoggedIn;