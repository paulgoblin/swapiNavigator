var app = angular.module('swapiApp');

app.controller("ResidentCtrl", ['$scope', '$stateParams', 'ResidentSrvc', function($scope, $stateParams, ResidentSrvc) {

  $scope.character = ResidentSrvc.residents[$stateParams.id] ||
    ResidentSrvc.getResident($stateParams.id).then(resp => {
      $scope.character = ResidentSrvc.addResident(resp.data, $stateParams.id);
    });

}]).service('ResidentSrvc', ['$http', function($http){
  this.residents = {};
  this.getResident = function(key){
    return $http.get("http://swapi.co/api/people/" + key + "/?format=json")
  }
  this.addResident = function(data, key) {
    this.residents[key] = data;
    return data
  }

}])
