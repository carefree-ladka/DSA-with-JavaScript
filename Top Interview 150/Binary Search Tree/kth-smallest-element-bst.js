// Kth Smallest Element in a BST - Find kth smallest element
const kthSmallest = (root, k) => {
  let count = 0, result = 0;
  
  const inorder = (node) => {
    if (!node || count >= k) return;
    inorder(node.left);
    if (++count === k) result = node.val;
    inorder(node.right);
  };
  
  inorder(root);
  return result;
};

// Test Cases
// function TreeNode(val, left, right) { this.val = val; this.left = left; this.right = right; }
// console.log(kthSmallest([3,1,4,null,2], 1)); // 1