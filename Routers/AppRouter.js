const { Router } = require("express");

class AppRouter {
    constructor(jobService, express) {
        this.jobService = jobService;
        this.express = express;
    }

    // Bind Router methods
    router(){
        let router = this.express.Router();

        router.get("/", this.get.bind(this));
        router.post("/", this.post.bind(this));
        //router.put
        //router.delete

        return router;
    }

    //GET Method
    get(req,res) {
        console.log("GET")
    }

    //POST Method
    post(req, res) {
        console.log("POST")

    }

}

module.exports = AppRouter;