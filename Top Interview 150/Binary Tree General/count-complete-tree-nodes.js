// Count Complete Tree Nodes - Count nodes in complete binary tree
const countNodes = (root) => {
  if (!root) return 0;
  
  const getHeight = (node) => {
    let height = 0;
    while (node) {
      height++;
      node = node.left;
    }
    return height;
  };
  
  const leftHeight = getHeight(root.left);
  const rightHeight = getHeight(root.right);
  
  if (leftHeight === rightHeight) {
    return (1 << leftHeight) + countNodes(root.right);
  } else {
    return (1 << rightHeight) + countNodes(root.left);
  }
};

// Test Cases
// function TreeNode(val, left, right) { this.val = val; this.left = left; this.right = right; }
// console.log(countNodes([1,2,3,4,5,6])); // 6