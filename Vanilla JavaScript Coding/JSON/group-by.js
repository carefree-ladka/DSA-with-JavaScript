// Group By - Group array elements by function result
Array.prototype.groupBy = function(fn) {
  const result = {};
  for (let item of this) {
    const key = fn(item);
    if (!result[key]) result[key] = [];
    result[key].push(item);
  }
  return result;
};

// Test Cases
console.log([{"id":"1"},{"id":"1"},{"id":"2"}].groupBy(x => x.id));
// {"1": [{"id": "1"}, {"id": "1"}], "2": [{"id": "2"}]}

console.log([1, 2, 3].groupBy(x => x > 1));
// {"false": [1], "true": [2, 3]}