// Reverse Nodes in k-Group - Reverse every k nodes
const reverseKGroup = (head, k) => {
  let curr = head, count = 0;
  while (curr && count < k) {
    curr = curr.next;
    count++;
  }
  
  if (count === k) {
    curr = reverseKGroup(curr, k);
    while (count-- > 0) {
      const next = head.next;
      head.next = curr;
      curr = head;
      head = next;
    }
    head = curr;
  }
  
  return head;
};

// Test Cases
// function ListNode(val, next) { this.val = val; this.next = next; }
// console.log(reverseKGroup([1,2,3,4,5], 2)); // [2,1,4,3,5]