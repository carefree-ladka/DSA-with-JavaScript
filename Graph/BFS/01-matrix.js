// 01 Matrix - Multi-source BFS for distances
const updateMatrix = (mat) => {
  const m = mat.length, n = mat[0].length;
  const queue = [];
  const dist = Array.from({length: m}, () => new Array(n).fill(Infinity));
  const dirs = [[0,1],[1,0],[0,-1],[-1,0]];
  
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (mat[i][j] === 0) {
        dist[i][j] = 0;
        queue.push([i, j]);
      }
    }
  }
  
  while (queue.length) {
    const [x, y] = queue.shift();
    for (let [dx, dy] of dirs) {
      const nx = x + dx, ny = y + dy;
      if (nx >= 0 && nx < m && ny >= 0 && ny < n) {
        if (dist[nx][ny] > dist[x][y] + 1) {
          dist[nx][ny] = dist[x][y] + 1;
          queue.push([nx, ny]);
        }
      }
    }
  }
  return dist;
};

// Test Cases
console.log(updateMatrix([[0,0,0],[0,1,0],[0,0,0]])); // [[0,0,0],[0,1,0],[0,0,0]]