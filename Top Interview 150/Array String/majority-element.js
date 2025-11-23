// Majority Element - Find element appearing more than n/2 times
const majorityElement = (nums) => {
  let count = 0, candidate = 0;
  for (let num of nums) {
    if (count === 0) candidate = num;
    count += num === candidate ? 1 : -1;
  }
  return candidate;
};

// Test Cases
console.log(majorityElement([3,2,3])); // 3
console.log(majorityElement([2,2,1,1,1,2,2])); // 2