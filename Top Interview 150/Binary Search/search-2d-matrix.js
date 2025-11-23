// Search a 2D Matrix - Search target in sorted 2D matrix
const searchMatrix = (matrix, target) => {
  const m = matrix.length, n = matrix[0].length;
  let left = 0, right = m * n - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const val = matrix[Math.floor(mid / n)][mid % n];
    if (val === target) return true;
    val < target ? left = mid + 1 : right = mid - 1;
  }
  
  return false;
};

// Test Cases
console.log(searchMatrix([[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], 5)); // true
console.log(searchMatrix([[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], 14)); // false