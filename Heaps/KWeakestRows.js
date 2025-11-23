// K Weakest Rows in Matrix
const kWeakestRows = (mat, k) => {
  const strength = mat.map((row, i) => [row.reduce((sum, val) => sum + val, 0), i]);
  
  return strength
    .sort((a, b) => a[0] - b[0] || a[1] - b[1])
    .slice(0, k)
    .map(([, index]) => index);
};

// K Strongest Values in Array
const getStrongest = (arr, k) => {
  arr.sort((a, b) => a - b);
  const median = arr[Math.floor((arr.length - 1) / 2)];
  
  return arr
    .map(val => [Math.abs(val - median), val])
    .sort((a, b) => b[0] - a[0] || b[1] - a[1])
    .slice(0, k)
    .map(([, val]) => val);
};

// Test Cases
console.log(kWeakestRows([[1,1,0,0,0],[1,1,1,1,0],[1,0,0,0,0],[1,1,0,0,0],[1,1,1,1,1]], 3)); // [2,0,3]
console.log(getStrongest([1, 2, 3, 4, 5], 2)); // [5, 1]