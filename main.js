let map = L.map('map').setView([60.454628, 22.303445], 17); //defines the map itself

//defines the map tiles
var tiles = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1
}).addTo(map);

//defines the geoJson network
//const geoJson = {"type":"FeatureCollection","features":[{"type":"Feature","properties":{"from":null,"to":null},"geometry":{"type":"LineString","coordinates":[[0.6536865234375,41.08349176750823],[1.37623149434356,41.30048214747542],[1.9720458984375,41.45507852101139]]}},{"type":"Feature","properties":{"from":null,"to":null},"geometry":{"type":"LineString","coordinates":[[1.9720458984375,41.45507852101139],[2.2191122299068,41.6143803312206],[2.79052734375,41.95949009892467]]}},{"type":"Feature","properties":{"from":null,"to":null},"geometry":{"type":"LineString","coordinates":[[2.79052734375,41.95949009892467],[2.24749,42.391009],[1.4666748046875,43.58834891179792]]}},{"type":"Feature","properties":{"from":null,"to":null},"geometry":{"type":"LineString","coordinates":[[-1.4227294921875,43.4728541377797],[0.846173,43.644026],[1.4666748046875,43.58834891179792]]}},{"type":"Feature","properties":{"from":null,"to":null},"geometry":{"type":"LineString","coordinates":[[-1.680908203125,42.78733853171998],[-1.54506830401797,43.24899209361125],[-1.4227294921875,43.4728541377797]]}},{"type":"Feature","properties":{"from":null,"to":null},"geometry":{"type":"LineString","coordinates":[[-1.680908203125,42.78733853171998],[-1.35135966534602,42.41578081826369],[-0.8624267578125,41.66470503009207]]}},{"type":"Feature","properties":{"from":null,"to":null},"geometry":{"type":"LineString","coordinates":[[-0.8624267578125,41.66470503009207],[0.967372,41.983994],[2.197265625,42.12267315117256],[2.79052734375,41.95949009892467]]}},{"type":"Feature","properties":{"from":null,"to":null},"geometry":{"type":"LineString","coordinates":[[0.6536865234375,41.08349176750823],[0.92897520811315,41.65830682862052],[2.11212158203125,41.94927724511655],[2.79052734375,41.95949009892467]]}},{"type":"Feature","properties":{"from":null,"to":null},"geometry":{"type":"LineString","coordinates":[[-0.8624267578125,41.66470503009207],[0.027887,41.265421],[0.6536865234375,41.08349176750823]]}}]};

//defines possible labels
map.createPane('labels');
map.getPane('labels').style.zIndex = 650;
map.getPane('labels').style.pointerEvents = 'none';

//adds the GeoJson road network to map
L.geoJson(digitie, {
    style: {
      color: '#7d7d7d',
      opacity: 0.3,
      weight: 4,
    }
  }).addTo(map);

//Defines the markers for the dog parks.
var DogIcon = L.icon({
    iconUrl: 'Icons/DogPark_1.png',
    shadowUrl: '',
    iconSize:     [28, 55], // size of the icon
    //shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [13, 55], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [0, -50] // point from which the popup should open relative to the iconAnchor
});

//creates static start and end points NOTE: MUST BE LOCATED ON THE ROAD NETWORK  
const start = [60.44553515006385, 22.28680595755577];
const end = [60.445262610622706, 22.286767065525055];

//Adds the start and end nodes to the map !TODO: Fix the broken marker image. 
L.marker(start, {icon:DogIcon}).addTo(map);
L.marker(end, {icon:DogIcon}).addTo(map);

//Creates a constant for the GeoJson pathfinding variable
const pathFinder = new geojsonPathFinder(digitie);

//Searches the shorte route
const bestPath = pathFinder.findPath({
    geometry: {
        coordinates: [start[1], start[0]]
    }
}, 
{
    geometry: {
        coordinates: [end[1], end[0]]
    }
});

console.log(Array.isArray(bestPath)) //checks if the bestPath constant is an array. Should be false

console.log(bestPath)

let bestPathArray = Object.values(bestPath); //transforms the bestPath constant to an array for the forEach method.

console.log(bestPath); //logs the bestPath modifier to the console (for debugging)

console.log(bestPathArray); // logs the array form of the bestPath const (also for debugging)

console.log(Array.isArray(bestPathArray)) //double checks if the array is an array (even more debugging)


//checks if there's a possible path between the the nodes. If not, logs an error on the console
if (bestPath == null) {
alert("Best path: " + bestPath);
throw "No valid path found";
}

var paths = [bestPathArray]; //creates an variable from the array (??? not sure why but it works ???)

console.log(JSON.stringify(bestPathArray)); //transforms the array into a string for legibility

console.log(paths); //logs the newly created string

var cutpaths = bestPathArray.slice(0, -2); // cuts the unused parts of the array

console.log(JSON.stringify(cutpaths)); //logs the new cut array as string

//WIP function for drawing the routes
function connectTheDots(data){
    var c = [];
    for(i in data._layers) {
        var x = data._layers[i]._latlng.lat;
        var y = data._layers[i]._latlng.lng;
        c.push([x, y]);
    }
    return c;
};

cutcoords = connectTheDots(cutpaths);

console.log(cutpaths);

var polylineOptions = {
    color: 'blue',
    weight: 2,
    opacity: 0.9
    };

polyline = new L.Polyline(cutpaths, polylineOptions).addTo(map);
map.addLayer(polyline);

map.fitBounds(polyline.getBounds());

// var route = L.polyline(cutpaths).addTo(map);

//bestPathArray.forEach((coords, i) => {
//  paths.push([coords[1], coords[0]]);
//});

//draws the route on the map (not working atm)
//var pathPL = new L.polyline(paths, {color: 'red'});
//map.addLayer(pathPL);