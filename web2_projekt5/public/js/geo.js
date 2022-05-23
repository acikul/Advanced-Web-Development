function myLocator(params) {
    function success(position) {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;

        let latitude = document.getElementById('lat')
        latitude.value = lat

        let longitude = document.getElementById('long')
        longitude.value = long
    }

    function error() {
        alert('Error during geolocating :/')
    }

    if(!navigator.geolocation) {
        let latitude = document.getElementById('lat')
        latitude.disabled = false

        let longitude = document.getElementById('long')
        longitude.disabled = false

        alert('Your browser does not support geolocating. Enter coordinates manually!')
    } else {
        navigator.geolocation.getCurrentPosition(success, error)
    }
}