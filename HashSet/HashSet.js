// HashSet with Load Factor Implementation
class HashSet {
  constructor(capacity = 16, loadFactor = 0.75) {
    this.capacity = capacity;
    this.loadFactor = loadFactor;
    this.size = 0;
    this.buckets = new Array(capacity).fill(null).map(() => []);
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
      for (const key of bucket) {
        this.add(key);
      }
    }
  }

  add(key) {
    if (this.size >= this.capacity * this.loadFactor) {
      this.resize();
    }

    const index = this.hash(key);
    const bucket = this.buckets[index];

    if (!bucket.includes(key)) {
      bucket.push(key);
      this.size++;
    }
  }

  has(key) {
    const index = this.hash(key);
    return this.buckets[index].includes(key);
  }

  delete(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    const keyIndex = bucket.indexOf(key);

    if (keyIndex !== -1) {
      bucket.splice(keyIndex, 1);
      this.size--;
      return true;
    }
    return false;
  }

  values() {
    const result = [];
    for (const bucket of this.buckets) {
      result.push(...bucket);
    }
    return result;
  }
}

// Test Cases
const set = new HashSet();
set.add("apple");
set.add("banana");
set.add("apple"); // duplicate
console.log(set.has("apple")); // true
console.log(set.has("orange")); // false
console.log(set.size); // 2
console.log(set.delete("banana")); // true
console.log(set.values()); // ["apple"]

// Load factor test
for (let i = 0; i < 20; i++) {
  set.add(`item${i}`);
}
console.log(set.capacity); // Should be 32 (resized from 16)
