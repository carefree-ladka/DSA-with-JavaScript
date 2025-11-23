// All Paths From Source to Target - Find all paths from 0 to n-1
const allPathsSourceTarget = (graph) => {
  const result = [];
  const target = graph.length - 1;
  
  const dfs = (node, path) => {
    if (node === target) {
      result.push([...path]);
      return;
    }
    for (let neighbor of graph[node]) {
      path.push(neighbor);
      dfs(neighbor, path);
      path.pop();
    }
  };
  
  dfs(0, [0]);
  return result;
};

// Test Cases
console.log(allPathsSourceTarget([[1,2],[3],[3],[]])); // [[0,1,3],[0,2,3]]
console.log(allPathsSourceTarget([[4,3,1],[3,2,4],[3],[4],[]])); // [[0,4],[0,3,4],[0,1,3,4],[0,1,2,3,4],[0,1,4]]