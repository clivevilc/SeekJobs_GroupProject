const development = require("../db/knexfile").development;
const hashFunction = require("./hashFunction");
const knex = require("knex")(development);
const TABLE_NAME = "credentials";
const LocalStrategy = require("passport-local").Strategy;
module.exports = new LocalStrategy(async (username, password, done) => {
  console.log("signing up");
  console.log("Email", username);
  console.log("Password", password);

  try {
    // get the user
    let users = await knex(TABLE_NAME).where({
      username: username,
    });
    // if there is a user
    if (users.length > 0) {
      // return false - user already exists
      return done(null, false, {
        message: "user already exists",
      });
    }
    // otherwise, hash their password
    let hashedPassword = await hashFunction.hashPassword(password);
    // get the new user
    const newUser = {
      username: username,
      hash: hashedPassword,
    };
    //insert the new user, get the id
    let userId = await knex(TABLE_NAME).insert(newUser).returning("id");
    // assign that id to the user
    newUser.id = userId[0];
    console.log("New user: ", newUser);
    // done - pass back the user object
    done(null, newUser);
  } catch (error) {
    console.log(error);
  }
});
