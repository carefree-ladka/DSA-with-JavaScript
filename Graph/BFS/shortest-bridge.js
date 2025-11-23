// Shortest Bridge - Find shortest bridge between two islands
const shortestBridge = (grid) => {
  const n = grid.length;
  const dirs = [[0,1],[1,0],[0,-1],[-1,0]];
  const queue = [];
  
  const dfs = (i, j) => {
    if (i < 0 || i >= n || j < 0 || j >= n || grid[i][j] !== 1) return;
    grid[i][j] = 2;
    queue.push([i, j, 0]);
    for (let [di, dj] of dirs) dfs(i + di, j + dj);
  };
  
  // Find first island and mark as 2
  let found = false;
  for (let i = 0; i < n && !found; i++) {
    for (let j = 0; j < n && !found; j++) {
      if (grid[i][j] === 1) {
        dfs(i, j);
        found = true;
      }
    }
  }
  
  // BFS to find shortest path to second island
  while (queue.length) {
    const [x, y, dist] = queue.shift();
    for (let [dx, dy] of dirs) {
      const nx = x + dx, ny = y + dy;
      if (nx >= 0 && nx < n && ny >= 0 && ny < n) {
        if (grid[nx][ny] === 1) return dist;
        if (grid[nx][ny] === 0) {
          grid[nx][ny] = 2;
          queue.push([nx, ny, dist + 1]);
        }
      }
    }
  }
  return -1;
};

// Test Cases
console.log(shortestBridge([[0,1],[1,0]])); // 1