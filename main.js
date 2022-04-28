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


//onEachFeature function for the dog park data
function onEachFeature(feature, layer) {
    var popupContent = "- "+feature.properties.Id +"<br>"+ "- "+feature.properties.Koko;
    if (feature.properties && feature.properties.popupContent) {
      popupContent += feature.properties.popupContent;
    }
    layer.bindPopup(popupContent);
  }

//adds the GeoJson road network to map
digitieLayer = L.geoJson(digitie, {
    style: {
      color: 'blue',
      //opacity: 0.3,
      weight: 3,
    }
  })

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

var BeachIcon = L.icon({  // icon for dog beaches
    iconUrl: 'Icons/DogBeach.png',
    shadowUrl: '',
    iconSize:     [28, 55], // size of the icon
    //shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [13, 55], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [0, -50] // point from which the popup should open relative to the iconAnchor
});

var TrashIcon = L.icon({ // icon for dog poop bags
    iconUrl: 'Icons/DogTrash.png',
    shadowUrl: '',
    iconSize:     [28, 55], // size of the icon
    //shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [13, 55], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [0, -50] // point from which the popup should open relative to the iconAnchor
});

//adds dog parks
var doggoparks = new L.GeoJSON(geojsonObject, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon:DogIcon});
        return L.point(latlng); // The style
      },  onEachFeature: onEachFeature
      
  }).addTo(map)

  //array of functioning routes
var randomcoords = [
    [ [60.44300547281816,22.28869020938873], [60.443307139234584, 22.290948629379272] ], 
    [ [60.58663338, 22.3682834], [ 60.46146647, 22.19949567] ],
    [ [ 60.65926926, 22.43304107], [ 60.53992979, 22.32789765] ],
    [ [ 60.41315897, 22.29718845], [ 60.3861675, 22.20784445] ],
    [ [60.44703804494439, 22.28835493326187], [ 60.447154463477325, 22.28892892599106] ]
];

var randNum = Math.floor(Math.random() * randomcoords.length); //selects one of the coordinates
console.log(randNum) //for debug
console.log(randomcoords[0]) // for debug

var randArr = randomcoords[randNum] //sets an array of the chosen coordinates
//var randArr = randomcoords.slice(randNum);
//console.log(randArr)
randArrStart = randArr[0] //lat. coords of the chosen array
randArrEnd = randArr[1] //long. coords of the chosen array

console.log(randArrStart)
console.log(randArrEnd)

//creates start and end points for the pathfinding algorithm from the chosen random coords
start = randArrStart;
end = randArrEnd;

//start = [60.44703804494439, 22.28835493326187];
//end = [ 60.447154463477325, 22.28892892599106];


//Adds the start and end nodes to the map 
startmarker = L.marker(start, {icon:DogIcon}).addTo(map);
endmarker = L.marker(end, {icon:DogIcon, draggable:true}).addTo(map);

//Creates a constant for the GeoJson pathfinding variable
pathFinder = new geojsonPathFinder(digitie, {precicion:1});

//Searches the shortest route

bestPath = pathFinder.findPath({
    geometry: {coordinates: [start[1], start[0]]}
}, 
{geometry: {coordinates: [end[1], end[0]]
    }
});

//checks if there's a possible path between the the nodes. If not, logs an error on the console

if (bestPath == null) {
    console.log( "No valid path found :( ");
    }
//console.log(Array.isArray(bestPath)) //checks if the bestPath constant is an array. Should be false

//console.log(bestPath)

bestPathArray = Object.values(bestPath); //transforms the bestPath constant to an array for the forEach method.

var paths = [bestPathArray]; //creates an variable from the array (??? not sure why but it works ???)

var cutpaths = bestPathArray.slice(0, -2); // cuts the unused parts of the array

//console.log(bestPathArray)


var pathlengthArr = bestPathArray.slice(1, -1); // cuts the unused parts of the array

//console.log(pathlengthArr)

pathlength = pathlengthArr[0];

var wrongCoords = cutpaths[0];


var correctCoords = L.GeoJSON.coordsToLatLngs(wrongCoords);

polylineOptions = {
    color: 'orange',
    weight: 5,
    opacity: 0.9
    };


polyline = new L.Polyline(correctCoords, polylineOptions).bindPopup('Route length: ' + Math.round(pathlength * 100) / 100 + " km").addTo(map);

map.addLayer(polyline);
map.fitBounds(polyline.getBounds());

var stateChangingButton = L.easyButton('<img src="Icons/HeckinLines.png" style="width:16px", "height:16px">',{
    states: [{
            stateName: 'zoom-to-forest',        // name the state
            icon:      'fa-tree',               // and define its properties
            title:     'Show road network',      // like its title
            onClick: function(btn, map) { 
                map.addLayer(digitieLayer);      // and its callback
                polyline.bringToFront()
                btn.state('zoom-to-school');    // change state on click!
            }
        }, {
            stateName: 'zoom-to-school',
            icon:      'fa-university',
            title:     'Remove road network',
            onClick: function(btn, map) {
                
                btn.state('zoom-to-forest');
                map.removeLayer(digitieLayer);
            }
    }]
});

stateChangingButton.addTo(map);


endmarker.on('dragend', function (e) {
    startCoords = endmarker.getLatLng();
    console.log(startCoords)

    console.log("Calculating the route")
    pathFinder = new geojsonPathFinder(digitie, {precicion:1});
    bestPath = pathFinder.findPath({
        geometry: {
            coordinates: [startCoords[0], startCoords[1]]
        }
    }, 
    {
        geometry: {
            coordinates: [end[0], end[1]]
        }
    });

    if (bestPath == null) {
        console.log( "No valid path found");
    }

     paths = [bestPathArray]; //creates an variable from the array (??? not sure why but it works ???)

     cutpaths = bestPathArray.slice(0, -2); // cuts the unused parts of the array

     wrongCoords = cutpaths[0];

     //correctCoords = L.GeoJSON.coordsToLatLngs(wrongCoords)

    var polyline = new L.Polyline(correctCoords, polylineOptions).addTo(map);

    console.log(bestPath)

    console.log("Redrawing the polyline")

    map.removeLayer(polyline);

    //map.addLayer(polyline);


});

function clickerTest() {
    map.panTo(new L.LatLng(60.4472761, 22.2968824));
  }

  // Add dog parks to the map

var SNiemiRanta = L.marker([60.425599 ,22.0972503], {icon:BeachIcon}).addTo(map); // Saarronniemen koiraranta
var SNiemiPuisto = L.marker([60.425766,22.096746], {icon:BeachIcon}).addTo(map); // Saarronniemen koirapuisto 
var UittamoRanta = L.marker([60.4203257,22.2508475], {icon:BeachIcon}).addTo(map); //  Uittamon koiraranta 

var trashtest = L.marker([60.44300547281816,22.28869020938873], {icon:TrashIcon}).addTo(map); //  Uittamon koiraranta 


// https://gis.stackexchange.com/questions/210041/using-leaflet-js-is-it-possible-to-know-the-onclick-location-of-a-marker-ignor