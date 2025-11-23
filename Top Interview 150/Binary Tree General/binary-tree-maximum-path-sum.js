// Binary Tree Maximum Path Sum - Find maximum path sum
const maxPathSum = (root) => {
  let maxSum = -Infinity;
  
  const dfs = (node) => {
    if (!node) return 0;
    const left = Math.max(0, dfs(node.left));
    const right = Math.max(0, dfs(node.right));
    maxSum = Math.max(maxSum, node.val + left + right);
    return node.val + Math.max(left, right);
  };
  
  dfs(root);
  return maxSum;
};

// Test Cases
// function TreeNode(val, left, right) { this.val = val; this.left = left; this.right = right; }
// console.log(maxPathSum([1,2,3])); // 6