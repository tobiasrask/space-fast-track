/**
* Graph
*/
class Graph {

  /**
  * Construct.
  *
  * @param size
  */
  constructor(size) {
    // Initialize matrix
    // this._matrix = [];
    // for (let i = 0; i < size; i++)
    //  this._matrix.push(Array(size).fill(Number.MAX_VALUE));
    
    this._vertices = {};
  }

  /**
  * Push vertice to graph.
  *
  * @param key
  */
  setVertice(key) {
    if (!this._vertices.hasOwnProperty(key))
      this._vertices[key] = { key: key, edges: [] }
  }

  /**
  * Set edge.
  *
  * @param from
  * @param to
  * @param weight
  */
  setEdge(from, to, weight) {
    // Make sure vertice exists
    if (!this._vertices.hasOwnProperty(from))
      this.pushVertice(from);
    // Apply edge
    this._vertices[from].edges.push({ key: to, weight: weight });
  }

  
}

export default Graph;