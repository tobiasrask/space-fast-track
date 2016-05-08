import Graph from './graph'
import Vector from './vector'
import Heap from './heap'
import GraphRouter from './graph-router'
import Util from 'util'
/**
* Static instance
*/
var Instance = null;

class SatelliteControl {

  /**
  * Constructors.
  *
  * @param options
  */
  constructor(options = {}) {
    this._earthRadius = options.hasOwnProperty('earthRadius') ?
      options.earthRadius : 6371.0;
  }

  /**
  * Returns current radius for Earth.
  *
  * @return earth radius
  */
  getEarthRadius() {
    return this._earthRadius;
  }

  /**
  * Route path through given graph using A*.
  *
  * @param data
  */
  processSatelliteData(data) {
    let self = this;

    // Destruct data
    let { satellites, start, end } = data;
    let positionIndex = {};

    // Graph will be used to store connections between satellites and
    // ground stations.
    let graph = new Graph((satellites.length + 2));

    // Count positions for start, end and satellites
    // Build index for positions to support fast estimate checks
    start.position = this.calculatePosition(start.lat, start.long);
    end.position = this.calculatePosition(end.lat, end.long)

    positionIndex['start'] = start.position;
    positionIndex['end'] = end.position;

    satellites.map((satellite, i) => {
      satellites[i].position = self.calculatePosition(satellite.lat, satellite.long, satellite.altitude)
      positionIndex[satellite.id] = satellites[i].position;
    });

    // Apply satellites that can be viewed from 'start' position
    graph.setVertice('start');
    satellites.map((satellite, i) => {
      if (self.isReachable(start.position, satellite.position)) {
        let distance = self.distanceBetween(start.position, satellite.position);
        graph.setEdge('start',  satellite.id, distance);
      }
    });

    // Apply satellites that can be viewed from 'end' or 'goal' position
    graph.setVertice('end');

    satellites.map((satellite, i) => {
      if (self.isReachable(end.position, satellite.position)) {
        let distance = self.distanceBetween(end.position, satellite.position);
        graph.setEdge(satellite.id, 'end', distance);
        graph.setEdge('end', satellite.id, distance);
      }
    });


    // Apply satellites to graph
    // Satellites will be connected, if they have visual contact
    for (var i = 0; i < (satellites.length - 1); i++) {
      for (var j = (i + 1); j < satellites.length; j++) {
        if (self.isReachable(satellites[i].position, satellites[j].position)) {
          // Satellite is visible, let's use satellite distance as weight
          let distance = self.distanceBetween(satellites[i].position, satellites[j].position);
          graph.setEdge(satellites[i].id,  satellites[j].id, distance);
          graph.setEdge(satellites[j].id,  satellites[i].id, distance);
        }
      }
    }

    // Rute path. Note that we provide our heuristic cost estimate function as
    // argument, this allows A* to choose best routes.
    let router = new GraphRouter();
    let path = router.graphSearch(graph, (a, b) => {
      let distance = this.distanceBetween(positionIndex[a], positionIndex[b]);
      // console.log(`GCE: Estimate ${a} -> ${b}, distance is ${distance}`);
      return distance;
    }, 'start', 'end');

    console.log("Satellite data processed.");
    console.log("Path:", path);

    // To debug data...
    // console.log("Graph:\n", Util.inspect(graph._data, {depth: 7}));

    return path;
  }

  /**
  * Calculate distance between given two postitions.
  *
  * @param from postition
  * @param to postition
  * @return distance
  */
  distanceBetween(from, to) {
    return Vector.substract(from, to).length();
  }

  /**
  * Method checks if two given positions are reachable, eg. they have clear
  * visual contact.
  *
  * This is now a little bit naive solution, because we are not taking
  * account athmosphres etc. In this example, only the radius of globe
  * does matter.
  *
  * @param from postition
  * @param to postition
  * @return boolean succeed
  */
  isReachable(from, to) {
    // Calculate the closest point between globe and line between given positions.
    let closestPoint = this.closestPoint(from, to, Vector.zero());
    return closestPoint.length() >= this._earthRadius ? true : false;
  }

  /**
  * Calculate closest distance between line and given point.
  *
  * @param vector A
  * @param vector B
  * @param point p
  * @return point vector
  */
  closestPoint(a, b, p) {
    let ab = Vector.substract(b, a);
    let ap = Vector.substract(p, a);
    let t = Vector.dot(ap, ab) / Vector.dot(ab, ab);

    if (t <= 0.0)
      return a;
    else if (t >= 1.0)
      return b;

    ab.scalarMultiply(t);
    return Vector.sum(a, ab);
  }

  /**
  * Calculate ECEF postition in space based on input parameters.
  *
  * Read more about ECEF and stuff:
  * https://en.wikipedia.org/wiki/ECEF
  * https://en.wikipedia.org/wiki/Geographic_coordinate_system
  * https://upload.wikimedia.org/wikipedia/commons/7/7b/ECEF.svg
  *
  * @param lat
  *   Latitude
  * @param long
  *   Longitude
  * @param altitude
  *   Defaults to 0.0 (ground)
  * @return position
  */
  calculatePosition(lat, long, altitude = 0.0) {
    let vector = this.buildNVector(lat, long);
    vector.scalarMultiply(this._earthRadius + altitude);
    return vector;
  }

  /**
  * Build N vector. Read more from: https://en.wikipedia.org/wiki/N-vector
  *
  * @param lat
  *   Latitude
  * @param long
  *   Longitude
  */
  buildNVector(latitude, longitude) {
    let m = (Math.PI / 180);
    let rLatitude = latitude * m;
    let rLongitude  = longitude * m;

    let x = Math.cos(rLatitude) * Math.cos(rLongitude);
    let y = Math.cos(rLatitude) * Math.sin(rLongitude);
    let z = Math.sin(rLatitude);

    return new Vector(x, y, z);
  }

  /**
  * Returns singleton object.
  *
  * @param options
  *  If instance if not constructed yet, it will be constructed with given
  *  options
  * @param reset
  *   Boolean value to indicate if entity singleton should be re created
  *   Defaults to false.
  */
  static getInstance(options = {}, reset = false) {
    if (!Instance || reset)
      Instance = new SatelliteControl(options);
    return Instance;
  }
}

export default SatelliteControl;