// Maximum sum of subarray of size k (Fixed Window)
const maxSumSubarray = (nums, k) => {
  let sum = 0;
  for (let i = 0; i < k; i++) sum += nums[i];
  
  let maxSum = sum;
  for (let i = k; i < nums.length; i++) {
    sum += nums[i] - nums[i - k];
    maxSum = Math.max(maxSum, sum);
  }
  return maxSum;
};

// Test Cases
console.log(maxSumSubarray([2, 1, 5, 1, 3, 2], 3)); // 9
console.log(maxSumSubarray([2, 3, 4, 1, 5], 2)); // 7