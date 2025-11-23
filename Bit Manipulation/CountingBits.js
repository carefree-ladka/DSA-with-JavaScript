// Count bits for numbers 0 to n using DP
const countBits = (n) => {
  const dp = new Array(n + 1);
  dp[0] = 0;
  
  for (let i = 1; i <= n; i++) {
    dp[i] = dp[i >> 1] + (i & 1);
  }
  
  return dp;
};

// Test Cases
console.log(countBits(2)); // [0,1,1]
console.log(countBits(5)); // [0,1,1,2,1,2]