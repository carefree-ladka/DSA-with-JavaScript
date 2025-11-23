// Maximal Network Rank - Find max sum of degrees
const maximalNetworkRank = (n, roads) => {
  const degree = new Array(n).fill(0);
  const connected = new Set();
  
  for (let [a, b] of roads) {
    degree[a]++;
    degree[b]++;
    connected.add(`${Math.min(a,b)},${Math.max(a,b)}`);
  }
  
  let maxRank = 0;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      let rank = degree[i] + degree[j];
      if (connected.has(`${i},${j}`)) rank--;
      maxRank = Math.max(maxRank, rank);
    }
  }
  return maxRank;
};

// Test Cases
console.log(maximalNetworkRank(4, [[0,1],[0,3],[1,2],[1,3]])); // 4
console.log(maximalNetworkRank(5, [[0,1],[0,3],[1,2],[1,3],[2,3],[2,4]])); // 5