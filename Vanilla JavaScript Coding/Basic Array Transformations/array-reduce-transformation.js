// Array Reduce Transformation - Custom reduce function
const reduce = (nums, fn, init) => {
  let acc = init;
  for (let i = 0; i < nums.length; i++) {
    acc = fn(acc, nums[i]);
  }
  return acc;
};

// Test Cases
console.log(reduce([1,2,3,4], (acc, cur) => acc + cur, 0)); // 10
console.log(reduce([1,2,3,4], (acc, cur) => acc + cur * cur, 100)); // 130
console.log(reduce([], (acc, cur) => 0, 25)); // 25