app.controller('HomeController', ['$scope', '$location', 'cityService',
                function($scope, $location, cityService) {
    $scope.city = cityService.city;
    $scope.$watch('city', function() {
        cityService.city = $scope.city;
    });

    $scope.findForecast = function() {
        $location.path('/forecast')
    }
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
