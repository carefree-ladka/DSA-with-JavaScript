// Contains Duplicate II - Check if duplicate exists within k distance
const containsNearbyDuplicate = (nums, k) => {
  const map = {};
  for (let i = 0; i < nums.length; i++) {
    if (map[nums[i]] !== undefined && i - map[nums[i]] <= k) return true;
    map[nums[i]] = i;
  }
  return false;
};

// Test Cases
console.log(containsNearbyDuplicate([1,2,3,1], 3)); // true
console.log(containsNearbyDuplicate([1,0,1,1], 1)); // true
console.log(containsNearbyDuplicate([1,2,3,1,2,3], 2)); // false