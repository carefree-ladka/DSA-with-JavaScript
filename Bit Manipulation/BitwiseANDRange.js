// Bitwise AND of numbers in range [left, right]
const rangeBitwiseAnd = (left, right) => {
  let shift = 0;
  
  while (left !== right) {
    left >>= 1;
    right >>= 1;
    shift++;
  }
  
  return left << shift;
};

// Test Cases
console.log(rangeBitwiseAnd(5, 7)); // 4
console.log(rangeBitwiseAnd(0, 0)); // 0
console.log(rangeBitwiseAnd(1, 2147483647)); // 0