// Subsets - Generate all possible subsets
const subsets = (nums) => {
  const result = [];
  const backtrack = (start, path) => {
    result.push([...path]);
    for (let i = start; i < nums.length; i++) {
      path.push(nums[i]);
      backtrack(i + 1, path);
      path.pop();
    }
  };
  backtrack(0, []);
  return result;
};

// Test Cases
console.log(subsets([1,2,3])); // [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
console.log(subsets([0])); // [[],[0]]