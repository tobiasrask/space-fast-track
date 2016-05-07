import util from 'util'
import utils from './lib/utils'
import Factor from './lib/factor'
import Graph from './lib/graph'
import Vector from './lib/vector'
import Heap from './lib/heap'
import SatelliteControl from './lib/satellite-control'

var filename = './../config/input-1.ini'

// https://reaktor.com/orbital-challenge

var satelliteControl = new SatelliteControl();

/*
let a = new Vector(-1001, 5, 0);
let b = new Vector(10000, 6, 0);
let point = new Vector(0, 0, 0);
console.log(Factor.closestPoint(a, b, point).toString());
*/

// https://www.theseus.fi/bitstream/handle/10024/26610/Opinnaytetyo_Marko_Huotari.pdf?sequence=1
// https://www.cs.helsinki.fi/u/floreen/tira2014/tira.pdf

function loadData() {
  var fs = require('fs');

  fs.readFile(filename, function(err, data) {
      if (err) throw err;

      var lines = data.toString().split("\n");
      let numSatellites = lines.length - 1;

      // Parse route
      let routeData = lines[lines.length - 1].split(",");

      let build = {
        seed: lines[0],
        start: {
          lat: routeData[1],
          long: routeData[2],
          position: satelliteControl.calculatePosition(parseFloat(routeData[1]), parseFloat(routeData[2]))
        },
        end: {
          lat: routeData[3],
          long: routeData[4],
          position: satelliteControl.calculatePosition(parseFloat(routeData[3]), parseFloat(routeData[4]))
        },
        satellites: []
      }

      // Read the satellites
      for (var i = 1; i < numSatellites; i++) {
        let satelliteData = lines[i].split(",");

        build.satellites.push({
            id: satelliteData[0],
            lat: parseFloat(satelliteData[1]),
            long: parseFloat(satelliteData[2]),
            altitude: parseFloat(satelliteData[3]),
            position: satelliteControl.calculatePosition(parseFloat(satelliteData[1]), parseFloat(satelliteData[2]), (parseFloat(satelliteData[3])))
          });
      }

      //console.log("Data:\n", util.inspect(build, {depth: 7}));

      let graph = new Graph((numSatellites + 2));

      // Process starting point
      console.log("Build list of satellites for start point");

      graph.setVertice('start');

      build.satellites.map((satellite, i) => {

        // See if satellite can be reached
        if (satelliteControl.isReachable(build.start.position, satellite.position)) {
          // Satellite is visible, let's use satellite distance as weight

          let distance = satelliteControl.distanceBetween(build.start.position, satellite.position);
          graph.setEdge('start',  satellite.id, distance);

          console.log(`Satellite: ${satellite.id } / distance: ${distance}`);
        }
      });

      console.log('---');
      console.log("Build list of satellites for end point");
      graph.setVertice('end');

      build.satellites.map((satellite, i) => {
        if (satelliteControl.isReachable(build.end.position, satellite.position)) {
          let distance = satelliteControl.distanceBetween(build.end.position, satellite.position);
          graph.setEdge('end',  satellite.id, distance);
          console.log(`Satellite: ${satellite.id } / distance: ${distance}`);
        }
      });

      console.log('---');
      console.log("Build graph for satellites");

      for (var i = 0; i < (build.satellites.length - 1); i++) {
        for (var j = (i + 1); j < build.satellites.length; j++) {
          if (satelliteControl.isReachable(build.satellites[i].position, build.satellites[j].position)) {
            // Satellite is visible, let's use satellite distance as weight
            let distance = satelliteControl.distanceBetween(build.satellites[i].position, build.satellites[j].position);
            graph.setEdge(build.satellites[i].id,  build.satellites[j].id, distance);
            graph.setEdge(build.satellites[j].id,  build.satellites[i].id, distance);
            console.log(`Satellites connected: ${build.satellites[i].id } - ${build.satellites[j].id } / distance: ${distance}`);
          }
        }        
      }

      console.log("Graph Ready");
      console.log("Graph:\n", util.inspect(graph._vertices, {depth: 7}));

      // Search
      let path = satelliteControl.routePath(graph, (a, b) => { return 0; }, 'start', 'end');

  });
}

loadData();