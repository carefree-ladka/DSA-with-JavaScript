// Evaluate Division - Evaluate division equations
const calcEquation = (equations, values, queries) => {
  const graph = new Map();
  
  for (let i = 0; i < equations.length; i++) {
    const [a, b] = equations[i];
    const val = values[i];
    if (!graph.has(a)) graph.set(a, []);
    if (!graph.has(b)) graph.set(b, []);
    graph.get(a).push([b, val]);
    graph.get(b).push([a, 1 / val]);
  }
  
  const dfs = (start, end, visited) => {
    if (!graph.has(start) || !graph.has(end)) return -1;
    if (start === end) return 1;
    
    visited.add(start);
    for (let [neighbor, val] of graph.get(start)) {
      if (!visited.has(neighbor)) {
        const result = dfs(neighbor, end, visited);
        if (result !== -1) return val * result;
      }
    }
    return -1;
  };
  
  return queries.map(([a, b]) => dfs(a, b, new Set()));
};

// Test Cases
console.log(calcEquation([["a","b"],["b","c"]], [2.0,3.0], [["a","c"],["b","a"],["a","e"],["a","a"],["x","x"]])); 
// [6.00000,0.50000,-1.00000,1.00000,-1.00000]