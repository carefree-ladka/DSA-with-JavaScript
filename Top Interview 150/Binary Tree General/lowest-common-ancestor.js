// Lowest Common Ancestor of a Binary Tree
const lowestCommonAncestor = (root, p, q) => {
  if (!root || root === p || root === q) return root;
  
  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);
  
  if (left && right) return root;
  return left || right;
};

// Test Cases
// function TreeNode(val) { this.val = val; this.left = this.right = null; }
// console.log(lowestCommonAncestor([3,5,1,6,2,0,8,null,null,7,4], 5, 1)); // 3