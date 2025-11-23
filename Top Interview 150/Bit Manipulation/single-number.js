// Single Number - Find single number in array where others appear twice
const singleNumber = (nums) => {
  let result = 0;
  for (let num of nums) {
    result ^= num;
  }
  return result;
};

// Test Cases
console.log(singleNumber([2,2,1])); // 1
console.log(singleNumber([4,1,2,1,2])); // 4