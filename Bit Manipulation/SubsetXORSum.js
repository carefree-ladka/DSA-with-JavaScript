// Sum of XOR of all subsets
const subsetXORSum = (nums) => {
  let totalXor = 0;
  for (const num of nums) {
    totalXor |= num;
  }
  return totalXor << (nums.length - 1);
};

// Brute force approach for verification
const subsetXORSumBruteForce = (nums) => {
  let sum = 0;
  const n = nums.length;
  
  for (let mask = 0; mask < (1 << n); mask++) {
    let xor = 0;
    for (let i = 0; i < n; i++) {
      if (mask & (1 << i)) {
        xor ^= nums[i];
      }
    }
    sum += xor;
  }
  
  return sum;
};

// Test Cases
console.log(subsetXORSum([1, 3])); // 6
console.log(subsetXORSum([5, 1, 6])); // 28