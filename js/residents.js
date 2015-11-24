var app = angular.module('swapiApp');

app.controller("ResidentCtrl", ['$scope', '$http', '$stateParams', function($scope, $http, $stateParams) {
  $http.get("http://swapi.co/api/people/" + $stateParams.id + "/?format=json").then(resp => {
    $scope.character = resp.data;
  });
}])