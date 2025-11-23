// Remove Duplicates from Sorted Array
const removeDuplicates = (nums) => {
  let l = 0;
  for (let r = 1; r < nums.length; r++) {
    if (nums[r] !== nums[l]) nums[++l] = nums[r];
  }
  return l + 1;
};

// Test Cases
console.log(removeDuplicates([1, 1, 2])); // 2
console.log(removeDuplicates([0, 0, 1, 1, 1, 2, 2, 3, 3, 4])); // 5
console.log(removeDuplicates([1])); // 1