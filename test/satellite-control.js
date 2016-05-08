import assert from "assert"
import Vector from "./../src/lib/vector"
import SatelliteControl from "./../src/lib/satellite-control"

describe('SatelliteControl', () => {

  describe('Satellite Control construction', () => {
    it('It should construct without errors', (done) => {
      let sc = new SatelliteControl();

      done();
    })
  });

  describe('Calculate position', () => {
    it('It calculate satellite positions based on lat, long and altitude', (done) => {
      let vector = null;
      let earthRadius = 1;
      let altitude = 0;
      let sc = new SatelliteControl({ earthRadius: earthRadius });

      if (sc.getEarthRadius() != earthRadius)
        return done(new Error("Unable to initialize custom earth radius"));

      altitude = 1;
      vector = sc.calculatePosition(90.0, 0.0, altitude);
      if (vector.length() != (earthRadius + altitude))
        return done(new Error("The result of position vector didn't match expected"));

      altitude = 2;
      vector = sc.calculatePosition(0.0, 0.0, altitude);

      if (vector.length() != (earthRadius + altitude))
        return done(new Error("The result of position vector didn't match expected"));

      // Prime meridian check, read more from:
      // https://upload.wikimedia.org/wikipedia/commons/7/7b/ECEF.svg
      if (!Vector.isEqual(vector, new Vector(3, 0, 0)))
        return done(new Error("Identical vectors are not considered to be equal"));

      done();
    })
  });

  describe('Calculate distance between two positions', () => {
    it('It should do the math', (done) => {

      let sc = new SatelliteControl();
      let earthRadius = sc.getEarthRadius();

      if (sc.distanceBetween(new Vector(2, 0, 0), new Vector(2, 0, 0)) > 0)
        return done(new Error("The result of distance checks failed"));

      if (sc.distanceBetween(new Vector(2, 4, 1), new Vector(2, 2, 1)) != 2)
        return done(new Error("The result of distance checks failed"));

      if (sc.distanceBetween(new Vector(2, 0, 0), new Vector(-2, 0, 0)) != 4)
        return done(new Error("The result of distance checks failed"));

      if (sc.distanceBetween(new Vector(1, 3, 2), new Vector(1, -3, 2)) != 6)
        return done(new Error("The result of distance checks failed"));

      if (sc.distanceBetween(new Vector(-2, 0, 0), new Vector(-2, 0, 0)) > 0)
        return done(new Error("The result of distance checks failed"));

      if (sc.distanceBetween(new Vector(-2, 0, -6), new Vector(-2, 0, -4)) != 2)
        return done(new Error("The result of distance checks failed"));

      done();
    })
  });


  describe('Calculate closest point for line segment', () => {
    it('It should do the math', (done) => {
      let vector = null;
      let sc = new SatelliteControl();
      let earthRadius = sc.getEarthRadius();

      vector = sc.closestPoint(new Vector(-1000, 2, 0), new Vector(4000, 2, 0), new Vector(0, 0, 0));
      if (!Vector.isEqual(vector, new Vector(0, 2, 0)))
        return done(new Error("The result of point check failed"));

      vector = sc.closestPoint(new Vector(10, -4000, 0), new Vector(10, 6000, 0), new Vector(0, 0, 0));
      if (!Vector.isEqual(vector, new Vector(10, 0, 0)))
        return done(new Error("The result of point check failed"));

      vector = sc.closestPoint(new Vector(0, 10, -30), new Vector(0, 10, 40), new Vector(0, 0, 0));
      if (!Vector.isEqual(vector, new Vector(0, 10, 0)))
        return done(new Error("The result of point check failed"));

      done();
    })
  });
});