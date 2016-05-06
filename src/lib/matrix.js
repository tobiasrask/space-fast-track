/**
* Matrix.js
*/
class Matrix {

  /**
  * Constructors.
  */
  constructor(data) {
    this.data = data;
  }

  initValues() {
    this.data = [
      [0,0,0,0],
      [0,0,0,0],
      [0,0,0,0],
      [0,0,0,0]
      ];
  }

  /**
  * Vector length
  */
  length() {
    return 0;
  }

  toString() {
    return 'Matrix!';
  }

}

module.export = Vector;