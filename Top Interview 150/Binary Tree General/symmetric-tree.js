// Symmetric Tree - Check if tree is symmetric around center
const isSymmetric = (root) => {
  const isMirror = (left, right) => {
    if (!left && !right) return true;
    if (!left || !right || left.val !== right.val) return false;
    return isMirror(left.left, right.right) && isMirror(left.right, right.left);
  };
  
  return !root || isMirror(root.left, root.right);
};

// Test Cases
// function TreeNode(val, left, right) { this.val = val; this.left = left; this.right = right; }
// console.log(isSymmetric([1,2,2,3,4,4,3])); // true