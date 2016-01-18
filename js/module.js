'use strict'

angular.module('swapiApp', ["ui.router"])

.config(function($stateProvider, $urlRouterProvider){

  $urlRouterProvider.otherwise("/planets/1")

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
