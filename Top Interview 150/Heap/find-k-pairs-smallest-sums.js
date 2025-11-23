// Find K Pairs with Smallest Sums
const kSmallestPairs = (nums1, nums2, k) => {
  const result = [];
  const heap = [[nums1[0] + nums2[0], 0, 0]];
  const visited = new Set(['0,0']);
  
  while (result.length < k && heap.length) {
    heap.sort((a, b) => a[0] - b[0]);
    const [sum, i, j] = heap.shift();
    result.push([nums1[i], nums2[j]]);
    
    if (i + 1 < nums1.length && !visited.has(`${i+1},${j}`)) {
      heap.push([nums1[i+1] + nums2[j], i+1, j]);
      visited.add(`${i+1},${j}`);
    }
    if (j + 1 < nums2.length && !visited.has(`${i},${j+1}`)) {
      heap.push([nums1[i] + nums2[j+1], i, j+1]);
      visited.add(`${i},${j+1}`);
    }
  }
  
  return result;
};

// Test Cases
console.log(kSmallestPairs([1,7,11], [2,4,6], 3)); // [[1,2],[1,4],[1,6]]