const express = require("express");
const isLoggedIn = require("../authFunctions/auth").isLoggedIn;

class ViewRouter {
    router() {
        let router = express.Router();
        router.get("/", this.getHome.bind(this));
        router.get("/register", this.getSignup.bind(this));
        router.get("/login", this.getLogin.bind(this));
        router.get("/user", isLoggedIn, this.getUserPage.bind(this));
        router.get("/error", this.getError.bind(this));
    }
    getHome(req, res) {
        res.render("index");
      }
    getLogin(req, res){
        res.render("login")
    }
    getUserPage(req, res) {
        res.render("user")
    }
    getSignup(req, res) {
        res.render("register");
    }
    getError(req, res) {
        res.render("error");
      }
}

module.exports = ViewRouter;
