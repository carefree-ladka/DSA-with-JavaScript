// Unbounded Knapsack Problem - Unlimited quantity of each item

// Brute Force - Try all combinations with repetition
const unboundedKnapsackBruteForce = (weights, values, capacity) => {
  if (capacity === 0) return 0;
  
  let maxValue = 0;
  for (let i = 0; i < weights.length; i++) {
    if (weights[i] <= capacity) {
      const value = values[i] + unboundedKnapsackBruteForce(weights, values, capacity - weights[i]);
      maxValue = Math.max(maxValue, value);
    }
  }
  
  return maxValue;
};

// Optimized DP - 1D array
const unboundedKnapsackDP = (weights, values, capacity) => {
  const dp = new Array(capacity + 1).fill(0);
  
  for (let w = 1; w <= capacity; w++) {
    for (let i = 0; i < weights.length; i++) {
      if (weights[i] <= w) {
        dp[w] = Math.max(dp[w], values[i] + dp[w - weights[i]]);
      }
    }
  }
  
  return dp[capacity];
};

// Alternative DP - Item-wise iteration
const unboundedKnapsackAlt = (weights, values, capacity) => {
  const dp = new Array(capacity + 1).fill(0);
  
  for (let i = 0; i < weights.length; i++) {
    for (let w = weights[i]; w <= capacity; w++) {
      dp[w] = Math.max(dp[w], values[i] + dp[w - weights[i]]);
    }
  }
  
  return dp[capacity];
};

// Test Cases
const weights = [1, 3, 4, 5];
const values = [10, 40, 50, 70];
const capacity = 8;

console.log("Brute Force:", unboundedKnapsackBruteForce(weights, values, capacity)); // 110
console.log("DP:", unboundedKnapsackDP(weights, values, capacity)); // 110
console.log("DP Alt:", unboundedKnapsackAlt(weights, values, capacity)); // 110