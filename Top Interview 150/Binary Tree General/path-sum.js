// Path Sum - Check if root-to-leaf path sum equals target
const hasPathSum = (root, targetSum) => {
  if (!root) return false;
  if (!root.left && !root.right) return root.val === targetSum;
  return hasPathSum(root.left, targetSum - root.val) || 
         hasPathSum(root.right, targetSum - root.val);
};

// Test Cases
// function TreeNode(val, left, right) { this.val = val; this.left = left; this.right = right; }
// console.log(hasPathSum([5,4,8,11,null,13,4,7,2,null,null,null,1], 22)); // true