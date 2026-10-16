export default class CacheNode {
  constructor(key, val, expiresAt) {
    this.key = key;
    this.val = val;
    this.expiresAt = expiresAt;
  }
}
