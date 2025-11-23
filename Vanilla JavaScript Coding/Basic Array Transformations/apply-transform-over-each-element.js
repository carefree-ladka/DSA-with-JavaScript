// Apply Transform Over Each Element in Array - Custom map function
const map = (arr, fn) => {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(fn(arr[i], i));
  }
  return result;
};

// Test Cases
console.log(map([1,2,3], (n) => n + 1)); // [2,3,4]
console.log(map([1,2,3], (n, i) => n + i)); // [1,3,5]
console.log(map([10,20,30], () => 42)); // [42,42,42]