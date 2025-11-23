// Binary Search Tree Iterator - Iterator for BST
class BSTIterator {
  constructor(root) {
    this.stack = [];
    this.pushLeft(root);
  }
  
  next() {
    const node = this.stack.pop();
    this.pushLeft(node.right);
    return node.val;
  }
  
  hasNext() {
    return this.stack.length > 0;
  }
  
  pushLeft(node) {
    while (node) {
      this.stack.push(node);
      node = node.left;
    }
  }
}

// Test Cases
// function TreeNode(val, left, right) { this.val = val; this.left = left; this.right = right; }
// const iterator = new BSTIterator([7,3,15,null,null,9,20]);
// console.log(iterator.next()); // 3