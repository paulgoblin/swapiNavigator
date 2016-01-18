'use strict'

angular.module('swapiApp')

.controller("PlanetCtrl", ['$scope', 'PlanetsSrvc', 'ResidentSrvc', '$stateParams', function($scope, PlanetsSrvc, ResidentSrvc, $stateParams) {

  $scope.pages = [1,2,3,4,5,6,7];
  $scope.activePage = Number($stateParams.page);
  $scope.planets = PlanetsSrvc.planets[$scope.activePage];
  $scope.nextPage = Math.min($scope.activePage + 1, $scope.pages.slice(-1));
  $scope.knownResidents = ResidentSrvc.residents;

  if (!$scope.planets){
    PlanetsSrvc.getPlanets($scope.activePage).then(response => {
      console.log('response', response)
      $scope.planets = PlanetsSrvc.addPlanets(response, $scope.activePage);
    }).catch(error => console.error(error.status))
  }

}])

.service('PlanetsSrvc',[ '$http', function($http){

  this.planets = {};

  this.getPlanets = function(page){
    return $http.get("http://swapi.co/api/planets/?page=" + page + "&format=json")
  };

  this.addPlanets = function(response, page) {
    this.planets[page] = response.data.results.map(planet => {
      planet.residents = planet.residents.map(resident => {
        var resident = { url: resident };
        resident.id = resident.url.match(/\d+/)[0];
        return resident;
      });
      return planet;
    });
    return this.planets[page]
  };
}])
