// Reverse bits of 32-bit unsigned integer
const reverseBits = (n) => {
  let result = 0;
  for (let i = 0; i < 32; i++) {
    result = (result << 1) | (n & 1);
    n >>= 1;
  }
  return result >>> 0; // Unsigned right shift
};

// Test Cases
console.log(reverseBits(43261596)); // 964176192
console.log(reverseBits(4294967293)); // 3221225471