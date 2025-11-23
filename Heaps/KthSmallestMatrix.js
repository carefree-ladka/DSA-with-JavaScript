// Kth Smallest Element in Sorted Matrix
const kthSmallest = (matrix, k) => {
  const n = matrix.length;
  let left = matrix[0][0], right = matrix[n - 1][n - 1];
  
  const countLessEqual = (target) => {
    let count = 0, row = n - 1, col = 0;
    
    while (row >= 0 && col < n) {
      if (matrix[row][col] <= target) {
        count += row + 1;
        col++;
      } else {
        row--;
      }
    }
    
    return count;
  };
  
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (countLessEqual(mid) < k) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  
  return left;
};

// Test Cases
console.log(kthSmallest([[1, 5, 9], [10, 11, 13], [12, 13, 15]], 8)); // 13