// Find single number where every other appears 3 times
const singleNumber = (nums) => {
  let ones = 0, twos = 0;
  
  for (const num of nums) {
    ones = (ones ^ num) & ~twos;
    twos = (twos ^ num) & ~ones;
  }
  
  return ones;
};

// Alternative using bit counting
const singleNumberBitCount = (nums) => {
  let result = 0;
  
  for (let i = 0; i < 32; i++) {
    let count = 0;
    for (const num of nums) {
      count += (num >> i) & 1;
    }
    result |= (count % 3) << i;
  }
  
  return result;
};

// Test Cases
console.log(singleNumber([2, 2, 3, 2])); // 3
console.log(singleNumber([0, 1, 0, 1, 0, 1, 99])); // 99