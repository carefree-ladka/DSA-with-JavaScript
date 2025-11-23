// Generate all combinations of k numbers from 1 to n
const combine = (n, k) => {
  const result = [];
  
  const backtrack = (start, current) => {
    if (current.length === k) {
      result.push([...current]);
      return;
    }
    
    for (let i = start; i <= n; i++) {
      current.push(i);
      backtrack(i + 1, current);
      current.pop();
    }
  };
  
  backtrack(1, []);
  return result;
};

// Test Cases
console.log(combine(4, 2)); // [[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]
console.log(combine(1, 1)); // [[1]]