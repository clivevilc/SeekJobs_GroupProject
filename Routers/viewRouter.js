const express = require("express");
const isLoggedIn = require("../authFunctions/auth").isLoggedIn;

class ViewRouter {
    router() {
        let router = express.Router();
        router.get("/login", this.getLogin.bind(this));
        router.get("/user", isLoggedIn, this.getUserPage.bind(this));
    }
    getLogin(req, res){
        res.render("login")
    }
    getUserPage(req, res) {
        res.render("/user")
    }
}

module.exports = ViewRouter;
