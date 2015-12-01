define(function(require) {
  var Firebase = require("firebase");
  //handlebars templates
  var templates = require("3-loadtemplates");
  var userStorage = require("5-user-data-storage");
  var populateNewUserView = require("populateNewUserView");
  var moviesFB = require("movies-to-FB");

  var ref = new Firebase("https://movie-history-djs.firebaseio.com");

  return {
    register: function (event) {
  //get a reference to our Firebase app
  //create new user/account when register account button is clicked
      ref.createUser({
        email    : $("#email").val(),
        password : $("#password").val()
      }, function(error, userData) {
        if (error) {
          console.log("Error creating user:", error);
        } else {
          userStorage.setUid(userData);
          console.log("Successfully created user account with uid:", userData.uid);
          console.log("Successfully created user account:", userData);
          moviesFB.showAddedMovies(userData.uid); 
          // *** go to new user view ***//
          populateNewUserView.popNewUserView();
        }
      });
    }
  };
});