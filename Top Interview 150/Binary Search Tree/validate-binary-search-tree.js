// Validate Binary Search Tree - Check if tree is valid BST
const isValidBST = (root) => {
  const validate = (node, min, max) => {
    if (!node) return true;
    if (node.val <= min || node.val >= max) return false;
    return validate(node.left, min, node.val) && validate(node.right, node.val, max);
  };
  
  return validate(root, -Infinity, Infinity);
};

// Test Cases
// function TreeNode(val, left, right) { this.val = val; this.left = left; this.right = right; }
// console.log(isValidBST([2,1,3])); // true
// console.log(isValidBST([5,1,4,null,null,3,6])); // false