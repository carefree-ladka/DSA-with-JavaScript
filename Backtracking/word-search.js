// Word Search - Find if word exists in 2D board
const exist = (board, word) => {
  const dfs = (i, j, k) => {
    if (k === word.length) return true;
    if (i < 0 || i >= board.length || j < 0 || j >= board[0].length || board[i][j] !== word[k]) return false;
    
    const temp = board[i][j];
    board[i][j] = '#';
    const found = dfs(i+1, j, k+1) || dfs(i-1, j, k+1) || dfs(i, j+1, k+1) || dfs(i, j-1, k+1);
    board[i][j] = temp;
    return found;
  };
  
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      if (dfs(i, j, 0)) return true;
    }
  }
  return false;
};

// Test Cases
console.log(exist([["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], "ABCCED")); // true
console.log(exist([["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], "SEE")); // true