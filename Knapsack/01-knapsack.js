// 0/1 Knapsack Problem - Each item can be taken at most once

// Brute Force - Try all combinations
const knapsackBruteForce = (weights, values, capacity, n = weights.length) => {
  if (n === 0 || capacity === 0) return 0;
  
  if (weights[n - 1] > capacity) {
    return knapsackBruteForce(weights, values, capacity, n - 1);
  }
  
  const include = values[n - 1] + knapsackBruteForce(weights, values, capacity - weights[n - 1], n - 1);
  const exclude = knapsackBruteForce(weights, values, capacity, n - 1);
  
  return Math.max(include, exclude);
};

// Optimized DP - 2D table
const knapsackDP = (weights, values, capacity) => {
  const n = weights.length;
  const dp = Array.from({length: n + 1}, () => new Array(capacity + 1).fill(0));
  
  for (let i = 1; i <= n; i++) {
    for (let w = 1; w <= capacity; w++) {
      if (weights[i - 1] <= w) {
        dp[i][w] = Math.max(
          values[i - 1] + dp[i - 1][w - weights[i - 1]],
          dp[i - 1][w]
        );
      } else {
        dp[i][w] = dp[i - 1][w];
      }
    }
  }
  
  return dp[n][capacity];
};

// Space Optimized DP - 1D array
const knapsackOptimized = (weights, values, capacity) => {
  const dp = new Array(capacity + 1).fill(0);
  
  for (let i = 0; i < weights.length; i++) {
    for (let w = capacity; w >= weights[i]; w--) {
      dp[w] = Math.max(dp[w], values[i] + dp[w - weights[i]]);
    }
  }
  
  return dp[capacity];
};

// Test Cases
const weights = [1, 3, 4, 5];
const values = [1, 4, 5, 7];
const capacity = 7;

console.log("Brute Force:", knapsackBruteForce(weights, values, capacity)); // 9
console.log("DP 2D:", knapsackDP(weights, values, capacity)); // 9
console.log("DP Optimized:", knapsackOptimized(weights, values, capacity)); // 9