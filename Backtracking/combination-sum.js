// Combination Sum - Find combinations that sum to target
const combinationSum = (candidates, target) => {
  const result = [];
  const backtrack = (start, path, sum) => {
    if (sum === target) {
      result.push([...path]);
      return;
    }
    for (let i = start; i < candidates.length; i++) {
      if (sum + candidates[i] <= target) {
        path.push(candidates[i]);
        backtrack(i, path, sum + candidates[i]);
        path.pop();
      }
    }
  };
  backtrack(0, [], 0);
  return result;
};

// Test Cases
console.log(combinationSum([2,3,6,7], 7)); // [[2,2,3],[7]]
console.log(combinationSum([2,3,5], 8)); // [[2,2,2,2],[2,3,3],[3,5]]