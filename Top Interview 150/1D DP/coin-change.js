// Coin Change - Minimum coins to make amount
const coinChange = (coins, amount) => {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  
  for (let coin of coins) {
    for (let i = coin; i <= amount; i++) {
      dp[i] = Math.min(dp[i], dp[i - coin] + 1);
    }
  }
  
  return dp[amount] === Infinity ? -1 : dp[amount];
};

// Test Cases
console.log(coinChange([1,3,4], 6)); // 2
console.log(coinChange([2], 3)); // -1