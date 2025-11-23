// Combination Sum II - Each number used once, no duplicate combinations
const combinationSum2 = (candidates, target) => {
  candidates.sort((a, b) => a - b);
  const result = [];
  const backtrack = (start, path, sum) => {
    if (sum === target) {
      result.push([...path]);
      return;
    }
    for (let i = start; i < candidates.length; i++) {
      if (i > start && candidates[i] === candidates[i - 1]) continue;
      if (sum + candidates[i] <= target) {
        path.push(candidates[i]);
        backtrack(i + 1, path, sum + candidates[i]);
        path.pop();
      }
    }
  };
  backtrack(0, [], 0);
  return result;
};

// Test Cases
console.log(combinationSum2([10,1,2,7,6,1,5], 8)); // [[1,1,6],[1,2,5],[1,7],[2,6]]
console.log(combinationSum2([2,5,2,1,2], 5)); // [[1,2,2],[5]]