// Reverse Bits - Reverse bits of 32-bit unsigned integer
const reverseBits = (n) => {
  let result = 0;
  for (let i = 0; i < 32; i++) {
    result = (result << 1) | (n & 1);
    n >>>= 1;
  }
  return result >>> 0;
};

// Test Cases
console.log(reverseBits(0b00000010100101000001111010011100)); // 964176192
console.log(reverseBits(0b11111111111111111111111111111101)); // 3221225471