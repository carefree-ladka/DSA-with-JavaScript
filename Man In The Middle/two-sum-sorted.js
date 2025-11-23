// Two Sum II - Input Array Is Sorted
const twoSum = (nums, target) => {
  let l = 0, r = nums.length - 1;
  while (l < r) {
    const sum = nums[l] + nums[r];
    if (sum === target) return [l + 1, r + 1];
    sum < target ? l++ : r--;
  }
  return [];
};

// Test Cases
console.log(twoSum([2, 7, 11, 15], 9)); // [1, 2]
console.log(twoSum([2, 3, 4], 6)); // [1, 3]
console.log(twoSum([-1, 0], -1)); // [1, 2]