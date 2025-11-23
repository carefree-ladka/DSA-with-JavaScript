// House Robber - Maximum money without robbing adjacent houses
const rob = (nums) => {
  let prev2 = 0, prev1 = 0;
  for (let num of nums) {
    const curr = Math.max(prev1, prev2 + num);
    prev2 = prev1;
    prev1 = curr;
  }
  return prev1;
};

// Test Cases
console.log(rob([1,2,3,1])); // 4
console.log(rob([2,7,9,3,1])); // 12