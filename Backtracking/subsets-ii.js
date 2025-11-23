// Subsets II - Generate subsets with duplicates handled
const subsetsWithDup = (nums) => {
  nums.sort((a, b) => a - b);
  const result = [];
  const backtrack = (start, path) => {
    result.push([...path]);
    for (let i = start; i < nums.length; i++) {
      if (i > start && nums[i] === nums[i - 1]) continue;
      path.push(nums[i]);
      backtrack(i + 1, path);
      path.pop();
    }
  };
  backtrack(0, []);
  return result;
};

// Test Cases
console.log(subsetsWithDup([1,2,2])); // [[],[1],[1,2],[1,2,2],[2],[2,2]]
console.log(subsetsWithDup([0])); // [[],[0]]