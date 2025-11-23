// Set Matrix Zeroes - Set entire row and column to 0
const setZeroes = (matrix) => {
  const m = matrix.length, n = matrix[0].length;
  let firstRowZero = false, firstColZero = false;
  
  // Check if first row/col should be zero
  for (let j = 0; j < n; j++) if (matrix[0][j] === 0) firstRowZero = true;
  for (let i = 0; i < m; i++) if (matrix[i][0] === 0) firstColZero = true;
  
  // Use first row/col as markers
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      if (matrix[i][j] === 0) {
        matrix[i][0] = 0;
        matrix[0][j] = 0;
      }
    }
  }
  
  // Set zeros based on markers
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      if (matrix[i][0] === 0 || matrix[0][j] === 0) matrix[i][j] = 0;
    }
  }
  
  // Handle first row/col
  if (firstRowZero) for (let j = 0; j < n; j++) matrix[0][j] = 0;
  if (firstColZero) for (let i = 0; i < m; i++) matrix[i][0] = 0;
};

// Test Cases
let mat = [[1,1,1],[1,0,1],[1,1,1]];
setZeroes(mat);
console.log(mat); // [[1,0,1],[0,0,0],[1,0,1]]