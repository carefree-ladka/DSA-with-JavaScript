// Search for a word in a 2D board
const exist = (board, word) => {
  const rows = board.length, cols = board[0].length;
  
  const backtrack = (r, c, index) => {
    if (index === word.length) return true;
    if (r < 0 || r >= rows || c < 0 || c >= cols || board[r][c] !== word[index]) return false;
    
    const temp = board[r][c];
    board[r][c] = '#';
    
    const found = backtrack(r + 1, c, index + 1) ||
                  backtrack(r - 1, c, index + 1) ||
                  backtrack(r, c + 1, index + 1) ||
                  backtrack(r, c - 1, index + 1);
    
    board[r][c] = temp;
    return found;
  };
  
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (backtrack(r, c, 0)) return true;
    }
  }
  return false;
};

// Test Cases
const board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]];
console.log(exist(board, "ABCCED")); // true
console.log(exist(board, "SEE")); // true
console.log(exist(board, "ABCB")); // false