// Minimum Number of Vertices to Reach All Nodes
const findSmallestSetOfVertices = (n, edges) => {
  const hasIncoming = new Set();
  for (let [from, to] of edges) {
    hasIncoming.add(to);
  }
  
  const result = [];
  for (let i = 0; i < n; i++) {
    if (!hasIncoming.has(i)) result.push(i);
  }
  return result;
};

// Test Cases
console.log(findSmallestSetOfVertices(6, [[0,1],[0,2],[2,5],[3,4],[4,2]])); // [0,3]
console.log(findSmallestSetOfVertices(5, [[0,1],[2,1],[3,1],[1,4],[2,4]])); // [0,2,3]