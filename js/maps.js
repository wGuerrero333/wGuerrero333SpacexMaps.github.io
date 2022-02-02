// Esto lo copie de https://leafletjs.com/examples/quick-start/
// Crea las coordenadas que mosotrara el mapa
var map = L.map('map').setView([51.505, -0.09], 13);
// este codigo L. tileLayer lo baje de la pagina y reemplaze el tokken
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoid2d1ZXJyZXJvYzMzMyIsImEiOiJja3oyeTZmNWEwMWdjMm9waHd2OW9zZTN4In0.qWCIWCVLpEDK41qtXjGrew', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'your.mapbox.access.token'
}).addTo(map);

// se añade marker (marcador)
var marker = L.marker([51.5, -0.09]).addTo(map);
// Un circulo
var circle = L.circle([51.508, -0.11], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
}).addTo(map);
// Un poligono se agrega
var polygon = L.polygon([
    [51.509, -0.08],
    [51.503, -0.06],
    [51.51, -0.047]
]).addTo(map);

// Añade marcadores que se ven onclick

marker.bindPopup("<b>Hello world!</b><br>I am a popup You clicked ME.").openPopup();
circle.bindPopup("I am a circle You clicked ME.");
polygon.bindPopup("I am a polygon you cliked ME.");

var popup = L.popup()
    .setLatLng([51.513, -0.09])
    .setContent("I am a standalone popup I disappear when another pop-up is clicked.")
    .openOn(map);
// Muestra el punto exacto que se clickea
    // function onMapClick(e) {
    //     alert("You clicked the map at " + e.latlng);
    // }
    
    // map.on('click', onMapClick);

    var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}

map.on('click', onMapClick);