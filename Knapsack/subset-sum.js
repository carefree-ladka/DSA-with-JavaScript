// Subset Sum Problem - Find if subset with given sum exists

// Brute Force - Try all subsets
const subsetSumBruteForce = (nums, target, i = 0) => {
  if (target === 0) return true;
  if (i === nums.length || target < 0) return false;
  
  return subsetSumBruteForce(nums, target - nums[i], i + 1) || 
         subsetSumBruteForce(nums, target, i + 1);
};

// Optimized DP - 2D table
const subsetSumDP = (nums, target) => {
  const n = nums.length;
  const dp = Array.from({length: n + 1}, () => new Array(target + 1).fill(false));
  
  // Base case: sum 0 is always possible
  for (let i = 0; i <= n; i++) {
    dp[i][0] = true;
  }
  
  for (let i = 1; i <= n; i++) {
    for (let sum = 1; sum <= target; sum++) {
      dp[i][sum] = dp[i - 1][sum]; // Exclude current element
      if (sum >= nums[i - 1]) {
        dp[i][sum] = dp[i][sum] || dp[i - 1][sum - nums[i - 1]]; // Include current element
      }
    }
  }
  
  return dp[n][target];
};

// Space Optimized DP - 1D array
const subsetSumOptimized = (nums, target) => {
  const dp = new Array(target + 1).fill(false);
  dp[0] = true;
  
  for (let num of nums) {
    for (let sum = target; sum >= num; sum--) {
      dp[sum] = dp[sum] || dp[sum - num];
    }
  }
  
  return dp[target];
};

// Find actual subset that sums to target
const findSubsetSum = (nums, target) => {
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
  
  // Backtrack to find subset
  const subset = [];
  let i = n, sum = target;
  
  while (i > 0 && sum > 0) {
    if (!dp[i - 1][sum]) {
      subset.push(nums[i - 1]);
      sum -= nums[i - 1];
    }
    i--;
  }
  
  return subset;
};

// Count number of subsets with given sum
const countSubsetSum = (nums, target) => {
  const dp = new Array(target + 1).fill(0);
  dp[0] = 1;
  
  for (let num of nums) {
    for (let sum = target; sum >= num; sum--) {
      dp[sum] += dp[sum - num];
    }
  }
  
  return dp[target];
};

// Test Cases
const nums = [3, 34, 4, 12, 5, 2];
const target = 9;

console.log("Brute Force:", subsetSumBruteForce(nums, target)); // true
console.log("DP:", subsetSumDP(nums, target)); // true
console.log("Optimized:", subsetSumOptimized(nums, target)); // true
console.log("Find Subset:", findSubsetSum(nums, target)); // [4, 5] or [2, 3, 4]
console.log("Count Subsets:", countSubsetSum(nums, target)); // 2