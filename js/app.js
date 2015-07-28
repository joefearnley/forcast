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

app.controller('homeController', ['$scope', '$resource', 'cityService',
                function($scope, $resource, cityService) {
    $scope.city = cityService.city;
    $scope.$watch('city', function() {
        cityService.city = $scope.city;
    });
}]);

app.controller('forecastController', ['$scope', '$resource', 'cityService',
                function($scope, $resource, cityService) {
    $scope.city = cityService.city;
    var url = 'http://api.openweather.org/data/2.5/forecast/daily';
    $scope.weatherApi = $resource(
        url,
        { callback: 'JSON_CALLBACK' },
        { get: { method: 'JSONP' } }
    );

    $scope.result = $scope.weatherApi.get({
        q: $scope.city,
        cnt: 5
    });

    $scope.convertToFahrenheit = function(degreesInKalvin) {
        return Math.round((1.8 * (degreesInKalvin - 273)) + 32);
    };
}]);
