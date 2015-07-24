var app = angular.module('forcast', ['ngRoute', 'ngResource']);

app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'pages/home.html',
            controller: 'homeController'
        })
        .when('/forecast', {
            templateUrl: 'pages/forecast.html',
            controller: 'forecastController'
        });
});

app.service('cityService', function() {
    this.city = 'Grand Haven, MI';
});

app.controller('homeController', ['$scope', 'cityService', function($scope, cityService) {
    $scope.city = cityService.city;
    $scope.watch('city', function() {
        cityService.city = $scope.city;
    });
}]);

app.controller('forecastController', ['$scope', 'cityService', function($scope) {
    $scope.city = cityService.city;
}]);
