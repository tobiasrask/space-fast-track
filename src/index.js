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

      let result = {
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

        result.satellites[i] = {
            id: satelliteData[0],
            lat: parseFloat(satelliteData[1]),
            long: parseFloat(satelliteData[2]),
            altitude: parseFloat(satelliteData[3]),
            position: satelliteControl.calculatePosition(parseFloat(satelliteData[1]), parseFloat(satelliteData[2]), (parseFloat(satelliteData[3])))
          };
      }

      console.log("Data:\n", util.inspect(result, {depth: 7}));

      let graph = new Graph((numSatellites + 2));

      // Count distances between start point to satellites
      


      // Process starting point
      graph.setVertice('start');

      result.satellites.map((satellite, i) => {

        // See if satellite can be reached
        if (satelliteControl.isReachable) {
          // Satellite is visible, let's use satellite distance as weight

          let distance = satelliteControl.distanceBetween(result.start.position, satellite.position);
          graph.setEdge('start',  satellite.id, distance);


          console.log('***');
          console.log("Register satellite for start position: " + satellite.id);
          console.log(satellite);
          console.log("distance length: " + distance);
        }
      });

      // Count distances between end point to satellites

      // Count distances between satellites



      // Pushataan graafiin solmut
      // 1 = alkusolmu
      // 2 = loppusolmu
      // ... satelliittia


      // Lasketaan samalla painot
      // console.log(graph);

        

  });
  
}

loadData();