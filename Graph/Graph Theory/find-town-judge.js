// Find the Town Judge - Find node with in-degree n-1 and out-degree 0
const findJudge = (n, trust) => {
  const count = new Array(n + 1).fill(0);
  
  for (let [a, b] of trust) {
    count[a]--;
    count[b]++;
  }
  
  for (let i = 1; i <= n; i++) {
    if (count[i] === n - 1) return i;
  }
  return -1;
};

// Test Cases
console.log(findJudge(2, [[1,2]])); // 2
console.log(findJudge(3, [[1,3],[2,3]])); // 3
console.log(findJudge(3, [[1,3],[2,3],[3,1]])); // -1