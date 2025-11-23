// Minimum Absolute Difference in BST - Find min difference between nodes
const getMinimumDifference = (root) => {
  let minDiff = Infinity, prev = null;
  
  const inorder = (node) => {
    if (!node) return;
    inorder(node.left);
    if (prev !== null) minDiff = Math.min(minDiff, node.val - prev);
    prev = node.val;
    inorder(node.right);
  };
  
  inorder(root);
  return minDiff;
};

// Test Cases
// function TreeNode(val, left, right) { this.val = val; this.left = left; this.right = right; }
// console.log(getMinimumDifference([4,2,6,1,3])); // 1