// Shortest Path in Binary Matrix - BFS with 8-directional movement
const shortestPathBinaryMatrix = (grid) => {
  const n = grid.length;
  if (grid[0][0] || grid[n-1][n-1]) return -1;
  
  const queue = [[0, 0, 1]];
  const visited = new Set(['0,0']);
  const dirs = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
  
  while (queue.length) {
    const [x, y, dist] = queue.shift();
    if (x === n-1 && y === n-1) return dist;
    
    for (let [dx, dy] of dirs) {
      const nx = x + dx, ny = y + dy;
      const key = `${nx},${ny}`;
      if (nx >= 0 && nx < n && ny >= 0 && ny < n && 
          grid[nx][ny] === 0 && !visited.has(key)) {
        visited.add(key);
        queue.push([nx, ny, dist + 1]);
      }
    }
  }
  return -1;
};

// Test Cases
console.log(shortestPathBinaryMatrix([[0,1],[1,0]])); // 2