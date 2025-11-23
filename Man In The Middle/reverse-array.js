// Reverse Array In-Place - Reverse array without extra space
const reverseArray = (nums) => {
  let l = 0, r = nums.length - 1;
  while (l < r) {
    [nums[l++], nums[r--]] = [nums[r], nums[l]];
  }
  return nums;
};

// Test Cases
console.log(reverseArray([1, 2, 3, 4, 5])); // [5, 4, 3, 2, 1]
console.log(reverseArray([1, 2, 3, 4])); // [4, 3, 2, 1]
console.log(reverseArray([1])); // [1]