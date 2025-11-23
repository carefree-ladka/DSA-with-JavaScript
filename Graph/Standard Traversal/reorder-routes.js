// Reorder Routes to Make All Paths Lead to City Zero
const minReorder = (n, connections) => {
  const graph = Array.from({length: n}, () => []);
  const roads = new Set();
  
  for (let [a, b] of connections) {
    graph[a].push(b);
    graph[b].push(a);
    roads.add(`${a},${b}`);
  }
  
  let changes = 0;
  const visited = new Set();
  
  const dfs = (city) => {
    visited.add(city);
    for (let neighbor of graph[city]) {
      if (!visited.has(neighbor)) {
        if (roads.has(`${city},${neighbor}`)) changes++;
        dfs(neighbor);
      }
    }
  };
  
  dfs(0);
  return changes;
};

// Test Cases
console.log(minReorder(6, [[0,1],[1,3],[2,3],[4,0],[4,5]])); // 3
console.log(minReorder(5, [[1,0],[1,2],[3,2],[3,4]])); // 2