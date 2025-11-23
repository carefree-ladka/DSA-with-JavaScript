// Sliding window minimum using monotonic deque
const slidingWindowMinimum = (nums, k) => {
  const deque = [];
  const result = [];
  
  for (let i = 0; i < nums.length; i++) {
    // Remove elements outside window
    while (deque.length && deque[0] <= i - k) {
      deque.shift();
    }
    
    // Maintain increasing order (for minimum)
    while (deque.length && nums[deque[deque.length - 1]] >= nums[i]) {
      deque.pop();
    }
    
    deque.push(i);
    
    if (i >= k - 1) {
      result.push(nums[deque[0]]);
    }
  }
  
  return result;
};

// Test Cases
console.log(slidingWindowMinimum([1, 3, -1, -3, 5, 3, 6, 7], 3)); // [1,-1,-3,-3,3,3]
console.log(slidingWindowMinimum([1, -1], 1)); // [1,-1]