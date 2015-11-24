var app = angular.module('swapiApp');

app.controller("PlanetCtrl", ['$scope', 'PlanetsSrvc', function($scope, PlanetsSrvc) {

  $scope.planets = PlanetsSrvc.planets;
  console.log($scope.planets.length)

  if ($scope.planets.length === 0){
    PlanetsSrvc.getPlanets.then(response => {
      PlanetsSrvc.addPlanets(response);
      $scope.planets = PlanetsSrvc.planets;

    }).catch(error => console.error(error.status))
  }

}]).service('PlanetsSrvc',[ '$http', function($http){

  this.planets = [];
  this.getPlanets = $http.get("http://swapi.co/api/planets/?format=json")

  this.addPlanets = function(response) {
    console.log('response ', response)
    this.planets = response.data.results.map(planet => {
      planet.residents = planet.residents.map(resident => {
        var resident = { url: resident };
        resident.id = resident.url.match(/\d+/)[0];
        return resident;
      });
      return planet;
    });
  }





}])