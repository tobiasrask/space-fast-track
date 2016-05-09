
/**
* Example Vector3 implementation.
*/
class Vector {

  /**
  * Constructors.
  */
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  /**
  * Do vector dot operation for given two vectors.
  *
  * @param vector a
  * @param vector b
  * @return scalar
  */
  static dot(a, b) {
    return (a.x * b.x) + (a.y * b.y) + (a.z * b.z);
  }

  /**
  * Sum vector.
  *
  * @param vector a
  * @param vector b
  * @return sum vector
  */
  static sum(a, b) {
    return new Vector((a.x + b.x), (a.y + b.y), (a.z + b.z));
  }

  /**
  * Substract vector.
  *
  * @param vector a
  * @param vector b
  * @param operation
  *   Defaults to 'plus', but 'minus' is ok
  * @return sum vector
  */
  static substract(a, b) {
    return new Vector((a.x - b.x), (a.y - b.y), (a.z - b.z));
  }

  /**
  * Check if two vectors equals.
  *
  * @param vector a
  * @param vector b
  * @return sum vector
  */
  static isEqual(a, b) {
    return ((a.x == b.x) && (a.y == b.y) && (a.z == b.z)) ? true : false;
  }

  /**
  * Creates and retusn zero point vector.
  *
  * @return vector
  */
  static zero() {
    return new Vector(0, 0, 0);
  }

  /**
  * Vector length
  */
  length() {
    return  Math.sqrt(Math.pow(this.x, 2) +
                      Math.pow(this.y, 2) +
                      Math.pow(this.z, 2));
  }

  /**
  * Scalar multiplication.
  *
  * @param value
  */
  scalarMultiply(scalar) {
    this.x = this.x * scalar;
    this.y = this.y * scalar;
    this.z = this.z * scalar;
  }

  /**
  * Normalize vector value.
  */
  normalize() {
    this.scalarMultiply((1 / this.length()));
  }

  /**
  * Describe vector.
  */
  toString() {
    return `Vector: [${ this.x }, ${ this.y }, ${ this.z }] / ${this.length()}`;
  }
}

export default Vector;