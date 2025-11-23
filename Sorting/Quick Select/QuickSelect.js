// QuickSelect - Find kth smallest element in O(n) average time
const quickSelect = (nums, k) => {
  const partition = (left, right, pivotIndex) => {
    const pivotValue = nums[pivotIndex];
    [nums[pivotIndex], nums[right]] = [nums[right], nums[pivotIndex]];
    
    let storeIndex = left;
    for (let i = left; i < right; i++) {
      if (nums[i] < pivotValue) {
        [nums[storeIndex], nums[i]] = [nums[i], nums[storeIndex]];
        storeIndex++;
      }
    }
    
    [nums[right], nums[storeIndex]] = [nums[storeIndex], nums[right]];
    return storeIndex;
  };
  
  const select = (left, right, k) => {
    if (left === right) return nums[left];
    
    const pivotIndex = left + Math.floor(Math.random() * (right - left + 1));
    const finalIndex = partition(left, right, pivotIndex);
    
    if (k === finalIndex) return nums[k];
    else if (k < finalIndex) return select(left, finalIndex - 1, k);
    else return select(finalIndex + 1, right, k);
  };
  
  return select(0, nums.length - 1, k - 1);
};

// Find kth largest element (LeetCode 215)
const findKthLargest = (nums, k) => {
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
  
  let left = 0, right = nums.length - 1;
  
  while (true) {
    const pos = partition(left, right);
    
    if (pos === k - 1) return nums[pos];
    else if (pos > k - 1) right = pos - 1;
    else left = pos + 1;
  }
};

// Top K frequent elements using QuickSelect
const topKFrequent = (nums, k) => {
  const count = new Map();
  for (const num of nums) {
    count.set(num, (count.get(num) || 0) + 1);
  }
  
  const unique = [...count.keys()];
  
  const partition = (left, right) => {
    const pivotFreq = count.get(unique[right]);
    let i = left;
    
    for (let j = left; j < right; j++) {
      if (count.get(unique[j]) < pivotFreq) {
        [unique[i], unique[j]] = [unique[j], unique[i]];
        i++;
      }
    }
    
    [unique[i], unique[right]] = [unique[right], unique[i]];
    return i;
  };
  
  let left = 0, right = unique.length - 1;
  const target = unique.length - k;
  
  while (left <= right) {
    const pos = partition(left, right);
    
    if (pos === target) break;
    else if (pos < target) left = pos + 1;
    else right = pos - 1;
  }
  
  return unique.slice(target);
};

// Test Cases
console.log(quickSelect([3, 2, 1, 5, 6, 4], 2)); // 2 (2nd smallest)
console.log(findKthLargest([3, 2, 1, 5, 6, 4], 2)); // 5 (2nd largest)
console.log(topKFrequent([1, 1, 1, 2, 2, 3], 2)); // [1, 2]