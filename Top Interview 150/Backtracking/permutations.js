// Permutations - Generate all permutations
const permute = (nums) => {
  const result = [];
  const backtrack = (path) => {
    if (path.length === nums.length) {
      result.push([...path]);
      return;
    }
    for (let num of nums) {
      if (!path.includes(num)) {
        path.push(num);
        backtrack(path);
        path.pop();
      }
    }
  };
  
  backtrack([]);
  return result;
};

// Test Cases
console.log(permute([1,2,3])); // [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
console.log(permute([0,1])); // [[0,1],[1,0]]