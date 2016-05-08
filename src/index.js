import SatelliteControl from './lib/satellite-control'
import DataLoader from './lib/data-loader';

/**
* Example solution for Reaktor Orbital Challenge.
* https://reaktor.com/orbital-challenge
*/

/**
* Default source filename.
*/
let filename = process.argv[2] || './../data/input-1.ini';

let satelliteControl = SatelliteControl.getInstance();

DataLoader.loadFile(filename, (err, data) => {
  if (err) throw err;

  satelliteControl.processSatelliteData(data);
});
