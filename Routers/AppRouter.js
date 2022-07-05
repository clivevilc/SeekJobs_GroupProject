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
        router.get("/listings", this.getAllListing.bind(this));
        router.get("/listing/:userName", this.getListing.bind(this));
        router.post("/listing/:userName", this.postListing.bind(this));
        //router.put
        //router.delete

        //User Applicant API
        router.get("/users", this.getAllApplicants.bind(this));
        router.get("/user/:userName", this.getApplicant.bind(this));
        router.put("/user/:userName", this.updateApplicant.bind(this));
        

        //Credentials API
        router.get("/credentials", this.getCred.bind(this));
        router.post("/credentials", this.postCred.bind(this));
        router.get("/credential/:userName", this.getCredUser.bind(this));
        //router.put("/:userName", this.updateCred.bind(this));
        router.delete("/credential/:userName", this.deleteCred.bind(this));

        //Saved Listing
        router.get("/user/:userName/saved", this.getSavedListing.bind(this));
        router.post("/user/:userName/saved", this.addSavedListing.bind(this));
        router.delete("/user/:userName/saved", this.deleteSavedListing.bind(this));


        return router;
    }

    //Job listing Routers ////////////////////////////////////////

    //getJobs Method
    getAllListing(req,res) {
        // console.log("GET")
        this.knex('user_employer')
            .join('job_listing', 'user_employer.id', '=', 'job_listing.user_employer_id')
            .select('*')
            .then((data) =>{
                console.log(data);
                res.json(data);
            });
    }

    //Get listing posted by an employer
    getListing(req, res) {
        this.knex("credentials")
        .where({
            username: req.params.userName
        })
        .andWhere({
            user_type:"employer"
        })
        .first()
        .then((data) => {
            this.knex("user_employer")
            .join('job_listing', 'user_employer.id', '=', 'job_listing.user_employer_id')
            .select("*")
            .where({
                credentials_id: data.id
            })
            .then((data) => {
                //console.log(data)
                res.send(data);
            })
        })

    }

    //postJob Method
    // TODO: create post update and delete jobs. Do after finishing the appicant-end side
    postListing(req, res) {
        console.log("POST new job listing");
        this.knex('credentials')
            .where({
                username: req.params.userName
            })
            .andWhere({
                user_type:"employer"
            })
            .first()
            .then((data) =>{
                this.knex("job_listing")
                .insert({
                    title: req.body.title,
                    salary: req.body.salary,
                    job_type: req.body.job_type,
                    description: req.body.description,
                    user_employer_id: data.id
                })
                .where({
                    credentials_id: data.id
                })
                .then((data) =>{
                    console.log("New job listing successfully added")
                    res.send(data)
                })
            })
    }


    //Credentials Routers /////////////////////////////////////////

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
                username: req.body.username, //link to register page form
                password: req.body.password, //link to register page form
                user_type: req.body.user_type //link to register page form
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
            //console.log(data)
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

    //User Applicant Routers /////////////////////////////////////////////

    //getUser Method
    getAllApplicants(req, res) {
        console.log("Get all user applicant data");
        this.knex("user_applicant")
        .join('credentials', 'credentials.id', '=', 'user_applicant.credentials_id')
        .where({
            user_type: 'applicant'
        })
        .select('*')
        .then((data) => {
            //console.log(data);
            res.json(data);
        })         
    }

    // Get user detail
    getApplicant(req, res) {
        console.log("Get user detail");
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
                res.send(data);
            })
        })
    }

    // Update user details
    updateApplicant(req, res) {
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
                last_name: req.body.last_name,
                email:req.body.email,
                phone:req.body.phone,
                address:req.body.address
            })
            .where({
                credentials_id: data.id
            })
            .then((data) => {
                //console.log(data)
                res.send("information successfully updated");
            })
        })
    }

    // Saved Listing ///////////////////////////////////////////

    //Get saved listing
    //TODO: CATCH ERROR WHEN USERNAME IS UNDEFINED
    getSavedListing(req, res){
        console.log("View saved listing to saved list");
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
            console.log(data)
            res.send(data);
            });

        })
    }


    //Add saved listing
    addSavedListing(req, res) {
        console.log("Add listing to saved table");
        this.knex("credentials")
        .where({
            username: req.params.userName
        })
        .andWhere({
            user_type:"applicant"
        })
        .first()
        .then((data) => {
            this.knex("user_applicant")
            .select("*")
            .where({
                credentials_id:data.id
            })
            .first()
            .then((data) => {
                this.knex("saved_listing")
                .insert({
                    applicant_id:data.id,
                    listing_id:req.body.listing_id
                })
                .then((data) =>{
                    console.log("job listing is successfully added to the saved list")
                    res.send(data)
                })
            })
        })
    }


    //Delete saved listing
    deleteSavedListing(req, res) {
        console.log("Delete listing")
        this.knex("credentials")
        .where({
            username: req.params.userName
        })
        .andWhere({
            user_type:"applicant"
        })
        .first()
        .then((data) => {
            this.knex("user_applicant")
            .select("*")
            .where({
                credentials_id:data.id
            })
            .first()
            .then((data) => {
                this.knex("saved_listing")
                .del()
                .where({
                    id:req.body.id
                    //id:req
                })
                .then((data) =>{
                    console.log("job listing is successfully added to the saved list")
                    res.send("Saved item deleted")
                })
            })
        })
    }
        
    }


module.exports = AppRouter;