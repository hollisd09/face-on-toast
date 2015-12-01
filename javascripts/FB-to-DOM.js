define(function(require) {
    var $ = require("jquery");
    var Firebase = require("firebase");
    var Q = require("q");

  //handlebars templates
    var templates = require("3-loadtemplates");
    var userStorage = require("5-user-data-storage");
	  var importArray = [];

	return {
  
	    fbToDOM: function(fn) { 
	        //set up a few variables
            //sets up deferred object for promise

            var userRef = new Firebase('https://movie-history-djs.firebaseio.com/users' + userStorage.getUid());
			// Attach an asynchronous callback to read the data at our posts reference

			userRef.once("value", function(snapshot) {
				var importedData = snapshot.val();
			
				console.log("imported Data", importedData );
				//
				//WHAT DOES THIS DO? - JP
				//		|
				//		V
				var movieRefs = [];
				for (var key in importedData) {
			      var datawithID = importedData[key];
			      console.log("data with id", datawithID);
			      datawithID.key = key;

			      datawithID.movieRefs=movieRefs;
			      importArray[importArray.length] = datawithID;
				}
				//????????
			//objectForTemplate is an empty array - JP
			  var objectForTemplate = {movieImg: importArray};

			  	importArray = [];
			  $("#view-user-home").html(templates.userhome(objectForTemplate));
			  $("#view-user-home").show();
			  $("#view-find-movie").hide();
			  $("#view user-watched").hide();
			  $("#view-user-unwatched").hide();
			  $("#view-search-my-movie").hide();
			  $("#view-find-search-results").hide();
			  console.log("objectForTemplate" ,objectForTemplate);
			 //objectForTemplate is STILL an empty array - JP


			}, function (errorObject) {
			  console.log("The read failed: " + errorObject.code);
			});
	    }
	};
});