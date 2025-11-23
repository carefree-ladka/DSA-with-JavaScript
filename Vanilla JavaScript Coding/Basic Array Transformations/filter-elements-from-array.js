// Filter Elements from Array - Custom filter function
const filter = (arr, fn) => {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (fn(arr[i], i)) {
      result.push(arr[i]);
    }
  }
  return result;
};

// Test Cases
console.log(filter([0,10,20,30], (n) => n > 10)); // [20,30]
console.log(filter([1,2,3], (n, i) => i === 0)); // [1]
console.log(filter([-2,-1,0,1,2], (n) => n + 1)); // [-2,0,1,2]