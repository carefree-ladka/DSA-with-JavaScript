// Clone Graph - Deep clone undirected graph
const cloneGraph = (node) => {
  if (!node) return null;
  const visited = new Map();
  
  const dfs = (node) => {
    if (visited.has(node)) return visited.get(node);
    
    const clone = new Node(node.val);
    visited.set(node, clone);
    
    for (let neighbor of node.neighbors) {
      clone.neighbors.push(dfs(neighbor));
    }
    
    return clone;
  };
  
  return dfs(node);
};

// Test Cases
// function Node(val, neighbors) { this.val = val; this.neighbors = neighbors; }
// console.log(cloneGraph([[2,4],[1,3],[2,4],[1,3]])); // [[2,4],[1,3],[2,4],[1,3]]