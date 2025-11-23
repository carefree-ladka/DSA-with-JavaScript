// Shortest Path with Alternating Colors - BFS with color state
const shortestAlternatingPaths = (n, redEdges, blueEdges) => {
  const graph = [Array.from({length: n}, () => []), Array.from({length: n}, () => [])];
  
  for (let [u, v] of redEdges) graph[0][u].push(v);
  for (let [u, v] of blueEdges) graph[1][u].push(v);
  
  const result = new Array(n).fill(-1);
  const visited = [new Array(n).fill(false), new Array(n).fill(false)];
  const queue = [[0, 0, 0], [0, 1, 0]]; // [node, color, distance]
  
  while (queue.length) {
    const [node, color, dist] = queue.shift();
    if (result[node] === -1) result[node] = dist;
    
    for (let next of graph[1 - color][node]) {
      if (!visited[1 - color][next]) {
        visited[1 - color][next] = true;
        queue.push([next, 1 - color, dist + 1]);
      }
    }
  }
  return result;
};

// Test Cases
console.log(shortestAlternatingPaths(3, [[0,1],[1,2]], [])); // [0,1,-1]