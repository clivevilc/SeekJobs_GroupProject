//Import Libraries
const { urlencoded } = require("express");
const express = require("express");
const { engine } = require("express-handlebars");

//Import required modules
const fs = require("fs");
const path = require("path");

//In-built modules (filesystem and path)
const app = express();
//require("dotenv").config();

//setup applications
const AppRouter = require("./Routers/AppRouter");
const JobService = require("./Services/JobServices");
const port = 3000;

/** **************** Configure Express *********************** */

//Setup Handlebars
app.engine("handlebars", engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Setup Express middlewares
app.use(express.static("public"));
app.use(urlencoded({ extended: false }));
app.use(express.json());

/** **************** Configure Job Services *********************** */

//Render user homepage
app.get("/", (req, res) => {
  res.render("index");
});

//Render user login page
app.get("/login", (req, res) => {
  res.render("login");
});

//Render user profile page
app.get("user/:userName", (req, res) => {
  res.render("user");
});

//Render user application status page

//Render biz login ?? Does it need to be separated with the user login?
app.get("/employerlogin", (req, res) => {
  res.render("employerLogin");
});

//Render biz add job page
app.get("/addjob", (req, res) => {
  res.render("addJob");
});

//Render biz profile
app.get("/employer/:employerName", (req, res) => {
  res.render("employerProfile");
});

//Render Error Page
app.get("*", (req, res) => {
  res.status(404);
  console.log(`Error 404`);
  res.render("error");
});

/** **************** Configure Router *********************** */

//app.use("/", new AppRouter(JobService, express).router());

//setup port
app.listen(port, () => {
  console.log(`Listening to ${port}`);
});
