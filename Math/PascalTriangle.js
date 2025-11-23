// Pascal's Triangle and Combinations
const generate = (numRows) => {
  const triangle = [];
  
  for (let i = 0; i < numRows; i++) {
    const row = new Array(i + 1).fill(1);
    for (let j = 1; j < i; j++) {
      row[j] = triangle[i - 1][j - 1] + triangle[i - 1][j];
    }
    triangle.push(row);
  }
  
  return triangle;
};

// Get specific row of Pascal's triangle
const getRow = (rowIndex) => {
  const row = new Array(rowIndex + 1).fill(1);
  
  for (let i = 1; i < rowIndex; i++) {
    for (let j = i; j > 0; j--) {
      row[j] += row[j - 1];
    }
  }
  
  return row;
};

// Combination nCr
const combination = (n, r) => {
  if (r > n - r) r = n - r; // Take advantage of symmetry
  let result = 1;
  
  for (let i = 0; i < r; i++) {
    result = result * (n - i) / (i + 1);
  }
  
  return Math.round(result);
};

// Test Cases
console.log(generate(5)); // [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]
console.log(getRow(3)); // [1,3,3,1]
console.log(combination(5, 2)); // 10