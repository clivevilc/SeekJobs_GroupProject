//Import Libraries
const { urlencoded } = require("express");
const express = require("express");
const {engine} = require("express-handlebars");
const port = 3000;

//Import required modules
const fs = require("fs");
const path = require("path");

//In-built modules (filesystem and path)
const app = express();
//require("dotenv").config();

//setup applications
const AppRouter = require("./Routers/AppRouter");
const JobService = require("./Services/JobServices");

/** **************** Configure Express *********************** */

//Setup Handlebars
// app.engine('handlebars', engine({defaultLayout: "main"}));
// app.set("view engine", "handlebars");
app.engine('hbs', engine ({
    layoutsDir: `${__dirname}/views/layouts`,
    partialsDir: `${__dirname}/views/partials`,
    extname: 'hbs',
    defaultLayout: 'main'
}));
app.set("view engine", "hbs");

//Setup Express middlewares
app.use(express.static("public"));
app.use(urlencoded({extended:false}));
app.use(express.json());


/** **************** Configure Job Services *********************** */

//Render user homepage
app.get("/", (req,res) => {
    // res.render("home");
    res.render("home");
})

//Render user login page
app.get("/login", (req, res) =>{
    res.render("login");
})

//Render user profile page 
app.get("user/:userName", (req, res) =>{
    res.render("user")
})

//Render user application status page


//Render biz login ?? Does it need to be separated with the user login?
app.get("/employerlogin", (req, res) =>{
    res.render("employerLogin")
})

//Render biz add job page

//Render biz profile




/** **************** Configure Router *********************** */

//app.use("/", new AppRouter(JobService, express).router());

//setup port
app.listen(port, () => {
    console.log(`Listening to ${port}`);
})
