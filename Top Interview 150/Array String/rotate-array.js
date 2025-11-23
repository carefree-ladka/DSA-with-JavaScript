// Rotate Array - Rotate array to right by k steps
const rotate = (nums, k) => {
  k %= nums.length;
  const reverse = (start, end) => {
    while (start < end) [nums[start++], nums[end--]] = [nums[end], nums[start]];
  };
  reverse(0, nums.length - 1);
  reverse(0, k - 1);
  reverse(k, nums.length - 1);
};

// Test Cases
let arr = [1,2,3,4,5,6,7];
rotate(arr, 3);
console.log(arr); // [5,6,7,1,2,3,4]