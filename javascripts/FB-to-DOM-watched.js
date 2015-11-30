define(function(require) {
    var $ = require("jquery");
    var Firebase = require("firebase");
    var Q = require("q");

  //handlebars templates
    var templates = require("3-loadtemplates");
    var userStorage = require("5-user-data-storage");
    var movieArray = [];

  return {
  
      fbToDOMwatched: function(fn) { 
          console.log("fbToDOMwatched function fired.");
          //set up a few variables
            var userRef = new Firebase('https://faceontoast.firebaseio.com/users/' + userStorage.getUid());
      // Attach an asynchronous callback to read the data at our posts reference
      userRef.once("value", function(snapshot) {
        var allMovieData = snapshot.val();
        console.log("allMovieData", allMovieData);
        var allMovieRefs = [];
        for (var key in allMovieData) {
          var moviewithID = allMovieData[key];
          moviewithID.key = key;
          console.log("key", key);
          moviewithID.allMovieRefs = allMovieRefs;
          movieArray[movieArray.length] = moviewithID; 
        }
        var movieForTemplate = {movieArray};
        console.log("movieForTemplate", movieForTemplate);
        movieArray = [];

        $("#view-user-watched").html(templates.userwatched(movieForTemplate));
          $("#view-user-watched").show();
          $("#view-new-user").hide();
          $("#view-user-home").hide();
          $("#view-find-movie").hide();
          $("#view-user-unwatched").hide();
          $("#view-search-my-movie").hide();
          $("#view-find-search-results").hide();


      }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      });
      }
  };
});