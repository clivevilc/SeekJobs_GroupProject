// Encrypt and decrypt the user data and verify that the information


const userQueries = require("../db/userAuthQueries");
// passport generates token and puts it in a cookie, then sends it to user browser
function serializeUser(user, done) {
  console.log(
    "Serialize: Passport generates token, puts it in cookie and sends to browser:",
    user
  );

  return done(null, user);
}

// with every request, cookie will be sent back to server. server will take the token, pass it into this function, and turn it into a user
function deserializeUser(id, done) {
  console.log(id, "<<< from serialise ");
  console.log(
    "Deserialize: server will take token from your browser, and run this function to check if user exists"
  );
  userQueries
    .getById(id.id)
    .then((users) => {
      if (users.length === 0) {
        return done(null, false);
      }
      done(null, users[0]);
    })
    .catch((err) => {
      console.log("DESERIALSE FAIL");
      done(err, false);
    });
}
module.exports = {
  serializeUser: serializeUser,
  deserializeUser: deserializeUser,
};
