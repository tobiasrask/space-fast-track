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
  * Route path from graph.
  */
  routePath(G, w, a, b) {

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