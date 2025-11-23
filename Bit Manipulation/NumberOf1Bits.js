// Count number of 1 bits in binary representation
const hammingWeight = (n) => {
  let count = 0;
  while (n !== 0) {
    count++;
    n &= n - 1; // Remove rightmost 1 bit
  }
  return count;
};

// Alternative using built-in
const hammingWeightBuiltIn = (n) => {
  return n.toString(2).split('1').length - 1;
};

// Test Cases
console.log(hammingWeight(11)); // 3 (1011)
console.log(hammingWeight(128)); // 1 (10000000)