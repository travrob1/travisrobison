"use strict";
/*global angular, navigator, localStorage */

var app = angular.module("app", ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.otherwise({
        redirectTo: "/",
        templateUrl: "scripts/home/home.html",
        controller: 'homeCtrl'
    });
}]);

app.run(function ($rootScope, $timeout) {
    var isMobile = /iPhone|iPod|Android/i.test(navigator.userAgent);

    if (isMobile && !localStorage.getItem('seenMobileMessage')) {
        $rootScope.onMobileDevice = true;
        localStorage.setItem("seenMobileMessage", true);

        $timeout(function () {
            $rootScope.slideWarning = true;
        }, 5000);
        $timeout(function () {
            $rootScope.onMobileDevice = false;
        }, 6500);
    }
});
//# sourceMappingURL=app.js.map
