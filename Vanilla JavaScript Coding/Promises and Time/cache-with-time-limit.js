// Cache With Time Limit - Time-based cache implementation
class TimeLimitedCache {
  constructor() {
    this.cache = new Map();
  }
  
  set(key, value, duration) {
    const hasKey = this.cache.has(key);
    if (hasKey) {
      clearTimeout(this.cache.get(key).timeoutId);
    }
    
    const timeoutId = setTimeout(() => {
      this.cache.delete(key);
    }, duration);
    
    this.cache.set(key, { value, timeoutId });
    return !hasKey;
  }
  
  get(key) {
    return this.cache.has(key) ? this.cache.get(key).value : -1;
  }
  
  count() {
    return this.cache.size;
  }
}

// Test Cases
const cache = new TimeLimitedCache();
console.log(cache.set(1, 42, 1000)); // true
console.log(cache.get(1)); // 42
console.log(cache.count()); // 1