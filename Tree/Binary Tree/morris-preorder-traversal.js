// Morris Preorder Traversal - O(1) space complexity using threading
const morrisPreorder = (root) => {
  const result = [];
  let current = root;
  
  while (current) {
    if (!current.left) {
      result.push(current.val);
      current = current.right;
    } else {
      // Find inorder predecessor
      let predecessor = current.left;
      while (predecessor.right && predecessor.right !== current) {
        predecessor = predecessor.right;
      }
      
      if (!predecessor.right) {
        // Process current before creating thread
        result.push(current.val);
        predecessor.right = current;
        current = current.left;
      } else {
        // Remove thread
        predecessor.right = null;
        current = current.right;
      }
    }
  }
  
  return result;
};

// Test Cases
// TreeNode: function TreeNode(val, left, right) { this.val = val; this.left = left; this.right = right; }
// console.log(morrisPreorder([1,null,2,3])); // [1,2,3]
// console.log(morrisPreorder([1,2,3,4,5])); // [1,2,4,5,3]