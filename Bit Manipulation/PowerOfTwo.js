// Check if number is power of 2
const isPowerOfTwo = (n) => {
  return n > 0 && (n & (n - 1)) === 0;
};

// Test Cases
console.log(isPowerOfTwo(1)); // true (2^0)
console.log(isPowerOfTwo(16)); // true (2^4)
console.log(isPowerOfTwo(3)); // false