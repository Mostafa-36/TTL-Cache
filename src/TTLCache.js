import CacheNode from "./CacheNode.js";
import MinHeap from "./MinHeap.js";

export default class TTLCache {
  constructor() {
    this.minHeap = new MinHeap();
    this.map = new Map();
  }

  set(key, val, ttl) {
    if (ttl <= 0) {
      this.delete(key);
      return;
    }

    const expiresAt = Date.now() + ttl;
    const node = new CacheNode(key, val, expiresAt);

    this.map.set(key, node);

    this.minHeap.insert({
      key,
      expiresAt,
      node,
    });
  }

  get(key) {
    const node = this.map.get(key);

    if (!node) return null;

    if (node.expiresAt <= Date.now()) {
      this.map.delete(key);
      return null;
    }

    return node.val;
  }

  has(key) {
    const node = this.map.get(key);

    if (!node) return false;

    if (node.expiresAt <= Date.now()) {
      this.map.delete(key);
      return false;
    }

    return true;
  }

  delete(key) {
    return this.map.delete(key);
  }

  clear() {
    this.map.clear();
    this.minHeap.clear();
  }

  size() {
    this.cleanupExpired();
    return this.map.size;
  }

  cleanupExpired() {
    const now = Date.now();

    while (!this.minHeap.isEmpty() && this.minHeap.peek().expiresAt <= now) {
      const expired = this.minHeap.extractMin();
      const current = this.map.get(expired.key);

      if (current === expired.node) {
        this.map.delete(expired.key);
      }
    }
  }
}
