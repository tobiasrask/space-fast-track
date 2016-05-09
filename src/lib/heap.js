
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
    this._keys = new Map();
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
    this._keys.delete(min.key);

    return min.key;
  }

  /**
  * Test method to evaluate if heap is empty.
  *
  * @return boolean is empty.
  */
  isEmpty() {
    return this._heapSize ? false : true;
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
    this._keys.set(key, true);
  }

  /**
  * Check if heap contains key.
  *
  * @param key
  * @return boolean contains
  */
  has(key) {
    return this._keys.has(key);
  }

  /**
  * Update key value.
  *
  * @param key
  * @param new value
  */
  updateWeight(key, value) {
    let index = -1;

    // Search current position from heap
    for (var i = 1; i <= this._heapSize; i++) {
      if (this._data[i].key == key) {
        index = i;
        break;
      }
    }

    // Make sure we found the match
    if (index < 0)
      return;

    // Update value and process heap structure
    if (value > this._data[index].value) {
      // Increment
      this._data[index].value = value;
      this.heapify(index);

    } else if (value < this._data[index].value) {
      // Decement
      this._data[index].value = value;

      while (index > 1 &&
             this._data[this.parent(index)].value > this._data[index].value) {
        let p = this.parent(index);
        [this._data[index], this._data[p]] = [this._data[p], this._data[index]];
        index = p;
      }
    }
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
      // Get smallest value
      let s = this._data[l].value < this._data[r].value ? l : r;

      if (this._data[index].value > this._data[s].value) {
        [this._data[index], this._data[s]] = [this._data[s], this._data[index]];
        this.heapify(s);
      }

    } else if (l == this._heapSize &&
               this._data[index].value > this._data[l].value) {
      [this._data[index], this._data[l]] = [this._data[l], this._data[index]];
    }
  }
}

export default Heap;