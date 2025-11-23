// Monotonic queue for sliding window maximum
class MonotonicQueue {
  constructor() {
    this.deque = [];
  }
  
  push(val) {
    while (this.deque.length && this.deque[this.deque.length - 1] < val) {
      this.deque.pop();
    }
    this.deque.push(val);
  }
  
  pop(val) {
    if (this.deque.length && this.deque[0] === val) {
      this.deque.shift();
    }
  }
  
  max() {
    return this.deque[0];
  }
}

// Sliding window maximum using monotonic queue
const maxSlidingWindow = (nums, k) => {
  const mq = new MonotonicQueue();
  const result = [];
  
  for (let i = 0; i < nums.length; i++) {
    if (i < k - 1) {
      mq.push(nums[i]);
    } else {
      mq.push(nums[i]);
      result.push(mq.max());
      mq.pop(nums[i - k + 1]);
    }
  }
  
  return result;
};

// Test Cases
console.log(maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3)); // [3,3,5,5,6,7]
console.log(maxSlidingWindow([1], 1)); // [1]