define(function(require) {
var $ = require("jquery");
var Q = require("q");
var templates = require("3-loadtemplates");

	return {
		popup: function(e){
            var movieRef = new Firebase('https://movie-history-djs.firebaseio.com/movies/' + e);
		movieRef.on("value", function(snapshot) {
		 var dataForTemplate = snapshot.val();

		  $(".modal-body").html(templates.infomodal(dataForTemplate));
		}), function (errorObject) {

		};
	}
};
});