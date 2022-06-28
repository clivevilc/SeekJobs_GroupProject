require("dotenv").config();

//Import Libraries
const { urlencoded } = require("express");
const express = require("express");
const { engine } = require("express-handlebars");

//Import required modules
const fs = require("fs");
const path = require("path");
const passport = require("passport")
const bcrypt = require("bcrypt")

//In-built modules (filesystem and path)
const app = express();
const config = require("./config.json").development; 

// Set up pg connection with knex
const knexConfig = require("./db/knexfile").development;
const knex = require("knex")(knexConfig)

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

//Setup Auth (***** To Be Done *******)
const hashFunctions = require("./bcrypt"); // watch Bibek video
const LocalStrategy = require("passport-local").Strategy; // Get strategy parse out of passport
const expressSession = require("express-session");

app.use(
    // Creating a new session generates a new session id, stores that in a session cookie, and
    expressSession({
      secret: "secret",
      // save the user
      // if false, will not save session to browser
      resave: true,
      // if saveUninitialized is false, session object will not be stored in sesion store
      saveUninitialized: true,
    })
  );

// Setup Local Login (***** To Be Done *******)
app.use(passport.initialize());
app.use(passport.session());

passport.use(
    "local-login",
    new LocalStrategy(async (email, password, done) => {
      try {
        let users = await knex("users").where({ email: email });
        if (users.length === 0) {
          return done(null, false, { message: `incorrect user` });
        }
        let user = users[0];
        let result = await hashFunctions.checkPassword(password, user.password);
        if (result) {
          console.log(`Login Succesfully`);
          return done(null, user);
        } else {
          console.log(`Incorrect PW/User name`);
          return done(null, false, { message: `incorrect username / password` });
        }
      } catch (err) {
        if (err) {
          done(err);
        }
      }
    })
  );


/** **************** Configure Job Services *********************** */

//Render user homepage
app.get("/", (req, res) => {
  res.render("index");
});

//Render user login page
app.get("/login", (req, res) => {
  res.render("login");
});

//Render user profile page (***** To Be Done *******)

// app.get("user/:userName", (req, res) => {
//   res.render("user");
// });

app.get("/user", (req, res) => {
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
  res.render("error");
});

/** **************** Configure Router *********************** */

//app.use("/", new AppRouter(JobService, express).router());

//setup port

app.listen(config, () => {
  console.log(`Listening to ${config.port}`);
});
