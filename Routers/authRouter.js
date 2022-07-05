const express = require("express");
const { authenticate } = require("../passport");
const passportFunctions = require("../passport");

class AuthRouter {
  router() {
    let router = express.Router();

    router.post(
      "/register",
      passportFunctions.authenticate("local-signup", {
        successRedirect: "/login",
        failureRedirect: "/error",
      })
    );

    router.post(
      "/login",
      passportFunctions.authenticate("local-login", {
        //successRedirect: "/user/",
        failureRedirect: "/usererror",
      }),
      (req,res) => {
        res.redirect("/user/" + req.user.username)
      }
    );

    // Log Out POST route
    router.post('/logout', function(req, res, next) {
        req.logout(function(err) {
            if (err) { return next(err); }
            console.log("Logging out")
          res.redirect('login');
        });
      });
      

    return router;
  }
}

module.exports = AuthRouter;
