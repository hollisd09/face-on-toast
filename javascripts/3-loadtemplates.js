define(function(require){

  return {
    login: require("hbs!../templates/template-login"),
    newuser: require("hbs!../templates/template-newuser"),
    userhome: require("hbs!../templates/template-userhome"),

    //filter options 
    searchresults: require("hbs!../templates/template-searchresults"), 
    filteringresults: require("hbs!../templates/template-filteringresults"),
    //userallmovies: require("hbs!../templates/template-allmovies"),
    userunwatched: require("hbs!../templates/template-userunwatched"),
    userwatched: require("hbs!../templates/template-userwatched"),
    //userfavorites: require("hbs!../templates/templates-favorites")
    infomodal : require("hbs!../templates/template-infomodal"),
    //Delete these 
    findmovie: require("hbs!../templates/template-findmovie"),
    searchmymovie: require("hbs!../templates/template-searchmymovie")
  };

});