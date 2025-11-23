// Valid Sudoku - Check if sudoku board is valid
const isValidSudoku = (board) => {
  const seen = new Set();
  
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const value = board[i][j];
      if (value !== '.') {
        const row = `${value} in row ${i}`;
        const col = `${value} in col ${j}`;
        const box = `${value} in box ${Math.floor(i/3)}-${Math.floor(j/3)}`;
        
        if (seen.has(row) || seen.has(col) || seen.has(box)) return false;
        seen.add(row);
        seen.add(col);
        seen.add(box);
      }
    }
  }
  
  return true;
};

// Test Cases
const board = [["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]];
console.log(isValidSudoku(board)); // true