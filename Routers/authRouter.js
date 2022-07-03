const express = require("express");
const { authenticate } = require("../passport");
const passportFunctions = require("../passport")

class AuthRouter{
    router() {
        let router = express.Router();

        router.post(
            "/signup",
            passportFunctions.authenticate("local-signup", {
              successRedirect: "/",
              failureRedirect: "/error",
            })
          );
        
        router.post("/login",
            passportFunctions.authenticate("local-login", {
                successRedirect: "/user",
                failureRedirect: "/usererror"
            }));
        
            router.get("/logout", (req, res) => {
                req.logout();
                res.render("login");
            });
        
        return router;
    }
}





module.exports = AuthRouter;