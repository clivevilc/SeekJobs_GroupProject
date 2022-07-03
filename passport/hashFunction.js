const bcrypt = require("bcrypt");
const saltRounds = 10;

function hashPassword(plainTextPassword) {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) {
        console.log('salt =' + salt)
        reject(err);
      }

      bcrypt.hash(plainTextPassword, salt, (err, hash) => {
        if (err) {
          reject(err);
        }
        console.log("hash = " + hash);
        resolve(hash);
      });
    });
  });
}

function checkPassword(plainTextPassword, hashedPassword) {
  return new Promise((resolve, reject) => {
    console.log("Check password function");
    bcrypt.compare(
      plainTextPassword,
      hashedPassword,
      (err, match) => {
        if (err) {
          reject(err);
        }
        console.log(match)
        resolve(match);
      }
    );
  });
}
module.exports = {
  checkPassword: checkPassword,
  hashPassword: hashPassword,
};


// checking if hash and password function work 
// const hash = "$2b$10$qCPvpFkliAuGGu0c/jgtzOipFrHLvtophfm7HICN1zhkEN/Gy1tnG"
// hashPassword("abc");
// checkPassword("abc", hash);