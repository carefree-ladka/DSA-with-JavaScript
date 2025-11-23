// Average of Levels in Binary Tree - Calculate average of each level
const averageOfLevels = (root) => {
  const result = [];
  const queue = [root];
  
  while (queue.length) {
    const size = queue.length;
    let sum = 0;
    
    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      sum += node.val;
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    
    result.push(sum / size);
  }
  
  return result;
};

// Test Cases
// function TreeNode(val, left, right) { this.val = val; this.left = left; this.right = right; }
// console.log(averageOfLevels([3,9,20,null,null,15,7])); // [3.00000,14.50000,11.00000]