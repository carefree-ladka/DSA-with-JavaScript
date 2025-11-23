/**
 * LRU Cache - Least Recently Used cache with Map
 * Time: O(1) for all operations, Space: O(capacity)
 */

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }
  
  get(key) {
    if (this.cache.has(key)) {
      const value = this.cache.get(key);
      // Move to end (most recently used)
      this.cache.delete(key);
      this.cache.set(key, value);
      return value;
    }
    return -1;
  }
  
  put(key, value) {
    if (this.cache.has(key)) {
      // Update existing key
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      // Remove least recently used (first item)
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    
    this.cache.set(key, value);
  }
  
  // Additional utility methods
  size() {
    return this.cache.size;
  }
  
  clear() {
    this.cache.clear();
  }
  
  keys() {
    return Array.from(this.cache.keys());
  }
  
  values() {
    return Array.from(this.cache.values());
  }
}

// LRU Cache with TTL (Time To Live)
class LRUCacheWithTTL {
  constructor(capacity, ttl = Infinity) {
    this.capacity = capacity;
    this.ttl = ttl;
    this.cache = new Map();
    this.timers = new Map();
  }
  
  get(key) {
    if (this.cache.has(key)) {
      const { value, timestamp } = this.cache.get(key);
      
      if (Date.now() - timestamp > this.ttl) {
        this.delete(key);
        return -1;
      }
      
      // Move to end
      this.cache.delete(key);
      this.cache.set(key, { value, timestamp });
      return value;
    }
    return -1;
  }
  
  put(key, value) {
    const timestamp = Date.now();
    
    if (this.cache.has(key)) {
      this.cache.delete(key);
      if (this.timers.has(key)) {
        clearTimeout(this.timers.get(key));
      }
    } else if (this.cache.size >= this.capacity) {
      const firstKey = this.cache.keys().next().value;
      this.delete(firstKey);
    }
    
    this.cache.set(key, { value, timestamp });
    
    // Set TTL timer
    if (this.ttl !== Infinity) {
      const timer = setTimeout(() => this.delete(key), this.ttl);
      this.timers.set(key, timer);
    }
  }
  
  delete(key) {
    this.cache.delete(key);
    if (this.timers.has(key)) {
      clearTimeout(this.timers.get(key));
      this.timers.delete(key);
    }
  }
}

// Test Cases
const lru = new LRUCache(2);

lru.put(1, 'one');
lru.put(2, 'two');
console.log(lru.get(1)); // 'one'

lru.put(3, 'three'); // Evicts key 2
console.log(lru.get(2)); // -1 (not found)
console.log(lru.get(3)); // 'three'
console.log(lru.get(1)); // 'one'

// TTL Cache test
const ttlCache = new LRUCacheWithTTL(2, 1000); // 1 second TTL
ttlCache.put('a', 'value-a');
console.log(ttlCache.get('a')); // 'value-a'

setTimeout(() => {
  console.log(ttlCache.get('a')); // -1 (expired)
}, 1100);