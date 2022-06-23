//Import Libraries
const { urlencoded } = require("express");
const express = require("express");
const {create} = require("express-handlebars");

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
// app.engine('handlebars', hbs.engine);
// app.set("view engine", "handlebars");

//Setup Express middlewares
app.use(express.static("public"));
app.use(urlencoded({extended:false}));
app.use(express.json());


/** **************** Configure Job Services *********************** */

app.get("/", (req,res) => {
    res.sendFile("index.html");
})


/** **************** Configure Router *********************** */

//app.use("/", new AppRouter(JobService, express).router());

//setup port
app.listen(3000, () => {
    console.log('Listening to 3000');
})