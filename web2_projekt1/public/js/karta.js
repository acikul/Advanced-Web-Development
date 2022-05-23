var mymap = L.map('map').setView([45.8150, 15.9819], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 18
}).addTo(mymap);

var markerLayerGroup
var last5 = []
getLast5Users();


function myLocator(params) {
    function success(position) {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;

        // console.log(`lat: ${lat} long: ${long}`)
        document.getElementById('coors').innerHTML = `Coordinates: ${lat}, ${long}`
        addSingleMarker(lat, long)
        getLast5Users()
    }

    function error() {
        alert('Error during geolocating :/')
    }

    if(!navigator.geolocation) {
        alert('Your browser sadly does not support geolocating :(')
    } else {
        navigator.geolocation.getCurrentPosition(success, error)
    }
}

function addSingleMarker(lat, long) {
    var userInfo = fetch('/locatedUser', {method:'post', headers:{'Content-type': 'application/json', 'Accept': 'application/json'}, body: JSON.stringify({lat: lat, long: long})})
                    .then(res => res.json()).then(res => {
                        var date = new Date(res.time).toLocaleDateString("de-DE")
                        var time = new Date(res.time).toLocaleTimeString("de-DE")
                        //L.marker([lat, long]).bindPopup(`${res.name} logged in at: ${date} ${time}`).addTo(mymap)
                    })
}

function getLast5Users() {
    var fetchLast5 = fetch('/last5', {method:'get', headers:{'Accept': 'application/json'}})
                .then(res => res.json()).then(res => {
                    last5 = res
                    if (markerLayerGroup) {
                        markerLayerGroup.clearLayers()
                    }
                    markerDrawer(last5)
                })
}

function markerDrawer(last5) {
    var markers = []

    last5.forEach(element => {
        var date = new Date(element.time).toLocaleDateString("de-DE")
        var time = new Date(element.time).toLocaleTimeString("de-DE")
        var tempMarker = new L.marker([element.lat, element.long]).bindPopup(`${element.name} logged in at ${date} ${time}`)
        markers.push(tempMarker)
    });
    markerLayerGroup = L.featureGroup(markers);
    if (markers.length > 0) {
        markerLayerGroup.addTo(mymap)
        mymap.fitBounds(markerLayerGroup.getBounds().pad(0.5))
    }
}