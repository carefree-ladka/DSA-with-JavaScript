// Difference Array Pattern - Range Update in O(1)
class DifferenceArray {
  constructor(arr) {
    this.n = arr.length;
    this.diff = new Array(this.n + 1).fill(0);
    
    // Build difference array
    this.diff[0] = arr[0];
    for (let i = 1; i < this.n; i++) {
      this.diff[i] = arr[i] - arr[i - 1];
    }
  }
  
  // Range update: add val to [left, right]
  update(left, right, val) {
    this.diff[left] += val;
    this.diff[right + 1] -= val;
  }
  
  // Get final array after all updates
  getArray() {
    const result = new Array(this.n);
    result[0] = this.diff[0];
    
    for (let i = 1; i < this.n; i++) {
      result[i] = result[i - 1] + this.diff[i];
    }
    
    return result;
  }
}

// Range Addition (LeetCode 370)
const getModifiedArray = (length, updates) => {
  const diff = new Array(length + 1).fill(0);
  
  for (const [start, end, inc] of updates) {
    diff[start] += inc;
    diff[end + 1] -= inc;
  }
  
  const result = new Array(length);
  result[0] = diff[0];
  
  for (let i = 1; i < length; i++) {
    result[i] = result[i - 1] + diff[i];
  }
  
  return result;
};

// Test Cases
const diffArr = new DifferenceArray([1, 2, 3, 4, 5]);
diffArr.update(1, 3, 2); // Add 2 to indices 1-3
console.log(diffArr.getArray()); // [1, 4, 5, 6, 5]

console.log(getModifiedArray(5, [[1,3,2],[2,4,3],[0,2,-2]])); // [-2,0,3,5,3]