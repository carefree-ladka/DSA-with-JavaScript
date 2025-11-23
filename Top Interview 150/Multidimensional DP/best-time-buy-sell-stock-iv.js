// Best Time to Buy and Sell Stock IV - At most k transactions
const maxProfit = (k, prices) => {
  if (!prices.length || k === 0) return 0;
  
  if (k >= prices.length / 2) {
    let profit = 0;
    for (let i = 1; i < prices.length; i++) {
      if (prices[i] > prices[i-1]) profit += prices[i] - prices[i-1];
    }
    return profit;
  }
  
  const buy = new Array(k + 1).fill(-prices[0]);
  const sell = new Array(k + 1).fill(0);
  
  for (let i = 1; i < prices.length; i++) {
    for (let j = k; j >= 1; j--) {
      sell[j] = Math.max(sell[j], buy[j] + prices[i]);
      buy[j] = Math.max(buy[j], sell[j-1] - prices[i]);
    }
  }
  
  return sell[k];
};

// Test Cases
console.log(maxProfit(2, [2,4,1])); // 2
console.log(maxProfit(2, [3,2,6,5,0,3])); // 7