// Kth Largest Sum in Binary Tree
const kthLargestLevelSum = (root, k) => {
  if (!root) return -1;
  
  const levelSums = [];
  const queue = [root];
  
  while (queue.length) {
    const levelSize = queue.length;
    let levelSum = 0;
    
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      levelSum += node.val;
      
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    
    levelSums.push(levelSum);
  }
  
  if (k > levelSums.length) return -1;
  
  levelSums.sort((a, b) => b - a);
  return levelSums[k - 1];
};

// Kth Largest Element in Stream (Optimized)
class KthLargestOptimized {
  constructor(k, nums) {
    this.k = k;
    this.heap = nums.sort((a, b) => a - b).slice(-k);
  }
  
  add(val) {
    if (this.heap.length < this.k) {
      this.heap.push(val);
      this.heap.sort((a, b) => a - b);
    } else if (val > this.heap[0]) {
      this.heap[0] = val;
      this.heap.sort((a, b) => a - b);
    }
    return this.heap[0];
  }
}

// Test Cases
const root = {
  val: 5,
  left: { val: 8, left: { val: 2, left: null, right: null }, right: { val: 1, left: null, right: null } },
  right: { val: 9, left: { val: 3, left: null, right: null }, right: { val: 7, left: null, right: null } }
};
console.log(kthLargestLevelSum(root, 2)); // 13