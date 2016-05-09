import SatelliteControl from './lib/satellite-control'
import DataLoader from './lib/data-loader'

/**
* Example solution for Reaktor Orbital Challenge.
* https://reaktor.com/orbital-challenge
*/

let satelliteControl = SatelliteControl.getInstance();

// Load source data to be processed. There are few examples included in /data
// folder, but you can generate your own here: 
// https://space-fast-track.herokuapp.com/generate
let filename = process.argv[2] || './../data/input-1.ini';

DataLoader.loadFile(filename, (err, data) => {
  if (err) throw err;
  // Process satellite data
  satelliteControl.processSatelliteData(data);
});