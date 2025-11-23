// Invert Binary Tree - Invert/flip binary tree
const invertTree = (root) => {
  if (!root) return null;
  [root.left, root.right] = [invertTree(root.right), invertTree(root.left)];
  return root;
};

// Test Cases
// function TreeNode(val, left, right) { this.val = val; this.left = left; this.right = right; }
// console.log(invertTree([4,2,7,1,3,6,9])); // [4,7,2,9,6,3,1]