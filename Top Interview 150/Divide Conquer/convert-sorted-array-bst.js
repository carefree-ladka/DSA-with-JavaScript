// Convert Sorted Array to Binary Search Tree
const sortedArrayToBST = (nums) => {
  const build = (left, right) => {
    if (left > right) return null;
    const mid = Math.floor((left + right) / 2);
    const root = new TreeNode(nums[mid]);
    root.left = build(left, mid - 1);
    root.right = build(mid + 1, right);
    return root;
  };
  
  return build(0, nums.length - 1);
};

// Test Cases
// function TreeNode(val, left, right) { this.val = val; this.left = left; this.right = right; }
// console.log(sortedArrayToBST([-10,-3,0,5,9])); // [0,-3,9,-10,null,5]