// Morris Postorder Traversal - O(1) space complexity using threading
const morrisPostorder = (root) => {
  const result = [];
  let current = root;
  
  while (current) {
    if (!current.right) {
      result.push(current.val);
      current = current.left;
    } else {
      // Find inorder successor
      let successor = current.right;
      while (successor.left && successor.left !== current) {
        successor = successor.left;
      }
      
      if (!successor.left) {
        // Process current before creating thread
        result.push(current.val);
        successor.left = current;
        current = current.right;
      } else {
        // Remove thread
        successor.left = null;
        current = current.left;
      }
    }
  }
  
  return result.reverse();
};

// Alternative Morris Postorder using dummy node
const morrisPostorderAlt = (root) => {
  if (!root) return [];
  
  const dummy = { left: root, right: null, val: -1 };
  const result = [];
  let current = dummy;
  
  while (current) {
    if (!current.left) {
      current = current.right;
    } else {
      let predecessor = current.left;
      while (predecessor.right && predecessor.right !== current) {
        predecessor = predecessor.right;
      }
      
      if (!predecessor.right) {
        predecessor.right = current;
        current = current.left;
      } else {
        // Reverse and add path from current.left to predecessor
        const path = [];
        let node = current.left;
        while (node !== predecessor.right) {
          path.push(node.val);
          node = node.right;
        }
        result.push(...path.reverse());
        
        predecessor.right = null;
        current = current.right;
      }
    }
  }
  
  return result;
};

// Test Cases
// TreeNode: function TreeNode(val, left, right) { this.val = val; this.left = left; this.right = right; }
// console.log(morrisPostorder([1,null,2,3])); // [3,2,1]
// console.log(morrisPostorderAlt([1,2,3,4,5])); // [4,5,2,3,1]