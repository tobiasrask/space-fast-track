import Factor from './factor'
import Graph from './graph'
import Vector from './vector'
import Heap from './heap'

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
  * @param graph
  *   Graph to be processed
  * @param w
  *   Callback function for edge weight
  * @param a
  *   Start position
  * @param b
  *   Destination
  */
  routePath(G, w, start, goal) {
    // Processed nodes
    let closedSet = new Map();

    // Discovered nodes
    let openSet = new Map; 
    openSet.set(start, '');

    // Optimal source node
    let cameFrom = new Map();

    // Path cost from start node to this node
    let gScore = new Map(); // = Alkuun
    gScore.set(start, 0);

    // Total score for path from start to goal node visiting through this node.
    // = Loppuun (erityisesti alusta + loppuun yhdiestelmä)
    let fScore = new Map();
    fScore.set(start, w(start, goal));

    let heap = new Heap(); // == open set...
    let vertex = null;


    G.getData().forEach((vertex, vertexKey) => {
      gScore.set(vertexKey, Number.MAX_VALUE);
      fScore.set(vertexKey, Number.MAX_VALUE);

      // Push to heap
    });


    while (!closedSet.has(goal)) {
      // Vertex with lowest gScore + 
      let vertexKey = heap.pop();
      closedSet.set(vertexKey, true);

      G.getNeighbor(vertexKey).map((neighbor) => {
        // See if node has been processed
        if (closedSet.has(neighbor.key))
          return;

        // Dist between current + neighbor
        let tentative_gScore = gScore.get(vertexKey) + 1

        if (openSet.has(neighbor.key))
          openSet.set(neighbor.key, true);
        else if (tentative_gScore > gScore.get(neighbor.key))
          return;

        // This is best route
        cameFrom.set(neighbor.key, vertexKey);
        gScore.set(neighbor.key, tentative_gScore);
        fScore.set(neighbor.key, tentative_gScore + w(neighbor.key, goal));
      });
    }
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
  * Method checks if two given positions are reachable, eg. they have 
  * visual contact.
  *
  * @param from postition
  * @param to postition
  * @return boolean succeed
  */
  isReachable(from, to) {
    // Calculate the closest point between globe and line between given positions.
    let closestPoint = this.closestPoint(from, to, Vector.zeroPoinVector());
    return closestPoint.length() >= this._earthRadius ? true : false; 
  }

  /**
  * Calculate closest distance between line.
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
}

export default SatelliteControl;