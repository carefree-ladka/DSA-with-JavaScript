// Kth Largest Element in an Array - Find kth largest element
const findKthLargest = (nums, k) => {
  const quickSelect = (left, right, k) => {
    const pivot = partition(left, right);
    if (pivot === k) return nums[pivot];
    return pivot > k ? quickSelect(left, pivot - 1, k) : quickSelect(pivot + 1, right, k);
  };
  
  const partition = (left, right) => {
    const pivot = nums[right];
    let i = left;
    for (let j = left; j < right; j++) {
      if (nums[j] >= pivot) {
        [nums[i], nums[j]] = [nums[j], nums[i]];
        i++;
      }
    }
    [nums[i], nums[right]] = [nums[right], nums[i]];
    return i;
  };
  
  return quickSelect(0, nums.length - 1, k - 1);
};

// Test Cases
console.log(findKthLargest([3,2,1,5,6,4], 2)); // 5
console.log(findKthLargest([3,2,3,1,2,4,5,5,6], 4)); // 4