define(function(require) {
  var Firebase = require("firebase");
  var $ = require("jquery");
  var Q = require("q");
  var userStorage = require("5-user-data-storage");
    
  var moviesArray = [];

  $("body").on('click', '.add-movie', function(e){
    var movieRefID = this.id;

// Check to see if the movie already exists in FB database
// get movieRef via IMDBid path in FB
    var movieRef = new Firebase('https://movie-history-djs.firebaseio.com/users/' + movieRefID);


    
// if path !== invalid
  // Ajax call to main OMDB for movie information
  var deferred = Q.defer();
    console.log("reached for info on movie:", movieRefID );
            $.ajax({ 
                type: "GET",
                dataType: "json",
                url: "http://www.omdbapi.com/?i=" + movieRefID})
            //when done do the following:
            .done(function(data) {    
              // pass the results 
              deferred.resolve(data);
  // Record results
            var title = data.Title;
            var year = data.Year;
            var actors = data.Actors;
            var imdbID = data.imdbID;
            var actorsArray = actors.split(", ");

  //Flash results to FB
        // build object to push to FB from data 
        var objectforFB = {
          'Title': title,
          'Year': year,
          'Actors': actorsArray,
          'imdbID': imdbID,
          'watched': false,
          'rating': 0
};

  var newMovieRef = new Firebase('https://movie-history-djs.firebaseio.com/users/'+userStorage.getUid());      
    newMovieRef.set(objectforFB);

        

            // if the call errors
            })
            .fail(function(xhr, status, error) {
              deferred.reject(error);
            });



    var nameRef = new Firebase('https://movie-history-djs.firebaseio.com/users/' + userStorage.getUid());

    // nameRef.child(movieRefID).set({
    //   'watched':false,
    //   'rating': 0
    //   });
 
  }); /* end of 'add' movie button eventhandler */

  return {
    showAddedMovies: function(profileID) {
      var ref = new Firebase("https://movie-history-djs.firebaseio.com");

      ref.child("users").once("value", function(snapshot) {
        var users = snapshot.val();
        console.log("users", users);

        var addedMovies = [];
        for (var key in users) {

          var userObj = users[key];         
          userObj.key = key;
          userObj.addedMovies = addedMovies;

          addedMovies.push(userObj);  
          moviesArray[moviesArray.length] = userObj;

          console.log("userObj", userObj);
          console.log("addedMovies", addedMovies);

        } /* end of for loop */ 
      }); /* end of snapshot */
    } /* end of showAddedMovies function */
  }; /* end of return */
}); /* end of define function */
