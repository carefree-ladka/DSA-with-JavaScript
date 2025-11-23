// Interleaving String - Check if s3 is interleaving of s1 and s2
const isInterleave = (s1, s2, s3) => {
  if (s1.length + s2.length !== s3.length) return false;
  
  const dp = Array.from({length: s1.length + 1}, () => new Array(s2.length + 1).fill(false));
  dp[0][0] = true;
  
  for (let i = 1; i <= s1.length; i++) {
    dp[i][0] = dp[i-1][0] && s1[i-1] === s3[i-1];
  }
  
  for (let j = 1; j <= s2.length; j++) {
    dp[0][j] = dp[0][j-1] && s2[j-1] === s3[j-1];
  }
  
  for (let i = 1; i <= s1.length; i++) {
    for (let j = 1; j <= s2.length; j++) {
      dp[i][j] = (dp[i-1][j] && s1[i-1] === s3[i+j-1]) || 
                 (dp[i][j-1] && s2[j-1] === s3[i+j-1]);
    }
  }
  
  return dp[s1.length][s2.length];
};

// Test Cases
console.log(isInterleave("aabcc", "dbbca", "aadbbcbcac")); // true
console.log(isInterleave("aabcc", "dbbca", "aadbbbaccc")); // false