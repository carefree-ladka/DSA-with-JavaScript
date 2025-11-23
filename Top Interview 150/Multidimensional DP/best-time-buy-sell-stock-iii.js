// Best Time to Buy and Sell Stock III - At most 2 transactions
const maxProfit = (prices) => {
  let buy1 = -prices[0], sell1 = 0;
  let buy2 = -prices[0], sell2 = 0;
  
  for (let i = 1; i < prices.length; i++) {
    buy1 = Math.max(buy1, -prices[i]);
    sell1 = Math.max(sell1, buy1 + prices[i]);
    buy2 = Math.max(buy2, sell1 - prices[i]);
    sell2 = Math.max(sell2, buy2 + prices[i]);
  }
  
  return sell2;
};

// Test Cases
console.log(maxProfit([3,3,5,0,0,3,1,4])); // 6
console.log(maxProfit([1,2,3,4,5])); // 4