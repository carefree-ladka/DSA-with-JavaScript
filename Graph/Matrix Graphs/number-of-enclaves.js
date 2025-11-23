// Number of Enclaves - Count land cells not connected to boundary
const numEnclaves = (grid) => {
  const m = grid.length, n = grid[0].length;
  
  const dfs = (i, j) => {
    if (i < 0 || i >= m || j < 0 || j >= n || grid[i][j] === 0) return;
    grid[i][j] = 0;
    dfs(i+1, j); dfs(i-1, j); dfs(i, j+1); dfs(i, j-1);
  };
  
  // Mark boundary-connected land as water
  for (let i = 0; i < m; i++) {
    dfs(i, 0); dfs(i, n-1);
  }
  for (let j = 0; j < n; j++) {
    dfs(0, j); dfs(m-1, j);
  }
  
  // Count remaining land
  let count = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 1) count++;
    }
  }
  return count;
};

// Test Cases
console.log(numEnclaves([[0,0,0,0],[1,0,1,0],[0,1,1,0],[0,0,0,0]])); // 3