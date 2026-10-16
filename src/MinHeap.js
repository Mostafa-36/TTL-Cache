export default class MinHeap {
  constructor() {
    this.heap = [];
  }

  insert(entry) {
    this.heap.push(entry);

    let index = this.heap.length - 1;

    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);

      if (this.heap[parentIndex].expiresAt <= this.heap[index].expiresAt) {
        break;
      }

      [this.heap[parentIndex], this.heap[index]] = [
        this.heap[index],
        this.heap[parentIndex],
      ];

      index = parentIndex;
    }
  }

  peek() {
    return this.heap.length === 0 ? null : this.heap[0];
  }

  extractMin() {
    if (this.heap.length === 0) return null;

    if (this.heap.length === 1) {
      return this.heap.pop();
    }

    const min = this.heap[0];

    this.heap[0] = this.heap.pop();

    let index = 0;

    while (true) {
      const leftIndex = 2 * index + 1;
      const rightIndex = 2 * index + 2;

      let smallestIndex = index;

      if (
        leftIndex < this.heap.length &&
        this.heap[leftIndex].expiresAt < this.heap[smallestIndex].expiresAt
      ) {
        smallestIndex = leftIndex;
      }

      if (
        rightIndex < this.heap.length &&
        this.heap[rightIndex].expiresAt < this.heap[smallestIndex].expiresAt
      ) {
        smallestIndex = rightIndex;
      }

      if (smallestIndex === index) break;

      [this.heap[index], this.heap[smallestIndex]] = [
        this.heap[smallestIndex],
        this.heap[index],
      ];

      index = smallestIndex;
    }

    return min;
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  size() {
    return this.heap.length;
  }

  clear() {
    this.heap = [];
  }

  has(key) {
    return this.heap.some((entry) => entry.key === key);
  }
}
