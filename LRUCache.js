/**
 * Doubly-LinkedList / Hash-Map powered LRU Cache with optional TTL support.
 */
class LRUCache {
  /**
   * @param {number} capacity - Positive integer capacity.
   */
  constructor(capacity) {
    if (!capacity || capacity <= 0) {
      throw new Error("Capacity must be a positive integer.");
    }
    this.capacity = capacity;
    this.cache = new Map();
  }

  /**
   * Get value by key and mark it as Most Recently Used (MRU).
   * @param {any} key
   * @returns {any} Stored value or -1 if not found / expired.
   */
  get(key) {
    if (!this.cache.has(key)) {
      return -1;
    }

    const item = this.cache.get(key);

    // Optional Bonus: Check TTL Expiration
    if (item.expiry && Date.now() > item.expiry) {
      this.cache.delete(key);
      return -1;
    }

    // Refresh position to MRU by deleting and re-setting key
    this.cache.delete(key);
    this.cache.set(key, item);

    return item.value;
  }

  /**
   * Insert or update key/value pair. Evicts Least Recently Used (LRU) if capacity exceeded.
   * @param {any} key
   * @param {any} value
   * @param {number} [ttlMs] - Optional time-to-live in milliseconds
   */
  put(key, value, ttlMs = null) {
    const expiry = ttlMs ? Date.now() + ttlMs : null;

    // If key already exists, remove it so it can be refreshed at the end of the Map
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      // Evict Least Recently Used (first element in Map iteration)
      const lruKey = this.cache.keys().next().value;
      console.log(
        `[EVICTION] Capacity limit reached (${this.capacity}). Evicting LRU key: "${lruKey}"`,
      );
      this.cache.delete(lruKey);
    }

    this.cache.set(key, { value, expiry });
  }

  /**
   * Utility method to print current state of cache keys.
   */
  printState() {
    const keys = Array.from(this.cache.keys());
    console.log(`Current Cache State (LRU -> MRU): [ ${keys.join(" -> ")} ]`);
  }
}

module.exports = LRUCache;
