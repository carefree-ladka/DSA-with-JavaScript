// Insert Delete GetRandom O(1) - RandomizedSet data structure
class RandomizedSet {
  constructor() {
    this.nums = [];
    this.indices = new Map();
  }
  
  insert(val) {
    if (this.indices.has(val)) return false;
    this.indices.set(val, this.nums.length);
    this.nums.push(val);
    return true;
  }
  
  remove(val) {
    if (!this.indices.has(val)) return false;
    const idx = this.indices.get(val);
    const last = this.nums[this.nums.length - 1];
    this.nums[idx] = last;
    this.indices.set(last, idx);
    this.nums.pop();
    this.indices.delete(val);
    return true;
  }
  
  getRandom() {
    return this.nums[Math.floor(Math.random() * this.nums.length)];
  }
}

// Test Cases
const rs = new RandomizedSet();
console.log(rs.insert(1)); // true
console.log(rs.remove(2)); // false
console.log(rs.insert(2)); // true