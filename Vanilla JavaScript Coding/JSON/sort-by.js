// Sort By - Sort array by function result
const sortBy = (arr, fn) => {
  return arr.sort((a, b) => fn(a) - fn(b));
};

// Test Cases
console.log(sortBy([5, 4, 1, 2, 3], (x) => x)); // [1, 2, 3, 4, 5]
console.log(sortBy([{"x": 1}, {"x": 0}, {"x": -1}], (d) => d.x)); 
// [{"x": -1}, {"x": 0}, {"x": 1}]