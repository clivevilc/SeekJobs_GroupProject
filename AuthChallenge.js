const AuthChallenger = (users) => {
    // This will return True or False
    return (username, password) => {
      // This is the password and username that we receive when prompted by our HTML file.
      return (
        typeof users[username] !== "undefined" && users[username] === password
      ); // Logic to see if we can match the username given to a username stored in our JSON file, and if the password matches
    };
  };
  // This code exports the function we hae just defined.
  module.exports = AuthChallenger;