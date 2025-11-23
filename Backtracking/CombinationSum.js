// Find all combinations that sum to target
const combinationSum = (candidates, target) => {
  const result = [];
  
  const backtrack = (index, current, sum) => {
    if (sum === target) {
      result.push([...current]);
      return;
    }
    if (sum > target || index >= candidates.length) return;
    
    // Include current number
    current.push(candidates[index]);
    backtrack(index, current, sum + candidates[index]);
    current.pop();
    
    // Skip current number
    backtrack(index + 1, current, sum);
  };
  
  backtrack(0, [], 0);
  return result;
};

// Test Cases
console.log(combinationSum([2, 3, 6, 7], 7)); // [[2,2,3],[7]]
console.log(combinationSum([2, 3, 5], 8)); // [[2,2,2,2],[2,3,3],[3,5]]