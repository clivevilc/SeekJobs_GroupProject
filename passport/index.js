/**********************************************
 * Passport Configuration
 * ==================================
 *
 * 1. Authentication Strategy
 *      passport.use(new LocalStrategy)
 *      verify callback
 *          - Strategies require verify callback ->
 *          find the user that possesses a set of
 *          credentials
 *      - when passport authenticates a request, it parses
 *      the credentials contained in the request
 *
 *
 * 2. Application Middleware
 *      -
 *
 * 3. Sessions -> essentially checks for that user using the serialize and deserialize user function
 *      - if authentication succeeds, a session will be
 *      established and maintained via the cookie in the
 *      browser
 *      - serialize and deserialize user
 *
 ***********************************************/

const passport = require("passport");

const loginStrategy = require("./loginStrategy.js");
// const signupStrategy = require("./signupStrategy.js");
const serializeUser = require("./serializeDeserialize")
  .serializeUser;
const deserializeUser = require("./serializeDeserialize")
  .deserializeUser;

passport.use("local-login", loginStrategy);
// passport.use("local-signup", signupStrategy);
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);
module.exports = passport;
