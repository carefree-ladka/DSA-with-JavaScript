// N-Queens II - Count solutions for N-Queens
const totalNQueens = (n) => {
  let count = 0;
  const cols = new Set();
  const diag1 = new Set();
  const diag2 = new Set();
  
  const backtrack = (row) => {
    if (row === n) {
      count++;
      return;
    }
    
    for (let col = 0; col < n; col++) {
      if (cols.has(col) || diag1.has(row - col) || diag2.has(row + col)) continue;
      
      cols.add(col);
      diag1.add(row - col);
      diag2.add(row + col);
      
      backtrack(row + 1);
      
      cols.delete(col);
      diag1.delete(row - col);
      diag2.delete(row + col);
    }
  };
  
  backtrack(0);
  return count;
};

// Test Cases
console.log(totalNQueens(4)); // 2
console.log(totalNQueens(1)); // 1