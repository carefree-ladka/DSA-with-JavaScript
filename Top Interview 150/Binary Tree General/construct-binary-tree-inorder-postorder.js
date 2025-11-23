// Construct Binary Tree from Inorder and Postorder Traversal
const buildTree = (inorder, postorder) => {
  if (!postorder.length) return null;
  
  const root = new TreeNode(postorder.pop());
  const mid = inorder.indexOf(root.val);
  
  root.right = buildTree(inorder.slice(mid + 1), postorder);
  root.left = buildTree(inorder.slice(0, mid), postorder);
  
  return root;
};

// Test Cases
// function TreeNode(val, left, right) { this.val = val; this.left = left; this.right = right; }
// console.log(buildTree([9,3,15,20,7], [9,15,7,20,3])); // [3,9,20,null,null,15,7]