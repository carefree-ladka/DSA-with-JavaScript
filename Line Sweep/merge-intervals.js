// Merge Intervals - Merge overlapping intervals
const merge = (intervals) => {
  const events = intervals.flatMap(([s, e]) => [
    [s, 1],
    [e, -1],
  ]); // Create Events

  events.sort((a, b) => a[0] - b[0] || b[1] - a[1]); // Sort Events

  const result = [];
  let count = 0;
  let start = null;

  events.forEach(([pos, type]) => {
    count += type; // Simply add the type (1 for start, -1 for end)
    if (count === 1 && type === 1) {
      // Start new interval
      start = pos;
    } else if (count === 0) {
      // End current interval
      result.push([start, pos]);
    }
  });

  return result;
};

// Test Cases
console.log(
  merge([
    [1, 3],
    [2, 6],
    [8, 10],
    [15, 18],
  ])
); // [[1,6],[8,10],[15,18]]
console.log(
  merge([
    [1, 4],
    [4, 5],
  ])
); // [[1,5]]
console.log(
  merge([
    [1, 4],
    [0, 4],
  ])
); // [[0,4]]
