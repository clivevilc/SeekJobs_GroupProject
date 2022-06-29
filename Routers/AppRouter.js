// const { Router } = require("express");

class AppRouter {
    constructor(jobService, express, knex) {
        this.jobService = jobService;
        this.express = express;
        this.knex = knex;
    }

    // API Jobs
    // Bind Router methods
    router(){
        let router = this.express.Router();

        //Jobs API
        router.get("/jobs", this.getJobs.bind(this));
        router.post("/", this.post.bind(this));
        //router.put
        //router.delete

        //User Applicant API
        router.get("/users", this.getApplicants.bind(this));

        //Credentials API
        router.get("/credentials", this.getCred.bind(this));
        router.post("/credentials", this.postCred.bind(this));
        router.get("/credential/:userName", this.getCredUser.bind(this));
        //router.put("/:userName", this.updateCred.bind(this));
        router.delete("/credential/:userName", this.deleteCred.bind(this));

        router.put("/credential/:userName", this.updateUser.bind(this));



        return router;
    }

    //getJobs Method
    getJobs(req,res) {
        // console.log("GET")
        this.knex('user_employer')
            .join('job_listing', 'user_employer.id', '=', 'job_listing.user_employer_id')
            .select('*')
            .then((data) =>{
                //console.log(data);
                res.json(data);
            });
    }

    //postJobs Method
    // TODO: create post update and delete jobs. Do after finishing the appicant-end side
    post(req, res) {
        console.log("POST")
    }

    //Get credentials
    getCred(req, res) {
        console.log("get credentials");
        this.knex("credentials")
        .select("*")
        .then((data) => {
            res.json(data);
        })
    }

    //Post new credential
    postCred(req, res) {
        console.log("Create new login credential");
        this.knex("credentials")
            .insert({
                username: req.body.username,
                password: req.body.password,
                user_type: req.body.user_type
            })
            .then((data) =>{
                console.log(data);
                res.send("posted");
            })
    }

    //Get specific user credential
    getCredUser(req, res){
        console.log("Get user credential")
        this.knex("credentials")
        .where({
            username:req.params.userName})
        .select("*")
        .then((data) => {
            console.log(data)
            res.json(data)
        })
    }

    //Update credential
    updateCred(req, res) {
        console.log("Update credential password");
        this.knex("credentials")
        .where({
            username: req.params.userName
        })
        .update({
            password: req.body.password,
        })
        .then((data) => {
            console.log(data)
            res.send("Password updated")
        })
    }

    //Delete credential
    deleteCred(req, res) {
        console.log("Delete account");
        this.knex("credentials")
        .where({
            username: req.params.userName
        })
        .del()
        .then((data) => {
            res.send("Account deleted")
        })
    }

    //getUser Method
    getApplicants(req, res) {
        console.log("Get all user applicant data");
        this.knex("user_applicant")
        .join('credentials', 'credentials.id', '=', 'user_applicant.credentials_id')
        .where({
            user_type: 'applicant'
        })
        .select('*')
        .then((data) => {
            console.log(data);
            res.json(data);
        })         
    }


    // Update user details
    updateUser(req, res) {
        console.log("Update user detail");
        this.knex("credentials")
        .where({
            username: req.params.userName
        })
        .first()
        .then((data) => {
            this.knex("user_applicant")
            .update({
                first_name: req.body.first_name,
                last_name: req.body.last_name
            })
            .where({
                credentials_id: data.id
            })
            .then((data) => {
                console.log(data)
                res.send("information successfully updated");
            })
        })
    }


    }

module.exports = AppRouter;