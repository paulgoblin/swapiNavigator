'use strict'

angular.module('swapiApp')
.service('ScrapeSrvc',[ '$http', function($http){

  this.getResidentPhoto = function() {
    $http({
        method: "GET",
        url: 'http://starwars.wikia.com/wiki/Hoth',
        dataType: 'jsonp'
      })
      .then(function(resp){
        console.log("starwarsWikiHTML",resp);
      }, errorHandler)
  };


  var errorHandler = (error) => console.log(error);

}])
