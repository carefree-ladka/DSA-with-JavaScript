// Edit Distance - Minimum operations to convert word1 to word2
const minDistance = (word1, word2) => {
  const m = word1.length, n = word2.length;
  const dp = Array.from({length: m + 1}, () => new Array(n + 1));
  
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      }
    }
  }
  
  return dp[m][n];
};

// Test Cases
console.log(minDistance("horse", "ros")); // 3
console.log(minDistance("intention", "execution")); // 5