// Max consecutive ones after flipping at most k zeros (Variable Window)
const longestOnes = (nums, k) => {
  let left = 0, maxLen = 0, zeroCount = 0;
  
  for (let right = 0; right < nums.length; right++) {
    if (nums[right] === 0) zeroCount++;
    
    while (zeroCount > k) {
      if (nums[left] === 0) zeroCount--;
      left++;
    }
    
    maxLen = Math.max(maxLen, right - left + 1);
  }
  
  return maxLen;
};

// Test Cases
console.log(longestOnes([1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0], 2)); // 6
console.log(longestOnes([0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1], 3)); // 10