var app = angular.module('forcast', ['ngRoute', 'ngResource']);

app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'pages/home.html',
            controller: 'HomeController'
        })
        .when('/forecast', {
            templateUrl: 'pages/forecast.html',
            controller: 'ForecastController'
        })
        .when('/forecast/:days', {
            templateUrl: 'pages/forecast.html',
            controller: 'ForecastController'
        });
});

app.service('cityService', function() {
    this.city = 'Grand Haven, MI';
});

app.controller('HomeController', ['$scope', '$resource', 'cityService',
                function($scope, $resource, cityService) {
    $scope.city = cityService.city;
    $scope.$watch('city', function() {
        cityService.city = $scope.city;
    });
}]);

app.controller('ForecastController', ['$scope', '$resource', '$routeParams', 'cityService',
                function($scope, $resource, $routeParams, cityService) {
    $scope.city = cityService.city;
    $scope.days = $routeParams.days || 5;
    var url = 'http://api.openweathermap.org/data/2.5/forecast/daily';
    $scope.weatherApi = $resource(
        url,
        { callback: 'JSON_CALLBACK' },
        { get: { method: 'JSONP' } }
    );

    $scope.results = $scope.weatherApi.get({
        q: $scope.city,
        cnt: $scope.days
    });

    $scope.convertToFahrenheit = function(degreesInKelvin) {
        return Math.round((1.8 * (degreesInKelvin - 273)) + 32);
    };

    $scope.formatDate = function(dateTime) {
        return new Date(dateTime * 1000);
    };
}]);

app.directive('weatherReport', function() {
    return {
        restrict: 'E',
        templateUrl: 'directives/weatherReport.html',
        replace: true,
        scope: {
            weatherDay: '=',
            convertTemperature: '&',
            convertDate: '&',
            dateFormat: '@'
        }
    }
});
