// Number of Provinces - Count connected components
const findCircleNum = (isConnected) => {
  const n = isConnected.length;
  const visited = new Array(n).fill(false);
  let provinces = 0;
  
  const dfs = (i) => {
    visited[i] = true;
    for (let j = 0; j < n; j++) {
      if (isConnected[i][j] && !visited[j]) dfs(j);
    }
  };
  
  for (let i = 0; i < n; i++) {
    if (!visited[i]) {
      dfs(i);
      provinces++;
    }
  }
  return provinces;
};

// Test Cases
console.log(findCircleNum([[1,1,0],[1,1,0],[0,0,1]])); // 2
console.log(findCircleNum([[1,0,0],[0,1,0],[0,0,1]])); // 3