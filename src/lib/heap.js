
/**
* Basic implementation of min heap.
*/
class Heap {

  /**
  * Constructors.
  */
  constructor() {
    this._heapSize = 0;
    this._data = [null];
  }

  /**
  * Returns parent.
  *
  * @param index
  * @return index
  */
  parent(index) {
    return parseInt((index / 2));
  }

  /**
  * Returns left child.
  *
  * @param index
  * @return index
  */
  left(index) {
    return 2 * index;
  }

  /**
  * Returns right child.
  *
  * @param index
  * @return index
  */
  right(index) {
    return (2 * index + 1);
  }

  /**
  * Returns smallest item.
  *
  * @return item
  */
  min() {
    return this._heapSize > 0 ? this._data[1].key : null;
  }

  /**
  * Returns and removes smallest key value.
  *
  * @return item key
  */
  pop() {
    if (!this._heapSize)
      return null;
    
    let min = this._data[1];
    this._data[1] = this._data[this._heapSize];
    this._heapSize--;
    this.heapify(1);

    this._data[(this._data.length - 1)] = null;
    return min.key;
  }

  /**
  * Insert key with given value to heap.
  *
  * @param key
  * @param value
  */
  push(key, value) {
    this._heapSize++;
    let i = this._heapSize;

    while (i > 1 && this._data[this.parent(i)].value > value) {
      this._data[i] = this._data[this.parent(i)];
      i = this.parent(i);
    }
    this._data[i] = { key: key, value: value };
  }

  /**
  * Rebuild heap.
  *
  * @param index
  */
  heapify(index) {
    let l = this.left(index);
    let r = this.right(index);

    if (r <= this._heapSize) {
      let smallest = this._data[l].value < this._data[r].value ? l : r;

      if (this._data[index].value > this._data[smallest].value) {
        [this._data[index], this._data[smallest]] = [this._data[smallest], this._data[index]];
        this.heapify(smallest);
      }

    } else if (l == this._heapSize && this._data[index].value > this._data[l].value) {
      [this._data[index], this._data[l]] = [this._data[l], this._data[index]];
    }
  }
}

export default Heap;