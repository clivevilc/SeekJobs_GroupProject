//user queries that could link 
const development = require("./knexfile").development;
const knex = require("knex")(development);
const hashFunction = require("../passport/hashFunction")
const TABLE_NAME = "credentials"

function getByID(id) {
    return knex(TABLE_NAME).select("id").where("id", id);
}

function verify(username, password) {
    getByUsername(username)
      .then((user) => {
        return user;
      })
      .then((user) => {
        let getUser = user[0];
        return hashFunction.checkPassword(password, getUser.hash);
      })
      .then((auth) => {
        console.log("Authorized", auth);
        return auth;
      })
      .then((auth) => {
        if (auth === true) {
          console.log("verified");
          return getByUsername(username);
        } else {
          console.log("not verified");
          return false;
        }
      })
      .then((user) => {
        console.log(user);
        return user[0];
      })
      .catch((error) => {
        console.log("error", error);
      });
}
  
module.exports = {
    verify: verify,
    getByID: getByID,
}