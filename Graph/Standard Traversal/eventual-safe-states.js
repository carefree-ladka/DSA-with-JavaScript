// Find Eventual Safe States - Find nodes that lead to terminal nodes
const eventualSafeNodes = (graph) => {
  const n = graph.length;
  const color = new Array(n).fill(0); // 0: white, 1: gray, 2: black
  
  const dfs = (node) => {
    if (color[node] !== 0) return color[node] === 2;
    color[node] = 1;
    for (let neighbor of graph[node]) {
      if (!dfs(neighbor)) return false;
    }
    color[node] = 2;
    return true;
  };
  
  const result = [];
  for (let i = 0; i < n; i++) {
    if (dfs(i)) result.push(i);
  }
  return result;
};

// Test Cases
console.log(eventualSafeNodes([[1,2],[2,3],[5],[0],[5],[],[]])); // [2,4,5,6]