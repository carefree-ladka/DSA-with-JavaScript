// Kth Largest Element in Array
const findKthLargest = (nums, k) => {
  return nums.sort((a, b) => b - a)[k - 1];
};

// Kth Largest Element in Stream
class KthLargest {
  constructor(k, nums) {
    this.k = k;
    this.heap = nums.sort((a, b) => a - b);
    while (this.heap.length > k) {
      this.heap.shift();
    }
  }
  
  add(val) {
    this.heap.push(val);
    this.heap.sort((a, b) => a - b);
    if (this.heap.length > this.k) {
      this.heap.shift();
    }
    return this.heap[0];
  }
}

// Test Cases
console.log(findKthLargest([3, 2, 1, 5, 6, 4], 2)); // 5
const kthLargest = new KthLargest(3, [4, 5, 8, 2]);
console.log(kthLargest.add(3)); // 4
console.log(kthLargest.add(5)); // 5