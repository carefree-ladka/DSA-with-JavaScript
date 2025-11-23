// Nearest Exit from Entrance in Maze - Find shortest path to exit
const nearestExit = (maze, entrance) => {
  const m = maze.length, n = maze[0].length;
  const dirs = [[0,1],[1,0],[0,-1],[-1,0]];
  const queue = [[entrance[0], entrance[1], 0]];
  maze[entrance[0]][entrance[1]] = '+';
  
  while (queue.length) {
    const [x, y, steps] = queue.shift();
    
    for (let [dx, dy] of dirs) {
      const nx = x + dx, ny = y + dy;
      if (nx >= 0 && nx < m && ny >= 0 && ny < n && maze[nx][ny] === '.') {
        if (nx === 0 || nx === m-1 || ny === 0 || ny === n-1) return steps + 1;
        maze[nx][ny] = '+';
        queue.push([nx, ny, steps + 1]);
      }
    }
  }
  return -1;
};

// Test Cases
console.log(nearestExit([["+","+",".","+"],[".",".",".","+"],["+","+","+","."]], [1,2])); // 1