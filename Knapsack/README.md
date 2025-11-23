# Knapsack Problems Collection

A comprehensive collection of knapsack problem variants with both brute force and optimized dynamic programming solutions.

## 📁 Structure

```
Knapsack/
├── 01-knapsack.js              # Classic 0/1 knapsack problem
├── unbounded-knapsack.js       # Unlimited items knapsack
├── fractional-knapsack.js      # Items can be fractioned
├── bounded-knapsack.js         # Limited quantity per item
├── subset-sum.js               # Find subset with target sum
├── partition-equal-subset.js   # Divide into equal sum subsets
└── README.md                   # This file
```

## 🎯 Problem Variants

### 0/1 Knapsack (01-knapsack.js)
**Problem**: Each item can be taken at most once
- **Brute Force**: O(2^n) - Try all combinations
- **DP 2D**: O(n×W) time, O(n×W) space
- **DP Optimized**: O(n×W) time, O(W) space

### Unbounded Knapsack (unbounded-knapsack.js)
**Problem**: Unlimited quantity of each item
- **Brute Force**: O(W^n) - Exponential combinations
- **DP**: O(n×W) time, O(W) space
- **Key Insight**: Inner loop goes forward (allows reuse)

### Fractional Knapsack (fractional-knapsack.js)
**Problem**: Items can be broken into fractions
- **Greedy**: O(n log n) - Sort by value/weight ratio
- **Optimal**: Greedy gives optimal solution
- **No DP needed**: Continuous optimization problem

### Bounded Knapsack (bounded-knapsack.js)
**Problem**: Limited quantity of each item type
- **Brute Force**: O(∏quantities^i) - Try all combinations
- **DP**: O(n×W×max_quantity) time
- **Binary Lifting**: Convert to 0/1 knapsack efficiently

### Subset Sum (subset-sum.js)
**Problem**: Find if subset exists with target sum
- **Brute Force**: O(2^n) - Try all subsets
- **DP**: O(n×target) time, O(target) space
- **Variations**: Count subsets, find actual subset

### Partition Equal Subset (partition-equal-subset.js)
**Problem**: Divide array into two equal sum parts
- **Reduction**: Subset sum with target = totalSum/2
- **DP**: O(n×sum) time, O(sum) space
- **Optimization**: Early termination when found

## 📊 Complexity Comparison

| Problem | Brute Force | Optimized DP | Space |
|---------|-------------|--------------|-------|
| **0/1 Knapsack** | O(2^n) | O(n×W) | O(W) |
| **Unbounded** | O(W^n) | O(n×W) | O(W) |
| **Fractional** | O(n log n) | O(n log n) | O(1) |
| **Bounded** | O(∏q_i) | O(n×W×q) | O(W) |
| **Subset Sum** | O(2^n) | O(n×S) | O(S) |
| **Partition** | O(2^n) | O(n×S) | O(S) |

*Where n = items, W = capacity, S = sum, q = max quantity*

## 🚀 Key Optimization Techniques

### Space Optimization
```javascript
// 2D DP → 1D DP
for (let i = 0; i < n; i++) {
  for (let w = capacity; w >= weights[i]; w--) { // Reverse iteration
    dp[w] = Math.max(dp[w], values[i] + dp[w - weights[i]]);
  }
}
```

### Binary Lifting (Bounded Knapsack)
```javascript
// Convert bounded to 0/1 by creating multiple items
let remaining = quantity, multiplier = 1;
while (remaining > 0) {
  const take = Math.min(remaining, multiplier);
  newItems.push({weight: take * w, value: take * v});
  remaining -= take;
  multiplier *= 2;
}
```

### Greedy Choice (Fractional)
```javascript
// Sort by value-to-weight ratio
items.sort((a, b) => (b.value/b.weight) - (a.value/a.weight));
```

## 💡 Problem Recognition Patterns

### When to Use Each Variant
- **0/1 Knapsack**: Items are indivisible, each used once
- **Unbounded**: Items can be reused unlimited times
- **Fractional**: Items can be partially taken (continuous)
- **Bounded**: Items have limited quantities available
- **Subset Sum**: Binary choice problem (take/don't take)
- **Partition**: Special case of subset sum

### DP State Transitions
```javascript
// 0/1 Knapsack
dp[i][w] = Math.max(dp[i-1][w], values[i] + dp[i-1][w-weights[i]]);

// Unbounded Knapsack  
dp[w] = Math.max(dp[w], values[i] + dp[w-weights[i]]);

// Subset Sum
dp[sum] = dp[sum] || dp[sum-nums[i]];
```

## 🎓 Interview Applications

### Common Variations Asked
1. **Coin Change**: Unbounded knapsack variant
2. **Target Sum**: Subset sum with +/- signs
3. **Minimum Subset Sum Difference**: Partition optimization
4. **Perfect Squares**: Unbounded with perfect square weights
5. **Combination Sum**: Backtracking + knapsack hybrid

### Problem Identification Tips
- **"Maximum value"** → Knapsack optimization
- **"Exact sum"** → Subset sum problem
- **"Unlimited use"** → Unbounded knapsack
- **"Equal partition"** → Partition subset sum
- **"Minimum coins"** → Coin change (unbounded)

## 🔧 Implementation Notes

### Common Pitfalls
- **Space optimization**: Iterate weights in reverse for 0/1
- **Unbounded vs 0/1**: Forward vs backward iteration
- **Integer overflow**: Use appropriate data types
- **Base cases**: Handle empty set and zero capacity

### Optimization Strategies
- **Early termination**: Stop when target found
- **Pruning**: Skip impossible states
- **Memory**: Use rolling arrays for large inputs
- **Preprocessing**: Sort items by efficiency

Perfect for dynamic programming mastery and technical interview preparation!