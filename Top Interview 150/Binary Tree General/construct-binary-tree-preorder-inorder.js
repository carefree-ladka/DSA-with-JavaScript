// Construct Binary Tree from Preorder and Inorder Traversal
const buildTree = (preorder, inorder) => {
  if (!preorder.length) return null;
  
  const root = new TreeNode(preorder[0]);
  const mid = inorder.indexOf(preorder[0]);
  
  root.left = buildTree(preorder.slice(1, mid + 1), inorder.slice(0, mid));
  root.right = buildTree(preorder.slice(mid + 1), inorder.slice(mid + 1));
  
  return root;
};

// Test Cases
// function TreeNode(val, left, right) { this.val = val; this.left = left; this.right = right; }
// console.log(buildTree([3,9,20,15,7], [9,3,15,20,7])); // [3,9,20,null,null,15,7]