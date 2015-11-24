var app = angular.module('swapiApp', ["ui.router"])

app.config(function($stateProvider, $urlRouterProvider){

  $urlRouterProvider.otherwise("/planets")

  $stateProvider
  .state('planets', {
    url: "/planets/:page",
    templateUrl: "partials/planets.html",
    controller: "PlanetCtrl"
  })
  .state('resident', {
    url: "/resident/:id/:page",
    templateUrl: "partials/resident.html",
    controller: "ResidentCtrl"
  })
})