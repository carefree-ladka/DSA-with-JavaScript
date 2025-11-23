// Bounded Knapsack Problem - Limited quantity of each item

// Brute Force - Try all combinations with quantity limits
const boundedKnapsackBruteForce = (weights, values, quantities, capacity, i = 0) => {
  if (i === weights.length || capacity === 0) return 0;
  
  let maxValue = boundedKnapsackBruteForce(weights, values, quantities, capacity, i + 1);
  
  for (let k = 1; k <= quantities[i] && k * weights[i] <= capacity; k++) {
    const value = k * values[i] + boundedKnapsackBruteForce(weights, values, quantities, capacity - k * weights[i], i + 1);
    maxValue = Math.max(maxValue, value);
  }
  
  return maxValue;
};

// Optimized DP - 3D approach
const boundedKnapsackDP = (weights, values, quantities, capacity) => {
  const n = weights.length;
  const dp = Array.from({length: n + 1}, () => new Array(capacity + 1).fill(0));
  
  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= capacity; w++) {
      dp[i][w] = dp[i - 1][w]; // Don't take item
      
      for (let k = 1; k <= quantities[i - 1] && k * weights[i - 1] <= w; k++) {
        dp[i][w] = Math.max(dp[i][w], k * values[i - 1] + dp[i - 1][w - k * weights[i - 1]]);
      }
    }
  }
  
  return dp[n][capacity];
};

// Space Optimized DP - 1D array
const boundedKnapsackOptimized = (weights, values, quantities, capacity) => {
  const dp = new Array(capacity + 1).fill(0);
  
  for (let i = 0; i < weights.length; i++) {
    for (let w = capacity; w >= weights[i]; w--) {
      for (let k = 1; k <= quantities[i] && k * weights[i] <= w; k++) {
        dp[w] = Math.max(dp[w], k * values[i] + dp[w - k * weights[i]]);
      }
    }
  }
  
  return dp[capacity];
};

// Binary Lifting Optimization - Convert to 0/1 knapsack
const boundedKnapsackBinaryLifting = (weights, values, quantities, capacity) => {
  const newWeights = [];
  const newValues = [];
  
  for (let i = 0; i < weights.length; i++) {
    let remaining = quantities[i];
    let multiplier = 1;
    
    while (remaining > 0) {
      const take = Math.min(remaining, multiplier);
      newWeights.push(take * weights[i]);
      newValues.push(take * values[i]);
      remaining -= take;
      multiplier *= 2;
    }
  }
  
  // Apply 0/1 knapsack
  const dp = new Array(capacity + 1).fill(0);
  for (let i = 0; i < newWeights.length; i++) {
    for (let w = capacity; w >= newWeights[i]; w--) {
      dp[w] = Math.max(dp[w], newValues[i] + dp[w - newWeights[i]]);
    }
  }
  
  return dp[capacity];
};

// Test Cases
const weights = [1, 3, 4, 5];
const values = [10, 40, 50, 70];
const quantities = [3, 2, 1, 2];
const capacity = 10;

console.log("Brute Force:", boundedKnapsackBruteForce(weights, values, quantities, capacity)); // 170
console.log("DP:", boundedKnapsackDP(weights, values, quantities, capacity)); // 170
console.log("Optimized:", boundedKnapsackOptimized(weights, values, quantities, capacity)); // 170
console.log("Binary Lifting:", boundedKnapsackBinaryLifting(weights, values, quantities, capacity)); // 170