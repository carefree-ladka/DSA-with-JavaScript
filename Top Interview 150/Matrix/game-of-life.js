// Game of Life - Update board according to rules
const gameOfLife = (board) => {
  const m = board.length, n = board[0].length;
  const dirs = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
  
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      let live = 0;
      for (let [di, dj] of dirs) {
        const ni = i + di, nj = j + dj;
        if (ni >= 0 && ni < m && nj >= 0 && nj < n && Math.abs(board[ni][nj]) === 1) {
          live++;
        }
      }
      
      if (board[i][j] === 1 && (live < 2 || live > 3)) board[i][j] = -1;
      if (board[i][j] === 0 && live === 3) board[i][j] = 2;
    }
  }
  
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (board[i][j] > 0) board[i][j] = 1;
      else board[i][j] = 0;
    }
  }
};

// Test Cases
let board = [[0,1,0],[0,0,1],[1,1,1],[0,0,0]];
gameOfLife(board);
console.log(board); // [[0,0,0],[1,0,1],[0,1,1],[0,1,0]]