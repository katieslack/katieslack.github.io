

var Esri_WorldTopoMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
});

var USGS_USTopo = L.tileLayer('https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}', {
	maxZoom: 20,
	attribution: 'Tiles courtesy of the <a href="https://usgs.gov/">U.S. Geological Survey</a>'
});



var map = L.map('map', {
  layers: [USGS_USTopo, Esri_WorldTopoMap], 
  center: new L.LatLng(35.1324, -106.6952),
  zoom: 12,
  maxBounds: [
    [90, -180],
    [-90, 180],
  ],
});






///////////////////////////////!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!///////////////////////////////


///////////////////////////////////////////////////////////////!!!!!!!!!!!!!!!!!!!!!!!!!!////////////////////


// var myLayer = L.geoJSON(data, {
//   pointToLayer: function (feature, latlng) {
//     return L.circleMarker(latlng, {
//       color: 'red',
//       fillColor: '#f03',
//       fillOpacity: 0.5,
//       radius: 10   // 100 is huge, try smaller like 5–10
//     });
//   }
// }).addTo(map);

// var birds_buffered = turf.buffer(data, 400, {units: 'meters'});

// // 3. Add the buffered polygon to the map
// // var bufferedLayer = L.geoJSON(birds_buffered, {
// //     style: { color: 'blue', fillOpacity: 0.2 }
// // }).addTo(map);

// var bufferedLayer = L.geoJSON(birds_buffered, {
//     style: { color: 'blue', fillOpacity: 0.2 }
// }).addTo(map);


// var dissolved = turf.dissolve(birds_buffered);

// // var myFeatures = L.geoJSON(data);

// // 1. Create a buffer for your point or line features
// var birds_buffered = turf.buffer(data, 400, {units: 'meters'});


// // 2. Wrap them in a FeatureCollection
// var collection = turf.featureCollection(birds_buffered);

// // 3. Dissolve overlapping areas
// var dissolved = turf.dissolve(collection);

// // 4. Add the final result to the Leaflet map
// L.geoJSON(dissolved, {
//     style: { color: 'red', fillColor: '#f03', fillOpacity: 0.5 }
// }).addTo(map);


var birds_buffered = turf.buffer(data, 400, { units: 'meters' });

// No need to wrap again
var dissolved_birds = turf.dissolve(birds_buffered);

var nestingbirds_buffered = turf.buffer(data, 30, {units: 'meters'});

var dissolved_nestingbirds = turf.dissolve(nestingbirds_buffered);

// const map = L.map('map', {
// 	center: [35.1324, -106.6952],
// 	zoom: 10,
// 	layers: [osmHOT, dissolved_birds, dissolved_bees]
// });

// L.geoJSON(dissolved_birds, {
//   style: {
//     color: 'none',
//     fillColor: 'rgba(1, 181, 79, 1)',
//     fillOpacity: 0.5
//   }
// }).addTo(map);


var bees_buffered = turf.buffer(data, 75, { units: 'meters' });

// No need to wrap again
var dissolved_bees = turf.dissolve(bees_buffered);

// L.geoJSON(dissolved_bees, {
//   style: {
//     color: 'none',
//     fillColor: 'rgba(65, 49, 188, 1)',
//     fillOpacity: 0.5
//   }
// }).addTo(map);

var areabirds = turf.area(dissolved_birds);
var areabees = turf.area(dissolved_bees);
var areanestingbirds = turf.area(dissolved_nestingbirds);
console.log(areabirds)
console.log(areabees)


///////////// CHOROPLETH ////////////

// var choropolys = L.geoJson(Chorodata).addTo(map);

// function getColor(d) {
//     return d > 13.966  ? '#006d2c' :
//            d > 9.375   ? '#31a354' :
//            d > 5.256   ? '#74c476' :
//            d > 2.028   ? '#bae4b3' :
//                       '#edf8e9';
// }

function getColor(d) {
    return d > 13.966  ? '#016c59' :
           d > 9.375   ? '#1c9099' :
           d > 5.256   ? '#67a9cf' :
           d > 2.028   ? '#bdc9e1' :
                      '#f6eff7';
}

function style(feature) {
    return {
        fillColor: getColor(feature.properties.density),
        weight: 2,
        opacity: 1,
        // color: 'white',
        color: 'black',
       // dashArray: '3',
        fillOpacity: 1
    };
}



// var choropolys = L.geoJson(Chorodata, 
//   {style: style},

//     choropolys.bindPopup(
//       "<b>Neighborhood Assocaition or Zipcode is:</b><br> " + feature.properties.ID_NA_ZIP + " the number of backyard refuges per households is" + feature.properties.density
//       //
//       //without the decimals
//       //  "<b>Bees Potential Connected Habitat:</b> " + featureArea.toFixed(0) + " square acres"
//     )
// ).addTo(map);

var choropolys = L.geoJson(Chorodata, {
    style: style,
    onEachFeature: function(feature, layer) {
        layer.bindPopup(
            `<b>Neighborhood Association or Zip Code:</b> ${feature.properties.ID_NA_ZIP}
             <br><b>Backyard refuges in the area:</b> ${feature.properties.BYR_Densit.toFixed(2)}
             <br><b>Backyard refuges per households in the area</b> ${feature.properties.density}`
        );
    }
}).addTo(map);

//////////////
// var birdsLayer = L.geoJSON(dissolved_birds, {
//   style: {
//     color: 'none',
//     fillColor: 'rgba(1, 181, 79, 1)',
//     fillOpacity: 0.5
//   }
// }).addTo(map);

// var beesLayer = L.geoJSON(dissolved_bees, {
//   style: {
//     color: 'none',
//     fillColor: 'rgba(65, 49, 188, 1)',
//     fillOpacity: 0.5
//   }
// }).addTo(map);

// TESTING
// beesLayer.eachLayer(function(layer) {
//     // Access the feature data
//     var areabees = turf.area(dissolved_bees);
    
//     // Perform actions, like binding a popup
//     layer.bindPopup("<b>Bees Connected Habitat of " + areabees + " .");
// });

////////////////////

//TESTING//

// 3. Calculate area for each resulting feature
// dissolved_bees.features.forEach((feature, index) => {
//     const featureArea = turf.area(feature); // Area in square meters
//     console.log(`Feature ${index} Area: ${featureArea} sqm`);
    
//     // Optional: Add area to feature properties
//     feature.properties.area_sqm = featureArea;
//     onEachFeature.bindPopup("<b>Bees Connected Habitat of " + dissolved_bees.features.featureArea + " .");
//     });



var birdsLayer = L.geoJSON(dissolved_birds, {
  style: {
    color: 'none',
    fillColor: 'rgba(1, 181, 79, 1)',
    fillOpacity: 0.5
  },
  onEachFeature: function (feature, layer) {
    const featureArea = turf.area(feature);

    // store it if you want
    feature.properties.area_sqm = featureArea;

    let area_sqacres = 0.000247105 * featureArea;
    
    layer.bindPopup(
      "<b>Birds Potential Connected Habitat:</b> <br>" + area_sqacres.toFixed(2) + " acres"
    );
  }
}).addTo(map);

var beesLayer = L.geoJSON(dissolved_bees, {
  style: {
    color: 'none',
    fillColor: '#41b6c4',
    fillOpacity: 1
  }
  ,
  onEachFeature: function (feature, layer) {
    const featureArea = turf.area(feature);

    // store it if you want
    feature.properties.area_sqm = featureArea;
    let area_sqacres = 0.000247105 * featureArea;

    layer.bindPopup(
      "<b>Bees Potential Connected Habitat:</b><br> " + area_sqacres.toFixed(2) + " acres"
      //
      //without the decimals
      //  "<b>Bees Potential Connected Habitat:</b> " + featureArea.toFixed(0) + " square acres"
    );
  }
}).addTo(map);

var nestingLayer = L.geoJSON(dissolved_nestingbirds, {
  style: {
    color: 'none',
    fillColor: '#253494',
    fillOpacity: 1
  }
  ,
  onEachFeature: function (feature, layer) {
    const featureArea = turf.area(feature);

    // store it if you want
    feature.properties.area_sqm = featureArea;
    let area_sqacres = 0.000247105 * featureArea;

    layer.bindPopup(
      "<b>Nesting Birds Potential Connected Habitat:</b><br> " + area_sqacres.toFixed(2) + " acres"
      //
      //without the decimals
      //  "<b>Bees Potential Connected Habitat:</b> " + featureArea.toFixed(0) + " square acres"
    );
  }
}).addTo(map);




// var birds = L.layerGroup([birdsLayer]);
// var bees = L.layerGroup([beesLayer]);
///////////////////////


// var birds = L.layerGroup([dissolved_birds]);
// var bees = L.layerGroup([dissolved_bees]);


var buffersGroup = L.layerGroup([birdsLayer, nestingLayer, beesLayer]);

var overlayMaps = {
  "Habitat Layer": buffersGroup,
  "Backyard Refuge Density": choropolys
};



var baseMaps = {
    "USGS": USGS_USTopo,
    "ESRI": Esri_WorldTopoMap
};

// var overlayMaps = {
//   "Birds Habitat": birds,  
//   "Bees Habitat": bees
// };

var layerControl = L.control.layers(baseMaps, overlayMaps, { collapsed: false }).addTo(map);

// const opacityControl = L.control({ position: 'topright' });

// opacityControl.onAdd = function () {
//     // Create a container div for the slider
//     const div = L.DomUtil.create('div', 'slider-container');
    
//     // Insert HTML for the range input slider
//     div.innerHTML = `
//         <label for="opacity-slider" style="display:block; font-weight:bold; margin-bottom:5px;">Layer Opacity</label>
//         <input id="opacity-slider" type="range" min="0" max="1" step="0.1" value="1" style="width: 100px;">
//     `;

//     // Prevent map drags/clicks when interacting with the slider container
//     L.DomEvent.disableClickPropagation(div);
//     L.DomEvent.disableScrollPropagation(div);

//     return div;
// };

// // 5. Add the control to the map
// opacityControl.addTo(map);

// // 6. Attach an event listener to update layer opacity dynamically
// document.getElementById('opacity-slider').addEventListener('input', function (e) {
//     const volume = parseFloat(e.target.value);
//     choropolys.setOpacity(volume); 
// });

// layerControl.addBaseLayer(USGS_USTopo, 'USGS Map');
// layerControl.addOverlay ({
//   'Bee Habitat': dissolved_bees,
//   'Bird Habitat': dissolved_birds

// })


// const overlays = {
// 	'Potential Bird Habitat': dissolved_birds,
//  'Potential Bee Habitat': dissolved_bees
// };



// const layerControl = L.control.layers(baseLayers, overlays).addTo(map);

// const crownHill = L.marker([39.75, -105.09]).bindPopup('This is Crown Hill Park.');
// const rubyHill = L.marker([39.68, -105.00]).bindPopup('This is Ruby Hill Park.');

// const parks = L.layerGroup([dissolved_birds, dissolved_bees]);

// const openTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
// 	maxZoom: 19,
// 	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
// });
// layerControl.addBaseLayer(openTopoMap, 'OpenTopoMap');
// layerControl.addOverlay(parks, 'Parks');

///////////////////////////////////////////////////!!!!!!!!!!!!!!!!!!!!!!!/////////////////////////


// this is just used to show the currently-displayed earthquakes
// in the little sidebar. meant as an example of a use for the 'change'
// event


// function updateList(timeline) {
//   var displayed = timeline.getLayers();
//   var list = document.getElementById("displayed-list");
//   list.innerHTML = "";
//   displayed.forEach(function (veg) {
//     var li = document.createElement("li");
//     // The title property below is what is displayed on the sidebar.
//     li.innerHTML = veg.feature.properties.year;
//     list.appendChild(li);
//   });
// };


// on the geojson it begins with eqfeed_callback({}) and the geojson data is inside.
// eqfeed_callback is called once the earthquake geojsonp file below loads
// Attempting to call in the precip values from greatveg_totals.geojson. parse the values and only have 3 decimal places. 
// function greatveg_totals(dataP) {
// return Number.parseFloat(data.properties.precip).toFixed(3);
// }



//////////////////////////////////////////////////////////////////2026202620262026////////////////////////////////////////
//////////////// GET YEAR FROM participant # overall column, need to rename column so there are no spaces ////////////////
// let yearNumber = L.geoJson(feature.propertiesparticipant # overall);
// let yearString = yearNumber.toString().slice(0, 4); // "123"
// let year = Number(yearString); // 123 (Optional: convert back to number)

/////////////////////////////////////////////

/////////////// NEED TO FIX TIMELINE //////////////
//////////////////////////////////////////////////
// function greatveg_totals(data) {
//   var getInterval = function (veg) {
//     // earthquake data only has a time, so we'll use that as a "start"
//     // and the "end" will be that + some value based on magnitude
//     // 18000000 = 30 minutes, so a quake of magnitude 5 would show on the
//     // map for 150 minutes or 2.5 hours
//     return {
//       start: 2021,
//       end: 2026 ,
//       // end: quake.properties.time + quake.properties.mag * 1800000,
//     };
//   };
//   var timelineControl = L.timelineSliderControl({
//     formatOutput: function(year) {
//       return new Number(year);
//     },
//   });                  

//   var timeline = L.timeline(data, {
//     getInterval: getInterval,
//     pointToLayer: function (data, latlng) {
//       // Change Precip color using a hue
//        var hue_min=190;
//        var hue_max=220;
//       // var hue_min = 175;
//       // var hue_max = 265;
//       // This var hue could be how we add precipitation to the polygons.
//       // multiple precip by 1 to make it a number and thus can add to the hue_min
//       var hue =
//         (data.properties.precip * 1) + hue_min;
      
//       return L.circleMarker(latlng, {
//         // radius is how we will represent that amount of veg. So this is veg cover
//         // vegTotal value from geojson *
//         radius: data.properties.vegTotal * .1,
//         color: "hsl("+ hue + ", 100%,  50%)",
//         fillColor: "hsl("+ hue + ", 100%,  50%)",
//         //bindPopup, uses list tags and is calling in data from the geojson to create the popup's content
//       }).bindPopup( "<h5>Site: " + data.properties.siteName + ", Year: " + data.properties.year + "</h5>"
//    +"<ul><li>Total Vegetation: " + data.properties.vegTotal + " cm</li>"
//   // line 181 parseFloat and toFixed used to import only 3 digits afer the decimal
//   + "<li>Total Precipitation: " +  Number.parseFloat(data.properties.precip).toFixed(3) + " mm</li>"
//   +"<li>Cottonwood Sum Intercept: " + data.properties.cottonwoodSum + " cm</li>"
//   + "<li>Russian Olive Sum Intercept: " + data.properties.rusOliveSum + " cm</li>"
//   + "<li>NM Olive Sum Intercept: " + data.properties.nmOliveSum + " cm</li>"
//   + "<li>Saltcedar Sum Intercept: " + data.properties.saltcedarSum + " cm </li></ul>");
//     },
//   });



//   timelineControl.addTo(map);
//   timelineControl.addTimelines(timeline);
//   timeline.addTo(map);
//   timeline.on("change", function (e) {
//     updateList(e.target);
//   });
//   updateList(timeline);
// }   
//////////////////// TIMELINE /////////////////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////2026202620262026////////////////////////////////////////

///////////////// DATA CLASSIFICAION ///////
// https://github.com/balladaniel/leaflet-dataclassification

// const layer = L.dataClassification(Chorodata, {
//     // required:
//     mode: 'quantile',
//     classes: 4,
//     field: 'population',
//     // optional:					
//     pointMode: 'size',
//     pointSize: {min: 2, max: 10},
//     pointShape: 'square',
//     lineMode: 'width',
//     lineWidth: {min: 1, max: 15},
//     polygonMode: 'color',
//     polygonHatch: {
//         strokeColors: ['lightgreen', '#fff8b5'], 
//         strokeWidth: {min: -1, max: 13},
//         distinctionMode: 'both',
//         angle: 45,
//         alternateAngle: 45
//     },
//     colorRamp: 'OrRd',
//     colorCustom: ['rgba(210,255,178,1)', '#fec44f', 'f95f0eff'],  // if specified, overrides colorRamp!
//     noDataColor: '#101010',
//     noDataIgnore: false,
//     reverseColorRamp: false,
//     middlePointValue: 0,
//     classRounding: 2,
//     normalizeByField: 'areakm2',
//     legendTitle: 'Density (pop/km²)',
//     legendFooter: '(additional info in footer)',
//     legendPosition: 'bottomleft',
//     legendRowGap: 5,
//     legendAscending: false,	
//     legendTemplate: {
//         highest: '{low} and above [{count}]',
//         middle: '{low} – {high} [{count}]',
//         lowest: 'below {high} [{count}]',
//         nodata: 'No data [{count}]'
//     },
//     unitModifier: {action: 'divide', by: 1000},
//     style: {
//         fillColor: 'purple',    // marker fill color in point/size mode
//         radius: 8,              // marker shape radius (size) in point/color mode,
//         fillOpacity: 0.7,       // polygon fill opacity in polygon modes
//         color: '#aabbcc',       // line stroke color in line/width mode, polygon outline stroke color in polygon modes
//         weight: 5,              // line stroke weight in line/color mode, polygon outline stroke weight in polygon modes
//     }
// }.addTo(map);

//////////////////////////////////////////////////////////////////2026202620262026////////////////////////////////////////


const legend = L.control.Legend({
  title:  "Potential Habitat For:",
  position: "topright",
  collapsed: false,
  symbolWidth: 30,
  opacity: 1,
  column: 1,
  color: '#ffffff',
  radius: 8,
  // boxshadow: 0 4 12 rgba(0, 0, 0, 0.15),
  font: 'Segoe UI',
  border: 'none',
  legends: [
  //   {
  //   label: "No data",
  //               type: "circle",
  //               radius: 10,
  //               color: "hsl(" +237+ ", 3%, 70%)",
  //               fillColor: "hsl(" +237+ ", 3%, 70%)",
  //               weight: 2,
  // },
  {
    label: "Birds",
    type: "circle",
    radius: 10,
    color: 'none',
    fillColor: "rgba(1, 181, 79, 1)",
    fillOpacity: 0.5,
    weight: .1,
  },
    {
    label: "Nesting Birds",
                type: "circle",
                radius: 10,
                color: 'none',
                fillColor: "#253494",
                fillOpacity: 1,
                weight: .1,
  },
  {
    label: "Bees",
                type: "circle",
                radius: 10,
                color: 'none',
                fillColor: "#41b6c4",
                fillOpacity: 1,
                weight: .1,
  },
// {
//   label: "30 mm",
//   type: "circle",
//   radius: 10,
//   color: "hsl(" + 220 + ", 100%, 50%)",
//   fillColor: "hsl(" + 220 + ", 100%, 50%)",
//   weight: 2,
// }
]
}).addTo(map);


//////////////LEGEND FOR CHORO NOT WORKING PROPERLY////////////

const Chorolegend = L.control.Legend({
  title:  "Backyard Refuge Density per Households",
  position: "topleft",
  collapsed: false,
  symbolWidth: 40,
  margin: 20,
  opacity: 1,
  column: 1,
  collapsed: false,
  legends: [
  {
    label: "High density",
    type: "polygon",
    sides: 4,
    symbolWidth: 10,
    symbolHeight: 10,
    color: 'none',
    fillColor: "#016c59",
    fillOpacity: 1,
    weight: 1,
  },
    {
    label: "Medium High density",
    type: "polygon",
    sides: 4,
    symbolWidth: 10,
    symbolHeight: 10,
    color: 'none',
    fillColor: "#1c9099",
    fillOpacity: 1,
    weight: 1,
  },
      {
    label: "Medium density",
    type: "polygon",
    sides: 4,
    symbolWidth: 10,
    symbolHeight: 10,
    color: '#000403',
    fillColor: "#67a9cf",
    fillOpacity: 1,
    weight: 1,
  },
        {
    label: "Medium Low density",
    type: "polygon",
    sides: 4,
    symbolWidth: 10,
    symbolHeight: 10,
    color: '#000403',
    fillColor: "#bdc9e1",
    fillOpacity: 1,
    weight: 1,
  },
          {
    label: "Low or No density",
    type: "polygon",
    sides: 4,
    symbolWidth: 10,
    symbolHeight: 10,
    color: '#000403',
    fillColor: "#f6eff7",
    fillOpacity: 1,
    weight: 1,
  }
]
}).addTo(map);


////////////////////////
   

