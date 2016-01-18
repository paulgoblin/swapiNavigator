'use strict'

var app = angular.module('swapiApp')

app.directive('loadingIcon', function() {
  return {
    restrict: "EA",
    template:"<div class='loadingWrapper'><h2>{{loadingMessage}}</h2></div>",
    scope: {
      loadingMessage: "@"
    }
  }
});
