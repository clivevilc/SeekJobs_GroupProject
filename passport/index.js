/**********************************************
 * Passport Configuration
 ***********************************************/

const passport = require("passport");

const loginStrategy = require("./loginStrategy");
const signupStrategy = require("./signupStrategy");
const serializeUser = require("./serializeDeserialize")
  .serializeUser;
const deserializeUser = require("./serializeDeserialize")
  .deserializeUser;

passport.use("local-login", loginStrategy);
passport.use("local-signup", signupStrategy);
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);
module.exports = passport;
