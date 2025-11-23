// Factorial Trailing Zeroes - Count trailing zeros in n!
const trailingZeroes = (n) => {
  let count = 0;
  while (n >= 5) {
    n = Math.floor(n / 5);
    count += n;
  }
  return count;
};

// Test Cases
console.log(trailingZeroes(3)); // 0
console.log(trailingZeroes(5)); // 1
console.log(trailingZeroes(25)); // 6