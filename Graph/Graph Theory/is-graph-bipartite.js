// Is Graph Bipartite? - Check if graph can be 2-colored
const isBipartite = (graph) => {
  const n = graph.length;
  const color = new Array(n).fill(-1);
  
  const dfs = (node, c) => {
    color[node] = c;
    for (let neighbor of graph[node]) {
      if (color[neighbor] === c) return false;
      if (color[neighbor] === -1 && !dfs(neighbor, 1 - c)) return false;
    }
    return true;
  };
  
  for (let i = 0; i < n; i++) {
    if (color[i] === -1 && !dfs(i, 0)) return false;
  }
  return true;
};

// Test Cases
console.log(isBipartite([[1,2,3],[0,2],[0,1,3],[0,2]])); // false
console.log(isBipartite([[1,3],[0,2],[1,3],[0,2]])); // true