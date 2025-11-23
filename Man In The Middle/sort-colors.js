// Sort Colors - Dutch National Flag Problem
const sortColors = (nums) => {
  let l = 0, r = nums.length - 1, i = 0;
  while (i <= r) {
    if (nums[i] === 0) [nums[l++], nums[i++]] = [nums[i], nums[l]];
    else if (nums[i] === 2) [nums[r--], nums[i]] = [nums[i], nums[r]];
    else i++;
  }
  return nums;
};

// Test Cases
console.log(sortColors([2, 0, 2, 1, 1, 0])); // [0,0,1,1,2,2]
console.log(sortColors([2, 0, 1])); // [0,1,2]
console.log(sortColors([0])); // [0]