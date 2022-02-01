/* eslint-disable no-console */
function getCountDownTimer(launchDate) {
  // Set the date we're counting down to
  const countDownDate = new Date(launchDate).getTime();
  // Update the count down every 1 second
  // LANZA LA FUNCION CADA CIERTO TIEMPO, devuelve un ID de proceso
  const x = setInterval(() => {
    // Get today's date and time
    const now = new Date().getTime();

    // Find the distance between now and the count down date
    const distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Output the result in an element with id="countdown-upcoming"
    document.getElementById('countdown-upcoming').innerHTML = `${days}days ${hours}hours ${minutes}minutes ${seconds}seconds `;

    // If the count down is over, write some text
    if (distance < 0) {
      clearInterval(x);
      document.getElementById('countdown-upcoming').innerHTML = 'EXPIRED';
    }
  }, 1000);
}

function printLaunch(result, selector) {
  const title = document.querySelector(`#title${selector}`);
  title.textContent = `${result.name}`;

  const img = document.querySelector(`#img${selector}`);
  let imgUrl = `${result.links.patch.small}`;

  if (imgUrl === 'null' || imgUrl == null) {
    imgUrl = 'img/astronauta.png';
    img.setAttribute('width', '60%');
  }

  img.setAttribute('src', imgUrl);

  const date = document.querySelector(`#date${selector}`);
  date.textContent = `${result.date_local}`;

  const moreInfo = document.querySelector(`#more${selector}`);
  moreInfo.setAttribute('href', `launch.html?id=${result.id}`);

  if (selector === '-upcoming') {
    getCountDownTimer(result.date_local);
  }
}

function getApiData(api, selector) {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  fetch(api, requestOptions)
    .then((response) => response.json())
    .then((result) => printLaunch(result, selector))
    .catch((error) => console.log('error', error));
}

function createElement(launch, count) {
  const div = document.createElement('div');
  // el método setAttribute, que toma dos parametros, primero el nombre de la propiedad a setear y el valor
  div.setAttribute('id', `card-${count}`);
  div.setAttribute('class', 'col-sm-6');
  div.style.display = 'inline-block';

  const link = document.createElement('a');
  link.setAttribute('id', `link-${count}`);
  link.setAttribute('class', 'badge badge-secondary');
  link.setAttribute('href', `launch.html?id=${launch.id}`);
  div.appendChild(link);

  const launchNumber = parseInt(count, 10) + 1;

  const paragraph = document.createElement('p');
  paragraph.setAttribute('id', `item-${count}`);
  paragraph.textContent = `${launchNumber}. ${launch.name}`;
  link.appendChild(paragraph);

  // No va a retornar nada para que deje el espacio

  // return div;
}

function printPastLaunchesList(result) {
  const launchesDiv = document.querySelector('#past-launches');
  Object.keys(result).forEach((k) => launchesDiv.appendChild(createElement(result[k], k)));
}

function getPastLaunches(api) {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  fetch(api, requestOptions)
    .then((response) => response.json())
    .then((result) => printPastLaunchesList(result))
    .catch((error) => console.log('error', error));
}
// forma de llamar a la API 

const apiBaseUrl = 'https://api.spacexdata.com/v4/';

const upcomingApi = `${apiBaseUrl}launches/next`;
const upcomingSelector = '-upcoming';

const latestApi = `${apiBaseUrl}launches/latest`;
const latestSelector = '-latest';

const pastLaunchesApi = `${apiBaseUrl}launches/past`;

getApiData(upcomingApi, upcomingSelector);
getApiData(latestApi, latestSelector);

getPastLaunches(pastLaunchesApi);

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
