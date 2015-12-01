define(function(require) {
  var $ = require("jquery");
  var Firebase = require("firebase");

  var userStorage = require("5-user-data-storage");
  var popUnwatched = require("populateUserUnwatched");
  //load handlebars template
  var templates = require("3-loadtemplates");

  return {
    filterUnwatched: function (e) {
      console.log("I run");
      console.log("things");

      $.ajax({ 
            type: "GET",
            dataType: "json",
            url: "https://movie-history-djs.firebaseio.com/"})
      
      
      // var movie = $(this).parent('.movie');
      // post('/movie/' + $(this).data('id') + '/unwatched', function(data){
      //   movie.fadeOut();
      // });
      popUnwatched.popUnwatched();  
    }
  };
});

