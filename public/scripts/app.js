"use strict"
/*global angular */
var app = angular.module("app", ['ngRoute']);

app.config(['$routeProvider', function($routeProvider){
  $routeProvider
    .otherwise({
      redirectTo: "/",
      templateUrl: "../views/home.html",
      controller: 'homeCtrl'
    });
}]);
