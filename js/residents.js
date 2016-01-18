'use strict'

var app = angular.module('swapiApp');

app.controller("ResidentCtrl", ['$scope', '$timeout', '$stateParams', 'ResidentSrvc', function($scope, $timeout, $stateParams, ResidentSrvc) {

  $scope.startLoadIframe = false;
  $scope.loaded = function () {
    console.log("LOADED!");
  }
  $scope.prevPage = $stateParams.page;
  $scope.character = ResidentSrvc.residents[$stateParams.id] ||
    ResidentSrvc.getResident($stateParams.id).then(resp => {
      $scope.character = ResidentSrvc.addResident(resp.data, $stateParams);
    });

  $scope.startLoadIframe = true;
  $timeout(function(){
    var iframe = document.getElementById("residentIframe");
    console.log("got iframe", iframe, iframe.contentDocument || iframe.contentWindow.document);
    console.log('all frames',window.frames[0].document.body.innerHTML);
  },200)

}])
app.service('ResidentSrvc', ['$http', function($http){
  this.residents = {};
  this.getResident = function(key){
    return $http.get("http://swapi.co/api/people/" + key + "/?format=json")
  }
  this.addResident = function(data, params) {
    this.residents[params.id] = data;
    return data
  }

}])
