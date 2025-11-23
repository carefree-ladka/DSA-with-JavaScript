// Find missing number in array [0,n] using XOR
const missingNumber = (nums) => {
  let missing = nums.length;
  for (let i = 0; i < nums.length; i++) {
    missing ^= i ^ nums[i];
  }
  return missing;
};

// Alternative using sum formula
const missingNumberSum = (nums) => {
  const n = nums.length;
  const expectedSum = (n * (n + 1)) / 2;
  const actualSum = nums.reduce((sum, num) => sum + num, 0);
  return expectedSum - actualSum;
};

// Test Cases
console.log(missingNumber([3, 0, 1])); // 2
console.log(missingNumber([0, 1])); // 2