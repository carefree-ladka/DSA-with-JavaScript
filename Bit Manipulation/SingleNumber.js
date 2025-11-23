// Find single number in array where every other appears twice
const singleNumber = (nums) => {
  let result = 0;
  for (const num of nums) {
    result ^= num;
  }
  return result;
};

// Test Cases
console.log(singleNumber([2, 2, 1])); // 1
console.log(singleNumber([4, 1, 2, 1, 2])); // 4