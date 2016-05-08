import assert from "assert"
import Heap from "./../src/lib/heap"

describe('Heap', () => {

  describe('Heap construction', () => {
    it('It should construct without errors', (done) => {
      let sc = new Heap();

      done();
    })
  });



  describe('Return pushed items in min order', () => {
    it('It should do the math', (done) => {
      let heap = new Heap();

      let input = [
        { key: 'e', 'weigth': 0 },
        { key: 'i', 'weigth': 50 },
        { key: 'a', 'weigth': 1 },
        { key: 'c', 'weigth': 3 },
        { key: 'b', 'weigth': 2 },
        { key: 'd', 'weigth': 4 },
        { key: 'g', 'weigth': 7 },
        { key: 'f', 'weigth': 6 },
        { key: 'j', 'weigth': 10 },      
        { key: 'h', 'weigth': 8 }
      ]

      input.map(item => {
        heap.push(item.key, item.weigth);
      });

      // Update weights (increment and decrement)
      heap.updateWeight('e', 5);
      heap.updateWeight('i', 9);

      if (heap.pop() != "a")
        return done(new Error("The min heap item was not expected [a]"));

      if (heap.pop() != "b")
        return done(new Error("The min heap item was not expected [b]"));

      if (heap.pop() != "c")
        return done(new Error("The min heap item was not expected [c]"));

      if (heap.pop() != "d")
        return done(new Error("The min heap item was not expected [d]"));

      if (heap.pop() != "e")
        return done(new Error("The min heap item was not expected [e]"));

      if (heap.pop() != "f")
        return done(new Error("The min heap item was not expected [f]"));

      if (heap.pop() != "g")
        return done(new Error("The min heap item was not expected [g]"));

      if (heap.pop() != "h")
        return done(new Error("The min heap item was not expected [h]"));

      if (heap.pop() != "i")
        return done(new Error("The min heap item was not expected [i]"));

      if (heap.pop() != "j")
        return done(new Error("The min heap item was not expected [j]"));

      if (heap.pop() != null)
        return done(new Error("The min heap item was not expected. [Empty]"));

      done();
    })
  });
});