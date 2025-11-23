// HashMap with Load Factor Implementation
class HashMap {
  constructor(capacity = 16, loadFactor = 0.75) {
    this.capacity = capacity;
    this.loadFactor = loadFactor;
    this.size = 0;
    this.buckets = Array.from({ length: capacity }, () => []);
  }

  hash(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash * 31 + key.charCodeAt(i)) % this.capacity;
    }
    return hash;
  }

  resize() {
    const oldBuckets = this.buckets;
    this.capacity *= 2;
    this.size = 0;
    this.buckets = new Array(this.capacity).fill(null).map(() => []);

    for (const bucket of oldBuckets) {
      for (const [key, value] of bucket) {
        this.put(key, value);
      }
    }
  }

  put(key, value) {
    if (this.size >= this.capacity * this.loadFactor) {
      this.resize();
    }

    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket[i][1] = value;
        return;
      }
    }

    bucket.push([key, value]);
    this.size++;
  }

  get(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (const [k, v] of bucket) {
      if (k === key) return v;
    }
    return undefined;
  }

  delete(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket.splice(i, 1);
        this.size--;
        return true;
      }
    }
    return false;
  }

  has(key) {
    return this.get(key) !== undefined;
  }
}

// Test Cases
const map = new HashMap();
map.put("key1", "value1");
map.put("key2", "value2");
console.log(map.get("key1")); // "value1"
console.log(map.has("key2")); // true
console.log(map.delete("key1")); // true
console.log(map.get("key1")); // undefined

// Load factor test
for (let i = 0; i < 20; i++) {
  map.put(`key${i}`, `value${i}`);
}
console.log(map.capacity); // Should be 32 (resized from 16)
