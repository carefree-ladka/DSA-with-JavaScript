// Flatten Binary Tree to Linked List - Flatten to right-skewed tree
const flatten = (root) => {
  if (!root) return;
  
  flatten(root.left);
  flatten(root.right);
  
  const rightSubtree = root.right;
  root.right = root.left;
  root.left = null;
  
  while (root.right) root = root.right;
  root.right = rightSubtree;
};

// Test Cases
// function TreeNode(val, left, right) { this.val = val; this.left = left; this.right = right; }
// flatten([1,2,5,3,4,null,6]); // [1,null,2,null,3,null,4,null,5,null,6]