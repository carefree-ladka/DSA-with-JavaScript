// Morris Traversal Comparison - All three traversals with performance analysis
class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

// Standard recursive traversals for comparison
const recursiveInorder = (root, result = []) => {
  if (!root) return result;
  recursiveInorder(root.left, result);
  result.push(root.val);
  recursiveInorder(root.right, result);
  return result;
};

const recursivePreorder = (root, result = []) => {
  if (!root) return result;
  result.push(root.val);
  recursivePreorder(root.left, result);
  recursivePreorder(root.right, result);
  return result;
};

const recursivePostorder = (root, result = []) => {
  if (!root) return result;
  recursivePostorder(root.left, result);
  recursivePostorder(root.right, result);
  result.push(root.val);
  return result;
};

// Performance comparison function
const compareTraversals = (root) => {
  console.log("=== Traversal Comparison ===");
  
  // Morris traversals
  const morrisIn = morrisInorder(root);
  const morrisPre = morrisPreorder(root);
  const morrisPost = morrisPostorder(root);
  
  // Recursive traversals
  const recursiveIn = recursiveInorder(root);
  const recursivePre = recursivePreorder(root);
  const recursivePost = recursivePostorder(root);
  
  console.log("Inorder  - Morris:", morrisIn, "| Recursive:", recursiveIn);
  console.log("Preorder - Morris:", morrisPre, "| Recursive:", recursivePre);
  console.log("Postorder- Morris:", morrisPost, "| Recursive:", recursivePost);
  
  console.log("\nComplexity Analysis:");
  console.log("Morris Traversal: Time O(n), Space O(1)");
  console.log("Recursive:        Time O(n), Space O(h) where h is height");
};

// Test tree construction
const buildTestTree = () => {
  //       1
  //      / \
  //     2   3
  //    / \
  //   4   5
  const root = new TreeNode(1);
  root.left = new TreeNode(2);
  root.right = new TreeNode(3);
  root.left.left = new TreeNode(4);
  root.left.right = new TreeNode(5);
  return root;
};

// Test Cases
const testTree = buildTestTree();
compareTraversals(testTree);

// Expected outputs:
// Inorder:   [4, 2, 5, 1, 3]
// Preorder:  [1, 2, 4, 5, 3]  
// Postorder: [4, 5, 2, 3, 1]