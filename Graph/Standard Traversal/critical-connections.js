// Critical Connections in a Network - Tarjan's bridge finding
const criticalConnections = (n, connections) => {
  const graph = Array.from({length: n}, () => []);
  for (let [u, v] of connections) {
    graph[u].push(v);
    graph[v].push(u);
  }
  
  const low = new Array(n).fill(-1);
  const disc = new Array(n).fill(-1);
  const visited = new Array(n).fill(false);
  const bridges = [];
  let time = 0;
  
  const dfs = (u, parent) => {
    visited[u] = true;
    disc[u] = low[u] = time++;
    
    for (let v of graph[u]) {
      if (v === parent) continue;
      if (!visited[v]) {
        dfs(v, u);
        low[u] = Math.min(low[u], low[v]);
        if (low[v] > disc[u]) bridges.push([u, v]);
      } else {
        low[u] = Math.min(low[u], disc[v]);
      }
    }
  };
  
  for (let i = 0; i < n; i++) {
    if (!visited[i]) dfs(i, -1);
  }
  return bridges;
};

// Test Cases
console.log(criticalConnections(4, [[0,1],[1,2],[2,0],[1,3]])); // [[1,3]]