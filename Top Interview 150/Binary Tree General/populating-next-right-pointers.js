// Populating Next Right Pointers in Each Node II
const connect = (root) => {
  if (!root) return root;
  
  let level = root;
  while (level) {
    let curr = level;
    let nextLevel = null, prev = null;
    
    while (curr) {
      if (curr.left) {
        if (prev) prev.next = curr.left;
        else nextLevel = curr.left;
        prev = curr.left;
      }
      if (curr.right) {
        if (prev) prev.next = curr.right;
        else nextLevel = curr.right;
        prev = curr.right;
      }
      curr = curr.next;
    }
    level = nextLevel;
  }
  
  return root;
};

// Test Cases
// function Node(val, left, right, next) { this.val = val; this.left = left; this.right = right; this.next = next; }
// console.log(connect([1,2,3,4,5,null,7])); // Connected tree