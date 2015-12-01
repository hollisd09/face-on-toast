define(function(require) {
  var Firebase = require("firebase");
  //handlebars templates
  var templates = require("3-loadtemplates");
  var userStorage = require("5-user-data-storage");
  var populateUserHomeView = require("populateUserHomeView");
  var moviesFB = require("movies-to-FB");

  //get a reference to our Firebase app
  var ref = new Firebase("https://movie-history-djs.firebaseio.com");

  //log in user that is already registered
  return {
    login: function (event) {
      ref.authWithPassword({
        email    : $("#email").val(),
        password : $("#password").val()
      }, function(error, authData) {
        if (error) {
          console.log("Login Failed!", error);
        } else {
          userStorage.setUid(authData);
          console.log("Authenticated successfully with payload:", authData);
          console.log("Authenticated successfully with payload:", authData.uid);
          //need to pass ID info to new function to populate the Dom.
          moviesFB.showAddedMovies(authData.uid); 
          // *** go to user home view ***//
          populateUserHomeView.popUserHomeView();
        }
      });
    }
  };
});