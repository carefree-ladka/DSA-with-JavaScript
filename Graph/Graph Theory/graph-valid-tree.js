// Graph Valid Tree - Check if graph is connected and acyclic
const validTree = (n, edges) => {
  if (edges.length !== n - 1) return false;
  
  const graph = Array.from({length: n}, () => []);
  for (let [u, v] of edges) {
    graph[u].push(v);
    graph[v].push(u);
  }
  
  const visited = new Set();
  const dfs = (node, parent) => {
    visited.add(node);
    for (let neighbor of graph[node]) {
      if (neighbor === parent) continue;
      if (visited.has(neighbor) || !dfs(neighbor, node)) return false;
    }
    return true;
  };
  
  return dfs(0, -1) && visited.size === n;
};

// Test Cases
console.log(validTree(5, [[0,1],[0,2],[0,3],[1,4]])); // true
console.log(validTree(5, [[0,1],[1,2],[2,3],[1,3],[1,4]])); // false