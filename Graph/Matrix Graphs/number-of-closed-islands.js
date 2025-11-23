// Number of Closed Islands - Count islands not touching boundary
const closedIsland = (grid) => {
  const m = grid.length, n = grid[0].length;
  
  const dfs = (i, j) => {
    if (i < 0 || i >= m || j < 0 || j >= n) return false;
    if (grid[i][j] === 1) return true;
    grid[i][j] = 1;
    
    const top = dfs(i-1, j);
    const bottom = dfs(i+1, j);
    const left = dfs(i, j-1);
    const right = dfs(i, j+1);
    
    return top && bottom && left && right;
  };
  
  let count = 0;
  for (let i = 1; i < m-1; i++) {
    for (let j = 1; j < n-1; j++) {
      if (grid[i][j] === 0 && dfs(i, j)) count++;
    }
  }
  return count;
};

// Test Cases
console.log(closedIsland([[1,1,1,1,1,1,1,0],[1,0,0,0,0,1,1,0],[1,0,1,0,1,1,1,0],[1,0,0,0,0,1,0,1],[1,1,1,1,1,1,1,0]])); // 2