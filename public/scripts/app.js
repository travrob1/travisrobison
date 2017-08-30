"use strict"
/*global angular */
var app = angular.module("app", ['ngRoute']);

app.config(['$routeProvider', function($routeProvider){
  $routeProvider
    .otherwise({
      redirectTo: "/",
      templateUrl: "scripts/home/home.html",
      controller: 'homeCtrl'
    });
}]);
