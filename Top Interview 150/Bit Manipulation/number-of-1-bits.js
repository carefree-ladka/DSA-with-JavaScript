// Number of 1 Bits - Count set bits in integer
const hammingWeight = (n) => {
  let count = 0;
  while (n) {
    count++;
    n &= n - 1;
  }
  return count;
};

// Test Cases
console.log(hammingWeight(0b00000000000000000000000000001011)); // 3
console.log(hammingWeight(0b00000000000000000000000010000000)); // 1