// Number of subarrays with product less than k (Variable Window)
const numSubarrayProductLessThanK = (nums, k) => {
  if (k <= 1) return 0;
  
  let left = 0, product = 1, count = 0;
  
  for (let right = 0; right < nums.length; right++) {
    product *= nums[right];
    
    while (product >= k) {
      product /= nums[left];
      left++;
    }
    
    count += right - left + 1;
  }
  
  return count;
};

// Test Cases
console.log(numSubarrayProductLessThanK([10, 5, 2, 6], 100)); // 8
console.log(numSubarrayProductLessThanK([1, 2, 3], 0)); // 0