// Kth Distinct String in Array
const kthDistinct = (arr, k) => {
  const count = new Map();
  
  for (const str of arr) {
    count.set(str, (count.get(str) || 0) + 1);
  }
  
  const distinct = [];
  for (const str of arr) {
    if (count.get(str) === 1) {
      distinct.push(str);
    }
  }
  
  return k <= distinct.length ? distinct[k - 1] : "";
};

// Find Kth Missing Positive Number
const findKthPositive = (arr, k) => {
  let left = 0, right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const missing = arr[mid] - mid - 1;
    
    if (missing < k) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  return left + k;
};

// Kth Smallest Product of Two Sorted Arrays
const kthSmallestProduct = (nums1, nums2, k) => {
  const products = [];
  
  for (const num1 of nums1) {
    for (const num2 of nums2) {
      products.push(num1 * num2);
    }
  }
  
  products.sort((a, b) => a - b);
  return products[k - 1];
};

// Test Cases
console.log(kthDistinct(["d","b","c","b","c","a"], 2)); // "a"
console.log(findKthPositive([2,3,4,7,11], 5)); // 9
console.log(kthSmallestProduct([2,5], [3,4], 2)); // 8