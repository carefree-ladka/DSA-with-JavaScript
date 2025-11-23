// Maximum Depth of Binary Tree - Find max depth using DFS
const maxDepth = (root) => {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
};

// Test Cases
// TreeNode definition: function TreeNode(val, left, right) { this.val = val; this.left = left; this.right = right; }
// console.log(maxDepth([3,9,20,null,null,15,7])); // 3