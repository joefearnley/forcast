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
