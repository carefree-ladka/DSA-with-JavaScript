// Morris Inorder Traversal - O(1) space complexity using threading
const morrisInorder = (root) => {
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
        // Create thread
        predecessor.right = current;
        current = current.left;
      } else {
        // Remove thread and process
        predecessor.right = null;
        result.push(current.val);
        current = current.right;
      }
    }
  }
  
  return result;
};

// Test Cases
// TreeNode: function TreeNode(val, left, right) { this.val = val; this.left = left; this.right = right; }
// console.log(morrisInorder([1,null,2,3])); // [1,3,2]
// console.log(morrisInorder([1,2,3,4,5])); // [4,2,5,1,3]