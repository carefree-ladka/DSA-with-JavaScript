// Jump Game III - BFS reachability with array jumps
const canReach = (arr, start) => {
  const n = arr.length;
  const visited = new Set();
  const queue = [start];
  
  while (queue.length) {
    const i = queue.shift();
    if (arr[i] === 0) return true;
    if (visited.has(i)) continue;
    visited.add(i);
    
    const left = i - arr[i];
    const right = i + arr[i];
    if (left >= 0) queue.push(left);
    if (right < n) queue.push(right);
  }
  return false;
};

// Test Cases
console.log(canReach([4,2,3,0,3,1,2], 5)); // true
console.log(canReach([4,2,3,0,3,1,2], 0)); // true