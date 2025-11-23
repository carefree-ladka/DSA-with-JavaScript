// N-Queens problem - place n queens on n×n board
const solveNQueens = (n) => {
  const result = [];
  const board = Array.from({ length: n }, () => Array(n).fill("."));

  const isValid = (row, col) => {
    for (let i = 0; i < row; i++) {
      if (board[i][col] === "Q") return false;
      if (col - (row - i) >= 0 && board[i][col - (row - i)] === "Q")
        return false;
      if (col + (row - i) < n && board[i][col + (row - i)] === "Q")
        return false;
    }
    return true;
  };

  const backtrack = (row) => {
    if (row === n) {
      result.push(board.map((r) => r.join("")));
      return;
    }

    for (let col = 0; col < n; col++) {
      if (isValid(row, col)) {
        board[row][col] = "Q";
        backtrack(row + 1);
        board[row][col] = ".";
      }
    }
  };

  backtrack(0);
  return result;
};

// Test Cases
console.log(solveNQueens(4)); // [[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
console.log(solveNQueens(1)); // [["Q"]]
