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
        router.get("/user", this.getApplicant.bind(this));

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

    
    //getUser Method
    getApplicant(req, res) {
        console.log("Get user applicant data");
        this.knex("credentials")
        .join('user_applicant', 'credentials.id', '=', 'user_applicant.credentials_id')
        .where({
            user_type: 'applicant'
        })
        .select('*')
        .then((data) => {
            //console.log(data);
            res.json(data);
        })         
    }

    }

module.exports = AppRouter;