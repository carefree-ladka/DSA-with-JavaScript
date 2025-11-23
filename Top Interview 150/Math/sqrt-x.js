// Sqrt(x) - Compute square root using binary search
const mySqrt = (x) => {
  let left = 0, right = x;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const square = mid * mid;
    if (square === x) return mid;
    if (square < x) left = mid + 1;
    else right = mid - 1;
  }
  return right;
};

// Test Cases
console.log(mySqrt(4)); // 2
console.log(mySqrt(8)); // 2