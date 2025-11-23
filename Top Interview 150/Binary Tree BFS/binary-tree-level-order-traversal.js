// Binary Tree Level Order Traversal - Level order traversal
const levelOrder = (root) => {
  if (!root) return [];
  
  const result = [];
  const queue = [root];
  
  while (queue.length) {
    const size = queue.length;
    const level = [];
    
    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      level.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    
    result.push(level);
  }
  
  return result;
};

// Test Cases
// function TreeNode(val, left, right) { this.val = val; this.left = left; this.right = right; }
// console.log(levelOrder([3,9,20,null,null,15,7])); // [[3],[9,20],[15,7]]