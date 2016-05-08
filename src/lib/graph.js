/**
* Graph implementation.
*/
class Graph {

  /**
  * Construct.
  *
  * @param size
  */
  constructor(size) {
    this._data = new Map();
  }

  /**
  * Push vertice to graph.
  *
  * @param key
  */
  setVertice(key) {
    this._data.set(key, { key: key, edges: [] });
  }

  /**
  * Retrieve vertice.
  *
  * @param key
  * @boolean apply
  *   Vertice will be inserted if it didn't already exists. Defaults to true.
  * @return vertice
  */
  getVertice(key, apply = true) {
    if (apply && !this._data.has(key))
      this.setVertice(key);

    return this._data.get(key);
  }

  /**
  * Set edge.
  *
  * @param from
  * @param to
  * @param weight
  */
  setEdge(from, to, weight) {
    let vertice = this.getVertice(from);
    vertice['edges'].push({ key: to, weight: weight });
  }

  /**
  * Returns graph vertices.
  *
  * @return data
  */
  getData() {
    return this._data;
  }

  /**
  * Returns neighbors for key.
  *
  * @return data
  */
  getNeighbor(key) {
    return this.getVertice(key).edges;
  }


}

export default Graph;