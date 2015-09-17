var Firebase = require('firebase');
var myDataRef = new Firebase('https://donkey.firebaseio.com/');

// register callback to be fired every time auth state changes
myDataRef.onAuth(authDataCallback);

// Create New Users
module.exports.createUser = function(user){
  myDataRef.createUser({
    "email": user.email,
    "password": user.password
  }, function(error, userData) {
    if (error) {
      console.log("Error creating user:", error);
    } else {
      console.log("Successfully created user account with uid:", userData.uid);
    }
  });
};

// Log user in
module.exports.login = function(user){
  myDataRef.authWithPassword({
    "email": user.email,
    "password": user.password
  }, function(error, authData) {
    if (error) {
      console.log("Login Failed!", error);
    } else {
      console.log("Authenticated successfully with payload:", authData);
    }
  });
};

// TODO: Reset password
module.exports.resetPassword = function(user){
  myDataRef.resetPassword({
    email : user.email
  }, function(error) {
    if (error === null) {
      console.log("Password reset email sent successfully");
    } else {
      console.log("Error sending password reset email:", error);
    }
  });
}

// callback to log current auth state
function authDataCallback(authData) {
  if (authData) {
    console.log("User " + authData.uid + " is logged in with " + authData.provider);
  } else {
    console.log("User is logged out");
  }
};

