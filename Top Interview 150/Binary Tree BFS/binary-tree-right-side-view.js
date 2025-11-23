// Binary Tree Right Side View - Get right side view of tree
const rightSideView = (root) => {
  if (!root) return [];
  
  const result = [];
  const queue = [root];
  
  while (queue.length) {
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      if (i === size - 1) result.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }
  
  return result;
};

// Test Cases
// function TreeNode(val, left, right) { this.val = val; this.left = left; this.right = right; }
// console.log(rightSideView([1,2,3,null,5,null,4])); // [1,3,4]