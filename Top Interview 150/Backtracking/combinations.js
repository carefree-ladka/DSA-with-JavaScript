// Combinations - Generate all combinations of k numbers from 1 to n
const combine = (n, k) => {
  const result = [];
  const backtrack = (start, path) => {
    if (path.length === k) {
      result.push([...path]);
      return;
    }
    for (let i = start; i <= n; i++) {
      path.push(i);
      backtrack(i + 1, path);
      path.pop();
    }
  };
  
  backtrack(1, []);
  return result;
};

// Test Cases
console.log(combine(4, 2)); // [[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]
console.log(combine(1, 1)); // [[1]]