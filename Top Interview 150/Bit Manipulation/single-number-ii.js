// Single Number II - Find single number where others appear 3 times
const singleNumber = (nums) => {
  let ones = 0, twos = 0;
  for (let num of nums) {
    ones = (ones ^ num) & ~twos;
    twos = (twos ^ num) & ~ones;
  }
  return ones;
};

// Test Cases
console.log(singleNumber([2,2,3,2])); // 3
console.log(singleNumber([0,1,0,1,0,1,99])); // 99