app.service('cityService', function() {
    this.city = 'Norton Shores, MI';
});

app.service('locationService', function() {

    this.city = null;

    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
            console.log(position.coords.latitude);
            console.log(position.coords.longitude);
            this.city = position.coords.latitude + ', ' + position.coords.longitude;
        });
    }
});
