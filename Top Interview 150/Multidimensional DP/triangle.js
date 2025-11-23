// Triangle - Find minimum path sum from top to bottom
const minimumTotal = (triangle) => {
  const dp = [...triangle[triangle.length - 1]];
  
  for (let i = triangle.length - 2; i >= 0; i--) {
    for (let j = 0; j < triangle[i].length; j++) {
      dp[j] = triangle[i][j] + Math.min(dp[j], dp[j + 1]);
    }
  }
  
  return dp[0];
};

// Test Cases
console.log(minimumTotal([[2],[3,4],[6,5,7],[4,1,8,3]])); // 11
console.log(minimumTotal([[-10]])); // -10