// Shortest path in binary matrix using BFS queue
const shortestPathBinaryMatrix = (grid) => {
  const n = grid.length;
  if (grid[0][0] === 1 || grid[n-1][n-1] === 1) return -1;
  
  const queue = [[0, 0, 1]];
  const visited = new Set(['0,0']);
  const directions = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
  
  while (queue.length) {
    const [row, col, path] = queue.shift();
    
    if (row === n - 1 && col === n - 1) return path;
    
    for (const [dr, dc] of directions) {
      const newRow = row + dr, newCol = col + dc;
      const key = `${newRow},${newCol}`;
      
      if (newRow >= 0 && newRow < n && newCol >= 0 && newCol < n && 
          grid[newRow][newCol] === 0 && !visited.has(key)) {
        visited.add(key);
        queue.push([newRow, newCol, path + 1]);
      }
    }
  }
  
  return -1;
};

// Test Cases
console.log(shortestPathBinaryMatrix([[0,1],[1,0]])); // 2
console.log(shortestPathBinaryMatrix([[0,0,0],[1,1,0],[1,1,0]])); // 4