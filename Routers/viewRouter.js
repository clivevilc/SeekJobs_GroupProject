//const express = require("express");
//const isLoggedIn = require("../authFunctions/auth").isLoggedIn;

class ViewRouter {

    constructor(knex, express){
        this.knex = knex;
        this.express = express;
    }

    router() {
        let router = this.express.Router();

        router.get("/", this.getHome.bind(this));
        router.get("/signup", this.getSignup.bind(this));
        router.get("/login", this.getLogin.bind(this));
        router.get("/user", this.getUserPage.bind(this));
        router.get("/error", this.getError.bind(this));

        router.get("/user/:userName", this.getUser.bind(this))
        router.get("/user/:userName/saved", this.renderSaved.bind(this))

        return router;
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

    //Render User profile page
    getUser (req, res) {
    /*   const requestedUser = _.lowerCase(req.params.userName);
        console.log(requestedUser); */
    
        this.knex("credentials")
        .where({
            username: req.params.userName
        })
        .first()
        .then((data) => {
            this.knex("user_applicant")
            .join('credentials', 'credentials.id', '=', 'user_applicant.credentials_id')
            .select("*")
            .where({
                credentials_id: data.id
            })
            .then((data) => {
                //console.log(data)
                res.render("user", {profile: data});
            })
        })
    };

    //Render user saved listing page
    renderSaved (req,res) {
        console.log("render saved run")
        return this.knex("credentials")
        .where({
            username: req.params.userName
        })
        .andWhere({
            user_type:"applicant"
        })
        .first()
        .then((data) => {
            return this.knex("user_applicant")
            .select("*")
            .where({
                credentials_id:data.id
            })
            .first()
            .then((data) => {
                return this.knex("saved_listing")
                .select("*")
                .where({
                    applicant_id:data.id
                })
            })
            .then(async(data) => {
                 //console.log("string", data);
                let array = []
                for(let i = 0; i < data.length; i++){
                    let newData = await this.knex("job_listing")
                    .select("id", 
                            "title", 
                            "salary", 
                            "job_type", 
                            "description")
                    .where({
                        id: data[i].listing_id,
                    })
                    .first()
                    array.push(newData);
                } 
                return array
            /*     console.log("string", await this.knex("job_listing")); */
            })
            .then((data) => {
            //console.log(data)
            res.render("savedListing", {listing: data});
            });

        })

    }
}

module.exports = ViewRouter;
