// Binary Tree Zigzag Level Order Traversal - Zigzag level order
const zigzagLevelOrder = (root) => {
  if (!root) return [];
  
  const result = [];
  const queue = [root];
  let leftToRight = true;
  
  while (queue.length) {
    const size = queue.length;
    const level = [];
    
    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      if (leftToRight) {
        level.push(node.val);
      } else {
        level.unshift(node.val);
      }
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    
    result.push(level);
    leftToRight = !leftToRight;
  }
  
  return result;
};

// Test Cases
// function TreeNode(val, left, right) { this.val = val; this.left = left; this.right = right; }
// console.log(zigzagLevelOrder([3,9,20,null,null,15,7])); // [[3],[20,9],[15,7]]