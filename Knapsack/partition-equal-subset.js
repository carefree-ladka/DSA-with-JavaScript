// Partition Equal Subset Sum - Divide array into two equal sum subsets

// Brute Force - Try all possible partitions
const canPartitionBruteForce = (nums) => {
  const totalSum = nums.reduce((sum, num) => sum + num, 0);
  if (totalSum % 2 !== 0) return false;
  
  const target = totalSum / 2;
  
  const backtrack = (index, currentSum) => {
    if (currentSum === target) return true;
    if (index >= nums.length || currentSum > target) return false;
    
    return backtrack(index + 1, currentSum + nums[index]) || 
           backtrack(index + 1, currentSum);
  };
  
  return backtrack(0, 0);
};

// Optimized DP - Subset sum approach
const canPartitionDP = (nums) => {
  const totalSum = nums.reduce((sum, num) => sum + num, 0);
  if (totalSum % 2 !== 0) return false;
  
  const target = totalSum / 2;
  const dp = new Array(target + 1).fill(false);
  dp[0] = true;
  
  for (let num of nums) {
    for (let sum = target; sum >= num; sum--) {
      dp[sum] = dp[sum] || dp[sum - num];
    }
  }
  
  return dp[target];
};

// Find actual partition
const findPartition = (nums) => {
  const totalSum = nums.reduce((sum, num) => sum + num, 0);
  if (totalSum % 2 !== 0) return null;
  
  const target = totalSum / 2;
  const n = nums.length;
  const dp = Array.from({length: n + 1}, () => new Array(target + 1).fill(false));
  
  for (let i = 0; i <= n; i++) {
    dp[i][0] = true;
  }
  
  for (let i = 1; i <= n; i++) {
    for (let sum = 1; sum <= target; sum++) {
      dp[i][sum] = dp[i - 1][sum];
      if (sum >= nums[i - 1]) {
        dp[i][sum] = dp[i][sum] || dp[i - 1][sum - nums[i - 1]];
      }
    }
  }
  
  if (!dp[n][target]) return null;
  
  // Backtrack to find partition
  const subset1 = [];
  const subset2 = [];
  let i = n, sum = target;
  
  while (i > 0 && sum > 0) {
    if (!dp[i - 1][sum]) {
      subset1.push(nums[i - 1]);
      sum -= nums[i - 1];
    } else {
      subset2.push(nums[i - 1]);
    }
    i--;
  }
  
  // Add remaining elements to subset2
  while (i > 0) {
    subset2.push(nums[i - 1]);
    i--;
  }
  
  return [subset1, subset2];
};

// Optimized with early termination
const canPartitionOptimized = (nums) => {
  const totalSum = nums.reduce((sum, num) => sum + num, 0);
  if (totalSum % 2 !== 0) return false;
  
  const target = totalSum / 2;
  const maxNum = Math.max(...nums);
  if (maxNum > target) return false;
  
  const dp = new Array(target + 1).fill(false);
  dp[0] = true;
  
  for (let num of nums) {
    for (let sum = target; sum >= num; sum--) {
      dp[sum] = dp[sum] || dp[sum - num];
      if (dp[target]) return true; // Early termination
    }
  }
  
  return dp[target];
};

// Test Cases
const nums1 = [1, 5, 11, 5];
const nums2 = [1, 2, 3, 5];

console.log("Brute Force [1,5,11,5]:", canPartitionBruteForce(nums1)); // true
console.log("DP [1,5,11,5]:", canPartitionDP(nums1)); // true
console.log("Optimized [1,2,3,5]:", canPartitionOptimized(nums2)); // false
console.log("Find Partition [1,5,11,5]:", findPartition(nums1)); // [[11, 1], [5, 5]]