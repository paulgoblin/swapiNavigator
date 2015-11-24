var app = angular.module('swapiApp');

app.controller("PlanetCtrl", ['$scope', 'PlanetsSrvc', 'ResidentSrvc', '$stateParams', function($scope, PlanetsSrvc, ResidentSrvc, $stateParams) {

  $scope.planets = PlanetsSrvc.planets[$stateParams.page];
  console.log($scope.planets)
  $scope.knownResidents = ResidentSrvc.residents;

  if (!$scope.planets){
    PlanetsSrvc.getPlanets($stateParams.page).then(response => {
      $scope.planets = PlanetsSrvc.addPlanets(response, $stateParams.page);
    }).catch(error => console.error(error.status))
  }

}]).service('PlanetsSrvc',[ '$http', function($http){

  this.planets = {};

  this.getPlanets = function(page){
    return $http.get("http://swapi.co/api/planets/?page=" + page + "&format=json")
  };

  this.addPlanets = function(response, page) {
    console.log('response ', response.data.results)
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