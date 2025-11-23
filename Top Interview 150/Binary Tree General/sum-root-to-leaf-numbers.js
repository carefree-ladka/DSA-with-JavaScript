// Sum Root to Leaf Numbers - Sum all root-to-leaf numbers
const sumNumbers = (root) => {
  const dfs = (node, num) => {
    if (!node) return 0;
    num = num * 10 + node.val;
    if (!node.left && !node.right) return num;
    return dfs(node.left, num) + dfs(node.right, num);
  };
  
  return dfs(root, 0);
};

// Test Cases
// function TreeNode(val, left, right) { this.val = val; this.left = left; this.right = right; }
// console.log(sumNumbers([1,2,3])); // 25 (12 + 13)