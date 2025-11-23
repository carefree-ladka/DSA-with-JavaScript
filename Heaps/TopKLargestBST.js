// Kth Largest Element in BST
const kthLargest = (root, k) => {
  const result = [];
  
  const inorder = (node) => {
    if (!node || result.length >= k) return;
    inorder(node.right);
    if (result.length < k) result.push(node.val);
    inorder(node.left);
  };
  
  inorder(root);
  return result[k - 1];
};

// Kth Smallest Element in BST
const kthSmallest = (root, k) => {
  const stack = [];
  let current = root;
  
  while (current || stack.length) {
    while (current) {
      stack.push(current);
      current = current.left;
    }
    
    current = stack.pop();
    k--;
    
    if (k === 0) return current.val;
    
    current = current.right;
  }
};

// Test Cases
const root = {
  val: 3,
  left: { val: 1, left: null, right: { val: 2, left: null, right: null } },
  right: { val: 4, left: null, right: null }
};
console.log(kthSmallest(root, 1)); // 1
console.log(kthLargest(root, 1)); // 4