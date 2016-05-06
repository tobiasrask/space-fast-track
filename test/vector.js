import assert from "assert"
import Vector from "./../src/lib/vector"

describe('Vector', () => {

  describe('Vector construction', () => {
    it('It should construct without errors', (done) => {
      let vector = null;

      vector = new Vector();
      if (vector.length() > 0)
        return done(new Error("Empty vector should not have length"));

      vector = new Vector(1, 0, 0);

      if (vector.length() != 1)
        return done(new Error("Vector length didn't match expected"));

      done();
    })
  });

  describe('Equality', () => {
    it('It should recognize equality', (done) => {

      let vectorA = new Vector(2, 2, 0);
      let vectorB = new Vector(2, 2, 1);

      if (!Vector.isEqual(vectorA, new Vector(2, 2, 0)))
        return done(new Error("Identical vectors are not considered to be equal"));

      if (Vector.isEqual(vectorA, vectorB))
        return done(new Error("Equality check failed"));

      if (!Vector.isEqual(vectorB, new Vector(2, 2, 1)))
        return done(new Error("Identical vectors are not considered to be equal"));

      done();
    })
  });

  describe('Length', () => {
    it('It should return vector length', (done) => {
      let vector = null;

      vector = new Vector(5, 0, 0);
      if (vector.length() != 5)
        return done(new Error("The result of vector length is not expected"));

      vector = new Vector(0, 5, 0);
      if (vector.length() != 5)
        return done(new Error("The result of vector length is not expected"));

      vector = new Vector(0, 0, 5);
      if (vector.length() != 5)
        return done(new Error("The result of vector length is not expected"));

      done();
    })
  });

  describe('Length', () => {
    it('It should return vector length', (done) => {
      let vector = null;

      vector = new Vector(5, 0, 0);
      if (vector.length() != 5)
        return done(new Error("The result of vector length is not expected"));

      vector = new Vector(0, 5, 0);
      if (vector.length() != 5)
        return done(new Error("The result of vector length is not expected"));

      vector = new Vector(0, 0, 5);
      if (vector.length() != 5)
        return done(new Error("The result of vector length is not expected"));

      vector = new Vector(1, 2, 3);
      vector.normalize();
      if (vector.length() != 1)
        return done(new Error("The result of normalized vector length is not expected"));

      done();
    })
  });

  describe('Normalization', () => {
    it('It should return vector length for normalized vector', (done) => {
      let vector = null;

      vector = new Vector(1, 2, 3);
      vector.normalize();
      if (vector.length() != 1)
        return done(new Error("The result of normalized vector length is not expected"));

      done();
    })
  });

  describe('Scalar multiplication', () => {
    it('It should support scalar multiplication', (done) => {
      let vector = null;

      vector = new Vector(10, 0, 0);
      vector.scalarMultiply(10);
      
      if (vector.length() != 100)
        return done(new Error("The result of scalar multiplication is not expected"));

      vector = new Vector(0, 0, 16);
      vector.scalarMultiply(10);

      if (vector.length() != 160)
        return done(new Error("The result of scalar multiplication is not expected"));

      done();
    })
  });

  describe('Vector sum', () => {
    it('It should calculate vector sum', (done) => {
      let vector = null;

      vector = Vector.sum(new Vector(1, 2, 3), new Vector(4, 5, 6));
      if (!Vector.isEqual(vector, new Vector(5, 7, 9)))
        return done(new Error("The result of vector sum is not expected"));

      vector = Vector.sum(new Vector(-10, 20, -30), new Vector(5, -5, 5));
      if (!Vector.isEqual(vector, new Vector(-5, 15, -25)))
        return done(new Error("The result of vector sum is not expected"));

      done();
    })
  });

  describe('Vector substraction', () => {
    it('It should calculate vector substraction', (done) => {
      let vector = null;

      vector = Vector.substract(new Vector(1, 2, 3), new Vector(4, 5, 6)); 
      if (!Vector.isEqual(vector, new Vector(-3, -3, -3)))
        return done(new Error("The result of vector sum is not expected"));

      vector = Vector.substract(new Vector(1, 5, 10), new Vector(5, -10, -3)); 
      if (!Vector.isEqual(vector, new Vector(-4, 15, 13)))
        return done(new Error("The result of vector sum is not expected"));

      vector = Vector.substract(new Vector(-100, -200, -300), new Vector(-50, -30, -20)); 

      if (!Vector.isEqual(vector, new Vector(-50, -170, -280)))
        return done(new Error("The result of vector sum is not expected"));

      done();
    })
  });

  describe('Vector dot', () => {
    it('It should calculate vector dot operation', (done) => {
      let vector = null;

      if (Vector.dot(new Vector(0, 1, 0), new Vector(1, 0, 1)) != 0)
        return done(new Error("The result of vector dot operation is not expected"));

      if (Vector.dot(new Vector(1, 0, 0), new Vector(1, 0, 0)) != 1)
        return done(new Error("The result of vector dot operation is not expected"));

      if (Vector.dot(new Vector(2, 0, 0), new Vector(2, 0, 0)) != 4)
        return done(new Error("The result of vector dot operation is not expected"));

      if (Vector.dot(new Vector(0, 3, 0), new Vector(0, 3, 0)) != 9)
        return done(new Error("The result of vector dot operation is not expected"));

      if (Vector.dot(new Vector(0, 0, 4), new Vector(0, 0, 4)) != 16)
        return done(new Error("The result of vector dot operation is not expected"));

      if (Vector.dot(new Vector(0, 0, -2), new Vector(0, 0, 3)) != -6)
        return done(new Error("The result of vector dot operation is not expected"));

      if (Vector.dot(new Vector(-2, 1, 2), new Vector(-2, 2, -3)) != 0)
        return done(new Error("The result of vector dot operation is not expected"));

      done();
    })
  });
});