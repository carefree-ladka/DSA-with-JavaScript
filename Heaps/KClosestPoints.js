// K Closest Points to Origin
const kClosest = (points, k) => {
  return points
    .map(([x, y]) => [x * x + y * y, [x, y]])
    .sort((a, b) => a[0] - b[0])
    .slice(0, k)
    .map(([, point]) => point);
};

// K Closest Elements to Target
const findClosestElements = (arr, k, x) => {
  let left = 0, right = arr.length - k;
  
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (x - arr[mid] > arr[mid + k] - x) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  
  return arr.slice(left, left + k);
};

// Test Cases
console.log(kClosest([[1, 3], [3, 4], [2, -1]], 2)); // [[2,-1],[1,3]]
console.log(findClosestElements([1, 2, 3, 4, 5], 4, 3)); // [1,2,3,4]